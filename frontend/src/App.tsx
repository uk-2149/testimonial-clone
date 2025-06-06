import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from './pages/Register'
import Login from './pages/Login'
import Home from "./pages/Home";

function App() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <Router>
        <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      </Routes>
      </Router>
    </div>
  )
}

export default App