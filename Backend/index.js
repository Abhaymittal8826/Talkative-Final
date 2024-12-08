import express from "express";
import dotenv from "dotenv";
import path from "path";

import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";

dotenv.config();


app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URL;

try {
    mongoose.connect(URI);
    console.log("Connected to MongoDB");
} catch (error) {
    console.log(error);
}
// app.get("/", (req, res) => 
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);
if(process.env.NODE_ENV ==="production"){
    const dirPath = path.resolve();

  app.use(express.static("./Frontend/dist"));
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(dirPath,"./Frontend/dist", "index.html"));
  })
}


server.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});