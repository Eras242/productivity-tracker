import React, { useEffect, useState } from "react";
import "./carousel.css";
import styled from "@emotion/styled";
import { useTransition, animated } from "@react-spring/web";
import { jsx } from "@emotion/react";
import { css } from "@emotion/css";
import { timeConverter } from "../../../Utilities/TimeConverter";
import { Timeline } from "../../Display/Timeline/Timeline";
import { TimelineInfoInterface } from "../../../App";

type ScreenProps = {
  bgColor: string;
};

export const Carousel = () => {
  const [screenIndex, setScreenIndex] = useState<number>(0);
  const screens = [Wake, Start, End, Sleep, Complete];

  const [error, setError] = useState({ error: false, message: "" });

  const handleToggle = () => {
    if (error.error != true) {
      setScreenIndex((prev) => (prev + 1) % screens.length);
    } else {
      return;
    }
  };

  const [tempTimeline, setTempTimeline] = useState<TimelineInfoInterface>({
    wakeUp: 0,
    start: 0,
    end: 0,
    sleep: 0,
  });
  useEffect(() => {
    console.log(tempTimeline);
  }, [tempTimeline]);

  const handleSetTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = timeConverter(e.target.value, "tm");
    setTempTimeline((prev) => ({
      ...prev,
      [e.target.name]: time,
    }));
    // if (e.target.name == "wakeUp") {
    //   return;
    // } else {
    //   const keys = Object.keys(tempTimeline);
    //   const currentIndex = keys.indexOf(e.target.name);

    //   if (
    //     tempTimeline[keys[currentIndex]] < tempTimeline[keys[currentIndex - 1]]
    //   ) {
    //     setError({
    //       error: true,
    //       message:
    //         "Invalid value: Current time value cannot be less than previous time value",
    //     });
    //   }
    // }
  };

  const transitions = useTransition(screenIndex, {
    from: { opacity: 1, transform: "translate3d(50%, 0 ,0)" },
    enter: { opacity: 1, transform: "translate3d(0%, 0 ,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%, 0 ,0)" },
    unique: true,
    native: true,
    duration: "0.5s",
  });

  const Container = styled("div")`
    height: 200px;
    position: relative;
    width: 100%;
    overflow: hidden;
    & > div {
      will-change: transform, opacity;
      position: absolute;
      width: 100%;
      height: 100%;
    }
  `;

  const Screen = styled.div<ScreenProps>`
    width: 100%;
    height: 100%;
    display: flex;
    gap: 1rem;
    border-radius: 0.5rem;
    flex-direction: column;
    position: absolute;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.bgColor};
  `;

  const Dot = styled.div`
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0);
    border: 1px solid rgba(255, 255, 255, 0.2);
  `;

  function Wake() {
    return (
      <Screen bgColor="#191919">
        What time would you like to wake up?
        <input type="time" name="wakeUp" onChange={handleSetTime} />
        <button onClick={handleToggle}>Next</button>
        <p>ERROR: {error.error ? "True" : "False"}</p>
        <p>{JSON.stringify(tempTimeline.start)}</p>
      </Screen>
    );
  }

  function Start() {
    return (
      <Screen bgColor="#191919">
        When would you like to start working?
        <input type="time" name="start" onChange={handleSetTime} />
        <button onClick={handleToggle}>Next</button>
        <p>ERROR: {error.error ? "True" : "False"}</p>
      </Screen>
    );
  }

  function End() {
    return (
      <Screen bgColor="#191919">
        And what time would you like to finish working?
        <input type="time" name="finish" onChange={handleSetTime} />
        <button onClick={handleToggle}>Next</button>
        <p>ERROR: {error.error ? "True" : "False"}</p>
      </Screen>
    );
  }

  function Sleep() {
    return (
      <Screen bgColor="#191919">
        And when would you like to go to bed?
        <input type="time" name="sleep" onChange={handleSetTime} />
        <button onClick={handleToggle}>Next</button>
        <p>ERROR: {error.error ? "True" : "False"}</p>
      </Screen>
    );
  }
  function Complete() {
    return (
      <Screen bgColor="#191919">
        Complete! Let's add some tasks!
        <div style={{ display: "flex", flexDirection: "row", gap: "3rem" }}>
          <div className="time-preview">
            <p>WAKE UP</p>
            <h2>07:00</h2>
          </div>
          <div className="time-preview">
            <p>WORK</p>
            <h2>10:00</h2>
          </div>
          <div className="time-preview">
            <p>FINISH</p>
            <h2>19:00</h2>
          </div>
          <div className="time-preview">
            <p>WAKE UP</p>
            <h2>22:00</h2>
          </div>
        </div>
        <button onClick={handleToggle}>Next</button>
      </Screen>
    );
  }

  const handleClick = (e: any) => {
    console.log(e.target.id);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container>
        {transitions((style, i) => {
          // const Comp = screens[i];
          return (
            <animated.div
              style={{
                ...style,
              }}
            >
              {React.createElement(screens[i])}
            </animated.div>
          );
        })}
      </Container>
      <div
        style={{
          position: "absolute",
          bottom: "1rem",
          zIndex: "999",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.25rem",
        }}
      >
        <Dot
          id={"0"}
          onClick={handleClick}
          style={
            screenIndex == 0
              ? { backgroundColor: "white" }
              : { backgroundColor: "none" }
          }
        />
        <Dot
          id={"1"}
          onClick={handleClick}
          style={
            screenIndex == 1
              ? { backgroundColor: "white" }
              : { backgroundColor: "none" }
          }
        />
        <Dot
          id={"2"}
          onClick={handleClick}
          style={
            screenIndex == 2
              ? { backgroundColor: "white" }
              : { backgroundColor: "none" }
          }
        />
        <Dot
          id={"3"}
          onClick={handleClick}
          style={
            screenIndex == 3
              ? { backgroundColor: "white" }
              : { backgroundColor: "none" }
          }
        />
      </div>
    </div>
  );
};
