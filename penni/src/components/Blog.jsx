import React, { useState } from "react";
import axios from "axios"; 
import Navbar from "./Navbar";

const Blog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 

  const tagsOptions = ["Health", "Technology", "Travel", "Food", "LifeStyle", "other"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("https://penni.onrender.com/postBlog", formData);
      
      console.log(response.data); 
      setLoading(false);
      alert("Blog posted successfully!");
    } catch (error) {
      setLoading(false);
      setError("Failed to post blog. Please try again.");
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center">Create Blog Post</h2>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your blog content here..."
              rows={6}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">Tags</label>
            <select
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            >
              <option value="" disabled>Select a tag</option>
              {tagsOptions.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md transition duration-300"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Blog"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Blog;
