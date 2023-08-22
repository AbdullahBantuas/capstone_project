const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const csv = require('csv-parser');
const multer = require('multer');
const fs = require('fs');
const crypto = require("crypto");   
const nodemailer = require("nodemailer");

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
    database: "soil_quality"
});

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use SSL/TLS if true
    auth: {
      user: "skullpuncher1011@gmail.com",
      pass: "pxoxqeredxyhwadt",
    },
  });

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

function sendVerificationEmail(toEmail, verificationToken) {
  // Compose the email message
  const mailOptions = {
    from: "skullpuncher1011@gmail.com",
    to: toEmail,
    subject: "Account Verification",
    text: `Please click the following link to verify your account: http://localhost:5000/verify/${verificationToken}`,
  };

  // Send the email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending verification email:", error);
    } else {
      console.log("Verification email sent:", info.response);
    }
  });
}

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM user WHERE Status = 'user' AND  IsVerified = '1'";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post("/api/login", (req, res) => {
    const { Username, Password } = req.body;
    const sqlQuery = "SELECT * FROM user WHERE Username = ? AND Password = ?";
    db.query(sqlQuery, [Username, Password], (err, result) => {
      if (err) {
        return res.json({ Message: "Error inside server" });
      }
      if (result.length > 0) {
        const user = result[0];
        if (user.IsVerified === 1) { // Check if account is verified (IsVerified = 1)
          return res.json({
            Login: true,
            Status: user.Status,
            U_id: user.U_id,
            IsVerified: user.IsVerified
          });
        } else {
          return res.json({
            Login: false,
            Message: "Your account has not been verified. Please check your email for the verification link."
          });
        }
      } else {
        return res.json({ Login: false });
      }
    });
  });  

app.post("/api/post", (req, res) => {
  const { Username, Password, Fullname, Email } = req.body;
  const verificationToken = crypto.randomBytes(20).toString("hex");
  const sqlInsert =
    "INSERT INTO user (Username, Password, Fullname, Email, Status, VerificationToken) VALUES (?, ?, ?, ?, 'user', ?)";
  db.query(
    sqlInsert,
    [Username, Password, Fullname, Email, verificationToken],
    (error, result) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        sendVerificationEmail(Email, verificationToken);
        res.sendStatus(200);
      }
    }
  );
});

