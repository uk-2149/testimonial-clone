import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Project {
    _id: string | undefined;
    userId: string;
    projectName: string;
    projectDesc: string;
    projectLink: string;
    shareId: string;
  }

  interface ProjectDashboardProps {
    token: string;
  }

  const ProjectDashboard: React.FC<ProjectDashboardProps> = ({ token }) => {
  const { id } = useParams();
  const [project, setProject] = useState<Project>({
    _id: id,
    userId: "",
    projectName: "",
    projectDesc: "",
    projectLink: "",
    shareId: "",
  });

  const navigate = useNavigate();

  if(!token) navigate("/login");
  
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/projects/${id}`, {
          headers: { "x-auth-token": token },
        });
        setProject(res.data);
      } catch (err) {
        console.error("Failed to fetch project:", err);
        navigate("/login");
        localStorage.clear();
      }
    };
  
    if (id) fetchProject();
  }, [id]);
  

  return (
    <div>
        <h1>{project.projectName}</h1>
        <p>Share this link to collect reviews</p>
        <p>http://localhost:5173/review/{project.shareId}</p>
    </div>
  )
}

export default ProjectDashboard