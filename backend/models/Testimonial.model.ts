import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TestimoialSchema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: "test-project", required: true },
  name: { type: String, required: true },
  message: { type: String, required: true },
  review: { type: Number, required: true },
});

TestimoialSchema.set("timestamps", true);

export default mongoose.model("Testimonials", TestimoialSchema);