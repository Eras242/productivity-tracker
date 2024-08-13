import React from "react";
import { TextBox } from "../ui/TextBox";
import { TWeek } from "../../Contexts/TasksContext";
import { monthMap } from "../../Utilities/weekHelpers";

export const TodayHeaderCard = ({
  currentWeek,
}: {
  currentWeek: TWeek | null;
}) => {
  const today = currentWeek?.days.find((day) => {
    if (day) {
      const today = new Date();
      const todayStr = today.toDateString();
      return day.date && day.date.toDateString() === todayStr;
    } else {
      return false;
    }
  });
  return (
    <div className="dashboard-today-container">
      <div>
        <h3>Today</h3>
        <h2>
          {today!.date?.getDate()}th {monthMap[today!.date!.getUTCMonth()]},{" "}
          {today!.date?.getFullYear()}
        </h2>
      </div>
      <div style={{ display: "flex", gap: ".5rem" }}>
        <TextBox>3 Tasks</TextBox>
        <TextBox>View</TextBox>
      </div>
    </div>
  );
};
