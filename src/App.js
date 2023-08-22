import { UserProvider } from "./UserContext";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./styles/App.scss";

import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/reset.css";

import Navbar from "./components/Navbar";

import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";

import Container from "react-bootstrap/esm/Container";
import Dashboard from "./pages/user/Dashboard";
import ForgotPassword from "./pages/forgot-password";
import EditPost from "./pages/user/post/EditPost";
import ProfileUpdate from "./pages/user/profile/ProfileUpdate";
import Following from "./pages/user/profile/Following";
import PostComments from "./pages/post/[_id]";
import Username from "./pages/user/[_username]";
import Admin from "./pages/admin";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Container>
          <ToastContainer position="top-center" theme="colored" />
        </Container>
        <Routes>
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/user/profile/update" element={<ProfileUpdate />} />
          <Route path="/user/following" element={<Following />} />

          <Route path="/user/post/:_id" element={<EditPost />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/post/:_id" element={<PostComments />} />

         
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
};

export default App;
