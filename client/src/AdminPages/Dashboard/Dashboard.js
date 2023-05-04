import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Dashboard.css";
import {toast, ToastContainer} from "react-toastify";
import {Link} from "react-router-dom";
import { BsFillGeoFill, BsFillPersonCheckFill } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { Chart } from 'chart.js/auto';

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

    const response4 = await axios.get("http://localhost:5000/api/SoilCountHigh");
    const highQualitySoilCount = response4.data[0]["COUNT(*)"];
    const response5 = await axios.get("http://localhost:5000/api/SoilCountMed");
    const mediumQualitySoilCount = response5.data[0]["COUNT(*)"];
    const response6 = await axios.get("http://localhost:5000/api/SoilCountLow");
    const lowQualitySoilCount = response6.data[0]["COUNT(*)"];

    const data = [highQualitySoilCount, mediumQualitySoilCount, lowQualitySoilCount];
    const smallValue = 0.1;
    for (let i = 0; i < data.length; i++) {
      if (data[i] === 0) {
        data[i] = smallValue;
      }
  }

    const pieChart = new Chart(document.getElementById('pieChart'), {
      type: 'pie',
      data: {
        labels: ['High', 'Medium', 'Low'],
        datasets: [{
          data: [highQualitySoilCount, mediumQualitySoilCount, lowQualitySoilCount],
          backgroundColor: ['green', 'orange', 'red']
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Soil Quality Index Distribution'
          }
        }
      }
    });
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
      <div className="chart-container">
        <canvas id="pieChart" style={{ width: "10%", height: "10%" }}></canvas>
      </div>
    </div>
  );
};

export default Dashboard;
