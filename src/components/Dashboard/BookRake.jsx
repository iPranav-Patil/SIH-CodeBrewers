import React from "react";
import { useState, useEffect } from "react";
import "../Dashboard/styles/BookRake.css";

export const data = [];

export const BookRake = () => {
  const [loadingStation, setLoadingStation] = useState("");
  const [stationTo, setStationTo] = useState("");
  const [weight, setWeight] = useState(0);
  const [date, setDate] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    const form_output = {
      loading_station: loadingStation,
      station_to: stationTo,
      weight,
      date,
    };
    data.push(form_output);
    console.log(data);
    setLoadingStation("");
    setStationTo("");
    setWeight(0);
    setDate("");
  };

  return (
    <div id="book-body">
      <div id="book-box">
        <div className="booking-heading  d-flex justify-content-center">
          <h2>BOOK A RAKE</h2>
        </div>
        <div className="container-fluid">
          <form action="#" onSubmit={handleSubmit}>
            <div className="container-fluid">
              <label htmlFor="loading_station">
                <h3>Loading Station : </h3>
              </label>

              <select
                required
                name="loading_station"
                id="station"
                value={loadingStation}
                onChange={e => {
                  setLoadingStation(e.target.value);
                }}
              >
                <option value="" disabled defaultValue={""} hidden>
                  Station
                </option>
                <option value="BYFS">BYFS</option>
                <option value="JMTC">JMTC</option>
                <option value="BSPX">BSPX</option>
                <option value="CPE">CPE</option>
                <option value="SOBK">SOBK</option>
                <option value="BXF">BXF</option>
              </select>
            </div>
            <div className="container-fluid">
              <label htmlFor="station_to">
                <h3>Station To : </h3>
              </label>
              <select
                required
                name="station_to"
                id="station_to"
                value={stationTo}
                onChange={e => {
                  setStationTo(e.target.value);
                }}
              >
                <option value="" disabled defaultValue={""} hidden>
                  Station
                </option>
                <option value="DSEY">DSEY</option>
                <option value="TSLJ">TSLJ</option>
                <option value="MOMG">MOMG</option>
                <option value="DDIP">DDIP</option>
                <option value="BSCS">BSCS</option>
                <option value="BPSL">BPSL</option>
              </select>
            </div>
            <div className="container-fluid">
              <label htmlFor="weight">
                <h3>
                  Cargo Weight <span>(in Tonnes)</span> :{" "}
                </h3>
              </label>
              <input
                required
                type="number"
                id="weight"
                name="weight"
                min="1"
                max="3800"
                value={weight}
                onChange={e => setWeight(e.target.value)}
              />
            </div>
            <div className="container-fluid">
              <label htmlFor="date">
                <h3>Date : </h3>
              </label>
              <input
                required
                type="date"
                id="date"
                name="date"
                value={date}
                onChange={e => {
                  setDate(e.target.value);
                }}
              />
            </div>
            <div className="container d-flex justify-content-end">
              <button type="submit">SUBMIT</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
