import React from "react";
import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { TodoStateProps } from "../../App";
import { CreateProps } from "./ManagerPanel";
import { TTaskDay } from "../../Contexts/TasksContext";
import { TTask } from "../../Contexts/TasksContext";
import { v4 } from "uuid";
import { DayMap, MonthMap } from "../../Utilities/getWeekObject";
import { IoIosArrowBack } from "react-icons/io";
import { TipTap } from "../../Tiptap";

export type ValidStateProps = {
  valid: boolean;
  message: string;
};

type TaskCreationProps = {
  taskActive: boolean;
  selectedDay: TTaskDay | null;
  setSelectedDay: React.Dispatch<React.SetStateAction<TTaskDay | null>>;
  setTaskActive: React.Dispatch<React.SetStateAction<boolean>>;
  // setTasks: React.Dispatch<React.SetStateAction<TTask[]>>;
};

export const CreateTask = ({
  selectedDay,
  setSelectedDay,
  taskActive,
  setTaskActive,
}: // setTasks,
TaskCreationProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [formDetails, setFormDetails] = useState<TTask>({
    id: "",
    title: "",
    time: "",
    completed: false,
  });

  const [valid, setValid] = useState<ValidStateProps>({
    valid: true,
    message: "",
  });

  function onChangeTime(e: React.ChangeEvent<HTMLInputElement>) {
    setFormDetails((prev) =>
      e.target.name === "title"
        ? {
            ...prev,
            [e.target.name]: e.target.value,
            completed: false,
            id: v4(),
          }
        : {
            ...prev,
            [e.target.name]: e.target.value,

            completed: false,
            id: v4(),
          }
    );
  }

  function submitTask(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    //error handle
    if (formDetails["title"] == "") {
      setValid({ valid: false, message: "- Please enter a valid title -" });
      return;
    } else if (formDetails["time"] == "") {
      setValid({ valid: false, message: "- Please enter a valid time -" });
      return;
    }

    setValid({ valid: true, message: "" });

    if (selectedDay) {
      setSelectedDay((prev) => ({
        ...prev!,
        tasks: [...prev!?.tasks, formDetails],
      }));
    }

    // setTasks((prev) => [...prev, formDetails]);

    setFormDetails({
      id: "",
      title: "",
      time: "",
      completed: false,
    });
  }

  const fade = useSpring({
    opacity: isVisible ? 1 : 0,
  });
  const creationSpring = useSpring({
    from: {
      opacity: "0",
    },
    to: {
      opacity: taskActive ? "1" : "0",
    },
    delay: 100,
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

  const handleBack = () => {
    setSelectedDay(null);
    setTaskActive(false);
  };

  return (
    <animated.div
      className="task-creation"
      style={{ ...creationSpring, transform: "transformY(-50%)" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <button className="btn-icon" onClick={handleBack}>
          <IoIosArrowBack />
        </button>
        <h3 className="date-box">
          {DayMap[selectedDay!.date?.getDay()!]} {selectedDay!.date?.getDate()!}{" "}
          {MonthMap[selectedDay!.date?.getMonth()!]}
        </h3>
      </div>
      <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <button>Simple</button>
        <button>Editor</button>
      </div>
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
        <div style={{ width: "100%" }}></div>
        <animated.div style={fade} className="invalid-form">
          <p>{valid["message"]}</p>
        </animated.div>
      </form>
      <div style={{ overflow: "scroll" }}>
        <TipTap />
      </div>
    </animated.div>
  );
};
