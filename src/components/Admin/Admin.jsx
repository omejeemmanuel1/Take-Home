import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Admin.css';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/product/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        setUsers(response.data.users || []);
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while fetching products.');
      }
    };
    

    fetchProducts();
  }, []);

  const handleDeleteAllUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:4000/user/delete', {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('All users and their associated products have been deleted successfully');
      setUsers([]); // Clear the users state
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while deleting users and their associated products.');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="container">
      <h1 className="heading">Admin</h1>

      <div className="row">
        <div className="col-md-6">
          <h3>Users</h3>
          <ul className="list-group shadow">
            {users.map((user, index) => (
              <li key={index} className="list-group-item">
                <span className="user-fullname">{user}</span>
              </li>
            ))}
          </ul>
          {users.length > 0 && (
            <button onClick={handleDeleteAllUsers} className="delete-button">
              Delete All Users and Products
            </button>
          )}
        </div>
      </div>

      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>

      <ToastContainer />
    </div>
  );
};

export default Admin;
