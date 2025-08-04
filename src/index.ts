import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import cors from "cors";
import { UserModel } from "./db.js";
const app = express();

app.post("/api/v1/signup", async(req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if(!username || !password) {
    return res.status(401).json({
      message: "Username and password are required"
    })
  }

  try {
    const salt = await bcrypt.genSalt(5);
    const hashedPasseword = await bcrypt.hash(password, salt);

    await UserModel.create({
      username: username,
      password: hashedPasseword
    })

    return res.status(200).json({
      message: "Successfully created user"
    })
  }catch(err: any){
    if(err.code === 11000){
      return res.status(403).json({
        message: "User Already Exists"
      })
    }

    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    })
  }
})

app.post("/api/v1/signin", (req, res) => {

})

app.post("/api/v1/content", (req, res) => {

})

app.get("/api/v1/content", (req, res) => {

})

app.delete("api/v1/content", (req, res) => {

})

app.post("api/v1/brain/share", (req, res) => {

})

app.get("api/v1/brain/share", (req, res) => {

})