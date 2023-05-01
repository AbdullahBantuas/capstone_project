import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "./View.css";

const View = () => {    
    const [user, setUser] = useState({});

    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`).then((resp) => setUser({...resp.data[0]}))
    }, [id]);
    return (
        <div style={{marginTop: "200px"}}>
            <div className="card1">
                <div className="card-header1">  
                    <p>USER DETAILS</p>
                </div>
                <div className="containerView">
                    <strong>ID: </strong>
                    <span>{id}</span>
                    <br />
                    <br />
                    <strong>Username: </strong>
                    <span>{user.Username}</span>
                    <br />
                    <br />
                    <strong>Password: </strong>
                    <span>{user.Password}</span>
                    <br />
                    <br />
                    <strong>Fullname: </strong>
                    <span>{user.Fullname}</span>
                    <br />
                    <br />
                    <strong>Email: </strong>
                    <span>{user.Email}</span>
                    <br />
                    <br />
                    <Link to="/userdata">
                        <div className="btn btn-edit">Go Back</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default View;