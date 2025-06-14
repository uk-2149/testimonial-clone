import { Request, Response } from "express";
import TestimonialModel, { ITestimonial } from "../models/Testimonial.model";
import TestProjectModel from "../models/Test-project.model";

interface AuthenticatedRequest
  extends Request<{ id: string }, {}, ITestimonial> {
  project?: string;
}

export async function handleReviewSubmit(
  req: Request<{ shareId: string }, {}, ITestimonial>,
  res: Response
): Promise<any> {
  const { name, message, rating } = req.body;

  const project = await TestProjectModel.findOne({
    shareId: req.params.shareId,
  });

  const projectId = project?._id;

  try {
    const project = new TestimonialModel({
      projectId,
      name,
      message,
      rating,
    });

    await project.save();
    res.json(project);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleAllReviews(
  req: AuthenticatedRequest,
  res: Response
): Promise<any> {
  try {
    const reviews = await TestimonialModel.find({ projectId: req.params.id });
    return res.json(reviews.map(r => ({
      name: r.name,
      message: r.message,
      rating: r.rating,
      createdAt: r.createdAt ?? null,
    })));
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
