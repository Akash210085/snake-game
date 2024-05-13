import React, { useState } from "react";
import Gamepit from "./Gamepit";
import Header from "./Header";
import Footer from "./Footer";
function App() {
  const [score, SetScore] = useState(0);
  const [level, SetLevel] = useState(1);
  const [isStart, SetIsStart] = useState(false);
  const [isStop, SetIsStop] = useState(true);
  return (
    <div className="app">
      <Header score={score} level={level} />
      <Gamepit
        SetScore={SetScore}
        SetLevel={SetLevel}
        isStart={isStart}
        isStop={isStop}
      />
      <Footer
        SetIsStart={SetIsStart}
        SetIsStop={SetIsStop}
        SetScore={SetScore}
        SetLevel={SetLevel}
      />
    </div>
  );
}

export default App;
