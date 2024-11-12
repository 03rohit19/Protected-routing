import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser, removeUser } from "../utils/userSlice";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); // Get user data from Redux store
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // You can also get isLoggedIn directly if you store it in Redux
  const navigate = useNavigate();

  useEffect(() => {
    // Monitor authentication state to update login status and user info
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If the user is logged in, set user data in Redux store
        dispatch(setUser({ name: user.displayName, email: user.email }));
      } else {
        // If the user is logged out, clear user data from Redux store
        dispatch(removeUser());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(removeUser()); // Clear user data from Redux on logout
      navigate("/"); // Redirect to sign-in page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  console.log("isLoggedIn in Navbar:", isLoggedIn); // Log isLoggedIn here as well

  return (
    <nav className="bg-gray-600 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-xl font-bold">
          MyBrand
        </Link>

        {/* Desktop Menu Links */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/about"
            className="text-white hover:bg-blue-500 px-3 py-2 rounded"
          >
            About
          </Link>
          {user ? (
            <>
              <span className="text-white">Welcome, {user.name}</span>
              <Link
                to="/homepage"
                className="text-white hover:bg-blue-500 px-3 py-2 rounded"
              >
                Homepage
              </Link>
              <Link
                to="/subscribe"
                className="text-white hover:bg-blue-500 px-3 py-2 rounded"
              >
                Subscribe
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:bg-red-500 px-3 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="text-white hover:bg-blue-500 px-3 py-2 rounded"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white hover:bg-blue-500 px-3 py-2 rounded"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu Links */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 space-y-2">
          <Link
            to="/about"
            onClick={() => setIsMenuOpen(false)}
            className="block text-white hover:bg-blue-500 px-3 py-2 rounded"
          >
            About
          </Link>
          {user ? (
            <>
              <span className="block text-white px-3 py-2">
                Welcome, {user.displayName}
              </span>
              <Link
                to="/homepage"
                onClick={() => setIsMenuOpen(false)}
                className="block text-white hover:bg-blue-500 px-3 py-2 rounded"
              >
                Homepage
              </Link>
              <Link
                to="/subscribe"
                onClick={() => setIsMenuOpen(false)}
                className="block text-white hover:bg-blue-500 px-3 py-2 rounded"
              >
                Subscribe
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left text-white hover:bg-red-500 px-3 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="block text-white hover:bg-blue-500 px-3 py-2 rounded"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="block text-white hover:bg-blue-500 px-3 py-2 rounded"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
