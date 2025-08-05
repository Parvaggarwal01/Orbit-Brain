import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "";

export const UserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers["authorization"];

  if (!header) {
    return res.status(401).json({
      message: "Authorization header is required",
    });
  }

  let token: string;
  if (header.startsWith("Bearer ")) {
    const tokenPart = header.split(" ")[1];
    if (!tokenPart) {
      return res.status(401).json({
        message: "Token is missing after Bearer",
      });
    }
    token = tokenPart;
  } else {
    token = header;
  }

  if (!token) {
    return res.status(401).json({
      message: "Token is required",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    // @ts-ignore
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({
      message: "Invalid Token",
    });
  }
};
