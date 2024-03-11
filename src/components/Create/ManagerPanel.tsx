import React from "react";
import { animated, useSpring } from "@react-spring/web";

export type CreateProps = {
  taskActive: boolean;
  children: React.ReactNode;
};

export const ManagerPanel = ({ taskActive, children }: CreateProps) => {
  const managerSpring = useSpring({
    from: { width: "1050px", transform: "translateX(-525px)" },
    to: {
      width: taskActive ? "600px" : "1050px",
      transform: taskActive ? "translateX(-633px)" : "translateX(-525px)",
    },
  });

  return (
    <animated.div className="container manager" style={{ ...managerSpring }}>
      {children}
    </animated.div>
  );
};
