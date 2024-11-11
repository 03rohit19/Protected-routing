// Firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLEXc2BX8VZYKCB8hXmMQMneIeUX53sJQ",
  authDomain: "app-91f85.firebaseapp.com",
  projectId: "app-91f85",
  storageBucket: "app-91f85.appspot.com",
  messagingSenderId: "91695465",
  appId: "1:91695465:web:8cd27b5acdcb4ddaf435f8",
  databaseURL: "https://app-91f85-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// Export `app` as the default export
export default app;
