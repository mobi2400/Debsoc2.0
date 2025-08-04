import React, { useState, useEffect, useRef } from "react";
import ClockDisplay from "./clockdisplay";
import ControlButtons from "./controlbutton";


const TimerCard = ({ type }) => {
  const [time, setTime] = useState(type === "Timer" ? 435 : 0); // 7:15
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          if (type === "Timer") {
            if (prev <= 1) {
              clearInterval(intervalRef.current);
              setRunning(false);
              return 0;
            }
            return prev - 1;
          } else {
            return prev + 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, type]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const getPOIMessage = () => {
    const t = time;
    if (type === "Timer") {
      if (t > 375 || t <= 75) return "Protected Time - Can't Ask POI";
      if (t > 75 && t <= 375) return "Ask Speaker POI Preference";
    } else {
      if (t < 60 || t >= 360) return "Protected Time - Can't Ask POI";
      if (t >= 60 && t < 360) return "Ask Speaker POI Preference";
    }
    return "";
  };

  const start = () => setRunning(true);
  const stop = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setTime(type === "Timer" ? 435 : 0);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <ClockDisplay time={time === 0 && type === "Timer" ? "Time's Up!" : formatTime(time)} />
      {type && <p className="text-orange-600 text-lg font-bold">{getPOIMessage()}</p>}
      <ControlButtons onStart={start} onStop={stop} onReset={reset} />
    </div>
  );
};

export default TimerCard;
