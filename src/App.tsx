import React, { useState, useEffect } from "react";
import "./App.css";
import { Timeline } from "./components/Display/Timeline/Timeline";
import { ManagerPanel } from "./components/Create/ManagerPanel";
import { Display } from "./components/Display/Display";
import { timeConverter } from "./Utilities/TimeConverter";
import { jsx } from "@emotion/react";
import { css } from "@emotion/css";
import { useSpring, animated, config } from "@react-spring/web";
import { Login } from "./components/Login/Login";
import { Dashboard } from "./components/Create/Dashboard";
import { useUserContext } from "./Contexts/UserContext";
import { CreateTask } from "./components/Create/CreateTask";
import { useTasksContext } from "./Contexts/TasksContext";
import { useCurrentEditor } from "@tiptap/react";
import { EditorContent } from "@tiptap/react";
const { v4 } = require("uuid");

export type TodoStateProps = {
  id: string;
  title: string;
  time: string | number;
  completed: boolean;
};

export interface FilterInterface {
  all: boolean;
  unfinished: boolean;
  complete: boolean;
}

export type TTimeline = {
  wakeUp: number | null;
  start: number | null;
  end: number | null;
  sleep: number | null;
  [key: string]: any;
};

const testTasks = [
  {
    id: "d7886657-791f-4a54-8f74-c8405432f0fa",
    title: "heglle123",
    time: "10:30",
    completed: false,
  },
  {
    id: "0670ae91-bda3-41c4-984e-ff2ce70d6a19",
    title: "Do this thing and do this other thing",
    time: "11:45",
    completed: false,
  },
  {
    id: "1e3d1b79-7909-452f-afae-476fdc503a0e",
    title: "215912",
    time: "12:30",
    completed: false,
  },
  {
    id: "1e3d1b79-7129-452f-afae-476fdc503a0e",
    title: "ajgasf",
    time: "15:25",
    completed: true,
  },
  {
    id: "1e3d1b79-f109-452f-afae-476fdc503a0e",
    title: "asdassd",
    time: "18:00",
    completed: true,
  },
];

const testTimeline = {
  wakeUp: 450,
  start: 600,
  end: 1080,
  sleep: 1320,
};

function App() {
  const [timelineInfo, setTimelineDetails] = useState<TTimeline>(testTimeline);

  const {
    user,
    loggedIn,
    setLoggedIn,
    handleLogin,
    loginVisible,
    setLoginVisible,
  } = useUserContext();

  const {
    currentWeek,
    selectedDay,
    setSelectedDay,
    taskActive,
    setTaskActive,
    initDay,
    editorContent,
    setEditorContent,
  } = useTasksContext();

  const divSpring = useSpring({
    from: { transform: "translateY(0px)" },
    to: { transform: taskActive ? "translateY(-100px)" : "translateY(0px)" },
    delay: taskActive ? 100 : 0,
  });

  const displaySpring = useSpring({
    from: { transform: "translateX(633px)", opacity: 0 },
    to: {
      transform: taskActive ? "translateX(-17px)" : "translateX(633px)",
      opacity: taskActive ? 1 : 0,
    },
    delay: taskActive ? 300 : 0,
  });

  const timelineSpring = useSpring({
    from: { transform: "translateY(400px)", opacity: 0 },
    to: {
      transform: taskActive ? "translateY(216px)" : "translateY(400px)",
      opacity: taskActive ? 1 : 0,
    },
    delay: taskActive ? 300 : 0,
  });

  // const ContentPreview = () => {

  //   const { editor } = useCurrentEditor();

  //   useEffect(() => {
  //     if (!editor) {
  //       return undefined
  //     }
  //   }, [editor])

  //   return(<pre>{JSON.stringify(editor.getJSON(), null, 2)}</pre>)

  // };

  return (
    <div className="App">
      <animated.div className="task-creation-display" style={{ ...divSpring }}>
        <ManagerPanel taskActive={taskActive}>
          {loginVisible && (
            <Login
              loggedIn={loggedIn}
              handleLogin={handleLogin}
              setLoginVisible={setLoginVisible}
            />
          )}
          {!loginVisible && !taskActive && (
            <Dashboard
              taskActive={taskActive}
              setTaskActive={setTaskActive}
              currentWeek={currentWeek}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              initDay={initDay}
            />
          )}
          {taskActive && (
            <CreateTask
              setTaskActive={setTaskActive}
              taskActive={taskActive}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              editorContent={editorContent}
              setEditorContent={setEditorContent}
            />
          )}
        </ManagerPanel>
        <animated.div style={{ ...displaySpring }}>
          {taskActive && (
            <Display
              editorContent={editorContent}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              // setTasks={setTasks}
              // tasks={tasks}
              timelineInfo={timelineInfo}
            />
          )}
        </animated.div>
      </animated.div>
      <animated.div style={{ ...timelineSpring }}>
        {taskActive && (
          <Timeline
            tasks={selectedDay && selectedDay.tasks}
            timelineInfo={timelineInfo}
          />
        )}
      </animated.div>
    </div>
  );
}

export default App;
