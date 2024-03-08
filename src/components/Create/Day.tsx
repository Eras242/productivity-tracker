import React, { ReactNode, useEffect } from "react";
import { DayMap } from "../../Utilities/getWeekObject";
import { TDay } from "../../Utilities/getWeekObject";
import { useSpring, animated } from "@react-spring/web";
import styled from "@emotion/styled";

type TDayProps = {
  day: TDay;
  selected: TDay;
  handleSelected: (day: TDay) => void;
};

export const Day = ({ day, selected, handleSelected }: TDayProps) => {
  const daySpring = useSpring({
    from: { border: "1px solid rgba(25, 25, 25, 1)" },
    to: {
      outline:
        selected!.id == day.id
          ? "2px solid rgba(50, 50, 50, 1)"
          : "1px solid rgba(25, 25, 25, 1)",
    },
    config: { duration: 100 },
  });

  const Dot = styled("div")`
    display: flex;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: green;
  `;

  const TaskDot = () => {
    return <Dot></Dot>;
  };

  return (
    <>
      <animated.div
        className="day"
        onClick={() => handleSelected(day)}
        style={{ ...daySpring }}
      >
        <p>{DayMap[day.day!.getDay()]}</p>
        <p>
          {day.day!.getDate()}th {"March"}, {"2024"}
        </p>
        <div
          style={{
            height: "100%",
            display: "flex",
            gap: ".5rem",
            alignItems: "center",
          }}
        >
          <TaskDot />
          <TaskDot />
          <TaskDot />
          <TaskDot />
          <TaskDot />
          <TaskDot />
        </div>
      </animated.div>
    </>
  );
};
