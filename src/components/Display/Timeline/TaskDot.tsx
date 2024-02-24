import React from "react";
import { TodoStateProps } from "../../../App";
import { timePercentage } from "../../../Utilities/TimeConverter";
import { timeConverter } from "../../../Utilities/TimeConverter";
import { TimelineInfoInterface } from "../../../App";

interface TaskDotInterface {
  task: TodoStateProps;
  info: TimelineInfoInterface;
}

export const TaskDot = ({ task, info }: TaskDotInterface) => {
  console.log(info.end);

  const taskTime = Number(timeConverter(task.time, "tm"));
  const perc = timePercentage(taskTime, info.end!);
  console.log(perc);
  return (
    <div
      className="task-dot box"
      style={{
        left: perc,
      }}
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
    </div>
  );
};
