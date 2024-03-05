import React, { useState, useEffect } from "react";
import "./App.css";
import { Timeline } from "./components/Display/Timeline/Timeline";
import { Create } from "./components/Create/Create";
import { Display } from "./components/Display/Display";
import { timeConverter } from "./Utilities/TimeConverter";
import { jsx } from "@emotion/react";
import { css } from "@emotion/css";
import { useSpring, animated, config } from "@react-spring/web";
import { Login } from "./components/Login/Login";

const { v4 } = require("uuid");

export type TodoStateProps = {
  id: string;
  title: string;
  time: string | number;
  completed: boolean;
};

export type ValidStateProps = {
  valid: boolean;
  message: string;
};

export interface FilterInterface {
  all: boolean;
  unfinished: boolean;
  complete: boolean;
}

export interface TimelineInfoInterface {
  wakeUp: number | null;
  start: number | null;
  end: number | null;
  sleep: number | null;
  [key: string]: any;
}

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
  const [formDetails, setFormDetails] = useState<TodoStateProps>({
    id: "",
    title: "",
    time: "",
    completed: false,
  });

  const [newDay, setNewDay] = useState<boolean>(true);
  const [tasks, setTasks] = useState<TodoStateProps[]>(testTasks);
  const [filter, setFilter] = useState({
    all: true,
    unfinished: false,
    complete: false,
  });
  const [displayTasks, setDisplayTasks] = useState<TodoStateProps[]>([]);
  const [valid, setValid] = useState<ValidStateProps>({
    valid: true,
    message: "",
  });

  const divSpring = useSpring({
    from: { transform: "translateY(0px)" },
    to: { transform: newDay ? "translateY(0px)" : "translateY(-100px)" },
    delay: newDay ? 0 : 100,
  });
  const createSpring = useSpring({
    from: { transform: "translateX(-525px)" },
    to: {
      transform: newDay ? "translateX(-525px)" : "translateX(-633px)",
      delay: newDay ? 0 : 200,
    },
  });

  const displaySpring = useSpring({
    from: { transform: "translateX(633px)", opacity: 0 },
    to: {
      transform: newDay ? "translateX(633px)" : "translateX(-17px)",
      opacity: newDay ? 0 : 1,
    },
    delay: newDay ? 0 : 300,
  });

  const timelineSpring = useSpring({
    from: { transform: "translateY(400px)", opacity: 0 },
    to: {
      transform: newDay ? "translateY(400px)" : "translateY(216px)",
      opacity: newDay ? 0 : 1,
    },
    delay: newDay ? 0 : 300,
  });

  // timelineInfo is a minute count conversion of the 24 Hour time provided ("12:24" -> 744)
  const [timelineInfo, setTimelineDetails] =
    useState<TimelineInfoInterface>(testTimeline);

  function onChangeTimelineForm(e: React.ChangeEvent<HTMLInputElement>) {
    let time: string | string[] = e.target.value;
    time = time.split(":");
    const minuteCount = parseInt(time[0]) * 60 + Number(time[1]);
    setTimelineDetails((prev) => ({
      ...prev,
      [e.target.name]: minuteCount,
    }));
    // validateTimelineEntries(e.target.name, minuteCount);
  }

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
    console.log(tasks);
  }

  async function submitTask(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    if (formDetails["title"] == "") {
      setValid({ valid: false, message: "- Please enter a valid title -" });
      return;
    } else if (formDetails["time"] == "") {
      setValid({ valid: false, message: "- Please enter a valid time -" });
      return;
    }

    setValid({ valid: true, message: "" });
    setTasks((prev) => [...prev, formDetails]);
    setFormDetails({
      id: "",
      title: "",
      time: "",
      completed: false,
    });

    console.log(tasks);
  }

  const logId = (id: string) => {
    console.log(`Hello World this is my Id: ${id}`);
  };

  useEffect(() => {
    if (filter.all) {
      setDisplayTasks(tasks);
    } else if (filter.unfinished) {
      setDisplayTasks(tasks.filter((t) => t.completed == false));
    } else if (filter.complete) {
      setDisplayTasks(tasks.filter((t) => t.completed == true));
    }
  }, [filter, tasks]);
  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    // Set all to false first

    // Set all in filter to false except selceted
    const resetFilter: FilterInterface = {
      all: false,
      unfinished: false,
      complete: false,
    };

    setFilter(resetFilter);

    setFilter((prev) => ({ ...prev, [e.target.name]: true }));

    console.log(filter);
  }

  const handleCheck = (id: string) => {
    const i = tasks.findIndex((t) => t.id == id);

    if (i !== -1) {
      const updatedTasks = [...tasks];

      updatedTasks[i] = {
        ...updatedTasks[i],
        completed: !updatedTasks[i].completed,
      };

      setTasks(updatedTasks);
    }

    setTasks((prev) => [...prev]);
  };

  const handleMarkAllComplete = () => {
    if (tasks.length == 0) {
      return;
    }

    const updatedTasks = tasks.map((t) => ({ ...t, completed: true }));
    setTasks(updatedTasks);
  };

  const handleClearComplete = () => {
    if (tasks.length == 0) {
      return;
    }

    const updatedTasks = tasks.filter((t) => t.completed !== true);
    setTasks(updatedTasks);
  };

  const handleClearAll = () => {
    setTasks([]);
  };

  return (
    <div className="App">
      {/* <Login /> */}
      <animated.div className="task-creation-display" style={{ ...divSpring }}>
        <animated.div style={{ ...createSpring }}>
          <Create
            newDay={newDay}
            onChangeTime={onChangeTime}
            submitTask={submitTask}
            formDetails={formDetails}
            valid={valid}
          />
        </animated.div>
        <animated.div className="hello" style={{ ...displaySpring }}>
          <Display
            tasks={displayTasks}
            logId={logId}
            handleCheck={handleCheck}
            handleMarkAllComplete={handleMarkAllComplete}
            handleClearAll={handleClearAll}
            handleClearComplete={handleClearComplete}
            filter={filter}
            handleFilter={handleFilter}
            timelineInfo={timelineInfo}
          />
        </animated.div>
      </animated.div>
      <animated.div style={{ ...timelineSpring }}>
        {!newDay ? <Timeline tasks={tasks} timelineInfo={timelineInfo} /> : ""}
      </animated.div>
      <button
        style={{ position: "absolute", left: 0, bottom: 0 }}
        onClick={() => setNewDay(!newDay)}
      >
        Show UI: {JSON.stringify(newDay)}
      </button>
    </div>
  );
}

export default App;
