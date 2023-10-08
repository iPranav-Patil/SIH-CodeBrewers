import React from "react";
import "./styles/railwayDashboard.css";
import { useNavigate } from "react-router-dom";

function RailwayDashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <header className="header">
        <button onClick={()=>{navigate('/')}} style={{color:'#ff5656'}}>Logout</button>
        <h1>Railway Dashboard</h1>
        <button className="btnclass" onClick={()=>{navigate('/map')}} >OPEN MAP</button>
      </header>
      <div >
      </div>
      <div className="containerer">
        <div className="stock-con">
          <h2>Stock Availability</h2>
          <div className="stock-availability">
            <div className="company-stock">
              <h3>Company A</h3>
              <p>Available: 30 tons</p>
            </div>
            <div className="company-stock">
              <h3>Company B</h3>
              <p>Available: 11 tons</p>
            </div>
            <div className="company-stock">
              <h3>Company C</h3>
              <p>Available: 15 tons</p>
            </div>
            <div className="company-stock">
              <h3>Company D</h3>
              <p>Available: 13 tons</p>
            </div>
          </div>
        </div>

        {/* Upcoming Train Schedule */}
        <div className="upcoming-trains">
          <h2>Upcoming Train Schedule</h2>
          <table>
            <thead>
              <tr>
                <th>Train Number</th>
                <th>Company</th>
                <th>Date</th>
                <th>Departure Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Rake 1</td>
                <td>Company A</td>
                <td>10-11-2023</td>
                <td>10:00 AM</td>
                <td data-status="On Time">On Time</td>
              </tr>
              <tr>
                <td>Rake 2</td>
                <td>Company B</td>
                <td>10-11-2023</td>
                <td>11:30 AM</td>
                <td data-status="Delayed">Delayed</td>
              </tr>
              <tr>
                <td>Rake 3</td>  
                <td>Company C</td>
                <td>10-11-2023</td>
                <td>2:15 PM</td>
                <td data-status="Early">Early</td>
              </tr>
              <tr>
                <td>Rake 3</td>  
                <td>Company D</td>
                <td>12-11-2023</td>
                <td>2:15 PM</td>
                <td data-status="On Time">On Time</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <footer>
        <section id="footerr">
          <div className="main-footer">
            <div className="logoinfo">
              <h2>CodeBrewers</h2>
              <p>SIH1319</p>
              <div className="contact-details">
                <h1>Contact Us</h1>
                <ul>
                  <li>
                    <i className="fa fa-phone"></i>
                    <a href="">011-2338 4884</a>
                  </li>
                  <li>
                    <i className="fa fa-envelope"></i>
                    <a href="mailto:yourmail@gmail.com">secy.moc@nic.in</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="com">
              <h1>About</h1>
              <div className="aboutList">
                <ul>
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Help</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="com">
              <h1>Address</h1>
              <p>
                Ministry Of Coal,
                <br />
                Shastri Bhawan,
                <br />
                New Delhi - 110 001
              </p>
            </div>
            <div className="com">
              <h1>Social Media</h1>
              <div className="socialList">
                <ul>
                  <li>
                    <a href="#">Instagram</a>
                  </li>
                  <li>
                    <a href="#">LinkedIn</a>
                  </li>
                  <li>
                    <a href="#">Twitter</a>
                  </li>
                  <li>
                    <a href="#">Youtube</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <footer>© Your Copyright 2023 All Rights Reserved</footer>
        </section>
      </footer>
    </div>
  );
}

export default RailwayDashboard;
