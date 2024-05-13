import React, { useState } from "react";
import { randomIntFromInterval } from "./Math";
function Gamepit() {
  const rows = 10;
  const cols = 20;
  const grid = new Array(rows).fill(0).map((row) => new Array(cols).fill(0));
  const [diamondPosition, SetDiamondPosition] = useState({
    row: randomIntFromInterval(0, rows),
    col: randomIntFromInterval(0, cols),
  });

  const isTargetCell = (rowIndex, cellIndex) => {
    return (
      rowIndex === diamondPosition.row && cellIndex === diamondPosition.col
    );
  };
  //   const [customclass, SetCustomClass] = useState("cell");
  const handleDiamondCellHover = () => {
    const newRow = randomIntFromInterval(0, rows - 1);
    const newCol = randomIntFromInterval(0, cols - 1);
    console.log(newRow, newCol);

    SetDiamondPosition({
      row: newRow,
      col: newCol,
    });
  };
  return (
    <div className="board">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`cell ${
                isTargetCell(rowIndex, cellIndex) ? "diamondCell" : ""
              }`}
              onMouseEnter={() => {
                if (isTargetCell(rowIndex, cellIndex)) {
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
