import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Dashboard.css";
import {toast, ToastContainer} from "react-toastify";
import {Link} from "react-router-dom";
import { BsFillGeoFill, BsFillPersonCheckFill } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";

const Dashboard = () => {
  const [soilCount, setSoilCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);

  const loadData = async () => {
    const response1 = await axios.get("http://localhost:5000/api/SoilCount");
    setSoilCount(response1.data[0]["COUNT(*)"]);
    const response2 = await axios.get("http://localhost:5000/api/userCount");
    setUserCount(response2.data[0]["COUNT(*)"]);
    const response3 = await axios.get("http://localhost:5000/api/adminCount");
    setAdminCount(response3.data[0]["COUNT(*)"]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
      <div className="dashboard">
        <div className="count-container">
          <div className="count"><BsFillGeoFill />{soilCount}</div>
          <h2>SOIL SURVEYED</h2>
        </div>
        <div className="count-container">
          <div className="count"><BsFillPersonCheckFill />{userCount}</div>
          <h2>USER</h2>
        </div>
        <div className="count-container">
          <div className="count"><GrUserAdmin />{adminCount}</div>
          <h2>ADMIN</h2>
        </div>
      </div>
  );
}

export default Dashboard;
