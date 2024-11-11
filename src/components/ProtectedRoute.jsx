// ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; // Adjust path as necessary

const ProtectedRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Set to true if user exists, false otherwise
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Prevent rendering until authentication state is resolved
  if (isLoggedIn === null) return null;

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
