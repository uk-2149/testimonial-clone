import { Request, Response } from "express";
import TestProjectModel from "../models/Test-project.model";

interface ProjectRequestBody {
  projectName: string;
  projectDesc: string;
  link: string;
}

interface AuthenticatedRequest extends Request<{}, {}, ProjectRequestBody> {
  user?: string;
}

export async function handleProjectSubmission(req: AuthenticatedRequest, res: Response): Promise<any> {
    const { projectName, projectDesc, link } = req.body;
  
    try {
        const project = new TestProjectModel({
            userId: req.user,
            projectName,
            projectDesc,
            projectLink: link,
          });
        
          await project.save();
          return res.json(project);
    } catch(err: any) {
        res.status(500).json({ error: err.message });
    }
}


export async function handleAllProjects(req: AuthenticatedRequest, res:Response) {
  try {
    const projects = await TestProjectModel.find({ userId: req.user });
    res.json(projects);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
