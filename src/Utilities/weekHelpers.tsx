import { v4 } from "uuid";
import { User } from "../Contexts/UserContext";

type TDayMap = {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  0: string;
  [key: number]: string;
};

type TMonthMap = {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  [key: number]: string;
};

export type TDay = {
  day: Date | undefined;
  id: string;
};

export const createWeekObjectFromDate = (date?: string): TDay[] => {
  let today: Date;

  if (date) {
    const [year, month, day] = date.split("-").map(Number);
    today = date ? new Date(year, month - 1, day) : new Date();
  } else {
    today = new Date();
  }

  const currentDay = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  const monday = new Date(today); // Clone today's date
  if (currentDay == 0) {
    monday.setDate(today.getDate() - 6); // Set to Monday of the current week
  } else {
    monday.setDate(today.getDate() - currentDay + 1); // Set to Monday of the current week
  }
  console.log(monday);

  const weekDays: TDay[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    weekDays.push({ day: day, id: v4() });
  }

  // Output: [{...}, {...}, {...}, {...}, {...}, {...}, {...}]
  return weekDays;
};

export const generateWeek = (user: User, date?: string) => {
  const weekDays = createWeekObjectFromDate(date);
  let weeks = [];

  // Create week object from the days returned from week
  let week = weekDays.map((i) => ({
    id: v4(),
    user: user,
    date: i.day,
    timeline: null,
    tasks: [],
    initialized: false,
  }));

  weeks.push({ id: v4(), days: week, startDate: weekDays[0].day });

  // Function should return weeks not set local storage
  // setting to local storage should happen independently
  localStorage.setItem("weeks", JSON.stringify(weeks));
  return weeks;
};

export const DayMap: TDayMap = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  0: "Sunday",
};

export const MonthMap: TMonthMap = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};
