import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SoilData.css";
import axios from "axios";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

function SoilData() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [totalItems, setTotalItems] = useState(0);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [file, setFile] = useState(null);
  
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) => {
    return item.Location_name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  function handleImportClick() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = handleFileSelect;
    input.click();
  }
  
  function handleFileSelect(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
  
    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        alert("Import successful");
        setTimeout(() => loadData(), 500);
      })
      .catch((error) => {
        console.error(error);
        alert("Import failed");
      });
  }

  return (
    <div className="soildata" style={{ marginTop: "115px" }}>
      <div className="add-container1">
        <input type="file" accept=".csv" onChange={handleFileSelect} style={{ display: 'none' }} />
        <button className="add2" onClick={handleImportClick} title="Import soil"><CreateNewFolderIcon/></button>
        <Link to="/addSoil">
            <button className="add1" title="Add soil"><AddLocationAltIcon /></button>
        </Link>
      </div>
      <div className="search-container1">
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
            <th style={{ textAlign: "center" }}>Location Name</th>
            <th style={{ textAlign: "center" }}>Soil Quality Index</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody style={{ overflow: "auto", height: "100px" }}>
          {currentData.map((item, index) => {
            return (
              <tr key={item.S_id}>
                <th scope="row">{indexOfFirstItem + index + 1}</th>
                <td>{item.Location_name}</td>
                <td>{item.SQI}</td>
                <td>
                  <div className="btn-group">
                    <Link to={`/updateSoil/${item.S_id}`}>
                      <button className="btn btn-edit" title="Edit soil"><EditIcon/></button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => deleteContact(item.S_id)}
                      title="Delete soil"
                    >
                      <DeleteIcon/>
                    </button>
                    <Link to={`/viewSoil/${item.S_id}`}>
                      <button className="btn btn-view" title="View details"><VisibilityIcon/></button>
                    </Link>
                  </div>
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
        {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={pageNumber === currentPage ? "active" : ""}
        >
        {pageNumber}
        </button>
        ))}
        {pageNumbers.length > 3 && currentPage < pageNumbers.length && (
          <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
        )}
      </div>
    );
  }
}

export default SoilData;
