import React, { useState, useEffect, useRef } from "react";
import { Grid, Typography, TextField } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import axios from "axios";
import ReactToPrint from "react-to-print";
import "../SoilData/ViewSoil.css";

const RootStyle = styled("div")(({ theme }) => ({
  padding: "20vh",
}));

export default function About() {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const componentRef = useRef();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/soil/${id}`)
      .then((resp) => setUser({ ...resp.data[0] }));
  }, [id]);

  return (
    <>
      <RootStyle ref={componentRef}>
        <Grid container direction="column" alignItems="center">
          <Typography
            variant="h5"
            sx={{ color: " black", textAlign: "center" }}
          >
            SOIL INFORMATION
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          sx={{ paddingTop: 5 }}
        >
          <Typography
            variant="h6"
            sx={{ color: " black", textAlign: "center" }}
          >
            A. Soil Location Detail
          </Typography>
        </Grid>
        <Grid container direction="row" sx={{ paddingTop: 5 }} spacing={5}>
          <Grid item md={3} direction="column">
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                Location name:
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                Latitude:
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                Longitude:
              </Typography>
            </div>
          </Grid>
          <Grid item direction="column" md={3}>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                {user.Location_name}
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                {user.Latitude}
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                {user.Longitude}
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          sx={{ paddingTop: 5 }}
        >
          <Typography
            variant="h6"
            sx={{ color: " black", textAlign: "center" }}
          >
            B. Soil Properties
          </Typography>
        </Grid>
        <Grid container direction="row" sx={{ paddingTop: 5 }}>
          <Grid item md={3}>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                Bulk density:
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                Particle density:
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                Void ratio:
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                Porosity:
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                Moisture content(mass):
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                Moisture content(volume):
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                Water holding capacity:
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                Clay:
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                Silt:
              </Typography>
            </div>
          </Grid>
          <Grid item md={3}>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                {user.Bulk_density}
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                {user.Particle_density}
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                {user.Void_ratio}
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                {user.Porosity}
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                {user.Moisture_content_mass}
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                {user.Moisture_content_volume}
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                {user.Water_holding_capacity}
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                {user.Clay}
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                {user.Silt}
              </Typography>
            </div>
          </Grid>
          <Grid item md={3}>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                Sand:
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                Soil pH:
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                Total nitrogen:
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                Extractable phosphorus:
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                Exchangeable potassium:
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                Cation exchange capacity:
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                Organic matter:
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                Earthworm density:
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                SQI(Soil quality index):
              </Typography>
            </div>
          </Grid>
          <Grid item direction="column" md={3}>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                {user.Sand}
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                {user.Soil_pH}
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                {user.Total_nitrogen}
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                {user.Extractable_phosphorus}
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                {user.Exchangeable_potassium}
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                {user.Cation_exchange_capacity}
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                {user.Organic_matter}
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                {user.Earthworm_density}
              </Typography>
            </div>
            <div>
              <Typography
                variant="h7"
                sx={{ color: " black", textAlign: "center" }}
              >
                {user.SQI}
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          sx={{ paddingTop: 5 }}
        >
          <Typography
            variant="h6"
            sx={{ color: " black", textAlign: "center" }}
          >
            Description
          </Typography>
        </Grid>
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          sx={{ paddingTop: 5 }}
        >
          <TextField
            multiline
            disabled
            sx={{ bgcolor: "white", width: "170vh" }}
            value={user.Description}
          />
        </Grid>
        <Link to="/soildata">
            <div className="btn btn-edit">Go Back</div>
        </Link>
        <ReactToPrint
            trigger={() => <button className="btn btn-view" onClick={() => window.print()}>Print</button>}
            content={() => componentRef.current}
        />
      </RootStyle>
    </>
  );
}
