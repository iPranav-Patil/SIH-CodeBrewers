import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { RakeMarker } from "./markers/RakeMarker";
import { SourceMarker } from "./markers/SourceMarker";
import { ConsumerMarker } from "./markers/ConsumerMarker";
import "leaflet/dist/leaflet.css";
import "./map.css";

const Map = (props) => {
  const [rakes, setRakes] = useState([]);
  const [sources, setSources] = useState([]);
  const [consumers, setConsumers] = useState([]);

  const getRakes = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/get-rakes/", {
        credentials: "include",
      });
      const data = await response.json();
      console.log(data[0].location.split(",")[0]);
      setRakes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSources = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/get-sources/", {
        credentials: "include",
      });
      const data = await response.json();
      console.log(data[0].location.split(",")[0]);
      setSources(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getConsumers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/get-consumers/", {
        credentials: "include",
      });
      const data = await response.json();
      console.log(data[0].location.split(",")[0]);
      setConsumers(data);
    } catch (error) {
      console.log(error);
    }
  };

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
      getRakes();
      getSources();
      getConsumers();
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <MapContainer center={[20.5937, 78.9629]} zoom={5} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {rakes &&
          rakes.map((rake) => {
            const coordsRake = rake.location.split(",");
            return (
              <Marker
                key={`rake-${rake.id}`}
                position={[Number(coordsRake[0]), Number(coordsRake[1])]}
                icon={RakeMarker}
              >
                <Popup>{rake.id}</Popup>
              </Marker>
            );
          })}
        {sources &&
          sources.map((source) => {
            const coordsSource = source.location.split(",");
            return (
              <Marker
                key={`source-${source.id}`}
                position={[Number(coordsSource[0]), Number(coordsSource[1])]}
                icon={SourceMarker}
              >
                <Popup>{source.id}</Popup>
              </Marker>
            );
          })}
        {consumers &&
          consumers.map((consumer) => {
            const coordsConsumer = consumer.location.split(",");
            return (
              <Marker
                key={`consumer-${consumer.id}`}
                position={[
                  Number(coordsConsumer[0]),
                  Number(coordsConsumer[1]),
                ]}
                icon={ConsumerMarker}
              >
                <Popup>{consumer.id}</Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
};

export default Map;
