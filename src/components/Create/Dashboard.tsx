import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { Carousel } from "./Carousel/Carousel";
import { Day } from "./Day";
import { createWeekObjectFromDate } from "../../Utilities/weekHelpers";
import { TDay } from "../../Utilities/weekHelpers";
import { animated, useSpring, config } from "@react-spring/web";
import { TTaskDay, TWeek } from "../../Contexts/TasksContext";
import { IoIosArrowForward } from "react-icons/io";
import { Calender } from "./CalenderModal/Calender";
import { TTimeline } from "../../App";
import { TextBox } from "../ui/TextBox";
import { TodayHeaderCard } from "./TodayHeaderCard";

type DashboardProps = {
  setTaskActive: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDay: TTaskDay | null;
  setSelectedDay: React.Dispatch<React.SetStateAction<TTaskDay | null>>;
  currentWeek: TWeek | null;
  initDay: () => boolean;
  taskActive: boolean;
  setTimelineInfo: React.Dispatch<React.SetStateAction<TTimeline>>;
};

export const Dashboard = ({
  selectedDay,
  setSelectedDay,
  setTaskActive,
  currentWeek,
  initDay,
  taskActive,
  setTimelineInfo,
}: DashboardProps) => {
  const [calenderVisible, setCalenderVisible] = useState<boolean>(false);

  const carouselSpring = useSpring({
    from: { transform: "translateX(100%)" },
    to: {
      transform:
        selectedDay && !taskActive ? "translateX(0%)" : "translateX(100%)",
    },
    config: config.stiff,
    reset: true,
  });
  const tasksSpring = useSpring({
    from: { width: "100%" },
    to: {
      width: (selectedDay && !taskActive) || calenderVisible ? "50%" : "100%",
    },
    config: config.stiff,
    reset: true,
  });

  const calenderSpring = useSpring({
    from: { transform: "translateX(100%)" },
    to: {
      transform:
        calenderVisible && !taskActive && !selectedDay
          ? "translateX(0%)"
          : "translateX(100%)",
    },
    config: config.stiff,
    reset: true,
  });

  useEffect(() => {
    console.log(currentWeek);
  }, []);

  const handleSelected = (day: TTaskDay) => {
    if (day.initialized) {
      setTaskActive(true);
      setSelectedDay(day);
      setCalenderVisible(false);
    }
    setCalenderVisible(false);
    setSelectedDay(day);
  };

  return (
    <animated.div
      style={{ translateY: "translateY(-100%)" }}
      className="dashboard"
    >
      <animated.div className="dashboard-panel-main" style={{ ...tasksSpring }}>
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
              <button className="btn">Settings</button>
              <button className="btn">Sign Out</button>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "0.5rem",
          }}
        >
          <button
            className="time-tag dash-header calender"
            onClick={() => {
              setSelectedDay(null);
              setCalenderVisible(!calenderVisible);
            }}
          >
            <p>Calender</p>
            <p>
              <IoIosArrowForward />
            </p>
          </button>
          <div className="time-tag dash-header">
            <p>This Week | My Weeks</p>
          </div>
          <div className="time-tag dash-header">
            <p>13 Tasks</p>
          </div>
        </div>

        <TodayHeaderCard currentWeek={currentWeek} />
        <div className="weekday">
          {currentWeek?.days.map((i) => (
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
              setTimelineInfo={setTimelineInfo}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
          )}
        </div>
      </animated.div>
      <animated.div
        className="dashboard-panel-edit"
        style={{ ...calenderSpring }}
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
          <Calender visible={calenderVisible} />
        </div>
      </animated.div>
    </animated.div>
  );
};
