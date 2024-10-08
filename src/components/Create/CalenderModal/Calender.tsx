import React, { useEffect, useState } from "react";
import { animated, useSpring, config } from "@react-spring/web";
import "./calender.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { monthMap } from "../../../Utilities/weekHelpers";
import { useTransition } from "@react-spring/web";
import { log } from "console";

type TDays = {
  date: number;
  month: number;
};

export const Calender = ({ visible }: { visible: boolean }) => {
  const [screenIndex, setScreenIndex] = useState<number>(0);
  const screens = [CalenderDays, CalenderMonths, CalenderYears];

  const [today, setToday] = useState<Date>();

  const [selectedYear, setSelectedYear] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState<number>(0);

  const [days, setDays] = useState<TDays[]>([]);
  const [weekRow, setWeekRow] = useState<TDays[][]>([[]]);

  const [init, setInit] = useState<boolean>(false);

  const calenderSpring = useSpring({
    from: { opacity: visible ? "1" : "0" },
    to: {
      opacity: visible ? "1" : "0",
    },
    config: config.stiff,
    reset: true,
  });

  const transitions = useTransition(screenIndex, {
    from: { opacity: 0, transform: "scale(90%)" },
    enter: { opacity: 1, transform: "scale(100%)" },
    leave: { opacity: 0, transform: "scale(90%)" },
    exitBeforeEnter: true,
    native: true,
    unique: true,
    config: { duration: 100 },
  });

  const handleTime = (e: any) => {
    setScreenIndex(() => {
      if (e.target.name == "month") {
        setSelectedMonth(e.target.value);
        console.log(monthMap[e.target.value]);
        generateCalenderDays(e.target.value, selectedYear);
        return 0;
      } else if (e.target.name == "year") {
        setSelectedYear(Number(e.target.value));
        return 1;
      } else {
        return 0;
      }
    });
  };

  const handleIncrement = (increment: number, index: number) => {
    if (index == 0) {
      setSelectedMonth((prev) => {
        if (prev == 0 && increment < 0) {
          generateCalenderDays(11, selectedYear);
          setSelectedYear((prev) => prev + increment);
          return 11;
        } else if (prev == 11 && increment > 0) {
          generateCalenderDays(0, selectedYear);
          setSelectedYear((prev) => prev + increment);
          return 0;
        }
        generateCalenderDays((prev + increment) % 12, selectedYear);
        return (prev + increment) % 12;
      });
      // generateCalenderDays(selectedMonth, selectedYear);
    }
  };

  const generateCalenderDays = (month: number, year: number) => {
    if (year && month) {
      const firstDate = new Date(year, month, 1);
      const lastDate = new Date(year, Number(month) + 1, 0);

      let daysArr: TDays[] = [];

      let calenderStart;
      let calenderEnd;

      // If firstDate.getDay() not 1 (Monday) cycle through last days of previous month to find monday.
      if (firstDate.getDay() != 1) {
        for (let i = 0; i >= -7; i--) {
          let currDate = new Date(year, month, i);
          daysArr.push({
            date: currDate.getDate(),
            month: Number(currDate.getMonth()),
          });
          if (currDate.getDay() == 1) {
            calenderStart = currDate;
            daysArr = daysArr.reverse();
            break;
          }
        }
      } else {
        calenderStart = firstDate;
      }
      // Get current Month Days
      for (let i = 1; i <= lastDate.getDate(); i++) {
        daysArr.push({ date: i, month: Number(month) });
      }

      // If lastDate.getDay() not 6 (Sunday) cycle through first days of next month to find sunday.

      if (lastDate.getDay() != 0) {
        for (let i = 1; i <= 7; i++) {
          let currDate = new Date(year, Number(month) + 1, i);
          daysArr.push({
            date: currDate.getDate(),
            month: Number(currDate.getMonth()),
          });
          if (currDate.getDay() == 0) {
            calenderEnd = currDate;
            break;
          }
        }
      } else {
        calenderEnd = lastDate;
      }
      setDays(daysArr);
    }
  };

  useEffect(() => {
    if (!init) {
      const currentDate = new Date();
      setToday(currentDate);
      let month = currentDate.getMonth();
      let year = currentDate.getFullYear();
      generateCalenderDays(month, year);
      setSelectedMonth(month);
      setSelectedYear(year);
      setInit(true);
    }
    // console.log(days);
    const weeklyRows: TDays[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      const week = days.slice(i, i + 7);
      weeklyRows.push(week);
    }
    setWeekRow(weeklyRows);
  }, [visible, selectedMonth, days]);

  function CalenderDays() {
    return (
      <div className="cal-months-container">
        <ul className="days-header">
          <li>M</li>
          <li>T</li>
          <li>W</li>
          <li>T</li>
          <li>F</li>
          <li>S</li>
          <li>S</li>
        </ul>

        {weekRow.map((i) => (
          <div key={weekRow.indexOf(i)} className="row-7-day">
            {i.map((d) => {
              if (d.month != selectedMonth) {
                return (
                  <div key={d.date} className="c-day previous">
                    {d.date}
                  </div>
                );
              } else if (
                d.date == today?.getDate() &&
                d.month == today.getMonth()
              ) {
                return (
                  <div key={d.date} className="c-day today">
                    {d.date}
                  </div>
                );
              } else {
                return (
                  <div key={d.date} className="c-day">
                    {d.date}
                  </div>
                );
              }
            })}
          </div>
        ))}
      </div>
    );
  }

  function CalenderMonths() {
    const months = Object.keys(monthMap).map((i) => {
      return (
        <button
          key={i}
          className="c-month"
          onClick={handleTime}
          name="month"
          value={i}
        >
          {monthMap[Number(i)]}
        </button>
      );
    });
    return <div className="cal-months-container">{months}</div>;
  }

  function CalenderYears() {
    const currentYear = today?.getFullYear();
    const years = [];
    for (let i = 0; i <= 11; i++) {
      let y = currentYear! + i;
      years.push(y);
    }

    return (
      <div className="cal-months-container">
        {years.map((y) => (
          <button
            key={y}
            className="c-month"
            onClick={handleTime}
            name="year"
            value={y}
          >
            {y}
          </button>
        ))}
      </div>
    );
  }

  function handleCurrentMonth() {
    if (today) {
      setSelectedMonth(today.getMonth());
      setSelectedYear(today.getFullYear());
      generateCalenderDays(selectedMonth, selectedYear);
    }
  }

  return (
    <animated.div style={{ ...calenderSpring }} className="calender-modal">
      <div className="calender-header">
        <button
          className="time-tag dash-header calender"
          name="month"
          onClick={() => {
            setScreenIndex(1);
          }}
        >
          <h2>{monthMap[selectedMonth]}</h2>
        </button>
        <button
          className="time-tag dash-header calender"
          name="year"
          onClick={() => {
            setScreenIndex(2);
          }}
        >
          <h2>{selectedYear}</h2>
        </button>

        {screenIndex == 2 || screenIndex == 0 ? (
          <div className="calender-header-buttons">
            <button
              onClick={() => {
                handleIncrement(-1, screenIndex);
              }}
              className="time-tag dash-header calender"
            >
              <IoIosArrowBack />
            </button>
            <button
              onClick={() => {
                handleIncrement(1, screenIndex);
              }}
              className="time-tag dash-header calender"
            >
              <IoIosArrowForward />
            </button>
          </div>
        ) : (
          " "
        )}
      </div>
      <div className="cal-days-container">
        {" "}
        {transitions((style, i) => {
          return (
            <animated.div
              style={{
                ...style,
                transformOrigin: "center",
              }}
            >
              {React.createElement(screens[i])}
            </animated.div>
          );
        })}
      </div>
      {/* <CalenderYears /> */}
      <div className="calender-footer">
        <button
          className="time-tag dash-header calender"
          onClick={handleCurrentMonth}
        >
          Go to: Current Month
        </button>
      </div>
    </animated.div>
  );
};
