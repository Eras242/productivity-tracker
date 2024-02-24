import React, { useEffect, useState } from "react";
import { TimelineInfoInterface, TodoStateProps } from "../../../App";
import { getDuration, timeConverter } from "../../../Utilities/TimeConverter";
import { timePercentage } from "../../../Utilities/TimeConverter";
import { TaskDot } from "./TaskDot";

type TimelineProps = {
  tasks: TodoStateProps[];
  timelineInfo: TimelineInfoInterface;
};

type timeCountType = {
  timeString: string;
  minutesCount: number;
};

export const Timeline = ({ tasks, timelineInfo }: TimelineProps) => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [totalWorkDuration, setTotalWorkDuration] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<string>("");

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
      const dayTotal: number | undefined = getDuration(
        timelineInfo.start!,
        timelineInfo.end!
      )?.duration;

      setTotalWorkDuration(dayTotal!);

      // get current time in minutes (work day elapsed time)
      const currentTimeMinutes: number | string = Number(
        timeConverter(currentTime, "tm")
      );

      // Calculate difference between them (time remaining)
      const timeRemaining = dayTotal! - currentTimeMinutes;

      const remaining: string | number = timeConverter(timeRemaining, "mt");
      setTimeRemaining(String(remaining));
    }

    return () => clearInterval(timeInterval);
  }, [timelineInfo, currentTime, totalWorkDuration]);

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
            ? timeConverter(timelineInfo.sleep, "mt") + " AM"
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
        <div className="timeline task-dot-container">
          {" "}
          {tasks.map((t) => {
            return <TaskDot task={t} info={timelineInfo} />;
          })}
        </div>
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
        <div className="time-tag day">{totalWorkDuration}</div>
      </div>
    </div>
  );
};
