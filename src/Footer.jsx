import React from "react";

function Footer(props) {
  return (
    <footer>
      <button
        className="start"
        onClick={() => {
          props.SetIsStart(true);
          props.SetIsStop(false);
        }}
      >
        Start
      </button>
      <button
        className="stop"
        onClick={() => {
          props.SetIsStart(false);
          props.SetIsStop(true);
          props.SetScore(0);
          props.SetLevel(1);
        }}
      >
        Stop
      </button>
    </footer>
  );
}

export default Footer;
