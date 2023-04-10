import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import "./UserData.css";
import axios from "axios";

function SoilData() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/soil");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteContact = (S_id) => {
    if (window.confirm("Are you sure that you want to delete that content?")) {
      axios.delete(`http://localhost:5000/api/removeSoil3/${S_id}`);
      axios.delete(`http://localhost:5000/api/removeSoil2/${S_id}`);
      axios.delete(`http://localhost:5000/api/removeSoil/${S_id}`);
      toast.success("contact deleted successfully");
      setTimeout(() => loadData(), 500);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) => {
    return item.Location_name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="soildata" style={{ marginTop: "100px" }}>
      <ToastContainer position="center" />
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Location"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Location</th>
            <th style={{ textAlign: "center" }}>Latitude</th>
            <th style={{ textAlign: "center" }}>Longitude</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => {
            return (
              <tr key={item.S_id}>
                <th scope="row">{index + 1}</th>
                <td>{item.Location_name}</td>
                <td>{item.Latitude}</td>
                <td>{item.Longitude}</td>
                <td>
                  <Link to={`/updateSoil/${item.S_id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteContact(item.S_id)}
                  >
                    Delete
                  </button>
                  <Link to={`/viewSoil/${item.S_id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tail>
          <Link to="/addSoil">
            <button className="btn btn-contact">Add Soil information</button>
          </Link>
        </tail>
      </table>
    </div>
  );
}

export default SoilData;
