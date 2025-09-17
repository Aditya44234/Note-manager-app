import { MONGODB_URL, PORT } from "./config/config.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
const app = express();

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Serverhii" });
});

app.get("/about", (req, res) => {
  res.json({ message: "This is about page" });
});

// Connect to MongoDB
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("  ");
    console.log("Connected too DB");
    app.listen(PORT, () => {
      console.log(`Server is runnning at http://localhost:${PORT}/`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
