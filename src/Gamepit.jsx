import React, { useState, useEffect } from "react";
import { randomIntFromInterval } from "./Math";
function Gamepit(props) {
  const rows = 10;
  const cols = 20;
  const grid = new Array(rows).fill(0).map((row) => new Array(cols).fill(0));
  const [diamondPosition, SetDiamondPosition] = useState({
    row: randomIntFromInterval(0, rows - 1),
    col: randomIntFromInterval(0, cols - 1),
  });

  const isDiamondCell = (rowIndex, cellIndex) => {
    return (
      rowIndex === diamondPosition.row && cellIndex === diamondPosition.col
    );
  };

  // const [AllSnakes, SetAllSnakes] = useState([]);

  const handleDiamondCellHover = () => {
    props.SetScore((preScore) => preScore + 10);
    props.SetLevel((preLevel) => preLevel + 1);
    const preRow = diamondPosition.row;
    const preCol = diamondPosition.col;
    let newRow = 0;
    let newCol = 0;
    do {
      newRow = randomIntFromInterval(0, rows - 1);
      newCol = randomIntFromInterval(0, cols - 1);
    } while (
      (newRow === snakePosition.row && newCol === snakePosition.col) ||
      (newCol === preCol && newRow === preRow)
    );
    SetDiamondPosition({
      row: newRow,
      col: newCol,
    });
  };

  const generateRandomSnakePosition = () => {
    let initialSnakePosition;
    do {
      let randomRow = randomIntFromInterval(3, rows - 4);
      let randomCol = randomIntFromInterval(3, cols - 4);
      initialSnakePosition = {
        row: randomRow,
        col: randomCol,
        pRow: randomRow,
        pCol: randomCol - 1,
      };
    } while (
      initialSnakePosition.row === diamondPosition.row &&
      initialSnakePosition.col === diamondPosition.col
    );
    return initialSnakePosition;
  };

  const [snakePosition, SetSnakePostion] = useState(
    generateRandomSnakePosition()
  );

  const isSnakeCell = (rowIndex, cellIndex) => {
    return rowIndex === snakePosition.row && cellIndex === snakePosition.col;
  };

  const [SecondSnakePosition, SetSecondSnakePostion] = useState({
    row: snakePosition.pRow,
    col: snakePosition.pCol,
    pRow: snakePosition.row,
    pCol: snakePosition.col - 1,
  });

  const [ThirdSnakePosition, SetThirdSnakePostion] = useState({
    row: SecondSnakePosition.pRow,
    col: SecondSnakePosition.pCol,
    pRow: SecondSnakePosition.row,
    pCol: SecondSnakePosition.col - 1,
  });

  const [FourthSnakePosition, SetFourthSnakePostion] = useState({
    row: ThirdSnakePosition.pRow,
    col: ThirdSnakePosition.pCol,
    pRow: ThirdSnakePosition.row,
    pCol: ThirdSnakePosition.col - 1,
  });

  const isSecondSnakeCell = (rowIndex, cellIndex) => {
    return (
      rowIndex === SecondSnakePosition.row &&
      cellIndex === SecondSnakePosition.col
    );
  };

  const isThirdSnakeCell = (rowIndex, cellIndex) => {
    return (
      rowIndex === ThirdSnakePosition.row &&
      cellIndex === ThirdSnakePosition.col
    );
  };

  const isFourthSnakeCell = (rowIndex, cellIndex) => {
    return (
      rowIndex === FourthSnakePosition.row &&
      cellIndex === FourthSnakePosition.col
    );
  };

  const moveSnake = () => {
    const preRow = snakePosition.row;
    const preCol = snakePosition.col;
    const prepRow = snakePosition.pRow;
    const prepCol = snakePosition.pCol;
    let newRow = 0;
    let newCol = 0;
    const rowdirection = [1, -1, 0, 0];
    const coldirection = [0, 0, 1, -1];
    do {
      const randomNo = Math.floor(Math.random() * rowdirection.length);
      newRow = preRow + rowdirection[randomNo];
      newCol = preCol + coldirection[randomNo];
    } while (
      (newRow === diamondPosition.row && newCol === diamondPosition.col) ||
      newRow < 0 ||
      newCol < 0 ||
      newRow >= rows ||
      newCol >= cols ||
      (newRow === prepRow && newCol === prepCol)
    );
    SetSnakePostion(() => {
      return {
        row: newRow,
        col: newCol,
        pRow: preRow,
        pCol: preCol,
      };
    });
    SetFourthSnakePostion({
      row: ThirdSnakePosition.row,
      col: ThirdSnakePosition.col,
      pRow: FourthSnakePosition.row,
      pCol: FourthSnakePosition.col,
    });
    SetThirdSnakePostion({
      row: SecondSnakePosition.row,
      col: SecondSnakePosition.col,
      pRow: ThirdSnakePosition.row,
      pCol: ThirdSnakePosition.col,
    });
    SetSecondSnakePostion({
      row: preRow,
      col: preCol,
      pRow: prepRow,
      pCol: prepCol,
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Move the snake every 1 second
    const interval = setInterval(() => {
      moveSnake();
    }, 500);

    return () => clearInterval(interval);
  });

  return (
    <div className="board">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`cell ${
                props.isStart && isDiamondCell(rowIndex, cellIndex)
                  ? "diamondCell"
                  : ""
              } ${
                props.isStart && isSnakeCell(rowIndex, cellIndex)
                  ? "snakeCell"
                  : ""
              } ${
                props.isStart && isSecondSnakeCell(rowIndex, cellIndex)
                  ? "secondSnakeCell"
                  : ""
              } ${
                props.isStart && isThirdSnakeCell(rowIndex, cellIndex)
                  ? "thirdSnakeCell"
                  : ""
              } ${
                props.isStart && isFourthSnakeCell(rowIndex, cellIndex)
                  ? "fourthSnakeCell"
                  : ""
              }`}
              onMouseEnter={() => {
                if (isDiamondCell(rowIndex, cellIndex)) {
                  handleDiamondCellHover();
                }
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Gamepit;
