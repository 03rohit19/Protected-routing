// RoutePage.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import About from "./components/About";
import Subscribe from "./components/Subscribe";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./components/HomePage";

const RoutePage = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* ProtectedRoute */}
        <Route element={<ProtectedRoute />}>
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/homepage" element={<HomePage />} />
        </Route>

        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default RoutePage;
