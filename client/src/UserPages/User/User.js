import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from "react-router-dom";
import "./User.css";
import axios from "axios";
import {toast} from "react-toastify";

const initialState = {
    Username: "",
    Password: "",
    Fullname: "",
    Email: "",
};

const User = () => {
    const [state, setState] = useState(initialState);
    // const { U_id } = useParams();
    const {Username, Password, Fullname, Email} = state;
    const navigate = useNavigate();
    const U_id = localStorage.getItem('U_id');
    console.log(U_id);

    useEffect(() => {
        if (U_id) {
            axios.get(`http://localhost:5000/api/get/${U_id}`).then((resp) => setState({...resp.data[0]}))
        } else {
            alert("User id not set!");
        }
    }, [U_id]);

    console.log('state:', state);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!Username || !Password || !Fullname || !Email) {
            toast.error("Please provide value into each input field");
        } else {
            axios.put(`http://localhost:5000/api/update2/${U_id}`, {
                Username,
                Password,
                Fullname,
                Email
            })
            .then(() => {
                alert("Updated Successfully")
            })
            .catch((err) => toast.error(err.response.data));
        }
    };
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: value});
    };
  return (
    <div style={{marginTop: "150px"}}>
        <form style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center"
        }}
        onSubmit={handleSubmit}
        >
            <label htmlFor="Username">Username</label>
            <input
            type="text"
            id="Username"
            name="Username"
            placeholder="Your Username ..."
            value={Username || ""}
            onChange={handleInputChange}
            />
            <label htmlFor="Password">Password</label>
            <input
            type="text"
            id="Password"
            name="Password"
            placeholder="Your Password ..."
            value={Password || ""}
            onChange={handleInputChange}
            />
            <label htmlFor="Fullname">Fullname</label>
            <input
            type="text"
            id="Fullname"
            name="Fullname"
            placeholder="Your Fullname ..."
            value={Fullname || ""}
            onChange={handleInputChange}
            />
            <label htmlFor="Email">Email</label>
            <input
            type="email"
            id="Email"
            name="Email"
            placeholder="Your Email ..."
            value={Email || ""}
            onChange={handleInputChange}
            />
            <input type="submit" value={U_id ? "Update" : "Save"} />
            {/* <Link to="/home">
                <input type="button" value="Go Back" />
            </Link> */}
        </form>
    </div>
  )
}

export default  User;