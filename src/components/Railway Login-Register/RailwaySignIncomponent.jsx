import React from "react";

function RailwaySignIncomponent() {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });
  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();

    const { email, password } = state;
    alert(`You are login with email: ${email} and password: ${password}`);

    for (const key in state) {
      setState({
        ...state,
        [key]: ""
      });
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form className='frm' onSubmit={handleOnSubmit}>
        <h1 className='heading1'>Railway Sign in</h1>
        <input id='inpt'
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
          style={{borderRadius:'10px'}}
        />
        <input id='inpt'
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a className='alink' href="#">Forgot your password?</a>
        <button id='bttn' style={{boxShadow:'1px 2px 10px 1px #222'}}>Sign In</button>
      </form>
    </div>
  );
}

export default RailwaySignIncomponent;
