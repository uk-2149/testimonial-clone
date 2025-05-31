import React, { useState } from 'react';
import axios from "axios";

function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

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
        setTimeout(() => {
            localStorage.setItem("token", String(res.data.token));
        }, 1000);
    } catch(err: any) {
        console.error(err.response.data);
    }
  }

  return (
    <div>
        <form method="post" className='flex flex-col w-[20vw] min-w-[300px]' onSubmit={handleRegister}>
            <label htmlFor="name">
                Name
            </label>
            <input type="text" name="name" id="name" placeholder='Name' className='border-1 rounded-sm' onChange={(e) => setName(e.target.value)}/>

            <label htmlFor="email">
                Email
            </label>
            <input type="email" name="email" id="email" placeholder='test123@mail.com' className='border-1 rounded-sm' onChange={(e) => setEmail(e.target.value)}/>

            <label htmlFor="password">
                Password
            </label>
            <input type="password" name="password" id="password" placeholder='******' className='border-1 rounded-sm' onChange={(e) => setPassword(e.target.value)}/>

            <label htmlFor="confirmPassword">
                Confirm Password
            </label>
            <input type="password" name="confirmPassword" id="confirmPassword" placeholder='******' className='border-1 rounded-sm' onChange={(e) => setConfirmPassword(e.target.value)}/>

            <button type="submit" className='mt-2 border-2 bg-fuchsia-400 disabled:cursor-not-allowed' disabled={password !== confirmPassword || !password || !email || !name}>Register</button>
        </form>
    </div>
  )
}

export default Register