import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from './pages/Register'
import Login from './pages/Login'
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  console.log("Current token:", token);

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <Router>
        <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard token={token} setToken={setToken}/>} />
      <Route path="/" element={<Home />} />
      </Routes>
      </Router>
    </div>
  )
}

export default App