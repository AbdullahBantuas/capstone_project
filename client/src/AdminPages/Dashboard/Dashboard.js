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

    const response7 = await axios.get("http://localhost:5000/api/Kidapawan");
    const Kidapawan = response7.data[0]["COUNT(*)"];
    const response8 = await axios.get("http://localhost:5000/api/Adtuyon");
    const Adtuyon = response8.data[0]["COUNT(*)"];
    const response9 = await axios.get("http://localhost:5000/api/Langkong");
    const Langkong = response9.data[0]["COUNT(*)"];
    const response10 = await axios.get("http://localhost:5000/api/Bolinao");
    const Bolinao = response10.data[0]["COUNT(*)"];
    const response11 = await axios.get("http://localhost:5000/api/Kudarangan");
    const Kudarangan = response11.data[0]["COUNT(*)"];
    const response12 = await axios.get("http://localhost:5000/api/LaCastellana");
    const LaCastellana = response12.data[0]["COUNT(*)"];
    const response13 = await axios.get("http://localhost:5000/api/Ruguan");
    const Ruguan = response13.data[0]["COUNT(*)"];
    const response14 = await axios.get("http://localhost:5000/api/Binidayan");
    const Binidayan = response14.data[0]["COUNT(*)"];
    const response15 = await axios.get("http://localhost:5000/api/Malabang");
    const Malabang = response15.data[0]["COUNT(*)"];
    const response16 = await axios.get("http://localhost:5000/api/Caromatan");
    const Caromatan = response16.data[0]["COUNT(*)"];
    const response17 = await axios.get("http://localhost:5000/api/Ramain");
    const Ramain = response17.data[0]["COUNT(*)"];

    const data = [highQualitySoilCount, mediumQualitySoilCount, lowQualitySoilCount];
    const smallValue = 0.1;
    for (let i = 0; i < data.length; i++) {
      if (data[i] === 0) {
        data[i] = smallValue;
      }
  }
    const data2 = [Kidapawan, Adtuyon, Langkong, Bolinao, Kudarangan, LaCastellana, Ruguan, Binidayan, Malabang, Caromatan, Ramain];
    const smallValue2 = 0.1;
    for (let i = 0; i < data.length; i++) {
      if (data2[i] === 0) {
        data2[i] = smallValue2;
      }
  }

    const barChart = new Chart(document.getElementById('barChart'), {
      type: 'bar',
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
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    const barChart2 = new Chart(document.getElementById('barChart2'), {
      type: 'bar',
      data: {
        labels: ['Kidapawan', 'Adtuyon', 'Langkong', 'Bolinao', 'Kudarangan', 'La Castellana', 'Ruguan', 'Binidayan', 'Malabang', 'Caromatan', 'Ramain'],
        datasets: [{
          data: [Kidapawan, Adtuyon, Langkong, Bolinao, Kudarangan, LaCastellana, Ruguan, Binidayan, Malabang, Caromatan, Ramain],
          backgroundColor: ['blue']
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Land Soil Type'
          }
        },
        scales: {
          y: {
            beginAtZero: true
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
        <canvas id="barChart" style={{ width: "100%", height: "300px" }}></canvas>
      </div>
      <div className="chart-container">
        <canvas id="barChart2" style={{ width: "90%", height: "300px", marginLeft: "30px" }}></canvas>
      </div>
    </div>
  );
};

export default Dashboard;
