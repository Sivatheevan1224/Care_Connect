import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/dbConfig.js";
import cloudinaryConfig from "./config/cloudinary.js";

//app config
const app = express();
const PORT = process.env.PORT;
cloudinaryConfig();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//api endpoints

app.get("/", (req, res) => {
  res.send("app is working ");
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
  connectDB();
});
