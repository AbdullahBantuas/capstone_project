const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Sc@nner1011",
    database: "capstone_project"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM user";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post("/api/post", (req, res) => {
    const { username, Password, Fullname, Email } = req.body;
    const sqlInsert = "INSERT INTO user (username, Password, Fullname, Email) VALUES (?, ?, ?, ?)";
    db.query(sqlInsert, [username, Password, Fullname, Email], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.delete("/api/remove/:U_id", (req, res) => {
    const { U_id } = req.params;
    const sqlRemove = "DELETE FROM user WHERE U_id = ?";
    db.query(sqlRemove, U_id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.get("/api/get/:U_id", (req, res) => {
    const { U_id } = req.params;
    const sqlGet = "SELECT * FROM user WHERE U_id = ?";
    db.query(sqlGet, U_id, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:U_id", (req, res) => {
    const { U_id } = req.params;
    const { username, Password, Fullname, Email } = req.body;
    const sqlUpdate = "UPDATE user SET username = ?, Password = ?, Fullname = ?, Email = ? WHERE U_id = ?";
    db.query(sqlUpdate, [username, Password, Fullname, Email, U_id], (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.get("/api/soil", (req, res) => {
    const sqlGet = "SELECT * FROM soil_location s, physical_properties p, chemical_properties c WHERE s.S_id = p.S_id AND s.S_id = c.S_id";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

// app.post("/api/addsoil", (req, res) => {
//     const { Location_name, Latitude, Longitude, Bulk_density, Particle_density, Void_ratio, Total_porosity, Moisture_content, Water_holding_capacity, Soil_texture, Soil_color, Soil_pH, Nitrogen, Phosphorus, Potassium, Cation_exchange_capacity } = req.body;
//     const sqlInsert = "INSERT INTO soil_location (Location_name, Latitude, Longitude) VALUES (?, ?, ?); INSERT INTO physical_properties (Bulk_density, Particle_density, Void_ratio, Total_porosity, Moisture_content, Water_holding_capacity, Soil_texture, Soil_color) VALUES (?, ?, ?, ?, ?, ?, ?, ?); INSERT INTO chemical_properties (Soil_pH, Nitrogen, Phosphorus, Potassium, Cation_exchange_capacity) VALUES (?, ?, ?, ?, ?);";
//     db.query(sqlInsert, [Location_name, Latitude, Longitude, Bulk_density, Particle_density, Void_ratio, Total_porosity, Moisture_content, Water_holding_capacity, Soil_texture, Soil_color, Soil_pH, Nitrogen, Phosphorus, Potassium, Cation_exchange_capacity], (error, result) => {
//         if (error) {
//             console.log(error);
//         }
//     });
// });

app.post("/api/addsoil", (req, res) => {
    const { Location_name, Latitude, Longitude } = req.body;
    const sqlInsert = "INSERT INTO soil_location (Location_name, Latitude, Longitude) VALUES (?, ?, ?);";
    db.query(sqlInsert, [Location_name, Latitude, Longitude], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.post("/api/addsoil2", (req, res) => {
    const { Bulk_density, Particle_density, Void_ratio, Total_porosity, Moisture_content, Water_holding_capacity, Soil_texture, Soil_color } = req.body;
    const sqlInsert = "INSERT INTO physical_properties (Bulk_density, Particle_density, Void_ratio, Total_porosity, Moisture_content, Water_holding_capacity, Soil_texture, Soil_color) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
    db.query(sqlInsert, [Bulk_density, Particle_density, Void_ratio, Total_porosity, Moisture_content, Water_holding_capacity, Soil_texture, Soil_color], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.post("/api/addsoil3", (req, res) => {
    const { Soil_pH, Nitrogen, Phosphorus, Potassium, Cation_exchange_capacity } = req.body;
    const sqlInsert = "INSERT INTO chemical_properties (Soil_pH, Nitrogen, Phosphorus, Potassium, Cation_exchange_capacity) VALUES (?, ?, ?, ?, ?);";
    db.query(sqlInsert, [Soil_pH, Nitrogen, Phosphorus, Potassium, Cation_exchange_capacity], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.get("/api/soil/:S_id", (req, res) => {
    const { S_id } = req.params;
    const sqlGet = "SELECT * FROM soil_location s, physical_properties p, chemical_properties c WHERE s.S_id = ? AND s.S_id = p.S_id AND s.S_id = c.S_id";
    db.query(sqlGet, S_id, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/updatesoil/:S_id", (req, res) => {
    const { S_id } = req.params;
    const { Location_name, Latitude, Longitude, Bulk_density, Particle_density, Void_ratio, Total_porosity, Moisture_content, Water_holding_capacity, Soil_texture, Soil_color, Soil_pH, Nitrogen, Phosphorus, Potassium, Cation_exchange_capacity } = req.body;
    const sqlUpdate = "UPDATE soil_location s, physical_properties p, chemical_properties c SET s.Location_name = ?, s.Latitude = ?, s.Longitude = ?, p.Bulk_density = ?, p.Particle_density = ?, p.Void_ratio = ?, p.Total_porosity = ?, p.Moisture_content = ?, p.Water_holding_capacity = ?, p.Soil_texture = ?, p.Soil_color = ?, c.Soil_pH = ?, c.Nitrogen = ?, c.Phosphorus = ?, c.Potassium = ?, c.Cation_exchange_capacity = ? WHERE s.S_id = p.S_id AND s.S_id = c.S_id AND s.S_id = ?";
    db.query(sqlUpdate, [Location_name, Latitude, Longitude, Bulk_density, Particle_density, Void_ratio, Total_porosity, Moisture_content, Water_holding_capacity, Soil_texture, Soil_color, Soil_pH, Nitrogen, Phosphorus, Potassium, Cation_exchange_capacity, S_id], (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.delete("/api/removeSoil/:S_id", (req, res) => {
    const { S_id } = req.params;
    const sqlRemove = "DELETE FROM soil_location WHERE S_id = ?";
    db.query(sqlRemove, S_id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.delete("/api/removeSoil2/:S_id", (req, res) => {
    const { S_id } = req.params;
    const sqlRemove = "DELETE FROM physical_properties WHERE S_id = ?";
    db.query(sqlRemove, S_id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.delete("/api/removeSoil3/:S_id", (req, res) => {
    const { S_id } = req.params;
    const sqlRemove = "DELETE FROM chemical_properties WHERE S_id = ?";
    db.query(sqlRemove, S_id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.get("/api/getLocation", (req, res) => {
    const sqlGet = "SELECT * FROM soil_location";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})