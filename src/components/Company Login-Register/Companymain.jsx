import React, { useState } from "react";
import "./Companymain.css";
import CompanySignIncomponent from "./CompanySignIncomponent";
import CompanySignUpcomponent from "./CompanySignUpcomponent";
import backbtn from "../../assets/back-btn.png";
import { useNavigate } from "react-router-dom";

export default function Companymain() {
  const navigate = useNavigate();
  const [type, setType] = useState("signIn");
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="Main">
      <div className="backbtn">
        <img
          src={backbtn}
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div className={containerClass} id="container">
        <CompanySignUpcomponent />
        <CompanySignIncomponent />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="heading1">Welcome Back!</h1>
              <p className="para">
                To keep connected with us please login with your personal info
              </p>
              <button
                id="bttn"
                className="ghost"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="heading1">Hello, Friend!</h1>
              <p className="para">
                Enter your personal details and start journey with us
              </p>
              <button
                id="bttn"
                className="ghost "
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
