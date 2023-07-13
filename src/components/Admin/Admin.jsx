import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Admin.css";
const Admin = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://take-home.onrender.com/product/all",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUsers(response.data.users || []);
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching products.");
      }
    };

    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="container">
      <h1 className="heading">Admin</h1>

      <div className="row">

        <div className="col-md-6">
          <h3>Users and Products</h3>
          <ul className="list-group shadow">
            {users.map((user, index) => (
              <li key={index} className="list-group-item">
                <span className="user-fullname">{user}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4">
        <button onClick={toggleComparisonVisibility} className="comparison-button">
          Compare
        </button>
        {comparisonVisible && (
          <div className="comparison-section shadow">
            <h2>Comparison</h2>
            <p>
              <strong>Match:</strong> {comparison.match ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Difference in Company:</strong> {comparison.differenceInCompany}
            </p>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Admin;