import React, { useEffect, useState } from "react";
import { TimelineInfoInterface, TodoStateProps } from "../../../App";
import { getDuration, timeConverter } from "../../../Utilities/TimeConverter";
import { timePercentage } from "../../../Utilities/TimeConverter";
import { TaskDot } from "./TaskDot";

type TimelineProps = {
  tasks: TodoStateProps[];
  timelineInfo: TimelineInfoInterface;
};

export const Timeline = ({ tasks, timelineInfo }: TimelineProps) => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [workDuration, setWorkDuration] = useState<string>("");

  useEffect(() => {
    const timeInterval = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      setCurrentTime(formattedTime);
    });

    if (timelineInfo) {
      setWorkDuration(() => {
        const duration: number = getDuration(
          timelineInfo.start!,
          timelineInfo.end!
        )?.duration;

        console.log(typeof duration);

        const currentTimeMinutes: number = timeConverter(currentTime, "tm");
        console.log(currentTimeMinutes);
        console.log(currentTimeMinutes - duration);
        // const workdayDuration = getDuration(
        //   duration?.duration,
        //   currentTimeMinutes
        // );

        return workDuration;
      });
    }

    return () => clearInterval(timeInterval);
  }, []);

  return (
    <div className="container day-timeline">
      <div className=" day-line start-finish">
        <p className="time-marker wake-up">
          {typeof timelineInfo.wakeUp === "number"
            ? timeConverter(timelineInfo.wakeUp, "mt") + " AM"
            : "NaN"}
        </p>
        <p className="time-marker sleep">
          {typeof timelineInfo.sleep === "number"
            ? timeConverter(timelineInfo.sleep) + " AM"
            : "NaN"}
        </p>
      </div>
      <div className="day-line">
        <p className="time-marker start">
          {typeof timelineInfo.start === "number"
            ? timeConverter(timelineInfo.start, "mt") + " AM"
            : "NaN"}
        </p>
        <p className="time-marker end">
          {typeof timelineInfo.end === "number"
            ? timeConverter(timelineInfo.end, "mt") + " AM"
            : "NaN"}
        </p>
        <div className="timeline day-scrubber"></div>
      </div>
      <div className="timeline stats">
        <div className="timeline headers">
          {" "}
          <div className="time-tag day">February 22nd, 2024</div>
          <div className="time-tag day">{currentTime} PM</div>
          <div className="time-tag day">
            {getDuration(timelineInfo.start!, timelineInfo.end!)?.hours}HR{" "}
            {getDuration(timelineInfo.start!, timelineInfo.end!)?.minutes}MIN
          </div>
        </div>
        <p>{getDuration(timelineInfo.start!, timelineInfo.end!)?.duration}</p>
        <div className="time-tag day">{}</div>
        <div className="time-tag day">{}</div>
      </div>
    </div>
  );
};
