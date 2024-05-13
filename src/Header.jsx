import React from "react";
function Header(props) {
  return (
    <header>
      <h1 className="score">Score: {props.score}</h1>
      <h1 className="level"> Level: {props.level}</h1>
    </header>
  );
}

export default Header;
