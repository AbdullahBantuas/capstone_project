import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Dashboard.css";
import { BsFillGeoFill, BsFillPersonCheckFill } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { Chart } from 'chart.js/auto';
import 'chartjs-plugin-datalabels';

const Dashboard = () => {
  const [soilCount, setSoilCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [selectedChart, setSelectedChart] = useState('bar');
  const [selectedSoilType, setSelectedSoilType] = useState('Kidapawan');
  const [locationData, setLocationData] = useState([]);

  const loadData = async () => {
    try {
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

      const soilTypes = ((await axios.get("http://localhost:5000/api/soiltype/name")).data || [])
        .map(r => (r["Soil_type"]));

      const highDataSet = await Promise.all(soilTypes.map(async (soilType) => {
        return (await axios.get(`http://localhost:5000/api/soiltypequality/${soilType}/high`))
          .data[0]["COUNT(*)"];
      }));
      const medDataSet = await Promise.all(soilTypes.map(async (soilType) => {
        return (await axios.get(`http://localhost:5000/api/soiltypequality/${soilType}/med`))
          .data[0]["COUNT(*)"];
      }));
      const lowDataSet = await Promise.all(soilTypes.map(async (soilType) => {
        return (await axios.get(`http://localhost:5000/api/soiltypequality/${soilType}/low`))
          .data[0]["COUNT(*)"];
      }));
    

      const data = [highQualitySoilCount, mediumQualitySoilCount, lowQualitySoilCount];
      const smallValue = 0.1;
      for (let i = 0; i < data.length; i++) {
        if (data[i] === 0) {
          data[i] = smallValue;
        }
      }
      // const data2 = [Kidapawan, Adtuyon, Langkong, Bolinao, Kudarangan, LaCastellana, Ruguan, Binidayan, Malabang, Caromatan, Ramain];
      // const smallValue2 = 0.1;
      // for (let i = 0; i < data2.length; i++) {
      //   if (data2[i] === 0) {
      //     data2[i] = smallValue2;
      //   }
      // }

      if (selectedChart === 'bar') {
        const barChart = new Chart(document.getElementById('barChart'), {
          type: 'bar',
          data: {
            labels: ['High', 'Medium', 'Low'],
            datasets: [{
              data: [highQualitySoilCount, mediumQualitySoilCount, lowQualitySoilCount],
              backgroundColor: ['green', 'yellow', 'red']
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
            },
            plugins: {
              legend: {
                display: false
              },
              title: {
                display: true,
                text: 'Soil Quality Index Distribution In Marawi City'
              }
            }
          }
        });
      } else if (selectedChart === 'bar2') {
        const barChart2 = new Chart(document.getElementById('barChart2'), {
          type: 'bar',
          data: {
            labels: soilTypes,
            datasets: [{
              label: 'High',
              data: highDataSet,
              backgroundColor: ['green']
            }, {
              label: 'Med',
              data: medDataSet,
              backgroundColor: ['yellow']
            }, {
              label: 'Low',
              data: lowDataSet,
              backgroundColor: ['red']
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
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                }
              }
            },
            plugins: {
              legend: {
                position: 'top',
                legend: ['High', 'Med', 'Low']
              },
              title: {
                display: true, 
                text: 'Land Soil Type In Marawi City'
              }
            }
          }
        });
      } else if (selectedChart === 'table') {
        loadLocationData(selectedSoilType);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadLocationData = async (selectedSoilType) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/soil2/${selectedSoilType}`);
      setLocationData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedChart]);

  useEffect(() => {
    loadLocationData(selectedSoilType);
  }, [selectedSoilType]);

  const handleSoilTypeChange = (event) => {
    setSelectedSoilType(event.target.value);
  };

  const handleChartChange = (event) => {
    setSelectedChart(event.target.value);
  };

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
        <select className='select-chart' value={selectedChart} onChange={handleChartChange}>
          <option value="bar">Soil Quality Index Distribution</option>
          <option value="bar2">Land Soil Type</option>
          <option value="table">Land Soil Type Locations</option>
        </select>
        {selectedChart === 'bar' && (
          <canvas id="barChart" style={{ width: "100%", height: "300px" }}></canvas>
        )}
        {selectedChart === 'bar2' && (
          <canvas id="barChart2" style={{ width: "100%", height: "300px" }}></canvas>
        )}
        {selectedChart === 'table' && (
            <div className="location-table">
              <h4 className='h444'>Soil Type <select
                id="Soil_type"
                className="select-soil-type"
                value={selectedSoilType}
                onChange={handleSoilTypeChange}
              >
                <option value="Kidapawan">Kidapawan</option>
                <option value="Adtuyon">Adtuyon</option>
                <option value="Langkong">Langkong</option>
                <option value="Bolinao">Bolinao</option>
                <option value="Kudarangan">Kudarangan</option>
                <option value="La Castellana">La Castellana</option>
                <option value="Ruguan">Ruguan</option>
                <option value="Binidayan">Binidayan</option>
                <option value="Malabang">Malabang</option>
                <option value="Caromatan">Caromatan</option>
                <option value="Ramain">Ramain</option>
              </select>
              </h4>
              <table className='pure-table'>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Location Name</th>
                    <th>Address</th>
                    <th>Soil Quality Index</th>
                  </tr>
                </thead>
                <tbody>
                  {locationData.map((location, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{location.Location_name}</td>
                      <td>{location.Location_address}</td>
                      <td>{location.SQI}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

