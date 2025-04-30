import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Card from "./Card";
import axios from "axios";
import { CiFilter } from "react-icons/ci";
const Home = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
const [selectedTag, setSelectedTag] = useState(null);

  
  let tags= ["Health", "Technology", "Travel", "Food", "LifeStyle", "Other"];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://penni.onrender.com/api/getBlog");

        setBlogData(response.data.blog);
        console.log(blogData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching blog data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const editPost = async (id, updatedData) => {
    console.log("update data ===>>", updatedData);

    try {
      const response = await axios.patch(
        `https://penni.onrender.com/api/updatePost/${id}`,
        updatedData
      );
      console.log("id===>>", updatedData);

      console.log("Blog updated successfully:", response.data);
      alert("Blog updated successfully!");

      setBlogData((prevData) =>
        prevData.map((blog) =>
          blog._id === id ? { ...blog, ...updatedData } : blog
        )
      );
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog.");
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await axios.delete(`https://penni.onrender.com/api/deletePost/${id}`);
      alert(response.data.message);
  
      setBlogData(prevData => prevData.filter(item => item._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete post");
    }
  };
  
  const filteredBlogs = selectedTag
  ? blogData.filter((item) => item.tags.includes(selectedTag))
  : blogData;

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <p>Loading blog data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
  <div>
  <Navbar />
  <div className="flex justify-center mt-4 relative ml-[1100px]">
    <button
      className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded"
      onClick={() => setShowFilter(!showFilter)}
    >
      <CiFilter size={20} />
      Filter
    </button>
    {showFilter && (
      <div className="absolute top-12 bg-white border rounded shadow-md p-4 z-10">
        <button
          className="block text-left w-full px-2 py-1 hover:bg-blue-100"
          onClick={() => setSelectedTag(null)}
        >
          Show All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            className="block text-left w-full px-2 py-1 hover:bg-blue-100"
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    )}
  </div>
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
