import React, { ReactNode, useEffect } from "react";
import { DayMap } from "../../Utilities/weekHelpers";
import { TDay } from "../../Utilities/weekHelpers";
import { useSpring, animated } from "@react-spring/web";
import styled from "@emotion/styled";
import { TTimeline } from "../../App";
import { TTask, TTaskDay } from "../../Contexts/TasksContext";
import { IoIosAdd } from "react-icons/io";
import { MdSunny } from "react-icons/md";
import { monthMap } from "../../Utilities/weekHelpers";

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

  const today = new Date();

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
    <animated.div
      className="day"
      onClick={() => handleSelected(day)}
      style={{ ...daySpring }}
    >
      {!day.initialized && (
        <div className="add-icon">
          <IoIosAdd />
        </div>
      )}
      {today.getDate() == day.date?.getDate() && (
        <div className="sun-icon">
          <MdSunny />
        </div>
      )}
      <p>{DayMap[day.date?.getDay()!]}</p>
      <p>
        {day.date?.getDate()}th {monthMap[day.date!.getUTCMonth()]},{" "}
        {day.date?.getFullYear()}
      </p>
      <div
        style={{
          height: "1rem",
          display: "flex",
          gap: ".5rem",
          alignItems: "center",
        }}
      >
        {day.tasks.length > 0 && day.tasks.map((i) => <TaskDot />)}
      </div>
    </animated.div>
  );
};
