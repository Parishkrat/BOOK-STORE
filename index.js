import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import route from "./Routes/userRoutes.js";
import authenticator_route from "./Routes/auth.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

app.use("/user/api/", route);

app.use("/api/v1/auth", authenticator_route);
