import mongoose, { Document, Schema, Types } from "mongoose";

export interface ITestimonial extends Document {
  projectId: Types.ObjectId;
  name: string;
  message: string;
  rating: number;
  createdAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "test-project", required: true },
    name: { type: String, required: true },
    message: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  { timestamps: true }
);


export default mongoose.model<ITestimonial>("Testimonials", TestimonialSchema);