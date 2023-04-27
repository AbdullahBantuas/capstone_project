import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
import { useState } from "react";

export default function App() {

    //  Create the Icon
  const LeafIcon = L.Icon.extend({
    options: {}
  });

  const blueIcon = new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF"
    }),
    greenIcon = new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF"
    });

    //  Use the state hook:
  const [icon, setIcon] = useState(blueIcon);

    // This function will change the state's icon:

  const changeIconColor = (icon) => {
    if (icon.options.iconUrl === greenIcon.options.iconUrl) {
      setIcon((current) => (current = blueIcon));
    } else {
      setIcon((current) => (current = greenIcon));
    }
  };
  return (
    <div className="App">
      <h1>React-Leaflet Map</h1>
      <h2>How to change a marker color</h2>

      <MapContainer
        style={{ height: "200px" }}
        center={[40.7608, -111.891]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[40.7608, -111.891]} icon={icon}>
          <Popup>
            <h1>Salt lake City</h1>
            <button onClick={() => changeIconColor(icon)}>
              Change Marker Color
            </button>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
