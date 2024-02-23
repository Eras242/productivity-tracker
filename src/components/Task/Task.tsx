import React from "react";
import "./task.css";
import { timeConverter } from "../../Utilities/TimeConverter";

type TaskProps = {
  title: string;
  time: string | number;
  completed: boolean;
  id: string;
  logId: (id: string) => void;
  handleCheck: (id: string) => void;
};

export const Task = ({
  title,
  time,
  completed,
  logId,
  id,
  handleCheck,
}: TaskProps) => {
  return (
    <div
      style={completed ? { opacity: 0.2 } : { opacity: 1 }}
      className="container todo-item"
      onClick={() => handleCheck(id)}
    >
      {time ? <div className="time-tag">{time}</div> : ""}
      {title}

      <input
        className="complete-box"
        type="checkbox"
        name=""
        id=""
        checked={completed}
        onChange={() => handleCheck(id)}
      />
    </div>
  );
};
