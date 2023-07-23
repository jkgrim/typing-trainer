import React, { useState, useEffect } from "react";
import "./styles.css";
import hints from "./hints.js";

export default function App() {
  const [char, setChar] = useState("");
  const [errorCount, setErrorCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [streak, setStreak] = useState(-1);

  const chars = Object.keys(hints);

  const getRandom = () => chars[Math.floor(Math.random() * chars.length)];

  const selectNew = () => {
    const newChar = getRandom();
    setChar(newChar);
    setStreak(streak + 1);
    setErrorCount(0);
    setErrorMessage("");
  };

  const handleKeyUp = (e) => {
    if (e.key === "Shift") return;
    if (e.key === char) return selectNew();
    setErrorCount(errorCount + 1);
    if (errorCount >= 1) {
      setErrorMessage(`You typed "${e.key}". Try ${hints[char]}.`);
    } else {
      setStreak(0);
      setErrorMessage("Try Again");
    }
  };

  useEffect(() => {
    selectNew();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
    //eslint-disable-next-line
  }, [char, errorCount]);

  return (
    <div className="App">
      <h1>Type this:</h1>
      <div className="to-type">{char}</div>
      <div className="error">{errorMessage}</div>
      <div className="streak">Current Streak: {streak}</div>
    </div>
  );
}
