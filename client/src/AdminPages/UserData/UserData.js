import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./UserData.css";
import axios from "axios";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Swal from "sweetalert2";

function UserData() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [totalItems, setTotalItems] = useState(0);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    setData(response.data);
    setTotalItems(response.data.length);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const deleteContact = (U_id) => {
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
        axios.delete(`http://localhost:5000/api/remove/${U_id}`);
        Swal.fire(
          'Deleted!',
          'Account has been deleted.',
          'success'
        );
        setTimeout(() => loadData(), 500);
      }
    });
  };

  const updateContact = (U_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Set user to admin",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, set to admin!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`http://localhost:5000/api/update/${U_id}`);
        Swal.fire(
          'Success!',
          'Account has been set to admin.',
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
    return item.Fullname.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    
    <div className="userdata" style={{ marginTop: "115px" }}>
      <div style={{ justifyContent: 'start', marginTop: '-10px', marginLeft: '885px', width: '20%' }}>
        <input
          type="text"
          placeholder="Search by Fullname"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Fullname</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody style={{ overflow: "auto", height: "100px" }}>
          {currentData.map((item, index) => {
            return (
              <tr key={item.S_id}>
                <th scope="row">{indexOfFirstItem + index + 1}</th>
                <td>{item.Fullname}</td>
                <td>{item.Email}</td>
                <td>
                  <div className="btn-group">
                    <button
                      className="btn btn-edit"
                      title="Set to admin"
                      onClick={() => updateContact(item.U_id)}
                    >
                      <AdminPanelSettingsIcon/>
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => deleteContact(item.U_id)}
                      title="Delete user"
                    >
                      <DeleteIcon/>
                    </button>
                    <Link to={`/view/${item.U_id}`}>
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

export default UserData;
