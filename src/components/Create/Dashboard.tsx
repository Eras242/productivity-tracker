import React from "react";
import "./dashboard.css";
import { Carousel } from "./Carousel/Carousel";

export const Dashboard = () => {
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
          <div className="day">
            <p>Monday, 24th</p>
            <p>February</p>
          </div>
          <div className="day">
            <p>Tuesday, 24th</p>
            <p>February</p>
          </div>
          <div className="day">
            <p>Wednesday, 24th</p>
            <p>February, 2024</p>
          </div>
          <div className="day">
            <p>Thursday, 24th</p>
            <p>February, 2024</p>
          </div>
          <div className="day">
            <p>Friday, 24th</p>
            <p>February, 2024</p>
          </div>
          <div className="day">
            <p>Saturday, 24th</p>
            <p>February, 2024</p>
          </div>
          <div className="day">
            <p>Sunday, 24th</p>
            <p>February, 2024</p>
          </div>
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
