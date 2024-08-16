import React, { useState } from "react";
import axios from "axios";

const NewPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://blog-backend-esf2.onrender.com/posts", {
        title,
        content,
        author,
      })
      .then((response) => {
        setShowSuccessModal(true);
        setTimeout(() => setShowSuccessModal(false), 3000);
        // setTimeout(() => setShowSuccessModal(true), 3000);
        console.log("Post created:", response.data);
        setTitle("");
        setContent("");
        setAuthor("");
      })
      .catch((error) => console.error("Error creating post:", error));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6 mt-10"
      >
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Author
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300"
        >
          Add Post
        </button>
      </form>

      {showSuccessModal && (
        <div
          className="fixed top-40 right-4 w[500px] z-50 max-w-xs bg-[#15ff21] text-white p-4 rounded-lg shadow-lg transform transition-transform duration-500 ease-in-out translate-x-full"
          style={{
            transform: showSuccessModal ? "translateX(0)" : "translateX(130%)",
          }}
        >
          <div className="flex justify-between items-center">
            <span>Blog added successfully!</span>
            <button className="ml-4 text-xl">&times;</button>
          </div>
        </div>
      )}
    </>
  );
};

export default NewPostForm;
