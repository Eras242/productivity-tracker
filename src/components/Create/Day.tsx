import React, { useEffect } from "react";
import { DayMap } from "../../Utilities/getWeekObject";
import { TTaskDay } from "../../Utilities/getWeekObject";
import { useSpring, animated } from "@react-spring/web";

type TDayProps = {
  day: TTaskDay;
  selected: TTaskDay;
  handleSelected: (day: TTaskDay) => void;
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
      </animated.div>
    </>
  );
};
