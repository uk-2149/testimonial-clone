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

const rateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 60
  });

const corsOptionsFrontendOnly = {
  origin: "https://testimonial-uk-97.vercel.app",
  credentials: true,
 };

 const corsOptionsAllOrigins = {
   origin: '*',
 };

app.use(express.json());
  
connectDB();

app.use("/api/auth",cors(corsOptionsFrontendOnly), handleAuth);

app.use("/api/projects",cors(corsOptionsFrontendOnly), handleProjects);

app.use("/api/review",cors(corsOptionsAllOrigins), rateLimiter, handleReviews);

app.use('/embed', cors(corsOptionsAllOrigins), rateLimiter, express.static(path.join(__dirname, 'embed')));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
