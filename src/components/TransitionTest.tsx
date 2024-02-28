import React, { useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Transition, animated, useTransition } from "@react-spring/web";

type SquareProps = {
  bgColor: string;
};

// export const TransitionTest = () => {
//   const [sqIndex, setSqIndex] = useState<number>(0);
//   const [transition] = useTransition(sqIndex, () => ({
//     from: { opacity: 1, transform: "translate3d(50%, 0 ,0)" },
//     enter: { opacity: 1, transform: "translate3d(0%, 0 ,0)" },
//     leave: { opacity: 0, transform: "translate3d(-50%, 0 ,0)" },
//     reset: true,
//     unique: true,
//     native: true,
//     exitBeforeEnter: true,
//     duration: "0.3s",
//   }));

//   const handleToggle = () => {
//     setSqIndex((prev) => (prev + 1) % squares.length);
//     console.log(sqIndex);
//   };

//   const Square = styled("div")<SquareProps>`
//     will-change: transform, opacity;
//     position: absolute;
//     width: 90px;
//     height: 90px;
//     background-color: ${(props) => props.bgColor};
//   `;

//   const sq1 = () => {
//     return <Square bgColor="Green">Hello1</Square>;
//   };
//   const sq2 = () => {
//     return <Square bgColor="Blue">Hello2</Square>;
//   };
//   const sq3 = () => {
//     return <Square bgColor="Red">Hello3</Square>;
//   };
//   const sq4 = () => {
//     return <Square bgColor="Yellow">Hello4</Square>;
//   };
//   const squares = [sq1, sq2, sq3, sq4];

//   return (
//     <MainContainer onClick={handleToggle}>
//       {transition((style, i) => {
//         return (
//           <animated.div style={style}>
//             {React.createElement(squares[i])}
//           </animated.div>
//         );
//       })}
//     </MainContainer>
//   );
// };

export const TransitionTest: React.FC = () => {
  const [index, setIndex] = useState(0);

  const items = [
    { id: 0, color: "red" },
    { id: 1, color: "blue" },
    { id: 2, color: "green" },
    { id: 3, color: "yellow" },
  ];

  const transitions = useTransition(index, {
    from: { opacity: 0, transform: "translate3d(110%, 0, 0)" },
    enter: { opacity: 1, transform: "translate3d(0%, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(-100%, 0, 0)" },
    unique: true,
    native: true,
  });

  const handleClick = () => {
    setIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const Container = styled("div")`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 800px;
    height: 800px;
    background-color: green;
    box-sizing: border-box;
  `;

  const TransitionContainer = styled("div")`
    width: 50%;
    height: 50%;
    background-color: green;
    overflow: hidden;
    box-sizing: border-box;
    border: 4px solid black;
    position: absolute;
  `;

  const Box = styled("div")`
    width: 100%;
    height: 100%;
  `;

  return (
    <Container onClick={handleClick}>
      <TransitionContainer>
        {" "}
        {transitions((style, i) => (
          <animated.div
            key={items[i].id}
            style={{
              ...style,
              backgroundColor: items[i].color,
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
          ></animated.div>
        ))}
      </TransitionContainer>
    </Container>
  );
};
