import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Dashboard.css';

const MyDashboard = () => {
  const navigate = useNavigate();
  const [numberCompanies, setNumberCompanies] = useState(0);
  const [numberProducts, setNumberProducts] = useState(0);

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'http://localhost:4000/product/create-product',
        { numberCompanies, numberProducts },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(response.data);

      toast.success('Products created successfully!');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.clear();

    // Navigate to login page
    navigate('/login');
  };

  return (
    <div className="container2">
      <h1>Welcome</h1>
      <div className="loginform">
        <form onSubmit={handleCreateProduct}>
          <label htmlFor="fullName">No of Companies</label>
          <input
            type="number"
            placeholder="Enter no of companies"
            name="companied"
            required
            value={numberCompanies}
            onChange={(e) => setNumberCompanies(e.target.value)}
          />

          <label htmlFor="email">No of Products per Company</label>
          <input
            type="number"
            placeholder="Enter number of products per company"
            name="noOfProducts"
            required
            value={numberProducts}
            onChange={(e) => setNumberProducts(e.target.value)}
          />

          <div className="buttons">
            <button type="submit" className="signupbtn">
              Create
            </button>
            <button type="button" className="logoutbtn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default MyDashboard;
