import { TTimeline } from "../App";
import { createContext, useContext, useEffect, useState } from "react";
import { User, useUserContext } from "./UserContext";
import { getRecentCurrentWeek } from "../Utilities/getWeekObject";
import { v4 } from "uuid";

type TTaskItem = {
  simple: boolean;
  taskItem: { title: string; body: null | string };
};

export type TTask = {
  id: string;
  task: TTaskItem;
  time: string | number;
  completed: boolean;
};

export type TTaskDay = {
  id: string;
  user: User | null;
  date: Date | undefined;
  timeline: TTimeline | null;
  tasks: TTask[];
  initialized: boolean;
};

interface ITasksContext {
  user: User | null;
  currentWeek: TTaskDay[];
  selectedDay: TTaskDay | null;
  setSelectedDay: React.Dispatch<React.SetStateAction<TTaskDay | null>>;
  taskActive: boolean;
  setTaskActive: React.Dispatch<React.SetStateAction<boolean>>;
  initDay: () => boolean;
  editorContent: string;
  setEditorContent: React.Dispatch<React.SetStateAction<string>>;
}

const TasksContext = createContext<ITasksContext>({
  user: null,
  currentWeek: [],
  selectedDay: null,
  setSelectedDay: () => {},
  taskActive: false,
  setTaskActive: () => {},
  initDay: () => false,
  editorContent: "",
  setEditorContent: () => {},
});

export const useTasksContext = () => useContext(TasksContext);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserContext();
  const [currentWeek, setCurrentWeek] = useState<TTaskDay[]>([]);
  const [selectedDay, setSelectedDay] = useState<TTaskDay | null>(null);
  const [taskActive, setTaskActive] = useState<boolean>(false);

  const createWeek = () => {
    const week = getRecentCurrentWeek();
    let cw = week.map((i) => {
      return {
        id: v4(),
        user: user,
        date: i.day,
        timeline: null,
        tasks: [],
        initialized: false,
      };
    });
    localStorage.setItem("currentWeekState", JSON.stringify(cw));
  };

  const initDay = () => {
    if (selectedDay) {
      setSelectedDay((prev) => ({ ...prev!, initialized: true }));
      return selectedDay.initialized;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("currentWeekState");
    let week: TTaskDay[];
    week = JSON.parse(data!);
    if (!data || week.length == 0) {
      console.log("No week found in Local Storage, creating week...");
      createWeek();
      return;
    }
    setCurrentWeek(week.map((i) => ({ ...i, date: new Date(i.date!) })));
  }, []);

  useEffect(() => {
    if (selectedDay) {
      setCurrentWeek((prev) => {
        const newState = prev.map((i) =>
          i.id == selectedDay.id ? selectedDay : i
        );

        localStorage.setItem("currentWeekState", JSON.stringify(newState));
        return newState;
      });
      console.log(currentWeek);
    }

    console.log("Finished Update");
  }, [user, selectedDay]);

  // const handleTasks = (taskItem: TTask) => {
  //   if (Array.isArray(taskItem)) {
  //     setSelectedDay((prev) => ({
  //       ...prev!,
  //       tasks: [...prev!?.tasks, taskItem],
  //     }));
  //   } else {
  //     setSelectedDay((prev) => ({
  //       ...prev!,
  //       tasks: [...prev!?.tasks, taskItem],
  //     }));
  //   }
  // };

  const [editorContent, setEditorContent] = useState<string>(`<p></p>`);

  return (
    <TasksContext.Provider
      value={{
        user,
        currentWeek,
        selectedDay,
        setSelectedDay,
        taskActive,
        setTaskActive,
        initDay,
        editorContent,
        setEditorContent,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
