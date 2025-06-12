import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleRegister = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        const res = await axios.post<{token: String}>(
            "http://localhost:5000/api/auth/register",
            {
                name,
                email,
                password
            }
        );

        alert("You are successfully registered!")
        setTimeout(() => {
            localStorage.setItem("token", String(res.data.token));
            navigate("/dashboard");
        }, 1000);
    } catch(err: any) {
        console.error(err.response.data);
    }
  }

  return (
    <div>
        <div className="w-screen h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-black flex items-center justify-center relative overflow-hidden">

{/* Background Quote */}
<div className="absolute text-[250px] font-bold text-[#1e3a8a] opacity-10 -top-10 -left-10 select-none">
  “
</div>
<div className="absolute text-[200px] font-bold text-[#1e3a8a] opacity-10 -bottom-20 right-5 select-none">
  ”
</div>

{/* Register Form */}
<form
  method="post"
  className="flex flex-col gap-5 w-[90%] max-w-xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-10 rounded-2xl shadow-2xl text-white backdrop-blur-lg border border-[#1e3a8a]"
  onSubmit={handleRegister}
>
  <h2 className="text-3xl font-bold text-blue-400 text-center mb-2">Create Your Account</h2>
  <p className="text-sm text-gray-400 text-center mb-4">Join us and start sharing your testimonials!</p>

  <div className="flex flex-col">
    <label htmlFor="name" className="mb-1 text-sm text-gray-300">Name</label>
    <input
      type="text"
      id="name"
      name="name"
      placeholder="Your Name"
      className="px-4 py-3 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e) => setName(e.target.value)}
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="email" className="mb-1 text-sm text-gray-300">Email</label>
    <input
      type="email"
      id="email"
      name="email"
      placeholder="test123@mail.com"
      className="px-4 py-3 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="password" className="mb-1 text-sm text-gray-300">Password</label>
    <input
      type="password"
      id="password"
      name="password"
      placeholder="••••••••"
      className="px-4 py-3 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="confirmPassword" className="mb-1 text-sm text-gray-300">Confirm Password</label>
    <input
      type="password"
      id="confirmPassword"
      name="confirmPassword"
      placeholder="••••••••"
      className="px-4 py-3 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e) => setConfirmPassword(e.target.value)}
    />
  </div>

  <button
    type="submit"
    className="mt-2 py-3 bg-blue-600 hover:bg-blue-700 transition-all rounded-md font-semibold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
    disabled={password !== confirmPassword || !password || !email || !name}
  >
    Register
  </button>
  <div className="text-center mt-4">
  <span className="text-gray-400 text-sm">
    Already registered{" "}
    <a
      href="/login"
      className="text-blue-400 hover:text-blue-500 underline transition-all"
    >
      Login
    </a>
  </span>
</div>
</form>
</div>

    </div>
  )
}

export default Register