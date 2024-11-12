import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import About from "./components/About";
import Subscribe from "./components/Subscribe";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./components/HomePage";
import { useSelector } from "react-redux"; // Import useSelector to access the state

const RoutePage = () => {
  const { isLoggedIn } = useSelector((state) => state.user); // Assuming the state contains these values

  console.log("isLoggedIn value:", isLoggedIn); // This will log the value of isLoggedIn

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        {/* Unauthorized routes */}
        {!isLoggedIn ? (
          <>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<SignIn />} />
          </>
        ) : (
          <Route element={<ProtectedRoute />}>
            <Route path="/signin" element={<Navigate to="/" />} />
            <Route path="/signup" element={<Navigate to="/" />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/" element={<HomePage />} />
          </Route>
        )}

        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default RoutePage;
