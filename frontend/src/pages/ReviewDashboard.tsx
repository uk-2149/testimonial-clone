import axios from 'axios';
import { useEffect, useState } from 'react';
import ProjectForm from '../components/ProjectForm';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import EmbedLink from '../components/EmbedLink';

interface Review {
  _id: string;
  projectId: string;
  name: string;
  message: string;
  rating: number;
}

// interface DashboardProps {
//   token: string;
//   setToken: React.Dispatch<React.SetStateAction<string>>;
// }

const ReviewDashboard = () => {

  const { id } = useParams();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [showEmbed, setShowEmbed] = useState<boolean>(false);

  // const navigate = useNavigate();

  // if (!token) navigate("/login");

  useEffect(() => {
  const fetchProjects = async () => {
    const token = localStorage.getItem("token");
    if(!token) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/review/${id}`, {
        headers: { "x-auth-token": token },
      });
      // if (!token) navigate("/login");
      setReviews(res.data as Review[]);
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      // navigate("/login");
      // localStorage.clear();
    }
  };

  fetchProjects();

}, []);


  return (
    
<div className="w-screen h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] py-12 px-6 text-white">
    {showEmbed && <EmbedLink id={id} setShowEmbedLink={setShowEmbed} />}
  <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">
    <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-6 md:mb-0 text-center md:text-left">
      Your Reviews
    </h1>

    <button
      onClick={() => setShowEmbed(true)}
      className="bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors duration-300 px-6 py-2 text-white rounded-xl shadow-lg cursor-pointer"
    >
     Embed Link
    </button>
  </div>

  {reviews.length === 0 && <p className='text-gray-300 text-center text-lg'>No reviews yet</p>}
  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mt-10" >
    {reviews.map((rev) => (
      <div
        key={rev._id}
        className="bg-slate-800 border border-slate-700 rounded-2xl shadow-xl hover:shadow-blue-500/20 transition-shadow duration-300 p-6 flex flex-col justify-between"
      >
        <div>
          <h3 className="text-xl font-semibold text-blue-300 mb-2">
            {rev.name}
          </h3>

          <div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      size={18}
                      className={`cursor-pointer transition-colors mb-5 ${
                        star <= (rev.rating)
                          ? "text-yellow-400"
                          : "text-gray-500"
                      }`}
                    />
                  ))}
                </div>
              </div>

          <p className="text-sm text-gray-300 mb-4">{rev.message}</p>
        </div>

        
      </div>
    ))}
  </div>
</div>

  )
}

export default ReviewDashboard;