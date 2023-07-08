import React, { useState } from 'react';
import './LoginForm.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';

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

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      // Login user in the backend
      const response = await axios.post('https://take-home.onrender.com/user/login', {
        email,
        password,
      });
  
      const { token } = response.data;
  
      // Sign in user with Firebase Auth
      await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = auth.currentUser;
  
      localStorage.setItem('token', token);
  
      // Navigate based on user type
      if (firebaseUser.email === 'admin@yahoo.com') {
        navigate('/adminPage');
      } else {
        navigate('/dashboard');
      }
  
      toast.success('Login successful!');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };
  

  return (
    <div className="container">
      <div className="loginform">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <p>
            Already have an account? Login in or <Link to="/">Sign Up</Link>
          </p>

          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />


          <div className="buttons">
            <button type="submit" className="signupbtn">
              Login
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
