import React from "react";
import "../Dashboard/styles/Dashboard.css";
import { useState } from "react";
import DashBoardItem from './DashBoardItem'

export const data = [
  {
    id: 1,
    booking_date: "01-09-2023",
    loading_station: "BYFS",
    station_to: "TSLJ",
    weight: 180,
    date: "18-12-2018",
    et: "06:00",
  },

  {
    id: 2,
    booking_date: "02-09-2023",
    loading_station: "JMTC",
    station_to: "BSPX",
    weight: 211,
    date: "21-03-2023",
    et: "08:00",
  },
  {
    id: 3,
    booking_date: "03-09-2023",
    loading_station: "CPE",
    station_to: "BPSL",
    weight: 1300,
    date: "08-06-2023",
    et: "16:00",
  },
];

const stockData = 150;

export const Dashboard = () => {
  const [updatedStockData, setUpdatedStockData] = useState(stockData);

  const handleChange = e => {
    e.preventDefault();
    setUpdatedStockData(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
  };
  return (
    <div id="dashboard-body">
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Stock Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="" onSubmit={handleSubmit}>
                <label htmlFor="updatedStock">Stock (in tonnes) : </label>
                <input
                  type="number"
                  id="updatedStock"
                  value={updatedStockData}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className="btn btn-dark"
                  data-bs-dismiss="modal"
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="box-dashboard" className="grid grid-cols-2 gap-4">
        <div className="card mt-5 mb-5">
          <div className="card-header">
            <h5>Tata Inc</h5>
          </div>
          <div className="card-body">
            <div className=" d-flex justify-content-between mb-2">
              <h5>Coal Stock Details : </h5>
              <span> {updatedStockData} Tonnes</span>
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-dark"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Update
              </button>
            </div>
            <div className="updateStockForm"></div>
          </div>
        </div>
        <div className="container bg-white p-3 border border-grey">
          <h4>Schedule : </h4>
        </div>
        {data.map(obj => {
          return <DashBoardItem {...obj} key={obj.id} />;
        })}
      </div>
    </div>
  );
};
