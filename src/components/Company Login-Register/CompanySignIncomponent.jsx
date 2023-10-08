
import React from "react";
import getCookie from "./CSRF";
import { useNavigate } from "react-router-dom";

function CompanySignIncomponent() {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const csrftoken = getCookie("csrftoken");

    const { email, password } = state;
    alert(`You are login with email: ${email} and password: ${password}`);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await response.json();
      console.log(data);
      navigate("/");
    } catch (err) {
      console.error(err);
    }

    for (const key in state) {
      setState({
        ...state,
        [key]: "",
      });
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form className="frm" onSubmit={handleOnSubmit}>
        <h1 className="heading1">Company Sign in</h1>
        <input
          id="inpt"
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
          style={{ borderRadius: "10px" }}
        />
        <input
          id="inpt"
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a className="alink" href="#">
          Forgot your password?
        </a>
        <button id="bttn" style={{ boxShadow: "1px 2px 10px 1px #222" }}>
          Sign In
        </button>
      </form>
    </div>
  );
}

export default CompanySignIncomponent;

