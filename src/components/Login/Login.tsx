import React from "react";
import { useSpring, animated } from "@react-spring/web";
import "./login.css";

type LoginProps = {
  loggedIn: boolean;
};

export const Login = ({ loggedIn }: LoginProps) => {
  const loginSpring = useSpring({
    from: { width: "50%" },
    to: { width: loggedIn ? "100%" : "50%" },
  });
  const videoSpring = useSpring({
    from: { width: "50%" },
    to: { width: loggedIn ? "0%" : "50%" },
  });

  const formSpring = useSpring({
    from: { transform: "TranslateX(0%)" },
    to: { transform: loggedIn ? "TranslateX(-200%)" : "TranslateX(0%)" },
  });

  return (
    <div className="Login">
      <animated.div style={{ ...loginSpring }} className="login-panel">
        <animated.div style={{ ...formSpring }} className="Login-form">
          <form className="Login-form" action="">
            <h1>Welcome</h1>
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
        </animated.div>
      </animated.div>
      <animated.div style={{ ...videoSpring }} className="video-panel">
        {/* <img
          src="https://images.pexels.com/photos/273230/pexels-photo-273230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        /> */}
      </animated.div>
    </div>
  );
};
