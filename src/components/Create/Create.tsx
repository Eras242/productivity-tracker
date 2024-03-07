import React, { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import {
  TimelineInfoInterface,
  TodoStateProps,
  ValidStateProps,
} from "../../App";
import { Carousel } from "./Carousel/Carousel";
import { Login } from "../Login/Login";
import { CreateTask } from "./CreateTask";
import { Dashboard } from "./Dashboard";

export type CreateProps = {
  onChangeTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitTask: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  newDay: boolean;
  formDetails: TodoStateProps;
  valid: ValidStateProps;
  setNewDay: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Create = ({
  onChangeTime,
  submitTask,
  setNewDay,
  formDetails,
  newDay,
  valid,
}: CreateProps) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(true);
  const [loginVisible, setLoginVisible] = useState<boolean>(true);

  const containerSpring = useSpring({
    from: { width: "1050px" },
    to: {
      width: newDay ? "1050px" : "600px",
    },
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
    <animated.div className="container add-todo" style={{ ...containerSpring }}>
      <button
        onClick={() => {
          setLoggedIn(!loggedIn);
        }}
        style={{
          position: "absolute",
          left: "0px",
          transform: "translateX(-100%)",
        }}
      >
        LogggedIn: {JSON.stringify(loggedIn)}
      </button>
      {loginVisible && (
        <animated.div style={{ ...loginFade, width: "100%", height: "100%" }}>
          {" "}
          <Login loggedIn={loggedIn} />
        </animated.div>
      )}

      {!loginVisible && <Dashboard setNewDay={setNewDay} />}
      {!newDay && (
        <animated.div>
          <CreateTask
            formDetails={formDetails}
            onChangeTime={onChangeTime}
            submitTask={submitTask}
            valid={valid}
            newDay={newDay}
          />
        </animated.div>
      )}
    </animated.div>
  );
};
