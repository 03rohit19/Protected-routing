// src/features/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // To store user data (name, email, etc.)
  isLoggedIn: false, // To track if the user is logged in
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Set the user data
      state.isLoggedIn = true; // Set logged-in status to true
    },
    removeUser: (state) => {
      state.user = null; // Remove user data on logout
      state.isLoggedIn = false; // Set logged-in status to false
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
