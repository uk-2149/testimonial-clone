require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import connectDB from "./config/connectDB";
import handleAuth from "./routes/auth"

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", handleAuth)

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
