import axios from "axios";
import { useEffect, useState } from "react";
import ProjectForm from "../components/ProjectForm";
import { useNavigate } from "react-router-dom";

interface Project {
  _id: string;
  userId: string;
  projectName: string;
  projectDesc: string;
  projectLink: string;
}

// interface DashboardProps {
//   token: string;
//   setToken: React.Dispatch<React.SetStateAction<string>>;
// }

const ProjectSkeleton = () => (
  <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-xl p-6 animate-pulse space-y-4">
    <div className="h-5 bg-slate-700 rounded w-3/4"></div>
    <div className="h-4 bg-slate-700 rounded w-full"></div>
    <div className="h-4 bg-slate-700 rounded w-5/6"></div>
    <div className="mt-6 h-10 bg-slate-700 rounded w-full"></div>
  </div>
);


const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showProjectForm, setShowProjectForm] = useState<boolean>(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {if (!token) navigate("/login")}, [])

  useEffect(() => {
    const fetchProjects = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${backendUrl}/api/projects`, {
          headers: { "x-auth-token": token },
        });
        // if (!token) navigate("/login");
        setProjects(res.data as Project[]);
      } catch (err: any) {
        console.error(err.response?.data || err.message);
        alert(`Error" ${err.message}`)
        localStorage.clear();
      } finally {
        setLoading(false)
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] py-12 px-6 text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-6 md:mb-0 text-center md:text-left">
          Your Projects
        </h1>

        <button
          onClick={() => setShowProjectForm(true)}
          className="bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors duration-300 px-6 py-2 text-white rounded-xl shadow-lg cursor-pointer"
        >
          Create Project
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
  {loading
    ? Array.from({ length: 6 }).map((_, i) => <ProjectSkeleton key={i} />)
    : projects.map((proj) => (
        <div
          key={proj._id}
          className="bg-slate-800 border border-slate-700 rounded-2xl shadow-xl hover:shadow-blue-500/20 transition-shadow duration-300 p-6 flex flex-col justify-between"
          onClick={() => navigate(`/dashboard/${proj._id}`)}
        >
          <div>
            <h3 className="text-xl font-semibold text-blue-300 mb-2">
              {proj.projectName}
            </h3>
            <p className="text-sm text-gray-300 mb-4">{proj.projectDesc}</p>
          </div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-auto text-center bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white px-4 py-2 rounded-md"
          >
            🔗 Visit Project
          </a>
        </div>
      ))}
</div>

      {showProjectForm && (
        <ProjectForm
          setShowProjectForm={setShowProjectForm}
          setProjects={setProjects}
        />
      )}
    </div>
  );
};

export default Dashboard;
