type TDayMapper = {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  0: string;
  [key: number]: string;
};

export const getRecentCurrentWeek = (): Date[] => {
  const today = new Date();
  const currentDay = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  const monday = new Date(today); // Clone today's date
  monday.setDate(today.getDate() - currentDay + 1); // Set to Monday of the current week

  const weekDays: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    weekDays.push(day);
  }

  return weekDays;
};

export const DayMapper: TDayMapper = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  0: "Sunday",
};
