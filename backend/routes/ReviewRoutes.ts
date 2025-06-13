import express, { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
import {
  handleAllReviews,
  handleReviewSubmit,
} from "../controllers/handleReview";

const router = express.Router();

// const auth = (req: Request, res: Response, next: NextFunction): void => {
//   const token = req.header("x-auth-token");

//   if (!token) {
//     res.status(401).json({ msg: "No token, authorization denied" });
//     console.log(token);
//     return;
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
//       id: string;
//     };
//     (req as any).user = decoded.id;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: "Token is not valid" });
//   }
// };

router.post("/:shareId", handleReviewSubmit);

router.get("/:id", handleAllReviews);

router.get("/use/:id", handleAllReviews);

export default router;
