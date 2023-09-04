import React from "react";
import "./Landing.css";
import { useNavigate } from "react-router-dom";
import carousel from "../../assets/carousel-bgrm.png";


export default function Landing() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <nav>
          <div className="nav-container">
            <div className="logo">
              <h2>Code Brewers</h2>
            </div>
            <div className="btn-container" style={{ gap: "10px" }}>
              <button
                className="login-btn"
                onClick={() => navigate("/railwaymain")}
                style={{ width: "auto" }}
              >
                Railway Login
              </button>
              <button
                className="login-btn"
                onClick={() => navigate("/companymain")}
                style={{ width: "auto" }}
              >
                Company Login
              </button>
            </div>
          </div>
        </nav>
        <div className="hero-container">
          <div className="hero-content">
            <h1>
              Your trusted partner{" "}
              <span>
                <br></br>Code Brewers!
              </span>
            </h1>
            <p>
              At <b>CodeBrewers</b>, we deliver top-notch professional services
              tailored to meet your specific needs. With our extensive expertise
              and commitment to excellence, we are your trusted partner for all
              your requirements.
            </p>
            <p>
              We assure you that we will provide you the best service possible
              and a smooth path to your fixings.
            </p>
            <button
              className="learn-more"
              onClick={() => navigate("/companymain")}
            >
              <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
              </span>
              <span className="button-text">Get Started</span>
            </button>
          </div>
          <div className="hero-img">
            <img src={carousel} alt="" className="electrician" />
          </div>
        </div>
      </div>
    </>
  );
}
