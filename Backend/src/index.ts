import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import cors from "cors";
import { ContentModel, LinkModel, UserModel } from "./db.js";
import { UserMiddleware } from "./middleware.js";
import { random } from "./utils.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "";

app.post("/api/v1/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(401).json({
      message: "Username and password are required",
    });
  }

  try {
    const salt = await bcrypt.genSalt(5);
    const hashedPasseword = await bcrypt.hash(password, salt);

    await UserModel.create({
      username: username,
      password: hashedPasseword,
    });

    return res.status(200).json({
      message: "Successfully created user",
    });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(403).json({
        message: "User Already Exists",
      });
    }

    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.status(401).json({
        message: "Username and password are required",
      });
    }

    const user = await UserModel.findOne({
      username: username,
    });

    if (!user) {
      return res.status(403).json({
        message: "User does not exist",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password!);

    if (!isPasswordValid) {
      return res.status(403).json({
        message: "Invalid Password",
      });
    } else {
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
        },
        JWT_SECRET
      );

      res.json({
        message: "Login Successful",
        token: token,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
});

app.post("/api/v1/content", UserMiddleware, async (req, res) => {
  const title = req.body.title;
  const link = req.body.link;
  const type = req.body.type;

  try {
    await ContentModel.create({
      title: title,
      link: link,
      type: type,
      //@ts-ignore
      userId: req.userId,
      tags: [],
      createdAt: new Date(),
    });

    return res.status(200).json({
      message: "Content Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create content",
      error: error,
    });
  }
});

app.get("/api/v1/user/profile", UserMiddleware, async (req, res) => {
  try {
    //@ts-ignore
    const user = await UserModel.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
});

app.get("/api/v1/content", UserMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  const content = await ContentModel.find({
    userId: userId,
  }).populate("userId", "username");

  res.json({
    content: content,
  });
});

app.delete("/api/v1/content", UserMiddleware, async (req, res) => {
  try {
    const contentId = req.body.contentId;

    if (!contentId) {
      return res.status(400).json({
        message: "Content ID is required",
      });
    }

    const deletedContent = await ContentModel.findOneAndDelete({
      _id: contentId,
      //@ts-ignore
      userId: req.userId,
    });

    if (!deletedContent) {
      return res.status(404).json({
        message: "Content not found or you don't have permission to delete it",
      });
    }

    res.json({
      message: "Content Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
});

app.post("/api/v1/brain/share", UserMiddleware, async (req, res) => {
  const share = req.body.share;
  try {
    if (share) {
      const existingShare = await LinkModel.findOne({
        //@ts-ignore
        userId: req.userId,
      });
      if (existingShare) {
        return res.json({
          message: "Share link already exists",
          hash: existingShare.hash,
        });
      }

      const hash = random(10);
      await LinkModel.create({
        //@ts-ignore
        userId: req.userId,
        hash: hash,
      });

      res.json({
        message: "Share Link Created Successfully",
        hash: hash,
      });
    } else {
      await LinkModel.deleteOne({
        //@ts-ignore
        userId: req.userId,
      });

      res.json({
        message: "Share Link Deleted Successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;
  const link = await LinkModel.findOne({
    hash: hash,
  });

  if (!link) {
    return res.status(404).json({
      message: "Invalid Link",
    });
  }
  const content = await ContentModel.find({
    userId: link.userId,
  });

  const user = await UserModel.findOne({
    _id: link.userId,
  });

  if (!user) {
    return res.status(411).json({
      message: "User Not Found",
    });
  }

  res.json({
    username: user.username,
    content: content,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
