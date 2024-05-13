import React, { useState, useEffect } from "react";
import { randomIntFromInterval } from "./Math";
function Gamepit() {
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
  //   const [customclass, SetCustomClass] = useState("cell");
  const handleDiamondCellHover = () => {
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
      let randomRow = randomIntFromInterval(0, rows - 1);
      let randomCol = randomIntFromInterval(0, cols - 1);
      initialSnakePosition = {
        row: randomRow,
        col: randomCol,
        pRow: randomRow + 1,
        pCol: randomCol,
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
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Move the snake every 1 second
    const interval = setInterval(() => {
      moveSnake();
    }, 1000);

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
                isDiamondCell(rowIndex, cellIndex) ? "diamondCell" : ""
              } ${isSnakeCell(rowIndex, cellIndex) ? "snakeCell" : ""}`}
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
