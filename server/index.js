const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const csv = require('csv-parser');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, './uploads');
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    },
  });
  
const upload = multer({ storage: storage });

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Sc@nner1011",
    database: "soil_quality_index"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM user WHERE Status = 'user'";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post("/api/login", (req, res) => {
    const { Username, Password } = req.body;
    const sqlQuery = "SELECT * FROM user WHERE Username = ? AND Password = ?";
    db.query(sqlQuery, [Username, Password], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        if(result.length > 0){
            const user = result[0];
            return res.json({
                Login: true,
                Status: user.Status,
                U_id: user.U_id
            })
        } else {
            return res.json({Login: false})
        }
    });
  });

app.post("/api/post", (req, res) => {
    const { Username, Password, Fullname, Email } = req.body;
    const sqlInsert = "INSERT INTO user (Username, Password, Fullname, Email, Status) VALUES (?, ?, ?, ?, 'user')";
    db.query(sqlInsert, [Username, Password, Fullname, Email], (error, result) => {
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

app.put("/api/update2/:U_id", (req, res) => {
    const { U_id } = req.params;
    const { Username, Password, Fullname, Email } = req.body;
    const sqlUpdate = "UPDATE user SET Username = ?, Password = ?, Fullname = ?, Email = ? WHERE U_id = ?";
    db.query(sqlUpdate, [Username, Password, Fullname, Email, U_id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Error updating user data" });
        }
        res.json({ message: "User data updated successfully" });
    });
});

app.put("/api/update/:U_id", (req, res) => {
    const { U_id } = req.params;
    const sqlUpdate = "UPDATE user SET Status = 'admin' WHERE U_id = ?";
    db.query(sqlUpdate, [U_id], (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.get("/api/soil", (req, res) => {
    const sqlGet = "SELECT * FROM soil_information a, soil_properties b WHERE a.S_id = b.S_id";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post("/api/addsoil", (req, res) => {
    const { Location_name, Latitude, Longitude, Description } = req.body;
    const sqlInsert = "INSERT INTO soil_information (Location_name, Latitude, Longitude, Description) VALUES (?, ?, ?, ?);";
    db.query(sqlInsert, [Location_name, Latitude, Longitude, Description], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.post("/api/addsoil2", (req, res) => {
    const { Bulk_density, Particle_density, Void_ratio, Porosity, Moisture_content_mass, Moisture_content_volume, Water_holding_capacity, Clay, Silt, Sand, Soil_pH, Total_nitrogen, Extractable_phosphorus, Exchangeable_potassium, Cation_exchange_capacity, Organic_matter, Earthworm_density, SQI } = req.body;
    const sqlInsert = "INSERT INTO soil_properties (Bulk_density, Particle_density, Void_ratio, Porosity, Moisture_content_mass, Moisture_content_volume, Water_holding_capacity, Clay, Silt, Sand, Soil_pH, Total_nitrogen, Extractable_phosphorus, Exchangeable_potassium, Cation_exchange_capacity, Organic_matter, Earthworm_density, SQI) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [Bulk_density, Particle_density, Void_ratio, Porosity, Moisture_content_mass, Moisture_content_volume, Water_holding_capacity, Clay, Silt, Sand, Soil_pH, Total_nitrogen, Extractable_phosphorus, Exchangeable_potassium, Cation_exchange_capacity, Organic_matter, Earthworm_density, SQI], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.post('/upload1', upload.single('file'), (req, res) => {
    const filePath = req.file.path;
    const results = [];
  
    fs.createReadStream(filePath)
      .pipe(csv({ mapHeaders: ({ header }) => header.trim() }))
      .on('data', (data) => {
        if (data.Location_name) {
          data.Location_name = data.Location_name.replace(/^"(.+(?="$))"$/, '$1');
        }
        results.push(data);
      })
      .on('end', () => {
        const query = 'INSERT INTO soil_information (Location_name, Latitude, Longitude, Description) VALUES (?, ?, ?, ?)';
  
        results.forEach((result) => {
          db.query(query, [result.Location_name, result.Latitude, result.Longitude, result.Description], (error, rows) => {
            if (error) {
              console.log(error);
            } else {
              console.log('Inserted row into table1:');
            }
          });
        });
  
        res.send('Import successful');
      });
  });

  app.post('/upload2', upload.single('file'), (req, res) => {
    const filePath = req.file.path;
    const results = [];
  
    fs.createReadStream(filePath)
      .pipe(csv({ mapHeaders: ({ header }) => header.trim() }))
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', () => {
        const query = 'INSERT INTO soil_properties (Bulk_density, Particle_density, Void_ratio, Porosity, Moisture_content_mass, Moisture_content_volume, Water_holding_capacity, Clay, Silt, Sand, Soil_pH, Total_nitrogen, Extractable_phosphorus, Exchangeable_potassium, Cation_exchange_capacity, Organic_matter, Earthworm_density, SQI) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
        results.forEach((result) => {
          db.query(query, [result.Bulk_density, result.Particle_density, result.Void_ratio, result.Porosity, result.Moisture_content_mass, result.Moisture_content_volume, result.Water_holding_capacity, result.Clay, result.Silt, result.Sand, result.Soil_pH, result.Total_nitrogen, result.Extractable_phosphorus, result.Exchangeable_potassium, result.Cation_exchange_capacity, result.Organic_matter, result.Earthworm_density, result.SQI], (error, rows) => {
            if (error) {
              console.log(error);
            } else {
              console.log('Inserted row into table2:');
            }
          });
        });
  
        res.send('Import successful');
      });
  });  
  
app.get("/api/soil/:S_id", (req, res) => {
    const { S_id } = req.params;
    const sqlGet = "SELECT * FROM soil_information a, soil_properties b WHERE a.S_id = ? AND a.S_id = b.S_id";
    db.query(sqlGet, S_id, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/updatesoil/:S_id", (req, res) => {
    const { S_id } = req.params;
    const { Location_name, Latitude, Longitude, Description, Bulk_density, Particle_density, Void_ratio, Porosity, Moisture_content_mass, Moisture_content_volume, Water_holding_capacity, Clay, Silt, Sand, Soil_pH, Total_nitrogen, Extractable_phosphorus, Exchangeable_potassium, Cation_exchange_capacity, Organic_matter, Earthworm_density, SQI } = req.body;
    const sqlUpdate = "UPDATE soil_information a, soil_properties b SET a.Location_name = ?, a.Latitude = ?, a.Longitude = ?, a.Description = ?, b.Bulk_density = ?, b.Particle_density = ?, b.Void_ratio = ?, b.Porosity = ?, b.Moisture_content_mass = ?, b.Moisture_content_volume = ?, b.Water_holding_capacity = ?, b.Clay = ?, b.Silt = ?, b.Sand = ?, b.Soil_pH = ?, b.Total_nitrogen = ?, b.Extractable_phosphorus = ?, b.Exchangeable_potassium = ?, b.Cation_exchange_capacity = ?, b.Organic_matter = ?, b.Earthworm_density = ?, b.SQI = ? WHERE a.S_id = b.S_id AND a.S_id = ?";
    db.query(sqlUpdate, [Location_name, Latitude, Longitude, Description, Bulk_density, Particle_density, Void_ratio, Porosity, Moisture_content_mass, Moisture_content_volume, Water_holding_capacity, Clay, Silt, Sand, Soil_pH, Total_nitrogen, Extractable_phosphorus, Exchangeable_potassium, Cation_exchange_capacity, Organic_matter, Earthworm_density, SQI, S_id], (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.delete("/api/removeSoil/:S_id", (req, res) => {
    const { S_id } = req.params;
    const sqlRemove = "DELETE FROM soil_information WHERE S_id = ?";
    db.query(sqlRemove, S_id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.delete("/api/removeSoil2/:S_id", (req, res) => {
    const { S_id } = req.params;
    const sqlRemove = "DELETE FROM soil_properties WHERE S_id = ?";
    db.query(sqlRemove, S_id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.get("/api/getLocation", (req, res) => {
    const sqlGet = "SELECT * FROM soil_information a, soil_properties b WHERE a.S_id = b.S_id";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.get("/api/soilCount", (req, res) => {
    const sqlGet = "SELECT COUNT(*) FROM soil_information";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.get("/api/userCount", (req, res) => {
    const sqlGet = "SELECT COUNT(*) FROM user WHERE Status = 'user'";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.get("/api/adminCount", (req, res) => {
    const sqlGet = "SELECT COUNT(*) FROM user WHERE Status = 'admin'";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.get("/api/soilCountHigh", (req, res) => {
    const sqlGet = "SELECT COUNT(*) FROM soil_properties WHERE SQI > '0.8'";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.get("/api/soilCountMed", (req, res) => {
    const sqlGet = "SELECT COUNT(*) FROM soil_properties WHERE SQI <= '0.8' AND SQI >= '0.5'";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.get("/api/soilCountLow", (req, res) => {
    const sqlGet = "SELECT COUNT(*) FROM soil_properties WHERE SQI < '0.5'";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.get('/api/checksoil', (req, res) => {
    const { Location_name, Latitude, Longitude } = req.query;
    const query = `SELECT * FROM soil_information WHERE Location_name = '${Location_name}' AND Latitude = '${Latitude}' AND Longitude = '${Longitude}'`;
    db.query(query, (err, rows, fields) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error fetching data from database');
      } else if (rows.length > 0) {
        res.status(400).send('Data already exists');
      } else {
        res.send('Data does not exist');
      }
    });
  });
  

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})
