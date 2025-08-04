"use client";
import React, { useState } from "react";


import Dropdown from "./components/dropdown";
import TimerCard from "./components/timecard";
import ClockDisplay from "./components/clockdisplay";
import ControlButtons from "./components/controlbutton";




export default function DebateTimer(){
    const [debateStyle, setDebateStyle] = useState("");
    const [clockType, setClockType] = useState("");
    return( <>  
     <div
      className="min-h-screen flex justify-center items-center p-4 bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/280252/pexels-photo-280252.jpeg')`,
      }}
    >
      <div className="bg-slate-900/40 backdrop-blur-lg border-4 border-orange-600 rounded-2xl shadow-[0_0_30px_#ff6a00] p-6 w-full max-w-md text-center space-y-6 animate-fade-in">
        <h1 className="text-2xl md:text-3xl text-white font-bold">
          Choose Your Debate Style
        </h1>

        <Dropdown
          label=""
          options={["Asian", "British"]}
          value={debateStyle}
          onChange={setDebateStyle}
        />

        {debateStyle && (
          <p className="text-orange-400 text-lg font-semibold">
            {debateStyle} parliamentary debate
          </p>
        )}

        <Dropdown
          label="Choose Clock Type"
          options={["Stopwatch", "Timer"]}
          value={clockType}
          onChange={setClockType}
        />

        {clockType && <TimerCard type={clockType} />}
      </div>
    </div>
    
    
    </>)

}