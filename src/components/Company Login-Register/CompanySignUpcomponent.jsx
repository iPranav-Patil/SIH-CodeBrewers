import React, { useState, useEffect } from "react";
import "./Companymain.css";
import hidepasswd from "../../assets/show-password.png";
import showpasswd from "../../assets/hide-password.png";
import './CSRF.js';


async function CompanySignUpcomponent() {
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [timerId, setTimerId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const [state, setState] = useState({
    page: 1,
    operatorname: "",
    companyName: "",
    email: "",
    operatorContact: "",
    companyContact: "",
    password: "",
    conpassword: "",
    positionAtCompany: "",
    address: "",
  });
  const [fileInputs, setFileInputs] = useState({
    aadharCard: null,
    companyProof: null,
  });

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    const {
      operatorname,
      companyName,
      email,
      password,
      conpassword,
      positionAtCompany,
      age,
      aadharCard,
    } = state;
    alert(
      `You are signed up with name: ${operatorname} email: ${email} and password: ${password}`
    );
  };
  let formData = new FormData();
  formData.append("aadhaar", aadharCard, aadharCard.name);
  formData.append("id_proof", companyProof, companyProof.name);
  formData.append("operator_name", operatorname);
  formData.append("company_name", companyName);
  formData.append("emp_position", positionAtCompany);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("type", "Company");

  try {
    const response = await fetch("http://127.0.0.1:8000/api/register/", {
      credentials: "include",
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken,
      },
      body: formData,
    });
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }

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
      const intervalId = setInterval(checkPassword, 1000);

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
        checkPassword(); // Check password after a delay
      }, 1000);

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
        <h2 className='heading2'>Register Your Company</h2>
        <input id='inpt'
          type="text"
          name="operatorname"
          value={state.operatorname}
          onChange={handleChange}
          placeholder="Operator Name"
        />
        <input id='inpt'
          type="text"
          name="companyName"
          value={state.companyName}
          onChange={handleChange}
          placeholder="Company Name"
        />
        <input id='inpt'
          type="text"
          name="positionAtCompany"
          value={state.positionAtCompany}
          onChange={handleChange}
          placeholder="Position At Company"
        />
        <input id='inpt'
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Company Email"
        />
        <input id='inpt'
          type="text"
          name="operatorContact"
          value={state.operatorContact}
          onChange={handleChange}
          placeholder="operator contact no"
        />
        <input id='inpt'
          type="text"
          name="companyContact"
          value={state.companyContact}
          onChange={handleChange}
          placeholder="company contact no"
        />
        <input id='inpt'
          type="text"
          name="address"
          value={state.address}
          onChange={handleChange}
          placeholder="Company Address"
        />
        <button id='bttn'
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
              <h2 className='heading2'>Register Your Company</h2>
              <div className="form-group">
                <label style={{ paddingTop: "10px" }}>Aadhar Card :</label>
                <input id='inpt'
                  type="file"
                  accept=".pdf"
                  name="aadharCard"
                  onChange={handleFileChange}
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <div className="form-group">
                <label>Incorporation Certificate:</label>
                <input id='inpt'
                  type="file"
                  accept=".pdf"
                  name="companyProof"
                  onChange={handleFileChange}
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <div className="navbtns">
                <button id='bttn'
                  style={{ boxShadow: "0px 0px 10px 0px #222" }}
                  className="backbtn1"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button id='bttn'
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
              <h2 className='heading2'>Register Your Company</h2>
              <div className="input-container">
                <input id='inpt'
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
                <input id='inpt'
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
                <button id='bttn'
                  style={{ boxShadow: "0px 0px 10px 0px #222" }}
                  className="backbtn1"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button id='bttn'
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
    <>
    <div className="form-container sign-up-container">
      <form className='frm'>
        <div>{renderFields()}</div>
      </form>
    </div>
    </>
  );
}

export default CompanySignUpcomponent;
