import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {
  handleAllProjects,
  handleProjectDashboard,
  handleProjectReview,
  handleProjectSubmission,
} from "../controllers/handleProjects";

const router = express.Router();

const auth = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).json({ msg: "No token, authorization denied" });
    console.log(token);
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    (req as any).user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

router.post("/", auth, handleProjectSubmission);

router.get("/", auth, handleAllProjects);

router.get("/:id", auth, handleProjectDashboard);

router.get("/review/:shareId", handleProjectReview);

export default router;
