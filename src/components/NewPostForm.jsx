import React, { useState } from "react";
import axios from "axios";

const NewPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/posts", { title, content, author })
      .then((response) => {
        console.log("Post created:", response.data);
        setTitle("");
        setContent("");
        setAuthor("");
      })
      .catch((error) => console.error("Error creating post:", error));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6 mt-10"
    >
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Title</label>
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
        <label className="block text-gray-700 font-semibold mb-2">Author</label>
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
  );
};

export default NewPostForm;
