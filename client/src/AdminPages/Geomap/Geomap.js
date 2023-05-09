import React, { useEffect, useState, useRef, useCallback } from "react";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Geomap.css";
import { MapContainer, TileLayer, Popup, useMapEvents, Marker, ZoomControl } from "react-leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerRetina from "leaflet/dist/images/marker-icon-2x.png";
import axios from "axios";

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: markerRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapComponent = () => {
  const [markers, setMarkers] = useState([]);
  const [clickedMarker, setClickedMarker] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const mapRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/getLocation`);
          console.log(response.data);
          const data = response.data;
          console.log(data);
          setMarkers(data.map(marker => ({
            latitude: marker.Latitude,
            longitude: marker.Longitude,
            location_name: marker.Location_name,
            SQI: marker.SQI,
            s_id: marker.S_id
          })));
        } catch (error) {
          console.error(error);
        }
      };

    fetchData();
  }, []);

  const center = {
    lat: 7.997001,
    lng: 124.264073,
  };
  const zoom = 13.5;
  const containerStyle = {
    position: 'absolute',
    top: '60px',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    cursor: 'default',
  };

  const mapClicked = async (event) => {
    console.log(event.latlng.lat, event.latlng.lng);
  };

  const markerClicked = (marker, index) => {
    console.log(marker.latitude, marker.longitude);
    setClickedMarker(marker);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const LeafIcon = Leaflet.Icon.extend({
    options: {},
  });

  const blueIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF"
  });

  const redIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff4136&chf=a,s,ee00FFFF",
  });
  const orangeIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FFFF00&chf=a,s,ee00FFFF",
  });
  const greenIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF",
  });

  const legendStyle = {
    position: 'fixed',
    top: '83px',
    right: '10px',
    backgroundColor: 'white',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: "0 2px 5px rgba(0,0,0,.3)",
    zIndex: '999',
  };

  const sqiLegendStyle = {
    display: "flex",
    alignItems: "center",
    margin: "5px 0",
  };
  
  const sqiCircleStyle = (color) => ({
    backgroundColor: color,
    borderRadius: "50%",
    height: "10px",
    width: "10px",
    marginRight: "5px",
  });

  return (
    <MapContainer
      style={containerStyle}
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      minZoom={13.5}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="topleft" />
      <div style={{ position: "fixed", top: "10px", left: "10px", zIndex: 999, left: '500px', width: '250px', marginTop: '63px' }}>
        <input
          type="text"
          placeholder="Search for location name..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <MapContent onClick={mapClicked} />
      {markers
        .filter((marker) => 
        marker.location_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((marker, index) => (
        marker.latitude && marker.longitude ? (
          <MarkerContent
          key={index}
          position={{ lat: marker.latitude, lng: marker.longitude }}
          draggable={true}
          index={index}
          location_name={marker.location_name}
          SQI={marker.SQI}
          s_id={marker.s_id}
          redIcon={redIcon}
          orangeIcon={orangeIcon}
          blueIcon={blueIcon}
          greenIcon={greenIcon}
          onMarkerClick={(event) => markerClicked(marker, index)}
          />
          ) : null
      ))}
      <div style={legendStyle}>
        <p><strong>Legend:</strong></p>
        <div style={sqiLegendStyle}>
          <div style={sqiCircleStyle("#2ecc71")}></div>
          <p>High SQI - Minimal crop rehabilitation needed.</p>
        </div>
        <div style={sqiLegendStyle}>
          <div style={sqiCircleStyle("#FFFF00")}></div>
          <p>Medium SQI - Urgent soil management required</p>
        </div>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;with limitations.</p>
        <div style={sqiLegendStyle}>
          <div style={sqiCircleStyle("#ff4136")}></div>
          <p>Low SQI - Urgent and severe soil management and</p>
        </div>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rehabilitation required.</p>
      </div>
    </MapContainer>
  );
};

const MapContent = ({ onClick }) => {
  const map = useMapEvents({
    click: (event) => onClick(event),
  });
  return null;
};

const MarkerContent = ({ position, draggable, onMarkerClick, onDragEnd, index, location_name, s_id, SQI, redIcon, greenIcon, orangeIcon, blueIcon }) => {
    const markerRef = useRef();

    const [icon, setIcon] = useState(redIcon);

    const changeIconColor = useCallback((SQI) => {
      if (SQI > 0.8) {
        setIcon(greenIcon);
      } else if (SQI >= 0.5 && SQI <= 0.8) {
        setIcon(orangeIcon);
      } else if (SQI < 0.5) {
        setIcon(redIcon);
      } else {
        setIcon(blueIcon);
      }
    }, [blueIcon, orangeIcon, greenIcon, redIcon]);

    useEffect(() => {
      changeIconColor(SQI);
    }, [SQI, changeIconColor]);
  
    return (
        <Marker
          position={position}
          eventHandlers={{
            click: (event) => onMarkerClick(event),
          }}
          ref={markerRef}
          icon={icon}
        >
          <Popup>
            <b>{position.lat}, {position.lng}</b>
            <br />
            <b></b>
            <br />
            <b>Location name: {location_name}</b>
            <br />
            <b></b>
            <br />
            <b>Soil Quality Index: {SQI}</b>
            <br />  
            <b></b>
            <br />
            <button style={{ backgroundColor: "#008cba", cursor: 'pointer', display: 'inline-block', padding: '5px 8px', border: 'none', color: 'white', borderRadius:'5px' }} onClick={() => { window.location.href = `/viewSoil2/${s_id}` }}>View details</button>
          </Popup>
        </Marker>
      );
    };

export default MapComponent;
