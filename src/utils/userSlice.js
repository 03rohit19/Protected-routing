// src/features/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // To store user data (name, email, etc.)
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Set the user data
    },
    removeUser: (state) => {
      state.user = null; // Remove user data on logout
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
