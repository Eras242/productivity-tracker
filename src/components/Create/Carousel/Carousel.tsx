import React, { useEffect, useRef, useState } from "react";
import "./carousel.css";
import styled from "@emotion/styled";
import { useTransition, animated, config } from "@react-spring/web";
import { jsx } from "@emotion/react";
import { css } from "@emotion/css";
import { timeConverter } from "../../../Utilities/TimeConverter";
import { Timeline } from "../../Display/Timeline/Timeline";
import { TTimeline } from "../../../App";
import { TDay } from "../../../Utilities/getWeekObject";
import { MonthMap } from "../../../Utilities/getWeekObject";
import { DayMap } from "../../../Utilities/getWeekObject";
import { TTask, TTaskDay } from "../../../Contexts/TasksContext";

type ScreenProps = {
  bgColor: string;
};

type ICarouselProps = {
  day: TTaskDay | null;
  initDay: () => boolean;
  setTaskActive: React.Dispatch<React.SetStateAction<boolean>>;
};

type TTemp = {
  wakeUp: number;
  start: number;
  end: number;
  sleep: number;
  [key: string]: number;
};

export const Carousel = ({ day, setTaskActive, initDay }: ICarouselProps) => {
  const [screenIndex, setScreenIndex] = useState<number>(0);
  const screens = [Wake, Start, End, Sleep, Complete];
  const [error, setError] = useState({ error: false, message: "" });
  const [tempTimeline, setTempTimeline] = useState<TTemp>({
    wakeUp: 0,
    start: 0,
    end: 0,
    sleep: 0,
  });

  let inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setScreenIndex(0);
  }, [day]);

  const handleComplete = () => {
    console.log(tempTimeline);
    initDay();
    setTaskActive(true);
  };

  const handleNext = (e: any) => {
    if (inputRef.current?.value) {
      const time = timeConverter(inputRef.current?.value, "tm");

      if (e.target.name == "wakeUp") {
        setTempTimeline((prev) => ({
          ...prev,
          [e.target.name]: time,
        }));
        setScreenIndex((prev) => (prev + 1) % screens.length);
      } else {
        const keys = Object.keys(tempTimeline);
        const currentIndex = keys.indexOf(e.target.name);

        if (Number(time) < tempTimeline[keys[currentIndex - 1]]) {
          setError({
            error: true,
            message:
              "Invalid value: Current time value cannot be less than previous time value",
          });
        } else {
          setTempTimeline((prev) => ({
            ...prev,
            [e.target.name]: time,
          }));
          setScreenIndex((prev) => (prev + 1) % screens.length);
        }
      }

      console.log(tempTimeline);
    }
  };

  const transitions = useTransition(screenIndex, {
    from: { opacity: 1, transform: "translate3d(50%, 0 ,0)" },
    enter: { opacity: 1, transform: "translate3d(0%, 0 ,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%, 0 ,0)" },
    unique: true,
    native: true,
    duration: "0.5s",
    config: config.stiff,
  });

  const Container = styled("div")`
    height: 100%;
    width: 100%;
    position: absolute;
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
    flex-direction: column;
    position: absolute;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.bgColor};
  `;

  const Dot = styled.div`
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 2px;
    background-color: rgba(255, 255, 255, 0);
    border: 1px solid rgba(255, 255, 255, 0.2);
  `;

  function Wake() {
    return (
      <Screen bgColor="#191919">
        <p>What time would you like to wake up?</p>
        <div>
          <button>Start from New</button>
          <button>Start from template</button>
        </div>
        <input type="time" name="wakeUp" ref={inputRef} />
        <button onClick={handleNext} name="wakeUp">
          Next
        </button>
        {/* <p>ERROR: {error.error ? "True" : "False"}</p> */}
      </Screen>
    );
  }

  function Start() {
    return (
      <Screen bgColor="#191919">
        When would you like to start working?
        <input type="time" name="start" ref={inputRef} />
        <button onClick={handleNext} name="start">
          Next
        </button>
        <p>ERROR: {error.error ? "True" : "False"}</p>
      </Screen>
    );
  }

  function End() {
    return (
      <Screen bgColor="#191919">
        And what time would you like to finish working?
        <input type="time" name="end" ref={inputRef} />
        <button onClick={handleNext} name="end">
          Next
        </button>
        <p>ERROR: {error.error ? "True" : "False"}</p>
      </Screen>
    );
  }

  function Sleep() {
    return (
      <Screen bgColor="#191919">
        And when would you like to go to bed?
        <input type="time" name="sleep" ref={inputRef} />
        <button onClick={handleNext} name="sleep">
          Next
        </button>
        <p>ERROR: {error.error ? "True" : "False"}</p>
      </Screen>
    );
  }
  function Complete() {
    return (
      <Screen bgColor="#191919">
        Complete! Let's add some tasks!
        <div style={{ display: "flex", flexDirection: "row", gap: "3rem" }}>
          {Object.keys(tempTimeline).map((i) => (
            <div className="time-preview">
              <p className="tp-title">{i}</p>
              <h2>{timeConverter(tempTimeline[i], "mt")}</h2>
            </div>
          ))}
        </div>
        <button onClick={handleComplete}>Add Tasks</button>
      </Screen>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <h2 className="date-tag">March 6th, 2024</h2>
      <h3
        className="date-box"
        style={{ position: "absolute", zIndex: "9999", top: "25%" }}
      >
        {DayMap[day!.date?.getDay()!]} {day!.date?.getDate()!}{" "}
        {MonthMap[day!.date?.getMonth()!]}
      </h3>
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
          bottom: "25%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.25rem",
          zIndex: 9999,
        }}
      >
        <Dot
          id={"0"}
          style={
            screenIndex == 0
              ? { backgroundColor: "white" }
              : { backgroundColor: "none" }
          }
        />
        <Dot
          id={"1"}
          style={
            screenIndex == 1
              ? { backgroundColor: "white" }
              : { backgroundColor: "none" }
          }
        />
        <Dot
          id={"2"}
          style={
            screenIndex == 2
              ? { backgroundColor: "white" }
              : { backgroundColor: "none" }
          }
        />
        <Dot
          id={"3"}
          style={
            screenIndex == 3
              ? { backgroundColor: "white" }
              : { backgroundColor: "none" }
          }
        />
        <Dot
          id={"4"}
          style={
            screenIndex == 4
              ? { backgroundColor: "white" }
              : { backgroundColor: "none" }
          }
        />
      </div>
    </div>
  );
};
