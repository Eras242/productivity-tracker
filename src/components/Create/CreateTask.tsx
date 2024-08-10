import React from "react";
import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { TTaskDay } from "../../Contexts/TasksContext";
import { TTask } from "../../Contexts/TasksContext";
import { v4 } from "uuid";
import { DayMap, MonthMap } from "../../Utilities/weekHelpers";
import { IoIosArrowBack } from "react-icons/io";
import { TipTap } from "../../Tiptap";
import { Editor, useEditor } from "@tiptap/react";
import { FaRegTrashAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

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
  const [panelVisible, setPanelVisible] = useState<boolean>(true);
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false);
  const [formDetails, setFormDetails] = useState<TTask>({
    id: "",
    task: { simple: true, taskItem: { title: "", body: "null" } },
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
                taskItem: { ...prev.task.taskItem, title: e.target.value },
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

  function submitTask(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    //error handle
    if (simple) {
      if (formDetails.task.taskItem["title"] == "") {
        setValid({ valid: false, message: "- Please enter a valid title -" });
        return false;
      } else if (formDetails["time"] == "") {
        setValid({ valid: false, message: "- Please enter a valid time -" });
        return false;
      }
    } else {
      if (formDetails.task.taskItem["title"] == "") {
        setValid({ valid: false, message: "- Please enter a valid title -" });
        return false;
      } else if (formDetails.task.taskItem.body == null) {
        setValid({ valid: false, message: "- Empty body -" });
        return false;
      } else if (formDetails["time"] == "") {
        setValid({ valid: false, message: "- Please enter a valid time -" });
        return false;
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
    return true;
  }
  // Return to dashboard
  const handleBack = () => {
    setSelectedDay(null);
    setTaskActive(false);
  };

  const DeleteTaskDay = () => {
    return (
      <div className="container-delete-task-day">
        <span className="cross-icon">
          <RxCross2 />
        </span>
        <h3>Delete Day</h3>
        <p>
          Deleting this day will remove all of it's tasks and timeline, are you
          sure?
        </p>
        <button>Delete</button>
      </div>
    );
  };

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

  const simpleSpring = useSpring({
    from: {
      transform: "translateX(100%)",
      opacity: "0",
    },
    to: {
      transform: panelVisible ? "translateX(0%)" : "translateX(-100%)",
      opacity: panelVisible ? "1" : "0",
    },
  });

  const editorSpring = useSpring({
    from: {
      transform: "translateX(100%)",
      opacity: "0",
    },
    to: {
      transform: !panelVisible ? "translateX(0%)" : "translateX(100%)",
      opacity: !panelVisible ? "1" : "0",
    },
  });

  const deleteSpring = useSpring({});
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

  return (
    <animated.div
      className="task-creation"
      style={{ ...creationSpring, transform: "transformY(-50%)" }}
    >
      {deleteVisible && (
        <animated.div>
          <div
            className="delete-task-overlay"
            onClick={() => {
              setDeleteVisible(false);
            }}
          ></div>
          <DeleteTaskDay />
        </animated.div>
      )}
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
        <button
          className="btn icon trash"
          onClick={() => setDeleteVisible(true)}
        >
          <FaRegTrashAlt />
        </button>
      </div>
      {/* <div className="line"></div> */}
      <div style={{ width: "100%" }}>
        <label className="switch">
          <input
            type="checkbox"
            onClick={() => {
              setPanelVisible(!panelVisible);
              setTimeout(() => setSimple(!simple), 100);
            }}
          />
          <span className="slider"></span>
        </label>
      </div>
      {simple && (
        <animated.div
          className="simple-panel-container"
          style={{ padding: "2rem", ...simpleSpring }}
        >
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
          <div>
            <h3>Suggested previous tasks:</h3>
          </div>
        </animated.div>
      )}
      {!simple && (
        <animated.div
          className="tiptap-panel-container"
          style={{ ...editorSpring }}
        >
          <TipTap
            setEditorContent={setEditorContent}
            editorContent={editorContent}
            onChangeForm={onChangeForm}
            formDetails={formDetails}
            setFormDetails={setFormDetails}
            submitTask={submitTask}
          />
        </animated.div>
      )}
    </animated.div>
  );
};

export default CreateTask;
