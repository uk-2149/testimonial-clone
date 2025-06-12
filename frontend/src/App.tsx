import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ProjectDashboard from "./pages/ProjectDashboard";
import Review from "./pages/Review";
import ReviewDashboard from "./pages/ReviewDashboard";

function App() {
  // const [token, setToken] = useState(localStorage.getItem("token") || "");
  // console.log("Current token:", token);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:id" element={<ProjectDashboard />} />
          <Route path="/" element={<Home />} />
          <Route path="/review/:shareId" element={<Review />} />
          <Route path="/dashboard/review/:id" element={<ReviewDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
