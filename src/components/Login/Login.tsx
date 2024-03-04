import React from "react";
import "./login.css";

export const Login = () => {
  return (
    <div className="Login">
      <div className="login-panel">
        <h1>Welcome</h1>
        <form className="Login-form" action="">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <div className="login-sign-up-buttons">
            {" "}
            <button className="btn-login">Login</button>
            <button className="btn-login">Sign Up</button>
          </div>
          <div className="login-line"></div>
          <div className="login-buttons">
            <button>G</button>
            <button>G</button>
            <button>G</button>
            <button>Sign in as Guest</button>
          </div>
        </form>
      </div>
      <div className="video-panel">
        {/* <img
          src="https://images.pexels.com/photos/273230/pexels-photo-273230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        /> */}
      </div>
    </div>
  );
};
