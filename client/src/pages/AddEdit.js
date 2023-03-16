import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import {toast} from "react-toastify";

const initialState = {
    username: "",
    Password: "",
    Fullname: "",
    Email: "",
};

const AddEdit = () => {
    const [state, setState] = useState(initialState);

    const {username, Password, Fullname, Email} = state;

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`).then((resp) => setState({...resp.data[0]}))
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!username || !Password || !Fullname || !Email) {
            toast.error("Please provide value into each input field");
        } else {
            if(!id) {
                axios.post("http://localhost:5000/api/post", {
                    username,
                    Password,
                    Fullname,
                    Email
                })
                .then(() => {
                    setState({username: "", Password: "", Fullname: "", Email: ""});
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("Data Added Successfully")
            } else {
                axios.put(`http://localhost:5000/api/update/${id}`, {
                    username,
                    Password,
                    Fullname,
                    Email
                })
                .then(() => {
                    setState({username: "", Password: "", Fullname: "", Email: ""});
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("Data Updated Successfully")
            }
            
            setTimeout(() => navigate("/userdata"), 500);
        }
    };
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: value});
    };
  return (
    <div style={{marginTop: "100px"}}>
        <form style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center"
        }}
        onSubmit={handleSubmit}
        >
            <label htmlFor="username">Username</label>
            <input
            type="text"
            id="username"
            name="username"
            placeholder="Your Username ..."
            value={username || ""}
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
            <input type="submit" value={id ? "Update" : "Save"} />
            <Link to="/userdata">
                <input type="button" value="Go Back" />
            </Link>
        </form>
    </div>
  )
}

export default  AddEdit;