import React, { useState, useEffect } from "react";
import "./Railwaymain.css";
import hidepasswd from "../../assets/show-password.png";
import showpasswd from "../../assets/hide-password.png";
import getCookie from "../Company Login-Register/CSRF";

export default function RailwaySignUpcomponent() {
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [timerId, setTimerId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const delay = 3000;

  const [state, setState] = useState({
    page: 1,
    operatorname: "",
    ClusterDivision: "",
    email: "",
    operatorContact: "",
    railwayContact: "",
    password: "",
    conpassword: "",
    pfNumber: "",
    address: "",
    location: "",
  });
  const [fileInputs, setFileInputs] = useState({
    aadharCard: null,
    idproof: null,
  });

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    const csrftoken1 = getCookie("csrftoken");

    const {
      operatorname,
      ClusterDivision,
      email,
      password,
      pfNumber,
      operatorContact,
      railwayContact,
      address,
      location,
    } = state;

    const { aadharCard, idproof } = fileInputs;
    alert(
      `You are signed up with name: ${operatorname} email: ${email} and password: ${password}`
    );
    const formData = new FormData();

    formData.append("operator_name", operatorname);
    formData.append("division", ClusterDivision);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("pf_no", pfNumber);
    formData.append("org_contact_no", railwayContact);
    formData.append("contact_no", operatorContact);
    formData.append("address", address);
    formData.append("location", location);
    formData.append("aadhar_card", aadharCard, aadharCard.name);
    formData.append("id_proof", idproof, idproof.name);

    const response1 = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken1,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        type: "railway",
      }),
    });
    const data = await response1.json();
    console.log(data);
    formData.append("user", data.id);

    const csrftoken2 = getCookie("csrftoken");
    const response2 = await fetch(
      "http://127.0.0.1:8000/api/register-railway/",
      {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken2,
        },
        body: formData,
      }
    );
    const data1 = await response2.json();
    console.log(data1);
  };

  const checkPassword = () => {
    const { password, conpassword } = state;
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

    if (!password.match(passwordPattern)) {
      setPasswordMatch(false);
      setPasswordMessage(
        "Password must contain at least 1 uppercase, 1 lowercase letter, 1 digit, and be at least 8 characters long."
      );
    } else if (password !== conpassword) {
      setPasswordMatch(false);
      setPasswordMessage("❌Passwords do not match!");
    } else {
      setPasswordMatch(true);
      setPasswordMessage("✔️Passwords match!");
    }
  };

  // UseEffect to continuously check password after a delay
  useEffect(() => {
    if (state.page === 3) {
      const intervalId = setInterval(checkPassword, delay);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [state]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value,
    });

    if (timerId) {
      clearTimeout(timerId);
    }

    if (state.page === 3) {
      var newTimerId = setTimeout(() => {
        checkPassword();
      }, delay);

      setTimerId(newTimerId);
    }
  };

  const handleFileChange = (evt) => {
    const { name, files } = evt.target;
    setFileInputs({
      ...fileInputs,
      [name]: files[0],
    });
  };

  const handleNext = () => {
    setState({
      ...state,
      page: state.page + 1,
    });
  };

  const handleBack = () => {
    setState({
      ...state,
      page: state.page - 1,
    });
  };

  const initialpage = (
    <>
      <div className="page1">
        <h2 className="heading2">Railway Registration</h2>
        <input
          id="inpt"
          type="text"
          name="operatorname"
          value={state.operatorname}
          onChange={handleChange}
          placeholder="Operator Name"
        />
        <input
          id="inpt"
          type="text"
          name="ClusterDivision"
          value={state.ClusterDivision}
          onChange={handleChange}
          placeholder="Cluster/Division"
        />
        <input
          id="inpt"
          type="text"
          name="pfNumber"
          value={state.pfNumber}
          onChange={handleChange}
          placeholder="PF Number"
        />
        <input
          id="inpt"
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Railway Email"
        />
        <input
          id="inpt"
          type="text"
          name="operatorContact"
          value={state.operatorContact}
          onChange={handleChange}
          placeholder="operator contact no"
        />
        <input
          id="inpt"
          type="text"
          name="railwayContact"
          value={state.railwayContact}
          onChange={handleChange}
          placeholder="Railway Contact no"
        />
        <button
          id="bttn"
          style={{ boxShadow: "0px 0px 10px 0px #222", marginTop: "5px" }}
          className="nextbtn1"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </>
  );

  const renderFields = () => {
    const { page } = state;

    switch (page) {
      case 1:
        return initialpage;

      case 2:
        return (
          <>
            <div className="page2">
              <h2 className="heading2">Railway Registration</h2>
              <div className="form-group">
                <label style={{ paddingTop: "10px" }}>Address</label>
                <input
                  id="inpt"
                  type="text"
                  name="address"
                  value={state.address}
                  onChange={handleChange}
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <div className="form-group">
                <label style={{ paddingTop: "10px" }}>Location</label>
                <input
                  id="inpt"
                  type="text"
                  name="location"
                  value={state.location}
                  onChange={handleChange}
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <div className="form-group">
                <label style={{ paddingTop: "10px" }}>Aadhar Card :</label>
                <input
                  id="inpt"
                  type="file"
                  accept=".pdf"
                  name="aadharCard"
                  onChange={handleFileChange}
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <div className="form-group">
                <label style={{ paddingTop: "10px" }}>ID Proof:</label>
                <input
                  id="inpt"
                  type="file"
                  accept=".pdf"
                  name="idproof"
                  onChange={handleFileChange}
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <div className="navbtns">
                <button
                  id="bttn"
                  style={{ boxShadow: "0px 0px 10px 0px #222" }}
                  className="backbtn1"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button
                  id="bttn"
                  style={{ boxShadow: "0px 0px 10px 0px #222" }}
                  className="nextbtn2"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <div className="page3">
              <h2 className="heading2">Railway Registration</h2>
              <div className="input-container">
                <input
                  id="inpt"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input-password"
                  value={state.password}
                  onChange={handleChange}
                  placeholder="password"
                  style={{ paddingRight: "50px" }}
                />
                <img
                  className="image"
                  title={showPassword ? "Hide password" : "Show password"}
                  src={showPassword ? hidepasswd : showpasswd}
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              </div>
              <div className="input-container">
                <input
                  id="inpt"
                  type={showPassword1 ? "text" : "password"}
                  name="conpassword"
                  className="input-password"
                  value={state.conpassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                />
                <img
                  className="image"
                  title={showPassword1 ? "Hide password" : "Show password"}
                  src={showPassword1 ? hidepasswd : showpasswd}
                  onClick={() => setShowPassword1((prevState) => !prevState)}
                />
              </div>

              {passwordMessage && (
                <h5
                  style={{
                    color: passwordMatch ? "green" : "red",
                    position: "relative",
                    width: "fit-content",
                    textAlign: "left",
                    margin: "0 0 10px 0",
                  }}
                >
                  {passwordMessage}
                </h5>
              )}
              <div className="navbtns" style={{ marginTop: "10px" }}>
                <button
                  id="bttn"
                  style={{ boxShadow: "0px 0px 10px 0px #222" }}
                  className="backbtn1"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button
                  id="bttn"
                  style={{ boxShadow: "1px 2px 10px 1px #222" }}
                  onClick={handleOnSubmit}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </>
        );

      default:
        return initialpage;
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form className="frm" onSubmit={handleOnSubmit}>
        <div>{renderFields()}</div>
      </form>
    </div>
  );
}
