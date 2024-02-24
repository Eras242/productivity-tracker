import { stringify } from "querystring";

export const timeConverter = (
  time: number | string,
  conversion?: string

  // mt = Minutes conversion to 24 hour time. e.g: number -> "12:53"
  // tm = 24 Hour time conversion to minutes. e.g: "12:53" -> number
): string | number => {
  let value;
  let hour;
  let minutes;
  if (conversion == "mt") {
    try {
      value = Number(time);
      if (!value || value > 1440) {
        return 0;
      }
    } catch (error) {
      return 0;
    }
    {
      hour = (value - (value % 60)) / 60;
      minutes = value % 60;

      if (hour < 10) {
        hour = "0" + hour;
      }

      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      return hour + ":" + minutes;
    }
  } else if (conversion == "tm") {
    try {
      value = time;
      // Do regex format check, value != "NN:NN": error
      if (typeof value !== "string") {
        return "Value not string";
      }
    } catch (error) {
      return "Value not string";
    }

    hour = parseInt(value.split(":")[0]) * 60;
    minutes = parseInt(value.split(":")[1]);

    return hour + minutes;
  } else {
    return "Value not string";
  }
};

export const getDuration = (
  start: number,
  end: number
): { duration: number; hours: number; minutes: number } | undefined => {
  if (end < start) {
    return;
  }

  // e.g end - start   ==   800 - 460 =
  // minutes 340 - (340 / 60)
  const time = end - start;
  const minutes = time % 60;
  const hours = (time - minutes) / 60;

  return { duration: time, hours, minutes };
};

export const timePercentage = (
  start: number,
  end: number,
  taskTime: number
): string => {
  // Get Total Range, e.g 1080 - 600 = 480
  const totalRange = end - start;
  // Get task time position within range
  const taskPosition = taskTime - start;
  const perc = ((taskPosition / totalRange) * 100).toFixed();

  return perc + "%";
};
