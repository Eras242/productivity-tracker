import React, { useState } from "react";
import { TodoStateProps } from "../../../App";
import { timePercentage } from "../../../Utilities/TimeConverter";
import { timeConverter } from "../../../Utilities/TimeConverter";
import { TTimeline } from "../../../App";
import { jsx } from "@emotion/react";
import { css } from "@emotion/css";
import { TTask } from "../../../Contexts/TasksContext";

interface TaskDotInterface {
  task: TTask;
  info: TTimeline;
}

export const TaskDot = ({ task, info }: TaskDotInterface) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const taskTime = Number(timeConverter(task.time, "tm"));
  const perc = timePercentage(info.start!, info.end!, taskTime);
  return (
    <div
      className="task-dot box"
      style={{
        left: perc,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="task-dot"
        style={{
          backgroundColor: task.completed ? "#8af574" : "#74ecf5",
        }}
      ></div>
      <div
        className="ring"
        style={{
          borderColor: task.completed ? "#8af574" : "#74ecf5",
        }}
      ></div>
      <div
        className="task-modal"
        style={{
          display: isHovered ? "flex" : "none",
          opacity: isHovered ? "100%" : "0",
        }}
      >
        <div className="time-tag day">{task.time}</div>
        <p className="tm-title">{task.task.taskItem.title}</p>
        <p>Completed: {task.completed ? "True" : "False"}</p>
      </div>
    </div>
  );
};
