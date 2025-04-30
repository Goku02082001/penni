import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Card from "./Card";
import axios from "axios";

const Home = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://penni.onrender.com/api/getBlog");
        setBlogData(response.data.blog);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const editPost = async (id, updatedData) => {
    try {
      const response = await axios.patch(
        `https://penni.onrender.com/api/updatePost/${id}`,
        updatedData
      );
      alert("Blog updated successfully!");
      setBlogData((prevData) =>
        prevData.map((blog) =>
          blog._id === id ? { ...blog, ...updatedData } : blog
        )
      );
    } catch (error) {
      alert("Failed to update blog.");
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await axios.delete(`https://penni.onrender.com/api/deletePost/${id}`);
      alert(response.data.message);
      setBlogData(prevData => prevData.filter(item => item._id !== id));
    } catch (error) {
      alert("Failed to delete post");
    }
  };

 
  const filteredBlogs = selectedTag
    ? blogData.filter(blog => blog.tags.includes(selectedTag))
    : blogData;

  const uniqueTags = [...new Set(blogData.flatMap(blog => blog.tags))];

  if (loading || error) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <p>{loading ? "Loading blog data..." : `Error: ${error}`}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        <button
          onClick={() => setSelectedTag(null)}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Show All
        </button>
        {uniqueTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded ${
              selectedTag === tag ? "bg-blue-600 text-white" : "bg-blue-200"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Blog cards */}
      <div className="flex flex-wrap justify-center gap-6 mt-10 px-4">
        {filteredBlogs.map((blog, index) => (
          <div key={index} className="flex-1 min-w-[300px] max-w-sm">
            <Card
              title={blog.title}
              content={blog.content}
              tags={blog.tags}
              onEdit={(updatedData) => editPost(blog._id, updatedData)}
              onDelete={() => deletePost(blog._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
