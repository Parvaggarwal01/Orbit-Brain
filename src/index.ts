import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import cors from "cors";
import { UserModel } from "./db.js";

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

app.post("/api/v1/content", (req, res) => {
  const link = req.body.link;
  const title = req.body.title;

  
});

app.get("/api/v1/content", (req, res) => {});

app.delete("/api/v1/content", (req, res) => {});

app.post("/api/v1/brain/share", (req, res) => {});

app.get("/api/v1/brain/share", (req, res) => {});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
