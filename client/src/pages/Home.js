// import React ,{useRef, useEffect} from 'react';
// import 'react-toastify/dist/ReactToastify.css';
// import {loadModules} from "esri-loader";
// import axios from "axios";

// function Home() {
//     const MapEl = useRef(null);
//     //const [data, setData] = useState([]);
//     useEffect(
//       ()=>{
//         let view;

//       loadModules(["esri/views/MapView","esri/WebMap","esri/layers/GeoJSONLayer"], {
//         css:true
//       }).then(([MapView,WebMap,GeoJSONLayer])=>{
//           const webmap = new WebMap({
//             basemap:'topo-vector'
//           })
//           view = new MapView({
//             map:webmap,
//             center:[124.2977, 8.0106],
//             //center:[-83, 42],
//             zoom:14,
//             container:MapEl.current
//           })
//           const geojsonLayer = new GeoJSONLayer({

//             url: axios.get('http://localhost:5000/api/soil')
//             //url:"http://localhost:5000/api/soil"
//             //url: "https://raw.githubusercontent.com/adarshvarma15/mygeojson/main/RMS_Crime_Incidents%20edited.geojson"
//           });
//           webmap.add(geojsonLayer)
//       })
//       return()=>{
//         if(!!view){
//           view.destroy()
//           view=null
//         }
//       }
//       })
//     return (
//         <div style={{height:500, width:900, paddingLeft: 200, marginTop: 30, display: 'flex'}} ref={MapEl}>
          
//         </div>
//       );
// }

// export default Home;

// import React from "react";
// //import { Map, GoogleApiWrapper } from 'google-maps-react';
// import GoogleMapReact from 'google-map-react';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// function Home() {
//   const defaultProps = {
//     center: {
//       lat: 10.99835602,
//       lng: 77.01502627
//     },
//     zoom: 11
//   };

//   return (
//     // Important! Always set the container height explicitly
//     <div style={{ height: '100vh', width: '100%' }}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: "AIzaSyCQh6cAdTqXUr3EYbuLGb_82_osnQb_utg" }}
//         defaultCenter={defaultProps.center}
//         defaultZoom={defaultProps.zoom}
//       >
//         <AnyReactComponent
//           lat={59.955413}
//           lng={30.337844}
//           text="My Marker"
//         />
//       </GoogleMapReact>
//     </div>
//   );
// }

// export default Home;

//GG BAnanananaanan
import React, { useRef, useState } from "react";
import Leaflet from "leaflet"
import "leaflet/dist/leaflet.css" 
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"
import markerRetina from "leaflet/dist/images/marker-icon-2x.png"

Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: markerRetina,
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});

const MapComponent = () => { 
    const mapRef = useRef();
    const zoom = 13.5;
    const containerStyle = {
        width: 900,
        height: 500,
        paddingRight: 200,
        marginTop: 30, 
        marginLeft: 50,
        marginRight: 30,
        display: 'flex'
    }
    const center = {
        lat: 8.0106,
        lng: 124.2977
    }
    const initialMarkers = [
        {
            position: {
                lat: 7.9938,
                lng: 124.2619
            },
            draggable: false
        },
        {
            position: {
                lat: 8.0045,
                lng: 124.2838
            },
            draggable: false
        },
        {
            position: {
                lat: 7.9990,
                lng: 124.2582
            },
            draggable: false
        },
    ];

    const [markers, setMarkers] = useState(initialMarkers);

    const mapClicked = async (event) => {
        console.log(event.latlng.lat, event.latlng.lng)   
    }

    const markerClicked = (marker, index) => {   
        console.log(marker.position.lat, marker.position.lng) 
    }

    const markerDragEnd = (event, index) => {
        console.log(event.lat, event.lng)
    } 

    return (
        <MapContainer
            style={containerStyle}
            center={center}
            zoom={zoom}
            scrollWheelZoom={false}
            ref={mapRef}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapContent
                onClick={mapClicked}
            />
            {markers.map((marker, index) => (
                <MarkerContent
                    key={index}
                    position={marker.position}
                    draggable={marker.draggable}
                    onMarkerClick={event => markerClicked(marker, index)}
                    onDragEnd={event => markerDragEnd(event, index)}
                />
            ))}
        </MapContainer>
    );
};

const MapContent = ({ onClick }) => {  
    const map = useMapEvents({
        click: event => onClick(event)
    }) 
    return null;
}

const MarkerContent = (props) => {
    const markerRef = useRef();
    const { position, draggable, onMarkerClick, onDragEnd } = props;  
    
    return <Marker
        position={position}
        draggable={draggable}
        eventHandlers={{
            click: event => onMarkerClick(event),
            dragend: () => onDragEnd(markerRef.current.getLatLng())
        }}
        ref={markerRef}
    >
        <Popup>
            <b>{position.lat}, {position.lng}</b>
        </Popup>
    </Marker>
}

export default MapComponent;
