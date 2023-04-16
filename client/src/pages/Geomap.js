import React, { useEffect, useState, useRef } from "react";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Popup, useMapEvents, Marker } from "react-leaflet";
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
            s_id: marker.S_id
          })));
        } catch (error) {
          console.error(error);
        }
      };

    fetchData();
  }, []);

  const center = {
    lat: 8.0106,
    lng: 124.2977,
  };
  const zoom = 13.5;
  const containerStyle = {
    position: 'absolute',
    top: '85px',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  };

  const mapClicked = async (event) => {
    console.log(event.latlng.lat, event.latlng.lng);
  };

  const markerClicked = (marker, index) => {
    console.log(marker.latitude, marker.longitude);
    setClickedMarker(marker);
  };

  // const markerDragEnd = (event, index) => {
  //   console.log(event.target.getLatLng().lat, event.target.getLatLng().lng);
  // };

  return (
    <MapContainer
      style={containerStyle}
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapContent onClick={mapClicked} />
      {markers.map((marker, index) => (
      marker.latitude && marker.longitude ? (
        <MarkerContent
         key={index}
         position={{ lat: marker.latitude, lng: marker.longitude }}
         draggable={true}
         index={index}
         location_name={marker.location_name}
         s_id={marker.s_id}
         onMarkerClick={(event) => markerClicked(marker, index)}
        // onDragEnd={(event) => markerDragEnd(event, index)}
        />
        ) : null
    ))}
    </MapContainer>
  );
};

const MapContent = ({ onClick }) => {
  const map = useMapEvents({
    click: (event) => onClick(event),
  });
  return null;
};

const MarkerContent = ({ position, draggable, onMarkerClick, onDragEnd, index, location_name, s_id }) => {
    const markerRef = useRef();
  
    // const handleDragEnd = (event) => {
    //   onDragEnd(event, index);
    // };
  
    return (
        <Marker
          position={position}
          //draggable={draggable}
          eventHandlers={{
            click: (event) => onMarkerClick(event),
            //dragend: handleDragEnd,
          }}
          ref={markerRef}
        >
          <Popup>
            <b>{position.lat}, {position.lng}</b>
            <br />
            <span>Address: {location_name}</span>
            <br />  
            <button onClick={() => { window.location.href = `/viewSoil/${s_id}` }}>View more data</button>
          </Popup>
        </Marker>
      );
    };

export default MapComponent;