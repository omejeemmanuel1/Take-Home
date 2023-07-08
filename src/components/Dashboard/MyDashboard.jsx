import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Dashboard.css';

const MyDashboard = () => {
  const navigate = useNavigate();
  const [numberCompanies, setNumberCompanies] = useState(0);
  const [numberProducts, setNumberProducts] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'https://take-home.onrender.com/product/all',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProducts(response.data.products || []);
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while fetching products.');
      }
    };

    fetchProducts();
  }, []);

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'https://take-home.onrender.com/product/create-product',
        { numberCompanies, numberProducts },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(response.data);

      toast.success('Products created successfully!');
      setNumberCompanies(0);
      setNumberProducts(0);
      setProducts((prevProducts) => [...prevProducts, response.data.product]);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
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

        <div>
          <h3>Products</h3>
          <ul>
            {products.map((product, index) => (
              <li key={index}>{product}</li>
            ))}
          </ul>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default MyDashboard;
