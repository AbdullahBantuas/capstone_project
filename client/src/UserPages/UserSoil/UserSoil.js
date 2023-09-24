import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import "./UserSoil.css";
import axios from "axios";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { GreenIcon, OrangeIcon, RedIcon } from '../../imgs/IconComponents';

function SoilData() {
  const [data, setData] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");
  const [combinedSearchTerm, setCombinedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [totalItems, setTotalItems] = useState(0);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/soil");
    setData(response.data);
    setTotalItems(response.data.length);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const deleteContact = (S_id) => {
    if (window.confirm("Are you sure that you want to delete that content?")) {
      axios.delete(`http://localhost:5000/api/removeSoil2/${S_id}`);
      axios.delete(`http://localhost:5000/api/removeSoil/${S_id}`);
      alert("contact deleted successfully");
      setTimeout(() => loadData(), 500);
    }
  };

  // const handleSearch = (event) => {
  //   setSearchTerm(event.target.value);
  // };
  const handleCombinedSearch = (event) => {
    setCombinedSearchTerm(event.target.value);
  };  

  // const filteredData = data.filter((item) => {
  //   return item.Location_name.toLowerCase().includes(searchTerm.toLowerCase());
  // });
  const filteredData = data.filter((item) => {
    const combinedMatch = 
      item.Location_name.toLowerCase().includes(combinedSearchTerm.toLowerCase()) ||
      item.SQI.toString().includes(combinedSearchTerm);
  
    return combinedMatch;
  });  

  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="soildata" style={{ marginTop: "115px" }}>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search location name or SQI"
          value={combinedSearchTerm}
          onChange={handleCombinedSearch}
        />
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Location Name</th>
            <th style={{ textAlign: "center" }}>Soil Quality Index</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody style={{ overflow: "auto", height: "100px" }}>
          {currentData.map((item, index) => {

            let iconComponent;
            if (item.SQI > 0.8) {
              iconComponent = <GreenIcon />;
            } else if (item.SQI >= 0.5 && item.SQI <= 0.8) {
              iconComponent = <OrangeIcon />;
            } else {
              iconComponent = <RedIcon />;
            }

            return (
              <tr key={item.S_id}>
                <th scope="row">{indexOfFirstItem + index + 1}</th>
                <td>{item.Location_name}</td>
                <td>{iconComponent} {item.SQI}</td>
                <td>
                    <Link to={`/viewSoil4/${item.S_id}`}>
                      <button className="btn btn-view" title="View soil"><VisibilityIcon/></button>
                    </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </tfoot>
      </table>
    </div>
  );

  function Pagination({ itemsPerPage, totalItems, currentPage, onPageChange }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="pagination">
        <div className="page-info">
        {currentPage}-{pageNumbers.length}
        </div>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
        >
          Next
        </button>
      </div>
    );
  }  
}

export default SoilData;
