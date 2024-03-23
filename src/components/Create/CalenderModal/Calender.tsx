import React, { useEffect, useState } from "react";
import { animated, useSpring, config } from "@react-spring/web";
import "./calender.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

type TDays = {
  date: number;
  month: number;
};

export const Calender = ({ visible }: { visible: boolean }) => {
  const [today, setToday] = useState<Date>();
  const [days, setDays] = useState<TDays[]>([]);
  const [weekRow, setWeekRow] = useState<TDays[][]>([[]]);

  const calenderSpring = useSpring({
    from: { opacity: "0" },
    to: {
      opacity: visible ? "1" : "0",
    },
    config: config.stiff,
    reset: true,
  });

  useEffect(() => {
    const generateCalenderDays = () => {
      const currentDate = new Date();
      setToday(currentDate);

      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      const previousMonth = new Date(year, month, 0);
      const nextMonth = new Date(year, month, 1);

      const firstDate = new Date(year, month, 1);
      const lastDate = new Date(year, month + 1, 0);
      let days: TDays[] = [];

      let calenderStart;
      let calenderEnd;

      // If firstDate.getDay() not 1 (Monday) cycle through last days of previous month to find monday.
      if (firstDate.getDay() != 1) {
        for (let i = 0; i >= -7; i--) {
          let currDate = new Date(year, month, i);
          days.push({ date: currDate.getDate(), month: currDate.getMonth() });
          if (currDate.getDay() == 1) {
            calenderStart = currDate;
            days = days.reverse();
            break;
          }
        }
      } else {
        calenderStart = firstDate;
      }
      // Get current Month Days
      for (let i = 1; i <= lastDate.getDate(); i++) {
        days.push({ date: i, month: month });
      }

      // If lastDate.getDay() not 6 (Sunday) cycle through first days of next month to find sunday.

      if (lastDate.getDay() != 0) {
        for (let i = 1; i <= 7; i++) {
          let currDate = new Date(year, month + 1, i);
          days.push({ date: currDate.getDate(), month: currDate.getMonth() });
          if (currDate.getDay() == 0) {
            calenderEnd = currDate;
            break;
          }
        }
      } else {
        calenderEnd = lastDate;
      }

      setDays(days);
    };

    const generateWeeklyRows = () => {
      const weeklyRows: TDays[][] = [];
      for (let i = 0; i < days.length; i += 7) {
        const week = days.slice(i, i + 7);
        weeklyRows.push(week);
      }
      setWeekRow(weeklyRows);
    };

    generateCalenderDays();
    generateWeeklyRows();
  }, [visible]);

  return (
    <animated.div style={{ ...calenderSpring }} className="calender-modal">
      <div className="calender-header">
        <div className="time-tag dash-header">
          <h2>March</h2>
        </div>
        <div className="time-tag dash-header">
          <h2>2024</h2>
        </div>

        <div className="calender-header-buttons">
          <button className="time-tag dash-header calender">
            <IoIosArrowBack />
          </button>
          <button className="time-tag dash-header calender">
            <IoIosArrowForward />
          </button>
        </div>
      </div>
      <ul className="days-header">
        <li>M</li>
        <li>T</li>
        <li>W</li>
        <li>T</li>
        <li>F</li>
        <li>S</li>
        <li>S</li>
      </ul>
      <div className="cal-days-container">
        {weekRow.map((i) => (
          <div className="row-7-day">
            {i.map((d) => {
              if (d.month != today?.getMonth()) {
                return <div className="c-day previous">{d.date}</div>;
              } else if (d.date == today.getDate()) {
                return <div className="c-day today">{d.date}</div>;
              } else {
                return <div className="c-day">{d.date}</div>;
              }
            })}
          </div>
        ))}
      </div>
    </animated.div>
  );
};
