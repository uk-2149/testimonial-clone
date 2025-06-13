require("dotenv").config();
import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import path from "path";
import connectDB from "./config/connectDB";
import handleAuth from "./routes/auth";
import handleProjects from "./routes/projectRoutes";
import handleReviews from "./routes/ReviewRoutes";

const app = express();

const reviewLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 60
  });

app.use(express.json());
  
connectDB();

app.use("/api/auth",cors({
    origin: "https://testimonial-uk-97.vercel.app", 
    credentials: true
  }), handleAuth);

app.use("/api/projects",cors({
    origin: "https://testimonial-uk-97.vercel.app", 
    credentials: true
  }), handleProjects);

app.use("/api/review",cors({
    origin: "https://testimonial-uk-97.vercel.app", 
    credentials: true
  }), handleReviews);

app.use('/embed', cors({
    origin: '*'
  }), reviewLimiter, express.static(path.join(__dirname, 'embed')));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
