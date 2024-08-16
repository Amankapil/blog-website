import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PostDetail = ({ match }) => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://blog-backend-esf2.onrender.com/posts/${id}`)
      .then((response) => setPost(response.data))
      .catch((error) => console.error("Error fetching post:", error));
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className=" max-w-5xl mx-auto max-md:p-3">
      <h2 className="py-5 font-bold text-[30px]">{post.title}</h2>
      <p className="text-[16px] font-semibold">{post.content}</p>
      <p className="text-[14px] font-bold py-20">
        <em>By {post.author}</em>
      </p>
    </div>
  );
};

export default PostDetail;
