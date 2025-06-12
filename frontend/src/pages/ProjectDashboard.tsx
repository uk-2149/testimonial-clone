import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

interface Project {
  _id: string | undefined;
  userId: string;
  projectName: string;
  projectDesc: string;
  projectLink: string;
  shareId: string;
}

const ProjectDashboard = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project>({
    _id: id,
    userId: "",
    projectName: "",
    projectDesc: "",
    projectLink: "",
    shareId: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `http://localhost:5000/api/projects/${id}`,
          {
            headers: { "x-auth-token": token },
          }
        );
        setProject(res.data);
      } catch (err) {
        console.error("Failed to fetch project:", err);
        // navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `http://localhost:5173/review/${project.shareId}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex flex-col gap-6 items-center justify-center px-4">
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-xl p-6 flex flex-col justify-between w-full max-w-2xl">
          <h1 className="text-2xl font-bold text-blue-400 mb-2">
            {project.projectName}
          </h1>
          <p className="text-gray-400 mb-4">{project.projectDesc}</p>

          <p className="text-gray-400 mb-4">
            Share this link to collect reviews:
          </p>

          <div className="bg-gray-100 p-4 rounded-md flex items-center justify-between">
            <span className="text-sm break-all text-gray-800">
              http://localhost:5173/review/{project.shareId}
            </span>
            <button
              onClick={handleCopy}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md ml-2 text-sm transition"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => navigate(`/dashboard/review/${id}`)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md ml-2 text-sm transition"
      >
        See reviews {`>>`}
      </button>
    </div>
  );
};

export default ProjectDashboard;
