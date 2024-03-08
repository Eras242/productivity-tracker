import { TTimeline } from "../App";
import { createContext, useContext, useEffect, useState } from "react";
import { User, useUserContext } from "./UserContext";
import { getRecentCurrentWeek } from "../Utilities/getWeekObject";
import { v4 } from "uuid";

type TTask = {
  title: string;
  time: string | number;
  completed: boolean;
  id: string;
  logId: (id: string) => void;
  handleCheck: (id: string) => void;
};

export type TTaskDay = {
  id: string;
  user: User | null;
  date: Date | undefined;
  timeline: TTimeline | null;
  tasks: TTask[];
};

interface ITasksContext {
  user: User | null;
  currentWeek: TTaskDay[];
}

const TasksContext = createContext<ITasksContext>({
  user: null,
  currentWeek: [],
});

export const useTasksContext = () => useContext(TasksContext);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserContext();
  const [currentWeek, setCurrentWeek] = useState<TTaskDay[]>([]);
  const [selectedDay, setSelectedDay] = useState<TTaskDay>();

  const createWeek = () => {
    const week = getRecentCurrentWeek();
    let cw = week.map((i) => {
      return { id: v4(), user: user, date: i.day, timeline: null, tasks: [] };
    });

    setCurrentWeek(cw);
  };

  useEffect(() => {
    createWeek();
  }, [user]);

  const addTask = () => {};

  const removeTask = () => {};

  return (
    <TasksContext.Provider value={{ user, currentWeek }}>
      {children}
    </TasksContext.Provider>
  );
};
