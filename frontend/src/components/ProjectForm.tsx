import React, { useState } from 'react';
import axios from "axios";

interface ProjectFormData {
  projectName: string;
  desc: string;
  link: string;
}

function ProjectForm() {
  const [formData, setFormData] = useState<ProjectFormData>({
    projectName: "",
    desc: "",
    link: "",
  })

  const token = localStorage.getItem("token");
  const handleSumbit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(!token) {
        alert("Authentication Error");
      }
      const res = await axios.post(`http:localhost:5000/api/projects`, formData, {
        headers: { "x-auth-token": token },
      });
      setFormData({
        projectName: "",
        desc: "",
        link: ""
      })
    } catch (err: any) {
      console.error(err.response?.data || err.message);
    }
  }

  return (
    <div>
  <form method="post" className='flex flex-col w-[20vw] min-w-[300px]' onSubmit={handleSumbit}>

<label htmlFor="projectName">
    Project Name
</label>
<input type="text" name="projectName" id="projectName" placeholder='XYZ' className='border-1 rounded-sm' onChange={(e) => setFormData({...formData, projectName: e.target.value})}/>

<label htmlFor="description">
    Project Description
</label>
<input type="text" name="description" id="description" placeholder='....' className='border-1 rounded-sm' onChange={(e) => setFormData({...formData, desc: e.target.value})}/>

<label htmlFor="description">
    Project Link
</label>
<input type="link" name="link" id="link" placeholder='https://xyz.com' className='border-1 rounded-sm' onChange={(e) => setFormData({...formData, link: e.target.value})}/>

<button type="submit" className='mt-2 border-2 bg-fuchsia-400 disabled:cursor-not-allowed' disabled={!formData.projectName || !formData.desc || !formData.link}>Create New Project</button>
</form>
    </div>
  )
}

export default ProjectForm