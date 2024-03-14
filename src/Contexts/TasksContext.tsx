import { TTimeline } from "../App";
import { createContext, useContext, useEffect, useState } from "react";
import { User, useUserContext } from "./UserContext";
import { getRecentCurrentWeek } from "../Utilities/getWeekObject";
import { v4 } from "uuid";

export type TTask = {
  title: string;
  time: string | number;
  completed: boolean;
  id: string;
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
  // tasks: TTask[];
  // setTasks: React.Dispatch<React.SetStateAction<TTask[]>>;
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
  // tasks: [],
  // setTasks: () => {},
});

export const useTasksContext = () => useContext(TasksContext);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserContext();
  const [currentWeek, setCurrentWeek] = useState<TTaskDay[]>([]);
  const [selectedDay, setSelectedDay] = useState<TTaskDay | null>(null);
  const [taskActive, setTaskActive] = useState<boolean>(false);
  // const [tasks, setTasks] = useState<TTask[]>([]);

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
    setCurrentWeek(cw);
  };

  const initDay = () => {
    if (selectedDay) {
      setSelectedDay((prev) => ({ ...prev!, initialized: true }));
      return selectedDay.initialized;
    } else {
      return false;
    }
  };

  // const addTask = (selectedDay: TTaskDay, task: TTask) => {
  //   selectedDay &&
  //     setSelectedDay((prev) => ({ ...prev!, tasks: [...prev, task] }));
  // };

  const updateWeek = (selectedDay: TTaskDay) => {
    if (selectedDay)
      setCurrentWeek((prev) =>
        prev.map((i) => (i.id == selectedDay.id ? selectedDay : i))
      );
  };

  useEffect(() => {
    if (currentWeek.length == 0) {
      createWeek();
    }
    if (selectedDay) {
      console.log("Fired");
      updateWeek(selectedDay);
      console.log(selectedDay);
      console.log(currentWeek);
    }
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

  const [editorContent, setEditorContent] = useState<string>(`
  <h2>
    Hi there,
  </h2>
  <p>
    this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
  </p>
  <ul>
    <li>
      That’s a bullet list with one …
    </li>
    <li>
      … or two list items.
    </li>
  </ul>
  `);

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
