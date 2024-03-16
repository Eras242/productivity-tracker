import React, { useState } from "react";
import "./task.css";
import { timeConverter } from "../../Utilities/TimeConverter";
import { jsx } from "@emotion/react";
import { css } from "@emotion/css";
import { TTask } from "../../Contexts/TasksContext";
import { animated, useSpring } from "@react-spring/web";
import parse from "html-react-parser";

type TaskProps = {
  task: TTask;
  handleCheck: (id: string) => void;
};

export const Task = ({ task, handleCheck }: TaskProps) => {
  const [taskHover, setTaskHover] = useState(false);

  const taskSpring = useSpring({
    from: {
      height: taskHover ? "50px" : "500px",
      // marginBottom: taskHover ? "0rem" : "2rem",
    },
    to: {
      height: taskHover ? "500px" : "50px",
      // marginBottom: taskHover ? "2rem" : "0rem",
    },
    config: { tension: 100, friction: 20 },
  });

  const taskItemSpring = useSpring({
    from: { opacity: taskHover ? 0.25 : 1, delay: 500 },
    to: { opacity: taskHover ? 1 : 0 },
  });

  return task.task.simple ? (
    <div
      style={task.completed ? { opacity: 0.2 } : { opacity: 1 }}
      className="container todo-item"
      onClick={() => handleCheck(task.id)}
    >
      <div className="task-editor-header">
        {task.time ? <div className="time-tag">{task.time}</div> : ""}
        {task.task.taskItem.title}

        <input
          className="complete-box"
          type="checkbox"
          name=""
          id=""
          checked={task.completed}
          onChange={() => handleCheck(task.id)}
        />
      </div>
    </div>
  ) : (
    <animated.div
      style={{ ...taskSpring }}
      className="container todo-item"
      onClick={() => handleCheck(task.id)}
      onMouseEnter={() => setTaskHover(true)}
      onMouseLeave={() => setTaskHover(false)}
    >
      <div className="task-editor-header">
        {task.time ? <div className="time-tag">{task.time}</div> : ""}
        {task.task.taskItem.title}

        <input
          className="complete-box"
          type="checkbox"
          name=""
          id=""
          checked={task.completed}
          onChange={() => handleCheck(task.id)}
        />
      </div>
      <animated.div
        className="task-editor-content"
        style={{ ...taskItemSpring }}
      >
        {parse(JSON.stringify(task.task.taskItem.body))}
        <div>
          <button className="btn">Complete</button>
          <button className="btn">Edit</button>
        </div>
      </animated.div>
    </animated.div>
  );
};
