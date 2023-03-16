import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "./View.css";

const ViewSoil = () => {    
    const [user, setUser] = useState({});

    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/soil/${id}`).then((resp) => setUser({...resp.data[0]}))
    }, [id]);
    return (
        <div style={{marginTop: "100px"}}>
            <div className="card">
                <div className="card-header">  
                    <p>Soil Information</p>
                </div>
                <div className="container">
                    <strong>ID: </strong>
                    <span>{id}</span>
                    <br />
                    <br />
                    <strong>Location name: </strong>
                    <span>{user.Location_name}</span>
                    <br />
                    <br />
                    <strong>Latitude: </strong>
                    <span>{user.Latitude}</span>
                    <br />
                    <br />
                    <strong>Longitude: </strong>
                    <span>{user.Longitude}</span>
                    <br />
                    <br />
                    <strong>Bulk density: </strong>
                    <span>{user.Bulk_density}</span>
                    <br />
                    <br />
                    <strong>Particle density: </strong>
                    <span>{user.Particle_density}</span>
                    <br />
                    <br />
                    <strong>Void ratio: </strong>
                    <span>{user.Void_ratio}</span>
                    <br />
                    <br />
                    <strong>Total porosity: </strong>
                    <span>{user.Total_porosity}</span>
                    <br />
                    <br />
                    <strong>Moisture content: </strong>
                    <span>{user.Moisture_content}</span>
                    <br />
                    <br />
                    <strong>Water holding capacity: </strong>
                    <span>{user.Water_holding_capacity}</span>
                    <br />
                    <br />
                    <strong>Soil texture: </strong>
                    <span>{user.Soil_texture}</span>
                    <br />
                    <br />
                    <strong>Soil color: </strong>
                    <span>{user.Soil_color}</span>
                    <br />
                    <br />
                    <strong>Soil pH: </strong>
                    <span>{user.Soil_pH}</span>
                    <br />
                    <br />
                    <strong>Nitrogen: </strong>
                    <span>{user.Nitrogen}</span>
                    <br />
                    <br />
                    <strong>Phosphorus: </strong>
                    <span>{user.Phosphorus}</span>
                    <br />
                    <br />
                    <strong>Potassium: </strong>
                    <span>{user.Potassium}</span>
                    <br />
                    <br />
                    <strong>Cation exchange capacity: </strong>
                    <span>{user.Cation_exchange_capacity}</span>
                    <br />
                    <br />
                    <Link to="/soildata">
                        <div className="btn btn-edit">Go Back</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ViewSoil;