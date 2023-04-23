import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Dashboard.css";
import "./UserData1.css";
import {toast, ToastContainer} from "react-toastify";
import {Link} from "react-router-dom";
import { BsFillGeoFill, BsFillPersonCheckFill } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";

const Dashboard = () => {
  const [soilCount, setSoilCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response1 = await axios.get("http://localhost:5000/api/SoilCount");
    setSoilCount(response1.data[0]["COUNT(*)"]);
    const response2 = await axios.get("http://localhost:5000/api/userCount");
    setUserCount(response2.data[0]["COUNT(*)"]);
    const response3 = await axios.get("http://localhost:5000/api/adminCount");
    setAdminCount(response3.data[0]["COUNT(*)"]);
    const response4 = await axios.get("http://localhost:5000/api/get");
    setData(response4.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteContact = (U_id) => {
    if(window.confirm("Are you sure that you want to delete that content?")) {
      axios.delete(`http://localhost:5000/api/remove/${U_id}`);
      toast.success("contact deleted successfully");
      setTimeout(() => loadData(), 500);
    }
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
      <div className="table-container" >
      <ToastContainer position='center' />
          <table className="styled-table">
            <thead>
              <tr>
                <th style={{textAlign: "center"}}>No.</th>
                <th style={{textAlign: "center"}}>Fullname</th>
                <th style={{textAlign: "center"}}>Email</th>
                <th style={{textAlign: "center"}}>Action</th>
              </tr>
            </thead>
            <tbody style={{ overflow: "auto", height: "100px" }}>
              {data.map((item, index) => {
                return (
                  <tr key={item.U_id}>
                    <th scope="row">{index+1}</th>
                    <td>{item.Fullname}</td>
                    <td>{item.Email}</td>
                    <td>
                      <div className="btn-group">
                        <button className="btn btn-delete" onClick={() => deleteContact(item.U_id)}>Delete</button>
                        <Link to={`/view/${item.U_id}`}>
                        <button className="btn btn-view">View</button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              
            </tfoot>
          </table>
      </div>
    </div>
  );
}

export default Dashboard;
