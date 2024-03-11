import React, { ReactNode, useEffect } from "react";
import { DayMap } from "../../Utilities/getWeekObject";
import { TDay } from "../../Utilities/getWeekObject";
import { useSpring, animated } from "@react-spring/web";
import styled from "@emotion/styled";
import { TTimeline } from "../../App";
import { TTask, TTaskDay } from "../../Contexts/TasksContext";

type TDayProps = {
  day: TTaskDay;
  selected: TTaskDay | null;
  handleSelected: (day: TTaskDay) => void;
};

export const Day = ({ day, selected, handleSelected }: TDayProps) => {
  const daySpring = useSpring({
    from: { border: "1px solid rgba(25, 25, 25, 1)" },
    to: {
      outline:
        selected == day
          ? "1px solid rgba(50, 50, 50, 1)"
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
        style={{ ...daySpring, opacity: day.initialized ? 1 : 0.5 }}
      >
        <div className="cross">+</div>
        <p>{day.date?.getDate()}</p>
        <p>
          {day.date?.getDate()}th {"March"}, {"2024"}
        </p>
        <div
          style={{
            height: "100%",
            display: "flex",
            gap: ".5rem",
            alignItems: "center",
          }}
        >
          {day.tasks.map((i) => (
            <TaskDot />
          ))}
        </div>
      </animated.div>
    </>
  );
};
