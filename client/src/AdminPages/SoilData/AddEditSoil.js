import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from "react-router-dom";
import "../SoilData/AddEditSoil.css";
import axios from "axios";
import {toast} from "react-toastify";

const initialState = {
    Location_name: "", 
    Latitude: "", 
    Longitude: "",
    Description: "",
    Bulk_density: "",
    Particle_density: "", 
    Void_ratio: "", 
    Porosity: "", 
    Moisture_content_mass: "", 
    Moisture_content_volume: "", 
    Water_holding_capacity: "", 
    Clay: "", 
    Silt: "", 
    Sand: "", 
    Soil_pH: "", 
    Total_nitrogen: "", 
    Extractable_phosphorus: "", 
    Exchangeable_potassium: "", 
    Cation_exchange_capacity: "", 
    Organic_matter: "", 
    Earthworm_density: "", 
    SQI: "",
};

const AddEditSoil = () => {
    const [state, setState] = useState(initialState);

    const {Location_name, Latitude, Longitude, Description, Bulk_density, Particle_density, Void_ratio, Porosity, Moisture_content_mass, Moisture_content_volume, Water_holding_capacity, Clay, Silt, Sand, Soil_pH, Total_nitrogen, Extractable_phosphorus, Exchangeable_potassium, Cation_exchange_capacity, Organic_matter, Earthworm_density, SQI} = state;

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/soil/${id}`).then((resp) => setState({...resp.data[0]}))
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!Location_name || !Latitude || !Longitude || !Description || !Bulk_density || !Particle_density || !Void_ratio || !Porosity || !Moisture_content_mass || !Moisture_content_volume || !Water_holding_capacity || !Clay || !Silt || !Sand || !Soil_pH || !Total_nitrogen || !Extractable_phosphorus || !Exchangeable_potassium || !Cation_exchange_capacity || !Organic_matter || !Earthworm_density || !SQI) {
            alert("Please provide value into each input field");
        } else {
            if(!id) {
                axios.post(`http://localhost:5000/api/addsoil`, {
                    Location_name, 
                    Latitude, 
                    Longitude,
                    Description
                })
                axios.post(`http://localhost:5000/api/addsoil2`, {
                    Bulk_density,
                    Particle_density, 
                    Void_ratio, 
                    Porosity, 
                    Moisture_content_mass, 
                    Moisture_content_volume, 
                    Water_holding_capacity, 
                    Clay, 
                    Silt, 
                    Sand, 
                    Soil_pH, 
                    Total_nitrogen, 
                    Extractable_phosphorus, 
                    Exchangeable_potassium, 
                    Cation_exchange_capacity, 
                    Organic_matter, Earthworm_density, 
                    SQI
                })
                .then(() => {
                    setState({Location_name: "", Latitude: "", Longitude: "", Description: "", Bulk_density: "", Particle_density: "", Void_ratio: "", Porosity: "", Moisture_content_mass: "", Moisture_content_volume: "", Water_holding_capacity: "", Clay: "", Silt: "", Sand: "", Soil_pH: "", Total_nitrogen: "", Extractable_phosphorus: "", Exchangeable_potassium: "", Cation_exchange_capacity: "", Organic_matter, Earthworm_density: "", SQI: ""});
                })
                .catch((err) => toast.error(err.response.data));
                alert("Data Added Successfully")
                setTimeout(() => navigate("/soildata"), 500);
            } else {
                axios.put(`http://localhost:5000/api/updatesoil/${id}`, {
                    Location_name, 
                    Latitude, 
                    Longitude,
                    Description,
                    Bulk_density,
                    Particle_density, 
                    Void_ratio, 
                    Porosity, 
                    Moisture_content_mass, 
                    Moisture_content_volume, 
                    Water_holding_capacity, 
                    Clay, 
                    Silt, 
                    Sand, 
                    Soil_pH, 
                    Total_nitrogen, 
                    Extractable_phosphorus, 
                    Exchangeable_potassium, 
                    Cation_exchange_capacity, 
                    Organic_matter, Earthworm_density, 
                    SQI
                })
                .then(() => {
                    setState({Location_name: "", Latitude: "", Longitude: "", Description: "", Bulk_density: "", Particle_density: "", Void_ratio: "", Porosity: "", Moisture_content_mass: "", Moisture_content_volume: "", Water_holding_capacity: "", Clay: "", Silt: "", Sand: "", Soil_pH: "", Total_nitrogen: "", Extractable_phosphorus: "", Exchangeable_potassium: "", Cation_exchange_capacity: "", Organic_matter, Earthworm_density: "", SQI: ""});
                })
                .catch((err) => toast.error(err.response.data));
                alert("Data Updated Successfully")
                setTimeout(() => navigate("/soildata"), 500);
            }
        }
    };
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: value});
    };

  return (
    <div className="body">
        <div className="container">
            <header className='header2'>ADD SOIL</header>
            <form className='form2' action="#" onSubmit={handleSubmit}>
                <div className="form first">
                    <div className="details personal">
                        <span className="title">Soil Information</span>
                        <div className="fields">
                            <div className="input-field">
                            <label htmlFor="Location_name">Location</label>
                            <input
                            type="text"
                            id="Location_name"
                            name="Location_name"
                            placeholder="Location ..."
                            value={Location_name || ""}
                            onChange={handleInputChange}
                            />
                            </div>
                            <div className="input-field">
                            <label htmlFor="Latitude">Latitude</label>
                            <input
                            type="text"
                            id="Latitude"
                            name="Latitude"
                            placeholder="Latitude ..."
                            value={Latitude || ""}
                            onChange={handleInputChange}
                            />
                            </div>
                            <div className="input-field">
                            <label htmlFor="Longitude">Longitude</label>
                            <input
                            type="text"
                            id="Longitude"
                            name="Longitude"
                            placeholder="Longitude ..."
                            value={Longitude || ""}
                            onChange={handleInputChange}
                            />
                            </div>
                            <div className="input-field">
                            <label htmlFor="Bulk_density">Bulk density</label>
                            <input
                            type="text"
                            id="Bulk_density"
                            name="Bulk_density"
                            placeholder="Bulk density ..."
                            value={Bulk_density || ""}
                            onChange={handleInputChange}
                            />
                            </div>
                            <div className="input-field">
                            <label htmlFor="Particle_density">Particle density</label>
                            <input
                            type="text"
                            id="Particle_density"
                            name="Particle_density"
                            placeholder="Particle density ..."
                            value={Particle_density || ""}
                            onChange={handleInputChange}
                            />
                            </div>
                            <div className="input-field">
                            <label htmlFor="Void_ratio">Void ratio</label>
                            <input
                            type="text"
                            id="Void_ratio"
                            name="Void_ratio"
                            placeholder="Void ratio ..."
                            value={Void_ratio || ""}
                            onChange={handleInputChange}
                            />
                            </div>
                            <div className="input-field">
                            <label htmlFor="Porosity">Porosity</label>
                            <input
                            type="text"
                            id="Porosity"
                            name="Porosity"
                            placeholder="Porosity ..."
                            value={Porosity || ""}
                            onChange={handleInputChange}
                            />
                            </div>
                            <div className="input-field">
                            <label htmlFor="Moisture_content_mass">Moisture content(mass)</label>
                            <input
                            type="text"
                            id="Moisture_content_mass"
                            name="Moisture_content_mass"
                            placeholder="Moisture content(mass) ..."
                            value={Moisture_content_mass || ""}
                            onChange={handleInputChange}
                            />
                            </div>
                            <div className="input-field">
                            <label htmlFor="Moisture_content_volume">Moisture content(volume)</label>
                            <input
                            type="text"
                            id="Moisture_content_volume"
                            name="Moisture_content_volume"
                            placeholder="Moisture content(volume) ..."
                            value={Moisture_content_volume || ""}
                            onChange={handleInputChange}
                            />
                            </div>
                            <div className="input-field">
                            <label htmlFor="Water_holding_capacity">Water holding capacity</label>
                            <input
                            type="text"
                            id="Water_holding_capacity"
                            name="Water_holding_capacity"
                            placeholder="Water holding capacity ..."
                            value={Water_holding_capacity || ""}
                            onChange={handleInputChange}
                            />
                            </div>
                            <div className="input-field">
                            <label htmlFor="Clay">Clay</label>
                            <input
                            type="text"
                            id="Clay"
                            name="Clay"
                            placeholder="Clay ..."
                            value={Clay || ""}
                            onChange={handleInputChange}
                            />
                            </div>
                            <div className="input-field">
                            <label htmlFor="Silt">Silt</label>
                            <input
                            type="text"
                            id="Silt"
                            name="Silt"
                            placeholder="Silt ..."
                            value={Silt || ""}
                            onChange={handleInputChange}
                            />
                            </div>
                            <div className="input-field">
                            <label htmlFor="Sand">Sand</label>
                            <input
                            type="text"
                            id="Sand"
                            name="Sand"
                            placeholder="Sand ..."
                            value={Sand || ""}
                            onChange={handleInputChange}
                            />
                            </div>
                            <div className="input-field">
                            <label htmlFor="Soil_pH">Soil pH</label>
                            <input
                            type="text"
                            id="Soil_pH"
                            name="Soil_pH"
                            placeholder="Soil pH ..."
                            value={Soil_pH || ""}
                            onChange={handleInputChange}
                            />
                            </div>
                            <div className="input-field">
                            <label htmlFor="Total_nitrogen">Total nitrogen</label>
                            <input
                            type="text"
                            id="Total_nitrogen"
                            name="Total_nitrogen"
                            placeholder="Total nitrogen ..."
                            value={Total_nitrogen || ""}
                            onChange={handleInputChange}
                            />
                            </div>
                            <div className="input-field">
                            <label htmlFor="Extractable_phosphorus">Extractable phosphorus</label>
                            <input
                            type="text"
                            id="Extractable_phosphorus"
                            name="Extractable_phosphorus"
                            placeholder="Extractable phosphorus ..."
                            value={Extractable_phosphorus || ""}
                            onChange={handleInputChange}
                            />
                            </div>
                            <div className="input-field">
                            <label htmlFor="Exchangeable_potassium">Exchangeable potassium</label>
                            <input
                            type="text"
                            id="Exchangeable_potassium"
                            name="Exchangeable_potassium"
                            placeholder="Exchangeable potassium ..."
                            value={Exchangeable_potassium || ""}
                            onChange={handleInputChange}
                            />
                            </div>
                            <div className="input-field">
                            <label htmlFor="Cation_exchange_capacity">Cation exchange capacity</label>
                            <input
                            type="text"
                            id="Cation_exchange_capacity"
                            name="Cation_exchange_capacity"
                            placeholder="Cation exchange capacity ..."
                            value={Cation_exchange_capacity || ""}
                            onChange={handleInputChange}
                            />
                            </div>
                            <div className="input-field">
                            <label htmlFor="Organic_matter">Organic matter</label>
                            <input
                            type="text"
                            id="Organic_matter"
                            name="Organic_matter"
                            placeholder="Organic matter ..."
                            value={Organic_matter || ""}
                            onChange={handleInputChange}
                            />
                            </div>
                            <div className="input-field">
                            <label htmlFor="Earthworm_density">Earthworm density</label>
                            <input
                            type="text"
                            id="Earthworm_density"
                            name="Earthworm_density"
                            placeholder="Earthworm density ..."
                            value={Earthworm_density || ""}
                            onChange={handleInputChange}
                            />
                            </div>
                            <div className="input-field">
                            <label htmlFor="SQI">SQI(soil quality index)</label>
                            <input
                            type="text"
                            id="SQI"
                            name="SQI"
                            placeholder="SQI(Soil quality index) ..."
                            value={SQI || ""}
                            onChange={handleInputChange}
                            />
                            </div>
                            <div className="input-field2">
                            <label htmlFor="Description">Description</label>
                            <textarea
                            className='input2'
                            type="text"
                            id="Description"
                            name="Description"
                            placeholder="Description ..."
                            value={Description || ""}
                            onChange={handleInputChange}
                            style={{ height: "100px", width: "500px" }}
                            />
                            </div>
                        </div>
                            <div className="button">
                            <input type="submit" value={id ? "Update" : "Save"} />
                            <Link to="/soildata">
                                <input type="button" style={{marginLeft: "10px"}} value="Go Back" />
                            </Link>
                            </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default  AddEditSoil;
