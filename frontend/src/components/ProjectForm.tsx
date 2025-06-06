import React, { useState } from 'react';
import axios from "axios";

interface ProjectFormData {
  projectName: string;
  projectDesc: string;
  link: string;
}

interface ProjectFormProps {
  setShowProjectForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ setShowProjectForm }) => {
  
  const [formData, setFormData] = useState<ProjectFormData>({
    projectName: "",
    projectDesc: "",
    link: "",
  })

  const token = localStorage.getItem("token");
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(!token) {
        alert("Authentication Error");
      }
      const res = await axios.post(`http://localhost:5000/api/projects`, formData, {
        headers: { "x-auth-token": token },
      });
      setFormData({
        projectName: "",
        projectDesc: "",
        link: ""
      })
    } catch (err: any) {
      console.error(err.response?.data || err.message);
    }
  }

  return (
    <div>
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs">
    <form
      method="post"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-[90%] max-w-lg bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-8 rounded-2xl shadow-2xl text-white border border-blue-900"
    >
      <h2 className="text-2xl font-bold text-blue-400 mb-2 text-center">
        Create New Project
      </h2>

      <div className="flex flex-col">
        <label htmlFor="projectName" className="mb-1 text-sm text-gray-300">
          Project Name
        </label>
        <input
          type="text"
          id="projectName"
          name="projectName"
          placeholder="XYZ"
          className="px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setFormData({ ...formData, projectName: e.target.value })
          }
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="description" className="mb-1 text-sm text-gray-300">
          Project Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="A brief summary..."
          className="px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setFormData({ ...formData, projectDesc: e.target.value })
          }
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="link" className="mb-1 text-sm text-gray-300">
          Project Link
        </label>
        <input
          type="url"
          id="link"
          name="link"
          placeholder="https://xyz.com"
          className="px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setFormData({ ...formData, link: e.target.value })
          }
        />
      </div>

      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={() => setShowProjectForm(false)}
          className="py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={
            !formData.projectName || !formData.projectDesc || !formData.link
          }
          className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Project
        </button>
      </div>
    </form>
  </div>

    </div>
  )
}

export default ProjectForm