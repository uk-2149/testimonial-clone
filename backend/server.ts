require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import connectDB from "./config/connectDB";
import handleAuth from "./routes/auth";
import handleProjects from "./routes/projectRoutes";
import handleReviews from "./routes/ReviewRoutes";

const app = express();
app.use(express.json());
app.use(cors({
    origin: "https://testimonial-uk-97.vercel.app", 
    credentials: true
  }));
  

connectDB();

app.use("/api/auth", handleAuth)
app.use("/api/projects", handleProjects)
app.use("/api/review", handleReviews)

app.use('/embed', express.static(path.join(__dirname, 'embed')));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
