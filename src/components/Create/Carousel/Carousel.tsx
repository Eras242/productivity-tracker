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
    // exitBeforeEnter: true,
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
    flex-direction: column;
    position: relative;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.bgColor};
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
        <button onClick={handleToggle}>Next</button>
      </Screen>
    );
  }
  return (
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
  );
};
