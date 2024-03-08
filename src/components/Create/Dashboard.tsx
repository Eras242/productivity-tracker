import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { Carousel } from "./Carousel/Carousel";
import { Day } from "./Day";
import { getRecentCurrentWeek } from "../../Utilities/getWeekObject";
import { TDay } from "../../Utilities/getWeekObject";
import { animated, useSpring, config } from "@react-spring/web";
import { TTaskDay } from "../../Contexts/TasksContext";

type DashboardProps = {
  setNewDay: React.Dispatch<React.SetStateAction<boolean>>;
  currentWeek: TTaskDay[];
};

export const Dashboard = ({ setNewDay, currentWeek }: DashboardProps) => {
  const [recentWeek, setRecentWeek] = useState<TDay[]>([]);
  const [selected, setSelected] = useState<TTaskDay>({
    id: "",
    user: null,
    date: undefined,
    timeline: null,
    tasks: [],
  });

  const carouselSpring = useSpring({
    from: { transform: "translateX(100%)" },
    to: { transform: selected.date ? "translateX(0%)" : "translateX(100%)" },
    config: config.stiff,
    reset: true,
  });

  const handleSelected = (day: TDay) => {
    if (selected?.id == day!.id) {
      setSelected({
        day: undefined,
        id: "",
      });
    } else {
      setSelected(day);
    }
  };

  useEffect(() => {
    const week = getRecentCurrentWeek();
    setRecentWeek(week);
    console.log("Hello");
    console.log(currentWeek);
  }, []);

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
          </div>
        </div>

        <div className="time-tag dash-header">
          {" "}
          <p>This Week | March 2024</p>
        </div>
        <div className="weekday">
          {currentWeek?.map((i) => (
            <Day
              key={i.id}
              id={i.id}
              day={i.date}
              tasks={i.tasks}
              selected={selected}
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
          <Carousel day={selected} setNewDay={setNewDay} />
        </div>
      </animated.div>
    </animated.div>
  );
};
