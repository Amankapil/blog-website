import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setIsDeleting(true);
      try {
        await axios.delete(`http://localhost:5000/posts/${postId}`);
        // Remove the deleted post from the posts array
        setPosts(posts.filter((post) => post._id !== postId));
      } catch (error) {
        console.error("Error deleting post:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  const handleEditClick = (post) => {
    setCurrentPost(post);
    setEditedTitle(post.title);
    setEditedContent(post.content);
    setIsEditing(true);
  };

  const handleSaveChanges = async (id) => {
    try {
      await axios.put(`http://localhost:5000/posts/${currentPost._id}`, {
        title: editedTitle,
        content: editedContent,
      });
      const updatedPosts = posts.map((post) =>
        post._id === currentPost._id
          ? { ...post, title: editedTitle, content: editedContent }
          : post
      );
      setPosts(updatedPosts);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-[40px] font-bold">Posts</h2>
      {/* <ul className="flex flex-wrap gap-10 my-20 justify-start">
        {posts.map((post) => (
          <li
            className="shadow-lg p-5 w-[300px] rounded-lg bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white"
            key={post._id}
          >
            <Link to={`/posts/${post._id}`}>
              <h3 className="text-[20px] font-bold mb-3">{post.title}</h3>
              <p>{post.content.substring(0, 100)}...</p>
            </Link>
          </li>
        ))}
      </ul> */}
      <ul className="flex flex-wrap gap-10 my-20 justify-start">
        {posts.map((post) => (
          <li
            key={post._id}
            className="relative shadow-lg p-5 w-[300px] rounded-lg bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white"
          >
            <Link to={`/posts/${post._id}`}>
              <h3 className="text-[20px] font-bold mb-3">{post.title}</h3>
              <p>{post.content.substring(0, 100)}...</p>
            </Link>
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => handleEditClick(post, post._id)}
                className="text-blue-400 hover:text-blue-500 underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                disabled={isDeleting}
                className="text-red-400 hover:text-red-500 underline"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[400px]">
            <h3 className="text-xl font-bold mb-4">Edit Post</h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Title
              </label>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Content
              </label>
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
              ></textarea>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                // onClick={() => handleSaveChanges(id)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;
