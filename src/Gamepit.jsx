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
    do {
      SetDiamondPosition({
        row: randomIntFromInterval(0, rows - 1),
        col: randomIntFromInterval(0, cols - 1),
      });
    } while (
      diamondPosition.row === snakePosition.row ||
      diamondPosition.col === snakePosition.col
    );
  };

  const generateRandomSnakePosition = () => {
    let snakePosition;
    do {
      snakePosition = {
        row: randomIntFromInterval(0, rows - 1),
        col: randomIntFromInterval(0, cols - 1),
      };
    } while (
      snakePosition.row === diamondPosition.row &&
      snakePosition.col === diamondPosition.col
    );
    return snakePosition;
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
    do {
      const rowdirection = [1, -1, 0, 0];
      const coldirection = [0, 0, 1, -1];
      const randomNo = Math.floor(Math.random() * rowdirection.length);
      SetSnakePostion((preValue) => {
        return {
          row: preValue.row + rowdirection[randomNo],
          col: preValue.col + coldirection[randomNo],
        };
      });
    } while (
      snakePosition.row === diamondPosition.row ||
      snakePosition.col === diamondPosition.col ||
      snakePosition.row < 0 ||
      snakePosition.col < 0 ||
      snakePosition.row >= rows ||
      snakePosition.col >= cols ||
      (snakePosition.row === preRow && snakePosition.col === preCol)
    );
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
