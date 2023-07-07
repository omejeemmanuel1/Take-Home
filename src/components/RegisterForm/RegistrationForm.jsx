import React, { useState } from "react";
import "./RegisterForm.css";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJyz8vb7C1Keb1FE9WZCdcW_ZDSqXtBVI",
  authDomain: "takehome-cff07.firebaseapp.com",
  projectId: "takehome-cff07",
  storageBucket: "takehome-cff07.appspot.com",
  messagingSenderId: "300184427755",
  appId: "1:300184427755:web:7f1f9356863aed54a1f2ae",
  measurementId: "G-77RRMY72YS",
};

initializeApp(firebaseConfig);
const auth = getAuth();

const RegistrationForm = () => {

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

 
  const handleRegister = async (e) => {
    e.preventDefault();
  
    try {
      if (confirmPassword.length < 6) {
        toast.error('"confirmPassword" length must be at least 6 characters long');
        return;
      }
  
      // Create user with Firebase Auth
      const authUserCredential = await createUserWithEmailAndPassword(auth, email, password);
      const authUser = authUserCredential.user;
  
      // Proceed only if the Firebase Auth user creation was successful
      if (authUser) {
        // Register user in the database
        const response = await axios.post("http://localhost:4000/user/register", {
          fullName,
          email,
          password,
          confirmPassword,
        });
  
        console.log(response); // Log the response object for troubleshooting
  
        // Proceed only if the database registration was successful
        if (response.status === 201) {
          toast.success("Registration successful!");
          window.location.href = "/login"; // Navigate to "/login" after successful registration
          return; // Exit the function after navigating
        } else {
          toast.error("An error occurred during database registration. Please try again.");
  
          // Delete the created user in Firebase Auth
          await authUser.delete();
          return; // Exit the function without navigating
        }
      } else {
        toast.error("An error occurred during user creation. Please try again.");
        return; // Exit the function without navigating
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else if (error.code && error.code.includes("auth/weak-password")) {
        toast.error("Password should be at least 6 characters");
      } else {
        toast.error("An error occurred. Please try again.");
      }
      return; // Exit the function without navigating
    }
  };
  
  
  
   

  return (
    <div className="container">
      <ToastContainer />
      <div className="loginform">
        <form onSubmit={handleRegister}>
          <h1>Sign Up</h1>
          <p>
            Please fill in this form to create an account. or{" "}
            <Link to="/login">login</Link>
          </p>

          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            name="fullName"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="confirmPassword">Repeat Password</label>
          <input
            type="password"
            placeholder="Repeat Password"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="buttons">
            <button type="submit" className="signupbtn">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
