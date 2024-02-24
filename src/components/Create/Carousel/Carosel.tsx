import React from "react";
import "./carousel.css";
import { Screen } from "./Screen";

export const Carousel = () => {
  function Wake() {
    return;
  }

  function Start() {
    return <Screen />;
  }

  function End() {
    return <Screen />;
  }

  function Sleep() {
    return <Screen />;
  }

  return <div className="carosel-main"></div>;
};
