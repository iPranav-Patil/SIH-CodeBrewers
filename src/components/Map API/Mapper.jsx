import React, { useEffect, useState } from "react";
import RailwayMap from "./RailwayMap.jsx";
import { loadRailwayData } from "./DataLoader.jsx";

function MapComponent() {
  const [data, setData] = useState({ stations: [], trains: [], schedules: [] });

  useEffect(() => {
    async function fetchData() {
      const loadedData = await loadRailwayData();
      if (loadedData) {
        setData(loadedData);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="mapp" style={{margin:'100px 0 0 200px',width:'1300px',height:'60vh'}}>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
      />

      <RailwayMap 
        stations={data.stations}
        trains={data.trains}
        schedules={data.schedules}
      />
    </div>
  );
}

export default MapComponent;