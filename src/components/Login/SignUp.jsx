import React, { useState } from "react";
import "./Railwaylogin.css";

function SignUpForm() {
  const [state, setState] = useState({
    page: 1,
    operatorname: "",
    companyName: "",
    email: "",
    password: "",
    positionAtCompany:"",
    age:"",
  });
  const [fileInputs, setFileInputs] = useState({
    aadharCard: null,
    companyProof: null,
  });

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    const {operatorname,companyName,email,password,positionAtCompany,age } = state;
    alert(
      `You are sign up with name: ${operatorname,companyName} email: ${email,positionAtCompany} and password: ${password,age}`
    );
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value,
    });
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
  const renderFields = () => {
    const { page } = state;

    switch (page) {
      case 1:
        return (
          <>
            <div className="page1">
            <input
              type="text"
              name="operatorname"
              value={state.operatorname}
              onChange={handleChange}
              placeholder="Operator Name"
            />
            <input
              type="text"
              name="companyName"
              value={state.companyName}
              onChange={handleChange}
              placeholder="Company Name"
            />
              <input
                type="email"
                name="email"
                value={state.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <input
                type="password"
                name="password"
                value={state.password}
                onChange={handleChange}
                placeholder="Password"
              />
              
              <input
                type="text"
                name="positionAtCompany"
                value={state.positionAtCompnay}
                onChange={handleChange}
                placeholder="Position At Company"
              />
              <input
                type="text"
                name="age"
                value={state.age}
                onChange={handleChange}
                placeholder="Age"
              />
              <button style={{boxShadow:'0px 0px 10px 0px #222'}} className="nextbtn1" onClick={handleNext}>
                Next
              </button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="page2">
              <div className="form-group">
                <label>Aadhar Card</label>
                <input
                  type="file"
                  accept=".pdf"
                  name="aadharCard"
                  onChange={handleFileChange}
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="form-group">
                <label>Incorporation Certificate</label>
                <input
                  type="file"
                  accept=".pdf"
                  name="companyProof"
                  onChange={handleFileChange}
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="navbtns">
                <button style={{boxShadow:'0px 0px 10px 0px #222'}} className="backbtn1" onClick={handleBack}>
                  Back
                </button>
                <button style={{ boxShadow: '1px 2px 10px 1px #222' }} onClick={handleOnSubmit}>
                  Sign Up
                </button>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form>
        <h1>Create Account</h1>
        {renderFields()}
      </form>
    </div>
  );
}

export default SignUpForm;
