import React, { useState } from "react";
import "./carousel.css";
import styled from "@emotion/styled";
import { useTransition, animated } from "@react-spring/web";
import { jsx } from "@emotion/react";
import { css } from "@emotion/css";

type ScreenProps = {
  bgColor: string;
};

export const Carousel = () => {
  const [screenIndex, setScreenIndex] = useState<number>(0);
  const screens = [Wake, Start, End, Sleep, Complete];

  const handleToggle = () => {
    setScreenIndex((prev) => (prev + 1) % screens.length);
    console.log(screenIndex);
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
    cursor: pointer;
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
    background-color: white;
  `;

  function Wake() {
    return (
      <Screen bgColor="#191919">
        What time would you like to wake up?
        <input type="time" />
        <button onClick={handleToggle}>Next</button>
      </Screen>
    );
  }

  function Start() {
    return (
      <Screen bgColor="#191919">
        When would you like to start working?
        <input type="time" />
        <button onClick={handleToggle}>Next</button>
      </Screen>
    );
  }

  function End() {
    return (
      <Screen bgColor="#191919">
        And what time would you like to finish working?
        <input type="time" />
        <button onClick={handleToggle}>Next</button>
      </Screen>
    );
  }

  function Sleep() {
    return (
      <Screen bgColor="#191919">
        And when would you like to go to bed?
        <input type="time" />
        <button onClick={handleToggle}>Next</button>
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
        <Dot />
        <Dot />
        <Dot />
        <Dot />
      </div>
    </div>
  );
};
