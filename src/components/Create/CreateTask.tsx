import React from "react";
import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { TodoStateProps } from "../../App";
import { ValidStateProps } from "../../App";
import { CreateProps } from "./Create";

type TaskCreationProps = {
  onChangeTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitTask: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  newDay: boolean;
  formDetails: TodoStateProps;
  valid: ValidStateProps;
};

export const CreateTask = ({
  formDetails,
  onChangeTime,
  submitTask,
  valid,
}: TaskCreationProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const fade = useSpring({
    opacity: isVisible ? 1 : 0,
  });

  useEffect(() => {
    if (valid["valid"] == false) {
      setIsVisible(true);

      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [valid]);

  return (
    <div>
      <h1>Add Todo</h1>
      <form action="">
        <div className="title-time">
          <input
            name="title"
            type="text"
            value={formDetails.title}
            onChange={onChangeTime}
            placeholder="Title"
          />
          <input name="time" type="time" onChange={onChangeTime} />
        </div>
        <button onClick={submitTask}>Add Todo</button>
        <animated.div style={fade} className="invalid-form">
          <p>{valid["message"]}</p>
        </animated.div>
      </form>
    </div>
  );
};
