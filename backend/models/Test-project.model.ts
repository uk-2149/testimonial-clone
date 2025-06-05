import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "testimonial-user", required: true },
  projectName: { type: String, required: true },
  projectDesc: { type: String, required: true },
  projectLink: { type: String, required: true },
});

export default mongoose.model("Test-project", ProjectSchema);