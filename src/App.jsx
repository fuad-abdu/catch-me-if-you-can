import { useEffect, useState } from "react";
import "./App.css"
export default function App() {
  const [buttonPosition, setButtonPosition] = useState({ top: "50%", left: "50%" });
  const [lastClickTime, setLastClickTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [bestTime, setBestTime] = useState(() => {
    const storedBest = localStorage.getItem("bestTime");
    return storedBest ? parseFloat(storedBest) : null;
  });

  // Move button to a random position
  const moveButton = () => {
    const top = Math.random() * 80 + "%";
    const left = Math.random() * 80 + "%";
    setButtonPosition({ top, left });
  };

  // Handle button click
  const handleClick = () => {
    const now = Date.now();
    if (lastClickTime) {
      const timeTaken = (now - lastClickTime) / 1000;
      setCurrentTime(timeTaken);

      if (!bestTime || timeTaken < bestTime) {
        setBestTime(timeTaken);
        localStorage.setItem("bestTime", timeTaken);
      }
    }
    setLastClickTime(now);
    moveButton();
  };

  // Start game on load
  useEffect(() => {
    moveButton();
    setLastClickTime(Date.now());
  }, []);

  return (
    <div>
      <div className="head">
        <h1 className="title">Catch Me If You Can 🎯</h1>
      <p className="title">Click the button as fast as you can!</p>
      </div>
      <div className="scoreboard">
        <p>Best Time: {bestTime ? `${bestTime.toFixed(3)}s` : "--"}</p>
        <p>Current Time: {currentTime ? `${currentTime.toFixed(3)}s` : "--"}</p>
      </div>

      <button
        onClick={handleClick}
        style={{
          position: "absolute",
          top: buttonPosition.top,
          left: buttonPosition.left,
          transform: "translate(-50%, -50%)",
          padding: "15px 25px",
          fontSize: "16px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Click Me
      </button>
    </div>
  );
}
