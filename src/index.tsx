import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./Contexts/UserContext";
import { TasksProvider } from "./Contexts/TasksContext";
import { TipTap } from "./Tiptap";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserProvider>
      <TasksProvider>
        <App />
      </TasksProvider>
    </UserProvider>
    {/* <div className="container" style={{ padding: "2rem", overflow: "scroll" }}>
      <TipTap />
    </div> */}
  </React.StrictMode>
);
