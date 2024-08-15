import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import NewPostForm from "./components/NewPostForm";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/new-post" element={<NewPostForm />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default App;
