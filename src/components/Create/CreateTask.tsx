import React from "react";
import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { TTaskDay } from "../../Contexts/TasksContext";
import { TTask } from "../../Contexts/TasksContext";
import { v4 } from "uuid";
import { DayMap, MonthMap } from "../../Utilities/getWeekObject";
import { IoIosArrowBack } from "react-icons/io";
import { TipTap } from "../../Tiptap";
import { useEditor } from "@tiptap/react";

export type ValidStateProps = {
  valid: boolean;
  message: string;
};

type TaskCreationProps = {
  taskActive: boolean;
  selectedDay: TTaskDay | null;
  setSelectedDay: React.Dispatch<React.SetStateAction<TTaskDay | null>>;
  setTaskActive: React.Dispatch<React.SetStateAction<boolean>>;
  editorContent: string;
  setEditorContent: React.Dispatch<React.SetStateAction<string>>;
};

export const CreateTask = ({
  selectedDay,
  setSelectedDay,
  taskActive,
  setTaskActive,
  editorContent,
  setEditorContent,
}: TaskCreationProps) => {
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

  const [simple, setSimple] = useState<boolean>(true);

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

  // const runTest = () => {
  //   const { editor } = useEditor();

  // };

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
      <div className="task-creation-header">
        <button className="btn-icon" onClick={handleBack}>
          <IoIosArrowBack />
        </button>
        <h3 className="date-box">
          {DayMap[selectedDay!.date?.getDay()!]} {selectedDay!.date?.getDate()!}{" "}
          {MonthMap[selectedDay!.date?.getMonth()!]}
        </h3>
      </div>
        <div className="line"></div>
      <div className="simple-editor">
        <button onClick={() => setSimple(true)}>Simple</button>
        <button onClick={() => setSimple(false)}>Editor</button>
      </div>
      {simple && (
        <div className="simple-panel-container" style={{ padding: "2rem" }}>
          <form action="">
            <div className="title-time">
              <input
                name="title"
                type="text"
                value={formDetails.title}
                onChange={onChangeTime}
                placeholder="Task"
              />
              <input name="time" type="time" onChange={onChangeTime} />
            </div>
            <button onClick={submitTask}>Add Task</button>
            <div style={{ width: "100%" }}></div>
            <animated.div style={fade} className="invalid-form">
              <p>{valid["message"]}</p>
            </animated.div>
          </form>
        </div>
      )}
      {!simple && (
        <div className="tiptap-panel-container">
          <TipTap setEditorContent={setEditorContent} />
        </div>
      )}
    </animated.div>
  );
};
