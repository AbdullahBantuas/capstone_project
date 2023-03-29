import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import {toast} from "react-toastify";

const initialState = {
    Location_name: "", 
    Latitude: "", 
    Longitude: "",
    Bulk_density: "", 
    Particle_density: "", 
    Void_ratio: "", 
    Total_porosity: "", 
    Moisture_content: "", 
    Water_holding_capacity: "", 
    Soil_texture: "", 
    Soil_color: "", 
    Soil_pH: "", 
    Nitrogen: "", 
    Phosphorus: "", 
    Potassium: "", 
    Cation_exchange_capacity: "",
};

const AddEditSoil = () => {
    const [state, setState] = useState(initialState);

    const {Location_name, Latitude, Longitude, Bulk_density, Particle_density, Void_ratio, Total_porosity, Moisture_content, Water_holding_capacity, Soil_texture, Soil_color, Soil_pH, Nitrogen, Phosphorus, Potassium, Cation_exchange_capacity} = state;

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/soil/${id}`).then((resp) => setState({...resp.data[0]}))
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!Location_name || !Latitude || !Longitude || !Bulk_density || !Particle_density || !Void_ratio, !Total_porosity || !Moisture_content || !Water_holding_capacity || !Soil_texture || !Soil_color || !Soil_pH || !Nitrogen || !Phosphorus || !Potassium || !Cation_exchange_capacity) {
            toast.error("Please provide value into each input field");
        } else {
            if(!id) {
                axios.post(`http://localhost:5000/api/addsoil`, {
                    Location_name, 
                    Latitude, 
                    Longitude
                })
                axios.post(`http://localhost:5000/api/addsoil2`, {
                    Bulk_density, 
                    Particle_density, 
                    Void_ratio, 
                    Total_porosity, 
                    Moisture_content, 
                    Water_holding_capacity, 
                    Soil_texture, 
                    Soil_color
                })
                axios.post(`http://localhost:5000/api/addsoil3`, { 
                    Soil_pH, 
                    Nitrogen, 
                    Phosphorus, 
                    Potassium, 
                    Cation_exchange_capacity
                })
                .then(() => {
                    setState({Location_name: "", Latitude: "", Longitude: "", Bulk_density: "", Particle_density: "", Void_ratio: "", Total_porosity: "", Moisture_content: "", Water_holding_capacity: "", Soil_texture: "", Soil_color: "", Soil_pH: "", Nitrogen: "", Phosphorus: "", Potassium: "", Cation_exchange_capacity: ""});
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("Data Added Successfully")
            } else {
                axios.put(`http://localhost:5000/api/updatesoil/${id}`, {
                    Location_name, 
                    Latitude, 
                    Longitude,
                    Bulk_density, 
                    Particle_density, 
                    Void_ratio, 
                    Total_porosity, 
                    Moisture_content, 
                    Water_holding_capacity, 
                    Soil_texture, 
                    Soil_color, 
                    Soil_pH, 
                    Nitrogen, 
                    Phosphorus, 
                    Potassium, 
                    Cation_exchange_capacity
                })
                .then(() => {
                    setState({Location_name: "", Latitude: "", Longitude: "", Bulk_density: "", Particle_density: "", Void_ratio: "", Total_porosity: "", Moisture_content: "", Water_holding_capacity: "", Soil_texture: "", Soil_color: "", Soil_pH: "", Nitrogen: "", Phosphorus: "", Potassium: "", Cation_exchange_capacity: ""});
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("Data Updated Successfully")
            }
            
            setTimeout(() => navigate("/soildata"), 500);
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
            <label htmlFor="Location_name">Location</label>
            <input
            type="text"
            id="Location_name"
            name="Location_name"
            placeholder="Location ..."
            value={Location_name || ""}
            onChange={handleInputChange}
            />
            <label htmlFor="Latitude">Latitude</label>
            <input
            type="text"
            id="Latitude"
            name="Latitude"
            placeholder="Latitude ..."
            value={Latitude || ""}
            onChange={handleInputChange}
            />
            <label htmlFor="Longitude">Longitude</label>
            <input
            type="text"
            id="Longitude"
            name="Longitude"
            placeholder="Longitude ..."
            value={Longitude || ""}
            onChange={handleInputChange}
            />
            <label htmlFor="Bulk_density">Bulk density</label>
            <input
            type="text"
            id="Bulk_density"
            name="Bulk_density"
            placeholder="Bulk density ..."
            value={Bulk_density || ""}
            onChange={handleInputChange}
            />
            <label htmlFor="Particle_density">Particle density</label>
            <input
            type="text"
            id="Particle_density"
            name="Particle_density"
            placeholder="Particle density ..."
            value={Particle_density || ""}
            onChange={handleInputChange}
            />
            <label htmlFor="Void_ratio">Void ratio</label>
            <input
            type="text"
            id="Void_ratio"
            name="Void_ratio"
            placeholder="Void ratio ..."
            value={Void_ratio || ""}
            onChange={handleInputChange}
            />
            <label htmlFor="Total_porosity">Total porosity</label>
            <input
            type="text"
            id="Total_porosity"
            name="Total_porosity"
            placeholder="Total porosity ..."
            value={Total_porosity || ""}
            onChange={handleInputChange}
            />
            <label htmlFor="Moisture_content">Moisture content</label>
            <input
            type="text"
            id="Moisture_content"
            name="Moisture_content"
            placeholder="Moisture content ..."
            value={Moisture_content || ""}
            onChange={handleInputChange}
            />
            <label htmlFor="Water_holding_capacity">Water holding capacity</label>
            <input
            type="text"
            id="Water_holding_capacity"
            name="Water_holding_capacity"
            placeholder="Water holding capacity ..."
            value={Water_holding_capacity || ""}
            onChange={handleInputChange}
            />
            <label htmlFor="Soil_texture">Soil texture</label>
            <input
            type="text"
            id="Soil_texture"
            name="Soil_texture"
            placeholder="Soil texture ..."
            value={Soil_texture || ""}
            onChange={handleInputChange}
            />
            <label htmlFor="Soil_color">Soil color</label>
            <input
            type="text"
            id="Soil_color"
            name="Soil_color"
            placeholder="Soil color ..."
            value={Soil_color || ""}
            onChange={handleInputChange}
            />
            <label htmlFor="Soil_pH">Soil pH</label>
            <input
            type="text"
            id="Soil_pH"
            name="Soil_pH"
            placeholder="Soil pH ..."
            value={Soil_pH || ""}
            onChange={handleInputChange}
            />
            <label htmlFor="Nitrogen">Nitrogen</label>
            <input
            type="text"
            id="Nitrogen"
            name="Nitrogen"
            placeholder="Nitrogen ..."
            value={Nitrogen || ""}
            onChange={handleInputChange}
            />
            <label htmlFor="Phosphorus">Phosphorus</label>
            <input
            type="text"
            id="Phosphorus"
            name="Phosphorus"
            placeholder="Phosphorus ..."
            value={Phosphorus || ""}
            onChange={handleInputChange}
            />
            <label htmlFor="Potassium">Potassium</label>
            <input
            type="text"
            id="Potassium"
            name="Potassium"
            placeholder="Potassium ..."
            value={Potassium || ""}
            onChange={handleInputChange}
            />
            <label htmlFor="Cation_exchange_capacity">Cation exchange capacity</label>
            <input
            type="text"
            id="Cation_exchange_capacity"
            name="Cation_exchange_capacity"
            placeholder="Cation exchange capacity ..."
            value={Cation_exchange_capacity || ""}
            onChange={handleInputChange}
            />
            <input type="submit" value={id ? "Update" : "Save"} />
            <Link to="/soildata">
                <input type="button" value="Go Back" />
            </Link>
        </form>
    </div>
  )
}

export default  AddEditSoil;