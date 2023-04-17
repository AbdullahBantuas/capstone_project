import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "./View.css";
import ReactToPrint from 'react-to-print';

const ViewSoil2 = () => {    
    const [user, setUser] = useState({});
    const { id } = useParams();
    const componentRef = useRef(); 

    useEffect(() => {
        axios.get(`http://localhost:5000/api/soil/${id}`).then((resp) => setUser({...resp.data[0]}))
    }, [id]);

    return (
        <div style={{marginTop: "100px"}}>
            <div className="card" ref={componentRef}>
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
                    <strong>Porosity: </strong>
                    <span>{user.Porosity}</span>
                    <br />
                    <br />
                    <strong>Moisture content(mass): </strong>
                    <span>{user.Moisture_content_mass}</span>
                    <br />
                    <br />
                    <strong>Moisture content(volume): </strong>
                    <span>{user.Moisture_content_volume}</span>
                    <br />
                    <br />
                    <strong>Water holding capacity: </strong>
                    <span>{user.Water_holding_capacity}</span>
                    <br />
                    <br />
                    <strong>Clay: </strong>
                    <span>{user.Clay}</span>
                    <br />
                    <br />
                    <strong>Silt: </strong>
                    <span>{user.Silt}</span>
                    <br />
                    <br />
                    <strong>Sand: </strong>
                    <span>{user.Sand}</span>
                    <br />
                    <br />
                    <strong>Soil pH: </strong>
                    <span>{user.Soil_pH}</span>
                    <br />
                    <br />
                    <strong>Total nitrogen: </strong>
                    <span>{user.Total_nitrogen}</span>
                    <br />
                    <br />
                    <strong>Extractable phosphorus: </strong>
                    <span>{user.Extractable_phosphorus}</span>
                    <br />
                    <br />
                    <strong>Exchangeable potassium: </strong>
                    <span>{user.Exchangeable_potassium}</span>
                    <br />
                    <br />
                    <strong>Cation exchange capacity: </strong>
                    <span>{user.Cation_exchange_capacity}</span>
                    <br />
                    <br />
                    <strong>Organic matter: </strong>
                    <span>{user.Organic_matter}</span>
                    <br />
                    <br />
                    <strong>Earthworm density: </strong>
                    <span>{user.Earthworm_density}</span>
                    <br />
                    <br />
                    <strong>SQI: </strong>
                    <span>{user.SQI}</span>
                    <br />
                    <br />
                    <strong>Description: </strong>
                    <span>{user.Description}</span>
                    <br />
                    <br />
                    <Link to="/geomap">
                        <div className="btn btn-edit">Go Back</div>
                    </Link>
                </div>
            </div>
            <ReactToPrint
                trigger={() => <button onClick={() => window.print()}>Print</button>}
                content={() => componentRef.current}
            />
        </div>
    )
}

export default ViewSoil2;