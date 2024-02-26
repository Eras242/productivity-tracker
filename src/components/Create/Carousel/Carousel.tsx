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
  const screens = [Wake, Start, End, Sleep];

  const handleToggle = () => {
    setScreenIndex((prev) => (prev + 1) % screens.length);
    console.log(screenIndex);
  };

  const [transitions] = useTransition(screenIndex, () => ({
    from: { opacity: 1, transform: "translate3d(100%, 0 ,0)" },
    enter: { opacity: 1, transform: "translate3d(0%, 0 ,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%, 0 ,0)" },
    reset: true,
    unique: true,
    native: true,
    exitBeforeEnter: true,
    duration: "0.3s",
  }));

  const Container = styled("div")`
    height: 200px;
    position: relative;
    width: 100%;
    cursor: pointer;
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
    position: absolute;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.bgColor};
  `;

  function Wake() {
    return (
      <Screen bgColor="tomato">What time would you like to wake up?</Screen>
    );
  }

  function Start() {
    return <Screen bgColor="blue">When would you like to start working</Screen>;
  }

  function End() {
    return (
      <Screen bgColor="yellow">
        And what time would you like to finish working?
      </Screen>
    );
  }

  function Sleep() {
    return (
      <Screen bgColor="purple">And when would you like to go to bed?</Screen>
    );
  }
  return (
    <div>
      <Container onClick={handleToggle}>
        {transitions((style, i) => {
          // const Comp = screens[i];
          return (
            <animated.div
              style={{
                ...style,
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
              {React.createElement(screens[i])}
            </animated.div>
          );
        })}
      </Container>
    </div>
  );
};
