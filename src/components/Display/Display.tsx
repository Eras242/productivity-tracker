import React, { ReactNode, useEffect, useState } from "react";
import { Task } from "../Task/Task";
import { FilterInterface, TTimeline } from "../../App";
import { TTask } from "../../Contexts/TasksContext";
import "./display.css";
import { Timeline } from "./Timeline/Timeline";
import { timeConverter } from "../../Utilities/TimeConverter";
import { jsx } from "@emotion/react";
import { css } from "@emotion/css";
import { TTaskDay } from "../../Contexts/TasksContext";
import { useCurrentEditor } from "@tiptap/react";

type DisplayProps = {
  selectedDay: TTaskDay | null;
  setSelectedDay: React.Dispatch<React.SetStateAction<TTaskDay | null>>;
  timelineInfo: TTimeline;
  editorContent: string;
};

type Tfilter = {
  all: boolean;
  unfinished: boolean;
  complete: boolean;
};

export const Display = ({
  selectedDay,
  setSelectedDay,
  timelineInfo,
  editorContent,
}: DisplayProps) => {
  const [filter, setFilter] = useState<Tfilter>({
    all: true,
    unfinished: false,
    complete: false,
  });
  const [displayTasks, setDisplayTasks] = useState<TTask[]>([]);

  useEffect(() => {
    if (selectedDay) {
      if (filter.all) {
        setDisplayTasks(selectedDay.tasks);
      } else if (filter.unfinished) {
        setDisplayTasks(selectedDay.tasks.filter((t) => t.completed == false));
      } else if (filter.complete) {
        setDisplayTasks(selectedDay.tasks.filter((t) => t.completed == true));
      }
    }
  }, [filter, displayTasks, editorContent]);

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
  }

  const handleCheck = (id: string) => {
    if (selectedDay) {
      const i = selectedDay.tasks.findIndex((t) => t.id == id);

      if (i !== -1) {
        const updatedTasks = [...selectedDay.tasks];

        updatedTasks[i] = {
          ...updatedTasks[i],
          completed: !updatedTasks[i].completed,
        };

        setSelectedDay((prev) => ({ ...prev!, tasks: updatedTasks }));
      }

      setSelectedDay((prev) => ({ ...prev! }));
    }
  };

  const handleMarkAllComplete = () => {
    if (selectedDay) {
      if (selectedDay.tasks.length == 0) {
        return;
      }

      const updatedTasks = selectedDay.tasks.map((t) => ({
        ...t,
        completed: true,
      }));
      setSelectedDay((prev) => ({ ...prev!, tasks: updatedTasks }));
    }
  };

  const handleClearComplete = () => {
    if (selectedDay) {
      if (selectedDay.tasks.length == 0) {
        return;
      }

      const updatedTasks = selectedDay.tasks.filter(
        (t) => t.completed !== true
      );
      setSelectedDay((prev) => ({ ...prev!, tasks: updatedTasks }));
    }
  };

  const handleClearAll = () => {
    setSelectedDay((prev) => ({ ...prev!, tasks: [] }));
  };

  const ContentPreview = () => {
    return (
      <div
        style={{
          // position: "absolute",
          width: "500px",
          height: "500px",
          backgroundColor: "green",
        }}
      >
        {JSON.stringify(selectedDay?.tasks[0].task.taskItem.body)}
      </div>
    );
  };

  return (
    <div className="container display-todos">
      {/* <ContentPreview /> */}
      <div className="display-header">
        <div className="display-titles">
          <p>My Todo List</p>
          <div className="task-filter">
            <input
              type="checkbox"
              onChange={handleFilter}
              checked={filter.all}
              className="filter all"
              name="all"
              id="all"
            />
            <label htmlFor="all">ALL</label>
            <input
              type="checkbox"
              onChange={handleFilter}
              checked={filter.unfinished}
              className="filter unfinished"
              name="unfinished"
              id="unfinished"
            />
            <label htmlFor="unfinished">UNFINSHED</label>
            <input
              type="checkbox"
              onChange={handleFilter}
              checked={filter.complete}
              className="filter complete"
              name="complete"
              id="complete"
            />
            <label htmlFor="complete">COMPLETE</label>
          </div>
          <p>{selectedDay && selectedDay.tasks.length} Items</p>
        </div>
      </div>
      <div className="task-items-container">
        {" "}
        {selectedDay &&
          selectedDay.tasks.map((t) => {
            return <Task key={t.id} task={t} handleCheck={handleCheck} />;
          })}
      </div>
      <div></div>
      <div className="complete-list">
        <button className="btn" onClick={handleMarkAllComplete}>
          Mark All Complete
        </button>
        <button className="btn" onClick={handleClearComplete}>
          Clear Complete
        </button>
        <button className="btn" onClick={handleClearAll}>
          Clear All
        </button>
      </div>
    </div>
  );
};
