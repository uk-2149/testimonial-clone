import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Project {
    _id: string | undefined;
    userId: string;
    projectName: string;
    projectDesc: string;
    projectLink: string;
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
    projectLink: ""
  })

  useEffect(() => {
    const res = axios.get(`http://localhost:5000/api/projects/:${id}`,{
      headers: { "x-auth-token": token },
    });
    setProject(res.data)
  }, [id])


  return (
    <div>
        
    </div>
  )
}

export default ProjectDashboard