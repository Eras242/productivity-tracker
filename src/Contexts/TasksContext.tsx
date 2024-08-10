import { TTimeline } from "../App";
import { createContext, useContext, useEffect, useState } from "react";
import { User, useUserContext } from "./UserContext";
import { generateWeek } from "../Utilities/weekHelpers";
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

export type TWeek = {
  id: string;
  startDate: Date | undefined;
  days: TTaskDay[];
};

interface ITasksContext {
  user: User | null;
  selectedWeek: TWeek | null;
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
  selectedWeek: null,
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
  const [today, setToday] = useState<Date>();
  const [allWeeks, setAllWeeks] = useState<TWeek[] | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<TWeek | null>(null);
  const [selectedDay, setSelectedDay] = useState<TTaskDay | null>(null);
  const [taskActive, setTaskActive] = useState<boolean>(false);

  const initDay = () => {
    if (selectedDay) {
      setSelectedDay((prev) => ({ ...prev!, initialized: true }));
      return selectedDay.initialized;
    } else {
      return false;
    }
  };

  // Initial render
  useEffect(() => {
    // get today
    const t = new Date();
    setToday(t);

    // Look for current week in storage
    let data = localStorage.getItem("weeks");
    let weeks: TWeek[] = JSON.parse(data!);
    // If no week found, generate current week starting from most recent Monday

    while (!data || weeks.length == 0) {
      console.log("No week found in Local Storage, creating week...");
      generateWeek(user!);
      data = localStorage.getItem("weeks");
      weeks = JSON.parse(data!);
    }

    // JSON returns date as an ISO time string,
    // Need to map over each date of the returned week(s) and convert the ISO timestring -> date object
    weeks = weeks.map((week) => ({
      ...week,
      startDate: new Date(week.startDate!),
      days: week.days.map((day) => ({ ...day, date: new Date(day.date!) })),
    }));

    console.log(weeks);
    // Check if current week is the actual current week by seeing if today exists in week,
    // if yes, setSelectedWeek(current week),
    // else generate new week and push this to allWeeks?

    let weeksConfigured = false;

    weeks.forEach((w) => {
      let todayDate = t.toISOString().slice(0, 10).toString();
      let index: number;
      let curr = w.days.map((d) => d.date?.toISOString().slice(0, 10));

      if (curr.includes(todayDate)) {
        index = weeks.indexOf(w);
        setSelectedWeek(weeks[index]);
      } else {
        // Do thing here?
      }
    });
    setAllWeeks(weeks);
  }, []);

  // useEffect for every time a selectedDay changes or user changes
  // 1. setCurrentWeek to ...prev days with new updated day
  // 2. setAllWeeks to ...prev weeks with new updated week

  // useEffect(() => {
  //   if (selectedDay) {
  //     // if new update selectedWeek
  //     setSelectedWeek((prev) => {
  //       if (prev) {
  //         // Correctly update the days array within the currentWeek state
  //         const updatedDays = prev.days.map((day: TTaskDay) =>
  //           day.id === selectedDay.id ? selectedDay : day
  //         );

  //         const newState: TWeek = {
  //           ...prev,
  //           days: updatedDays,
  //         };

  //         // localStorage.setItem("weeks", JSON.stringify(newState));
  //         return newState;
  //       }
  //       return prev;
  //     });

  //     setAllWeeks((prev) => {
  //       if (prev) {
  //         const newState = prev?.map((i) =>
  //           i.id == selectedWeek?.id ? selectedDay : i
  //         );

  //         localStorage.setItem("weeks", JSON.stringify(newState));
  //         return newState;
  //       }
  //       return prev;
  //     });
  //   }

  //   // if new update allWeeks
  // }, [selectedDay]);

  useEffect(() => {
    if (selectedDay) {
      setSelectedWeek((prev) => {
        if (prev) {
          // Correctly update the days array within the currentWeek state
          const updatedDays = prev.days.map((day: TTaskDay) =>
            day.id === selectedDay.id ? selectedDay : day
          );
          const newState: TWeek = {
            ...prev,
            days: updatedDays,
          };

          // Optionally, update local storage or perform other side effects here
          // localStorage.setItem("weeks", JSON.stringify(newState));

          return newState;
        }
        return prev; // Ensure we return the previous state if no updates are made
      });
    }

    setAllWeeks((prev) => {
      if (prev && selectedWeek && selectedDay) {
        const newState = prev.map((i) =>
          i.id === selectedWeek.id
            ? {
                ...i,
                days: i.days.map((day) =>
                  day.id === selectedDay.id ? selectedDay : day
                ),
              }
            : i
        );

        localStorage.setItem("weeks", JSON.stringify(newState));
        return newState;
      }
      return prev;
    });
  }, [selectedDay]);

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
        selectedWeek,
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
