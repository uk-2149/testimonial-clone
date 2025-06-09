import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Project {
    userId: string;
    projectName: string;
    projectDesc: string;
    projectLink: string;
    shareId: string;
  }

function Review() {
    const { shareId } = useParams();
    const [review, setReview] = useState({
        name: "",
        message: "",
        rating: 0,
      });
    
    const [hover, setHover] = useState<number | null>(null);
    const [project, setProject] = useState<Project>({
    userId: "",
    projectName: "",
    projectDesc: "",
    projectLink: "",
    shareId: "",
      });
      
      useEffect(() => {
        const fetchProject = async () => {
          try {
            const res = await axios.get(`http://localhost:5000/api/projects/review/${shareId}`);
            setProject(res.data);
          } catch (err) {
            console.error("Failed to fetch project:", err);
          }
        };
      
        fetchProject();
      }, [shareId]);

  
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Review submitted:", review);
        // TODO: POST to backend
      };
    
      return (
        <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-4">
          <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-2xl">
            <h1 className="text-3xl font-bold text-center text-blue-400 mb-4">Leave a Review</h1>
    
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-1">Project Name: <span className="text-white">{project.projectName}</span></h2>
              <p className="text-gray-400">{project.projectDesc}</p>
              <a
                href={project.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline mt-1 inline-block"
              >
                Visit Project
              </a>
            </div>
    
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <label className="block mb-1 text-gray-300">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      size={28}
                      className={`cursor-pointer transition-colors ${
                        star <= (hover ?? review.rating)
                          ? "text-yellow-400"
                          : "text-gray-500"
                      }`}
                      onClick={() => setReview({ ...review, rating: star })}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(null)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-1 text-gray-300">Your Name</label>
                <input
                  type="text"
                  value={review.name}
                  onChange={(e) => setReview({ ...review, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-md bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                  required
                />
              </div>
    
              <div>
                <label className="block mb-1 text-gray-300">Your Message</label>
                <textarea
                  value={review.message}
                  onChange={(e) => setReview({ ...review, message: e.target.value })}
                  className="w-full px-4 py-2 rounded-md bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your thoughts here..."
                  rows={4}
                  required
                ></textarea>
              </div>
    
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md mt-2 font-medium"
                disabled={!review.name || !review.message || review.rating === 0}
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      );
    }

export default Review