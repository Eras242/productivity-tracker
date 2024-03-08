import React from "react";
import { animated, useSpring } from "@react-spring/web";

export type CreateProps = {
  newDay: boolean;
  children: React.ReactNode;
};

export const ManagerPanel = ({ newDay, children }: CreateProps) => {
  const managerSpring = useSpring({
    from: { width: "1050px", transform: "translateX(-525px)" },
    to: {
      width: newDay ? "1050px" : "600px",
      transform: newDay ? "translateX(-525px)" : "translateX(-633px)",
    },
  });

  return (
    <animated.div className="container manager" style={{ ...managerSpring }}>
      {children}
    </animated.div>
  );
};
