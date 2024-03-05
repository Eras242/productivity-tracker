import React from "react";
import { DayMapper } from "../../Utilities/getWeekObject";

type TDayProps = {
  date: Date;
};

export const Day = ({ date }: TDayProps) => {
  return (
    <div className="day">
      <p>{date.getDate() + " Mar"}</p>
      <p>{DayMapper[date.getDay()]}</p>
    </div>
  );
};
