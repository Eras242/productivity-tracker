import React, { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import {
  TimelineInfoInterface,
  TodoStateProps,
  ValidStateProps,
} from "../../App";
import { TimelineForm } from "./TimelineForm";

type CreateProps = {
  onChangeTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTimelineForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitTask: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  formDetails: TodoStateProps;
  valid: ValidStateProps;
  timelineInfo: TimelineInfoInterface;
};

export const Create = ({
  onChangeTime,
  onChangeTimelineForm,
  submitTask,
  formDetails,
  valid,
  timelineInfo,
}: CreateProps) => {
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
    <div className="container add-todo">
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
      <TimelineForm
        onChangeTimelineForm={onChangeTimelineForm}
        timelineInfo={timelineInfo}
      />
    </div>
  );
};
