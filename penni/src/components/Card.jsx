import React, { useState, useRef } from "react";
import {
  HiOutlineThumbUp,
  HiOutlineChatAlt2,
  HiDotsVertical,
} from "react-icons/hi";

const Card = ({
  id,
  title = "Card Title",
  content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  tags = [],
  onEdit = () => {},
  onDelete = () => {},
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title, content, tags });
  const menuRef = useRef();
  const tagsOptions = ["Health", "Technology", "Travel", "Food", "LifeStyle", "Other"];
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onEdit(formData);
    setIsEditing(false);
  };
  
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mt-10">
      <div className="p-6 space-y-4">
        <div className="relative">
          <div className="absolute top-0 right-0" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="p-2 bg-white bg-opacity-75 rounded-full hover:bg-opacity-100 transition"
            >
              <HiDotsVertical className="w-6 h-6 text-gray-700" />
            </button>
            {menuOpen && (
              <div className="mt-2 w-32 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setIsEditing(true);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {!isEditing ? (
          <>
            <h3 className="text-xl font-semibold text-gray-800 hover:text-indigo-600 transition cursor-pointer">
              {title}
            </h3>
            <p className="text-gray-600">{content}</p>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              rows={3}
            />

            <select
              multiple
              name="tags"
              value={formData.tags}
              onChange={(e) => {
                const selectedOptions = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );
                setFormData({ ...formData, tags: selectedOptions });
              }}
              className="w-full border p-2 rounded"
            >
              {tagsOptions.map((tag, i) => (
                <option key={i} value={tag}>
                  {tag}
                </option>
              ))}
            </select>

            <div className="flex justify-between">
              <button type="submit" className="text-green-500">
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-indigo-500 transition">
            <HiOutlineThumbUp className="w-5 h-5" />
            <span>Like</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-indigo-500 transition">
            <HiOutlineChatAlt2 className="w-5 h-5" />
            <span>Comment</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
