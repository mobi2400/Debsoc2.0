import React from "react";

interface ClockDisplayProps {
  time: string;
}

const ClockDisplay: React.FC<ClockDisplayProps> = ({time}) => {
  return (
    <div className="text-5xl md:text-7xl font-mono text-white drop-shadow-lg transition duration-300">
      {time}
    </div>
  );
};

export default ClockDisplay;
