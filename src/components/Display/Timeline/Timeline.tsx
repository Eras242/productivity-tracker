import React, { useEffect, useState } from "react";
import { TTimeline, TodoStateProps } from "../../../App";
import { getDuration, timeConverter } from "../../../Utilities/TimeConverter";
import { timePercentage } from "../../../Utilities/TimeConverter";
import { TaskDot } from "./TaskDot";
import { jsx } from "@emotion/react";
import { css } from "@emotion/css";
import { TTask } from "../../../Contexts/TasksContext";
import { Scrubber } from "./Scrubber";

import { TextBox } from "../../ui/TextBox";

type TimelineProps = {
  tasks: TTask[] | null;
  timelineInfo: TTimeline;
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

  const getTimeAsPercentage = (timeValue: string) => {
    if (timelineInfo.end && timelineInfo.start) {
      const time = Number(timeConverter(timeValue, "tm"));

      const start = timelineInfo.start;
      const end = timelineInfo.end;
      const pos = time - start;
      const duration = end - start;
      return String(Math.trunc((pos / duration) * 100));
    }
  };

  // const getMiddayAsPercentage = () => {
  //   if (timelineInfo.end) {
  //     const end = timelineInfo.end;
  //     const midday = 720;
  //     // console.log(end);
  //     return String(Math.trunc((midday / end) * 100));
  //   }
  // };

  // const getCurrentTimeAsPercentage = () => {
  //   if (timelineInfo.end && timelineInfo.start) {
  //     const ct = timeConverter(currentTime, "tm"); // 910
  //     const duration = timelineInfo.end - timelineInfo.start;

  //     const time = Number(ct) - timelineInfo.start;

  //     return String(Math.trunc((time / duration) * 100));
  //   }
  // };
  console.log(currentTime);
  console.log(getTimeAsPercentage(currentTime));

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
        <div
          className="timeline day-scrubber"
          style={{ left: `${getTimeAsPercentage(currentTime)}%` }}
        >
          {currentTime}
        </div>
        <div
          className="timeline twelvePM"
          style={{ left: `${getTimeAsPercentage("12:00")}%` }}
        >
          12 PM
        </div>
        <div className="timeline task-dot-container">
          {" "}
          {tasks!.map((t) => {
            return <TaskDot task={t} info={timelineInfo} />;
          })}
        </div>
      </div>
      <div className="timeline stats">
        <div className="timeline headers">
          {" "}
          <TextBox>February 22nd, 2024</TextBox>
          <TextBox>{currentTime} PM</TextBox>
          <TextBox>
            {" "}
            {getDuration(timelineInfo.start!, timelineInfo.end!)?.hours}HR{" "}
            {getDuration(timelineInfo.start!, timelineInfo.end!)?.minutes}MIN
          </TextBox>
        </div>
        {/* <div className="time-tag day">{totalWorkDuration}</div> */}
      </div>
    </div>
  );
};
