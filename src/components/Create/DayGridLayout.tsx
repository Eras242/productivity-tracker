import React, { useEffect } from "react";
import { Day } from "./Day";
import { TWeek } from "../../Contexts/TasksContext";
import { TTaskDay } from "../../Contexts/TasksContext";
import { SizeMe } from "react-sizeme";
import StackGrid, { transitions } from "react-stack-grid";
import { SpringValue } from "@react-spring/web";

export const DayGridLayout = ({
  currentWeek,
  selectedDay,
  handleSelected,
}: {
  currentWeek: TWeek | null;
  selectedDay: TTaskDay | null;
  handleSelected: (day: TTaskDay) => void;
}) => {
  return (
    // <SizeMe>
    //   {({ size }) => (
    <StackGrid
      columnWidth={150}
      gutterWidth={8}
      gutterHeight={8}
      style={{ width: "100%" }}
      className="stack-grid-container"
      //   easing={easing}
    >
      {currentWeek?.days.map((day) => (
        <Day day={day} selected={selectedDay} handleSelected={handleSelected} />
      ))}
    </StackGrid>
    //   )}
    // </SizeMe>
  );
};
