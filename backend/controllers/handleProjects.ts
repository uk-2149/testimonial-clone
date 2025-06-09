import { Request, Response } from "express";
import TestProjectModel from "../models/Test-project.model";
import { v4 as uuidv4 } from 'uuid';

interface ProjectRequestBody {
  id: string;
  projectName: string;
  projectDesc: string;
  link: string;
  shareId: string;
}

interface AuthenticatedRequest extends Request<{}, {}, ProjectRequestBody> {
  user?: string;
}

interface AuthenticatedRequest_projdb extends Request<{id: string}, {}, ProjectRequestBody> {
  user?: string;
}

export async function handleProjectSubmission(req: AuthenticatedRequest, res: Response): Promise<any> {
    const { projectName, projectDesc, link } = req.body;
    const shareId = uuidv4().slice(0, 8);
  
    try {
        const project = new TestProjectModel({
            userId: req.user,
            projectName,
            projectDesc,
            projectLink: link,
            shareId
          });
        
          await project.save();
          return res.json(project);
    } catch(err: any) {
        res.status(500).json({ error: err.message });
    }
}


export async function handleAllProjects(req: AuthenticatedRequest, res:Response): Promise<any> {
  try {
    const projects = await TestProjectModel.find({ userId: req.user });
    return res.json(projects);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleProjectDashboard(req: AuthenticatedRequest_projdb, res: Response): Promise<any> {
  try {

    console.log("Requested Project ID:", req.params.id);

    const project = await TestProjectModel.findById(req.params.id);
    if (!project || project.userId.toString() !== req.user) {
      return res.status(404).json({ msg: "Project not found" });
    }
    if (project.userId.toString() !== req.user) {
      return res.status(403).json({ msg: "Unauthorized access" });
    }
    return res.json(project);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleProjectReview(req: Request<{shareId: string}, {}, ProjectRequestBody>, res: Response): Promise<any> {
  try {
    const project = await TestProjectModel.findOne({ shareId: req.params.shareId });
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }
    return res.json(project);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
