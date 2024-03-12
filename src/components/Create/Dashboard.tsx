import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { Carousel } from "./Carousel/Carousel";
import { Day } from "./Day";
import { getRecentCurrentWeek } from "../../Utilities/getWeekObject";
import { TDay } from "../../Utilities/getWeekObject";
import { animated, useSpring, config } from "@react-spring/web";
import { TTaskDay } from "../../Contexts/TasksContext";

type DashboardProps = {
  setTaskActive: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDay: TTaskDay | null;
  setSelectedDay: React.Dispatch<React.SetStateAction<TTaskDay | null>>;
  currentWeek: TTaskDay[];
  initDay: () => boolean;
  taskActive: boolean;
};

export const Dashboard = ({
  selectedDay,
  setSelectedDay,
  setTaskActive,
  currentWeek,
  initDay,
  taskActive,
}: DashboardProps) => {
  const carouselSpring = useSpring({
    from: { transform: "translateX(100%)" },
    to: {
      transform:
        selectedDay && !taskActive ? "translateX(0%)" : "translateX(100%)",
    },
    config: config.stiff,
    reset: true,
  });

  const handleSelected = (day: TTaskDay) => {
    if (day.initialized) {
      setTaskActive(true);
      setSelectedDay(day);
    }
    setSelectedDay(day);
  };

  return (
    <animated.div
      style={{ translateY: "translateY(-100%)" }}
      className="dashboard"
    >
      <animated.div className="dashboard-panel-main">
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
            <div style={{ display: "flex", flexDirection: "row" }}>
              <button>Settings</button>
              <button>Sign Out</button>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}>
          <div className="time-tag dash-header">
            <p>This Week | March 2024</p>
            <button className="calendar-btn">btn </button>
          </div>
          <div className="time-tag dash-header">
            <p>13 Tasks</p>
          </div>
        </div>
        <div className="weekday">
          {currentWeek?.map((i) => (
            <Day
              key={i.id}
              day={i}
              selected={selectedDay}
              handleSelected={handleSelected}
            />
          ))}
        </div>
      </animated.div>
      <animated.div
        style={{ ...carouselSpring }}
        className="dashboard-panel-edit"
      >
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
          {selectedDay && (
            <Carousel
              day={selectedDay}
              setTaskActive={setTaskActive}
              initDay={initDay}
            />
          )}
        </div>
      </animated.div>
    </animated.div>
  );
};
