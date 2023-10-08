import React from "react";

export const DashBoardItem = ({
  booking_date,
  loading_station,
  station_to,
  weight,
  date,
  et,
}) => {
  return (
    <div className="card mt-5 mb-5">
      <div className="card-header d-flex justify-content-end ">
        Booked at {booking_date}
      </div>
      <div className="card-body">
        <div className=" d-flex justify-content-between mb-2">
          <h5>Loading Station : </h5>
          <h5>{loading_station}</h5>
        </div>
        <div className=" d-flex justify-content-between mb-2">
          <h5>Station To : </h5>
          <h5>{station_to}</h5>
        </div>
        <div className=" d-flex justify-content-between mb-2">
          <h5>Cargo Weight : </h5>
          <h5>{weight} tonnes</h5>
        </div>
        <div className=" d-flex justify-content-between mb-2">
          <h5>Indent Date: </h5>
          <h5>{date}</h5>
        </div>
        <div className=" d-flex justify-content-between mb-2">
          <h5>Expected Arrival Time : </h5>
          <h5>{et}</h5>
        </div>

        <p className="card-text">
          The arrival time may fluctuate subject to overhead delays.
        </p>
        <div className="container d-flex justify-content-end">
          <a href="#" className="btn btn-dark">
            Details
          </a>
        </div>
      </div>
    </div>
  );
};
