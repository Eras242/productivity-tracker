import React from "react";
import { useSpring, animated } from "@react-spring/web";
import "./login.css";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

type LoginProps = {
  loggedIn: boolean;
  handleLogin: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setLoginVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Login = ({
  loggedIn,
  handleLogin,
  setLoginVisible,
}: LoginProps) => {
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

  const loginFade = useSpring({
    from: { opacity: 1 },
    to: { opacity: loggedIn ? 0 : 1 },
    delay: 200,
    onRest: () => {
      loggedIn ? setLoginVisible(false) : setLoginVisible(true);
    },
  });

  return (
    <animated.div className="Login" style={{ ...loginFade }}>
      <animated.div style={{ ...loginSpring }} className="login-panel">
        <animated.div style={{ ...formSpring }} className="Login-form">
          <form className="Login-form" action="">
            <h1>Welcome</h1>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <div className="login-sign-up-buttons">
              {" "}
              <button className="btn-login" onClick={handleLogin}>
                Login
              </button>
              <button className="btn-login">Sign Up</button>
            </div>
            <div className="login-line"></div>
            <div className="login-buttons">
              <button className=".btn-icon">
                <FaGoogle />
              </button>
              <button className=".btn-icon">
                <FaGithub />
              </button>
              <button className=".btn-icon">
                <FaXTwitter />
              </button>
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
    </animated.div>
  );
};
