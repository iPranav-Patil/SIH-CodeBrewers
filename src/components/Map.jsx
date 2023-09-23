import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { RakeMarker } from "./markers/RakeMarker";
import { SourceMarker } from "./markers/SourceMarker";
import { ConsumerMarker } from "./markers/ConsumerMarker";
import "leaflet/dist/leaflet.css";
import "./map.css";

const Map = (props) => {
  const [coords, setCoords] = useState([51.505, -0.09]);
  const [location, setLocation] = useState("London");
  const [data, setData] = useState({});

  const getData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8003/sample.json", {
        mode: "cors",
      });
      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div
      onClick={() => {
        setLocation("Mumbai");
        setCoords([coords[0] + 1, coords[1] + 1]);
      }}
    >
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data?.rakes &&
          data.rakes.map((rake) => {
            return (
              <Marker position={rake.location} icon={RakeMarker}>
                <Popup>{rake.id}</Popup>
              </Marker>
            );
          })}
        {data?.sources &&
          data.sources.map((source) => {
            return (
              <Marker position={source.location} icon={SourceMarker}>
                <Popup>{source.id}</Popup>
              </Marker>
            );
          })}
        {data?.consumers &&
          data.consumers.map((consumer) => {
            return (
              <Marker position={consumer.location} icon={ConsumerMarker}>
                <Popup>{consumer.id}</Popup>
              </Marker>
            );
          })}
        {/* <Marker position={[52.52, 13.405]}>
          <Popup>111</Popup>
        </Marker>
        <Marker position={[52.53, 13.415]}>
          <Popup>222</Popup>
        </Marker>
        <Marker position={[52.52768294899051, 13.412682948990506]}>
          <Popup>333</Popup>
        </Marker> */}
      </MapContainer>
    </div>
  );
};

export default Map;
