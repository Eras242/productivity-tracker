import React, { ReactNode } from "react";
import { Task } from "../Task/Task";
import {
  FilterInterface,
  TimelineInfoInterface,
  TodoStateProps,
} from "../../App";
import "./display.css";
import { Timeline } from "./Timeline/Timeline";
import { timeConverter } from "../../Utilities/TimeConverter";

type DisplayProps = {
  tasks: TodoStateProps[];
  logId: (id: string) => void;
  handleCheck: (id: string) => void;
  handleMarkAllComplete: () => void;
  handleClearComplete: () => void;
  handleClearAll: () => void;
  filter: FilterInterface;
  handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  timelineInfo: TimelineInfoInterface;
};

export const Display = ({
  tasks,
  logId,
  handleCheck,
  handleMarkAllComplete,
  handleClearAll,
  handleClearComplete,
  filter,
  handleFilter,
  timelineInfo,
}: DisplayProps) => {
  return (
    <div className="display-main">
      <div className="container display-todos">
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
            <p>{tasks.length} Items</p>
          </div>
        </div>
        <div className="task-items-container">
          {" "}
          {tasks.map((t) => {
            return (
              <Task
                key={t.id}
                id={t.id}
                title={t.title}
                time={t.time}
                completed={t.completed}
                logId={logId}
                handleCheck={handleCheck}
              />
            );
          })}
        </div>
        <div className="complete-list">
          <button onClick={handleMarkAllComplete}>Mark All Complete</button>
          <button onClick={handleClearComplete}>Clear Complete</button>
          <button onClick={handleClearAll}>Clear All</button>
        </div>
      </div>
    </div>
  );
};
