import React from "react";
import "./styles/CompanyDashboard.css";

function CompanyDashboard() {
  return (
    <div className="CompanyDashboard">
      <header className="header">
        <h1>Company's Dashboard</h1>
      </header>
      <section className="stock-cards">
        {/* Stock Cards */}
        <div className="stock-card total">
          <h2>Total Stock</h2>
          <p id="old-stock-quantity">New Quantity: 50,000 tons</p>
        </div>
        <div className="stock-card out-of-stock">
          <h2>Update Stock</h2>
          <p>Click here to update</p>
          <button id="update-stock-button">Update</button>
        </div>
        <div className="stock-card low-stock">
          <h2>Demurrage Cost</h2>
          <p>Calculate the demurrage cost</p>
          <button id="update-stock-button">Click here</button>
        </div>
        <div className="stock-card max-stock">
          <h2>Schedule</h2>
          <button id="update-stock-button">Check Schedule</button>
        </div>
      </section>

      <section>
        {/* Popup Form */}
        <div id="popupBG">
          <div id="update-stock-form" className="popup-form">
            <h2>Update Coal Stock</h2>
            <p>Enter the quantity of coal in tons:</p>
            <input
              type="number"
              id="coal-quantity"
              placeholder="Enter quantity"
            />
            <button id="increase-button">Increase</button>
            <button id="decrease-button">Decrease</button>
            <button id="close-button">Close</button>
          </div>
        </div>
      </section>

      <section className="order-list">
        {/* Purchase Orders Table */}
        <h2>Purchase Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Rake</th>
              <th>Quantity (tons)</th>
              <th>Type</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {/* Dynamic content for purchase orders goes here */}
            <tr>
              <td>PO-001</td>
              <td>Rake-001</td>
              <td>500</td>
              <td>Lignite</td>
              <td className="Delivered">Delivered</td>
              <td>23-09-2023</td>
            </tr>
            <tr>
              <td>PO-002</td>
              <td>Rake-002</td>
              <td>700</td>
              <td>Anthracite</td>
              <td className="Processing">Processing</td>
              <td>26-09-2023</td>
            </tr>
            <tr>
              <td>PO-003</td>
              <td>Rake-003</td>
              <td>350</td>
              <td>Bituminous</td>
              <td className="Processing">Processing</td>
              <td>29-09-2023</td>
            </tr>
            <tr>
              <td>PO-004</td>
              <td>Rake-004</td>
              <td>800</td>
              <td>Subbituminous</td>
              <td className="Delivered">Delivered</td>
              <td>30-09-2023</td>
            </tr>
            <tr>
              <td>PO-005</td>
              <td>Rake-005</td>
              <td>250</td>
              <td>Peat</td>
              <td className="Processing">Processing</td>
              <td>02-10-2023</td>
            </tr>
            <tr>
              <td>PO-006</td>
              <td>Rake-006</td>
              <td>600</td>
              <td>Coal Blend</td>
              <td className="Delivered">Delivered</td>
              <td>05-10-2023</td>
            </tr>
            <tr>
              <td>PO-007</td>
              <td>Rake-007</td>
              <td>450</td>
              <td>Peat</td>
              <td className="Processing">Processing</td>
              <td>08-10-2023</td>
            </tr>
          </tbody>
        </table>
      </section>

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

export default CompanyDashboard;