app.get("/verify/:token", (req, res) => {
    const verificationToken = req.params.token;
    const sqlUpdate = "UPDATE user SET IsVerified = '1' WHERE VerificationToken = ?";
    db.query(sqlUpdate, [verificationToken], (error, result) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        if (result.changedRows === 1) {
          // Verification successful
          res.send("Your account has been successfully verified. You can now log in.");
        } else {
          // Invalid verification token
          res.send("Invalid verification token.");
        }
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
    const sqlGet = "SELECT * FROM soil_information a, soil_properties b, soil_location c WHERE a.S_id = b.S_id AND a.S_id = c.S_id AND b.S_id = c.S_id";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post("/api/addsoil", (req, res) => {
    const { Location_name, Latitude, Longitude, Location_description, Location_address, Soil_type, Taxonomic_classification, Sample_date, Source, Soil_description, Bulk_density, Particle_density, Void_ratio, Porosity, Moisture_content_mass, Moisture_content_volume, Water_holding_capacity, Clay, Silt, Sand, Soil_pH, Total_nitrogen, Extractable_phosphorus, Exchangeable_potassium, Cation_exchange_capacity, Organic_matter, Earthworm_density, SQI } = req.body;
  
    const sqlInsertSoilLoc = "INSERT INTO soil_location (Location_name, Latitude, Longitude, Location_description, Location_address) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlInsertSoilLoc, [Location_name, Latitude, Longitude, Location_description, Location_address], (error, result) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        const S_id = result.insertId;
        const sqlInsertSoilInfo = "INSERT INTO soil_information (S_id, Soil_type, Taxonomic_classification, Soil_description, Sample_date, Source) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(sqlInsertSoilInfo, [S_id, Soil_type, Taxonomic_classification, Soil_description, Sample_date, Source], (error, result) => {
          if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
          const S_id = result.insertId;
          const sqlInsertSoilProps = "INSERT INTO soil_properties (S_id, Bulk_density, Particle_density, Void_ratio, Porosity, Moisture_content_mass, Moisture_content_volume, Water_holding_capacity, Clay, Silt, Sand, Soil_pH, Total_nitrogen, Extractable_phosphorus, Exchangeable_potassium, Cation_exchange_capacity, Organic_matter, Earthworm_density, SQI) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
          db.query(sqlInsertSoilProps, [S_id, Bulk_density, Particle_density, Void_ratio, Porosity, Moisture_content_mass, Moisture_content_volume, Water_holding_capacity, Clay, Silt, Sand, Soil_pH, Total_nitrogen, Extractable_phosphorus, Exchangeable_potassium, Cation_exchange_capacity, Organic_matter, Earthworm_density, SQI], (error, result) => {
          if (error) {
            console.log(error);
            res.sendStatus(500);
          } else {
            res.sendStatus(200);
          }
        });
      }
    });
  }
  });
});  
app.post('/upload', upload.single('file'), (req, res) => {
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
        const query1 = 'INSERT INTO soil_location (Location_name, Latitude, Longitude, Location_description, Location_address) VALUES (?, ?, ?, ?, ?)';
        const query2 = 'INSERT INTO soil_information (S_id, Soil_type, Taxonomic_classification, Soil_description, Sample_date, Source) VALUES (?, ?, ?, ?, ?, ?)';
        const query3 = 'INSERT INTO soil_properties (S_id, Bulk_density, Particle_density, Void_ratio, Porosity, Moisture_content_mass, Moisture_content_volume, Water_holding_capacity, Clay, Silt, Sand, Soil_pH, Total_nitrogen, Extractable_phosphorus, Exchangeable_potassium, Cation_exchange_capacity, Organic_matter, Earthworm_density, SQI) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
        results.forEach((result) => {
            db.query(query1, [result.Location_name, result.Latitude, result.Longitude, result.Location_address, result.Location_description], (error, result1) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log('Inserted row into soil_information table:');
                  const S_id = result1.insertId;
                  
                  db.query(query2, [S_id, result.Soil_type, result.Taxonomic_classification, result.Soil_description, result.Sample_date, result.Source], (error, result2) => {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Inserted row into soil_properties table:');
                      const S_id = result2.insertId;

                      db.query(query3, [S_id, result.Bulk_density, result.Particle_density, result.Void_ratio, result.Porosity, result.Moisture_content_mass, result.Moisture_content_volume, result.Water_holding_capacity, result.Clay, result.Silt, result.Sand, result.Soil_pH, result.Total_nitrogen, result.Extractable_phosphorus, result.Exchangeable_potassium, result.Cation_exchange_capacity, result.Organic_matter, result.Earthworm_density, result.SQI], (error, result3) => {
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Inserted row into soil_properties table:');
                        }
                      });
                    }
                  });
                }
              });
        });
  
        res.send('Import successful');
      });
  });  
  
