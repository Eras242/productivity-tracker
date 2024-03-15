import React from "react";
import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { TTaskDay } from "../../Contexts/TasksContext";
import { TTask } from "../../Contexts/TasksContext";
import { v4 } from "uuid";
import { DayMap, MonthMap } from "../../Utilities/getWeekObject";
import { IoIosArrowBack } from "react-icons/io";
import { TipTap } from "../../Tiptap";
import { Editor, useEditor } from "@tiptap/react";

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
  const [simple, setSimple] = useState<boolean>(true);

  const [formDetails, setFormDetails] = useState<TTask>({
    id: "",
    task: { simple: true, taskItem: { title: "", body: null } },
    time: "",
    completed: false,
  });

  const [valid, setValid] = useState<ValidStateProps>({
    valid: true,
    message: "",
  });

  function onChangeForm(e: React.ChangeEvent<HTMLInputElement>) {
    {
      setFormDetails((prev) =>
        e.target.name === "title"
          ? {
              ...prev,
              task: {
                simple: simple,
                taskItem: { title: e.target.value, body: null },
              },
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
  }

  function submitTask(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    html?: string
  ) {
    e.preventDefault();
    console.log(simple);

    //error handle
    if (simple) {
      if (formDetails.task.taskItem["title"] == "") {
        setValid({ valid: false, message: "- Please enter a valid title -" });
        return;
      } else if (formDetails["time"] == "") {
        setValid({ valid: false, message: "- Please enter a valid time -" });
        return;
      }
    } else {
      const editorInvalidBody = ["", null, "<p></p>"];

      if (!html) {
        console.log("No Editor");
        return;
      }

      setFormDetails((prev) => ({
        ...prev,
        task: {
          simple: simple,
          taskItem: { title: "Test", body: html },
        },
      }));
      console.log(formDetails);
      console.log(html);

      if (formDetails.task.taskItem["title"] == "") {
        setValid({ valid: false, message: "- Please enter a valid title -" });
        return;
      } else if (formDetails["time"] == "") {
        setValid({ valid: false, message: "- Please enter a valid time -" });
        return;
      } else if (formDetails.task.taskItem.body! in editorInvalidBody) {
        setValid({ valid: false, message: "- Empty body -" });
        return;
      }
    }

    setValid({ valid: true, message: "" });

    setSelectedDay((prev) => ({
      ...prev!,
      tasks: [...prev!?.tasks, formDetails],
    }));

    setFormDetails({
      id: "",
      task: { simple: simple, taskItem: { title: "", body: null } },
      time: "",
      completed: false,
    });
  }

  // Springs
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

  // Error effect
  useEffect(() => {
    if (valid["valid"] == false) {
      setIsVisible(true);

      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [valid]);

  // Return to dashboard
  const handleBack = () => {
    setSelectedDay(null);
    setTaskActive(false);
  };

  return (
    <animated.div
      className="task-creation"
      style={{ ...creationSpring, transform: "transformY(-50%)" }}
    >
      <animated.div style={fade} className="invalid-form">
        <p>{valid["message"]}</p>
        <p>{JSON.stringify(simple)}</p>
      </animated.div>
      <div className="task-creation-header">
        <button className="btn icon" onClick={handleBack}>
          <IoIosArrowBack />
        </button>
        <h3 className="date-box">
          {DayMap[selectedDay!.date?.getDay()!]} {selectedDay!.date?.getDate()!}{" "}
          {MonthMap[selectedDay!.date?.getMonth()!]}
        </h3>
      </div>
      <div className="line"></div>
      <div className="simple-editor">
        <button className="btn" onClick={() => setSimple(true)}>
          Simple
        </button>
        <button className="btn" onClick={() => setSimple(false)}>
          Editor
        </button>
      </div>
      {simple && (
        <div className="simple-panel-container" style={{ padding: "2rem" }}>
          <form action="">
            <div className="title-time">
              <input
                name="title"
                type="text"
                value={formDetails.task.taskItem.title}
                onChange={onChangeForm}
                placeholder="Task"
              />
              <input name="time" type="time" onChange={onChangeForm} />
            </div>
            <button className="btn" onClick={submitTask}>
              Add Task
            </button>
            <div style={{ width: "100%" }}></div>
          </form>
        </div>
      )}
      {!simple && (
        <div className="tiptap-panel-container">
          <TipTap
            editorContent={editorContent}
            onChangeForm={onChangeForm}
            submitTask={submitTask}
          />
        </div>
      )}
    </animated.div>
  );
};
