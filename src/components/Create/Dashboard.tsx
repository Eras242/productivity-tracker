import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { Carousel } from "./Carousel/Carousel";
import { Day } from "./Day";
import { getRecentCurrentWeek } from "../../Utilities/getWeekObject";

export const Dashboard = () => {
  const [recentWeek, setRecentWeek] = useState<Date[]>([]);

  useEffect(() => {
    const week = getRecentCurrentWeek();
    setRecentWeek(week);
    console.log(recentWeek);
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-panel-main">
        <div className="headings">
          {" "}
          <div>
            <img
              className="user-img"
              src="https://pbs.twimg.com/profile_images/1641194937168416769/3bGTPQr5_400x400.jpg"
              alt=""
            />
          </div>
          <div className="headings-titles">
            <h1 className="user-welcome">Hello, Sol</h1>
            <p>426 Tasks completed</p>
          </div>
        </div>

        <div className="time-tag dash-header">
          {" "}
          <p>March 2024 | Week 1</p>
        </div>
        <div className="weekday">
          {recentWeek?.map((i) => (
            <Day date={i} />
          ))}
        </div>
      </div>
      <div className="dashboard-panel-edit">
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            backgroundColor: "#191919",
            borderTopLeftRadius: "0.5rem",
            borderTopRightRadius: "0.5rem",
          }}
        >
          <Carousel />
        </div>
      </div>
    </div>
  );
};
