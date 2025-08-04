"use client";
import React, {useState} from "react";
import toast, {Toaster} from "react-hot-toast";
import Navbar from "../../components/Navbar";
import Dropdown from "./components/dropdown";
import TimerCard from "./components/timecard";
import ClockDisplay from "./components/clockdisplay";
import ControlButtons from "./components/controlbutton";

export default function DebateTimer() {
  const [debateStyle, setDebateStyle] = useState("");
  const [clockType, setClockType] = useState<"" | "Timer" | "Stopwatch">("");
  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex justify-center items-center p-4 bg-cover bg-center pt-20"
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
            onChange={(value) => setClockType(value as "Timer" | "Stopwatch")}
          />

          {clockType && (
            <TimerCard
              type={clockType}
              onStart={() => toast.success("Time started!")}
              onStop={() => toast.error("Time stopped")}
              onReset={() =>
                toast("Timer reset!", {
                  icon: "🔄",
                  style: {
                    background: "#1f2937",
                    color: "#f59e0b", // amber-500
                    border: "1px solid #f59e0b",
                  },
                })
              }
            />
          )}
        </div>
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          // Default options for all toasts
          duration: 3000,
          style: {
            background: "#1f2937",
            color: "#fff",
            border: "1px solid #374151",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
          },
          // Success toast styling
          success: {
            style: {
              background: "#1f2937",
              color: "#10b981", // green-500
              border: "1px solid #10b981",
            },
            iconTheme: {
              primary: "#10b981",
              secondary: "#1f2937",
            },
          },
          // Error toast styling
          error: {
            style: {
              background: "#1f2937",
              color: "#ef4444",
              border: "1px solid #ef4444",
            },
            iconTheme: {
              primary: "#ef4444",
              secondary: "#1f2937",
            },
          },
        }}
      />
    </>
  );
}
