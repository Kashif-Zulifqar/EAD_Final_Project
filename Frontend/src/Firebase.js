import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut, // Import this
} from "firebase/auth";
// import { signOut } from "firebase/auth";

import { addDoc, getFirestore, collection } from "firebase/firestore";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnL9y3KNKwGtk15HhFORINs7m0L0jE-TU",
  authDomain: "netflix-clone-6f6cb.firebaseapp.com",
  projectId: "netflix-clone-6f6cb",
  storageBucket: "netflix-clone-6f6cb.appspot.com", // Corrected storageBucket URL
  messagingSenderId: "820239836947",
  appId: "1:820239836947:web:9aa209094349bc4a445ce6",
  measurementId: "G-38G61NY0GL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign-Up Function
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Corrected `addDoc` syntax
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    console.log("User signed up and added to Firestore successfully!");
  } catch (error) {
    console.error("Sign-Up Error:", error.message);
    alert(error.message);
  }
};

// Login Function
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in successfully!");
  } catch (error) {
    console.error("Login Error:", error.message);
    alert(error.message);
  }
};

// Logout Function
const logout = () => {
  try {
    signOut(auth);
    console.log("User logged out successfully!");
  } catch (error) {
    console.error("Logout Error:", error.message);
  }
};

// Export Functions
export { auth, db, login, signup, logout };
