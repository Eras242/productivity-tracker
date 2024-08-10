import React from "react";
import styles from "./UiElements.module.css";

export const TextBox = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.textBox}>{children}</div>;
};