app.get("/api/soil/:S_id", (req, res) => {
    const { S_id } = req.params;
    const sqlGet = "SELECT * FROM soil_location c, soil_properties b,  soil_information a WHERE a.S_id = ? AND a.S_id = b.S_id AND a.S_id = c.S_id AND b.S_id = c.S_id";
    db.query(sqlGet, S_id, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/updatesoil/:S_id", (req, res) => {
    const { S_id } = req.params;
    const { Location_name, Latitude, Longitude, Location_description, Location_address, Soil_type, Taxonomic_classification, Sample_date, Source, Soil_description, Bulk_density, Particle_density, Void_ratio, Porosity, Moisture_content_mass, Moisture_content_volume, Water_holding_capacity, Clay, Silt, Sand, Soil_pH, Total_nitrogen, Extractable_phosphorus, Exchangeable_potassium, Cation_exchange_capacity, Organic_matter, Earthworm_density, SQI } = req.body;
    const sqlUpdate = "UPDATE soil_location c, soil_properties b, soil_information a SET c.Location_name = ?, c.Latitude = ?, c.Longitude = ?, c.Location_description = ?, c.Location_address = ?, a.Soil_type = ?, a.Taxonomic_classification = ?, a.Sample_date = ?, a.Source = ?, a.Soil_description = ?, b.Bulk_density = ?, b.Particle_density = ?, b.Void_ratio = ?, b.Porosity = ?, b.Moisture_content_mass = ?, b.Moisture_content_volume = ?, b.Water_holding_capacity = ?, b.Clay = ?, b.Silt = ?, b.Sand = ?, b.Soil_pH = ?, b.Total_nitrogen = ?, b.Extractable_phosphorus = ?, b.Exchangeable_potassium = ?, b.Cation_exchange_capacity = ?, b.Organic_matter = ?, b.Earthworm_density = ?, b.SQI = ? WHERE c.S_id = ? AND a.S_id = c.S_id AND a.S_id = b.S_id AND b.S_id = c.S_id";
    db.query(sqlUpdate, [Location_name, Latitude, Longitude, Location_description, Location_address, Soil_type, Taxonomic_classification, Sample_date, Source, Soil_description, Bulk_density, Particle_density, Void_ratio, Porosity, Moisture_content_mass, Moisture_content_volume, Water_holding_capacity, Clay, Silt, Sand, Soil_pH, Total_nitrogen, Extractable_phosphorus, Exchangeable_potassium, Cation_exchange_capacity, Organic_matter, Earthworm_density, SQI, S_id], (error, result) => {
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
    const sqlRemove = "DELETE FROM soil_information WHERE S_id = ?";
    db.query(sqlRemove, S_id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.delete("/api/removeSoil3/:S_id", (req, res) => {
  const { S_id } = req.params;
  const sqlRemove = "DELETE FROM soil_properties WHERE S_id = ?";
  db.query(sqlRemove, S_id, (error, result) => {
      if (error) {
          console.log(error);
      }
  });
});

app.get("/api/getLocation", (req, res) => {
    const sqlGet = "SELECT * FROM soil_location a, soil_properties b WHERE a.S_id = b.S_id";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.get("/api/soilCount", (req, res) => {
    const sqlGet = "SELECT COUNT(*) FROM soil_location";
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

app.get("/api/Kidapawan", (req, res) => {
  const sqlGet = "SELECT COUNT(*) FROM soil_information WHERE Soil_type = 'Kidapawan'";
  db.query(sqlGet, (error, result) => {
      res.send(result);
  });
}); 

app.get("/api/Adtuyon", (req, res) => {
  const sqlGet = "SELECT COUNT(*) FROM soil_information WHERE Soil_type = 'Adtuyon'";
  db.query(sqlGet, (error, result) => {
      res.send(result);
  });
}); 

app.get("/api/Langkong", (req, res) => {
  const sqlGet = "SELECT COUNT(*) FROM soil_information WHERE Soil_type = 'Langkong'";
  db.query(sqlGet, (error, result) => {
      res.send(result);
  });
}); 

app.get("/api/Bolinao", (req, res) => {
  const sqlGet = "SELECT COUNT(*) FROM soil_information WHERE Soil_type = 'Bolinao'";
  db.query(sqlGet, (error, result) => {
      res.send(result);
  });
}); 

app.get("/api/Kudarangan", (req, res) => {
  const sqlGet = "SELECT COUNT(*) FROM soil_information WHERE Soil_type = 'Kudarangan'";
  db.query(sqlGet, (error, result) => {
      res.send(result);
  });
}); 

app.get("/api/LaCastellana", (req, res) => {
  const sqlGet = "SELECT COUNT(*) FROM soil_information WHERE Soil_type = 'La Castellana'";
  db.query(sqlGet, (error, result) => {
      res.send(result);
  });
}); 

app.get("/api/Ruguan", (req, res) => {
  const sqlGet = "SELECT COUNT(*) FROM soil_information WHERE Soil_type = 'Ruguan'";
  db.query(sqlGet, (error, result) => {
      res.send(result);
  });
}); 

app.get("/api/Binidayan", (req, res) => {
  const sqlGet = "SELECT COUNT(*) FROM soil_information WHERE Soil_type = 'Binidayan'";
  db.query(sqlGet, (error, result) => {
      res.send(result);
  });
}); 

app.get("/api/Malabang", (req, res) => {
  const sqlGet = "SELECT COUNT(*) FROM soil_information WHERE Soil_type = 'Malabang'";
  db.query(sqlGet, (error, result) => {
      res.send(result);
  });
}); 

app.get("/api/Caromatan", (req, res) => {
  const sqlGet = "SELECT COUNT(*) FROM soil_information WHERE Soil_type = 'Caromatan'";
  db.query(sqlGet, (error, result) => {
      res.send(result);
  });
}); 

app.get("/api/Ramain", (req, res) => {
  const sqlGet = "SELECT COUNT(*) FROM soil_information WHERE Soil_type = 'Kudarangan'";
  db.query(sqlGet, (error, result) => {
      res.send(result);
  });
}); 

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})
