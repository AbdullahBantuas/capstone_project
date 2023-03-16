import React, {useState, useEffect} from 'react';
import {toast, ToastContainer} from "react-toastify";
import {Link} from "react-router-dom";
import "./UserData.css";
import axios from "axios";

function UserData() {
    const [data, setData] = useState([]);

    const loadData = async () => {
      const response = await axios.get("http://localhost:5000/api/get");
      setData(response.data);
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
        <div className='UserData' style={{marginTop: "100px"}}>
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
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={item.U_id}>
                    <th scope="row">{index+1}</th>
                    <td>{item.Fullname}</td>
                    <td>{item.Email}</td>
                    <td>
                      <Link to={`/update/${item.U_id}`}>
                        <button className="btn btn-edit">Edit</button>
                      </Link>
                      <button className="btn btn-delete" onClick={() => deleteContact(item.U_id)}>Delete</button>
                      <Link to={`/view/${item.U_id}`}>
                        <button classNAme="btn btn-view">View</button>
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tail>
                <Link to="/addContact">
                <button className="btn btn-contact">Add contact</button>
                 </Link>
            </tail>
          </table>
        </div>
      );
}

export default UserData;