import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SoilData.css";
import axios from "axios";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import Swal from "sweetalert2";
import { GreenIcon, OrangeIcon, RedIcon } from '../../imgs/IconComponents';

function SoilData() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/api/removeSoil3/${S_id}`);
        axios.delete(`http://localhost:5000/api/removeSoil2/${S_id}`);
        axios.delete(`http://localhost:5000/api/removeSoil/${S_id}`);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
        setTimeout(() => loadData(), 500);
      }
    });
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
        Swal.fire('Import successful!', '', 'success');
        setTimeout(() => loadData(), 500);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire('Import faile: make sure it is the right file!', '', 'info');
      });
  }

  return (
    <div className="soildata" style={{ marginTop: "115px" }}>
      <div className="add-container1">
        <input type="file" accept=".csv" onChange={handleFileSelect} style={{ display: 'none' }} />
        <button className="add2" onClick={handleImportClick} title="Import soil data"><CreateNewFolderIcon/></button>
        <Link to="/addSoil">
            <button className="add1" title="Add soil data"><AddLocationAltIcon /></button>
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
                  <div className="btn-group">
                    <Link to={`/updateSoil/${item.S_id}`}>
                      <button className="btn btn-edit" title="Edit soil data"><EditIcon/></button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => deleteContact(item.S_id)}
                      title="Delete soil data"
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
        <tfoot className="tablefoot">
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
