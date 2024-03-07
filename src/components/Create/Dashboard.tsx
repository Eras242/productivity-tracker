import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { Carousel } from "./Carousel/Carousel";
import { Day } from "./Day";
import { getRecentCurrentWeek } from "../../Utilities/getWeekObject";
import { TTaskDay } from "../../Utilities/getWeekObject";
import { animated, useSpring, config } from "@react-spring/web";

type DashboardProps = {
  setNewDay: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Dashboard = ({ setNewDay }: DashboardProps) => {
  const [recentWeek, setRecentWeek] = useState<TTaskDay[]>([]);
  const [selected, setSelected] = useState<TTaskDay>({
    day: undefined,
    id: "",
  });

  const carouselSpring = useSpring({
    from: { transform: "translateX(100%)" },
    to: { transform: selected.day ? "translateX(0%)" : "translateX(100%)" },
    config: config.stiff,
  });

  const handleSelected = (day: TTaskDay) => {
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
          <p>This Week | March 2024</p>
        </div>
        <div className="weekday">
          {recentWeek?.map((i) => (
            <Day day={i} selected={selected} handleSelected={handleSelected} />
          ))}
        </div>
      </div>
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
    </div>
  );
};
