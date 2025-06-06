import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Project {
  _id: string;
  userId: string;
  projectName: string;
  projectDesc: string;
  link: string;
}

interface DashboardProps {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const Dashboard:  React.FC<DashboardProps> = ({ token, setToken }) => {
  const[projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
  const fetchProjects = async () => {
    try {
      if (!token) {
        alert("Authentication error");
        return;
      }
      const res = await axios.get(`http://localhost:5000/api/projects`, {
        headers: { "x-auth-token": token },
      });

      setProjects(res.data as Project[]);
    } catch (err: any) {
      console.error(err.response?.data || err.message);
    }
  };

  fetchProjects(); 
}, [token]);


  return (
    <div>
        {projects.map((proj) => (
        <div key={proj._id}>
          <h3>{proj.projectName}</h3>
          <p>{proj.projectDesc}</p>
          <a href={proj.link} target="_blank" rel="noopener noreferrer">
            Visit Project
          </a>
        </div>
      ))}
    </div>
  )
}

export default Dashboard