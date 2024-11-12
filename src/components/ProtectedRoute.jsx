import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import { setUser, removeUser } from "../utils/userSlice"; // Import the actions from the userSlice

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); // Get user data from Redux state

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // If user is logged in, update the Redux store with user data
        dispatch(
          setUser({ name: firebaseUser.displayName, email: firebaseUser.email })
        );
      } else {
        // If user is logged out, remove user data from Redux store
        dispatch(removeUser());
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [dispatch]);

  // If user data is not loaded yet (null), return null to prevent rendering
  if (user === null) return null;

  return user ? <Outlet /> : <Navigate to="/signin" />; // If user is logged in, render the protected route
};

export default ProtectedRoute;
