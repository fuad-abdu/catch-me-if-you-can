import { useState, useRef, useEffect } from "react";
import "./App.css";

export default function App() {
  const buttonRef = useRef(null);
  const [pos, setPos] = useState({ x: "50%", y: "50%" });

  // Move button randomly
  const moveButton = () => {
    const button = buttonRef.current;
    const btnWidth = button.offsetWidth;
    const btnHeight = button.offsetHeight;

    const newX = Math.random() * (window.innerWidth - btnWidth);
    const newY = Math.random() * (window.innerHeight - btnHeight);

    setPos({ x: `${newX}px`, y: `${newY}px` });
  };

  // For mobile touch detection
  const handleTouch = (e) => {
    const touch = e.touches[0];
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();

    const distance = Math.hypot(
      touch.clientX - (rect.left + rect.width / 2),
      touch.clientY - (rect.top + rect.height / 2)
    );

    if (distance < 80) moveButton();
  };

  // For desktop mouse detection
  const handleMouseMove = (e) => {
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();

    const distance = Math.hypot(
      e.clientX - (rect.left + rect.width / 2),
      e.clientY - (rect.top + rect.height / 2)
    );

    if (distance < 80) moveButton();
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouch);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouch);
    };
  }, []);

  return (
    <div className="app">
      <button
        ref={buttonRef}
        onClick={() => alert("You win!")}
        style={{ position: "absolute", left: pos.x, top: pos.y }}
        className="escape-btn"
      >
        Catch Me!
      </button>
    </div>
  );
}
