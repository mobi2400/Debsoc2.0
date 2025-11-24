"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import UserProfile from "./components/UserProfile";
import AttendanceOverview from "./components/AttendanceOverview";
import AnonymousMessage from "./components/AnonymousMessage";
import RandomFeedback from "./components/RandomFeedback";
import AssignedTasks from "./components/AssignedTasks";
import DashboardSidebar from "./components/DashboardSidebar";
import { mockUser } from "@/lib/dashboardData";

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* User Profile Section - Always Visible at Top */}
          <div className="mb-8">
            <UserProfile user={mockUser} />
          </div>

          {/* Main Dashboard Content */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <DashboardSidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
              />
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 space-y-6">
              {(!activeSection || activeSection === "attendance") && (
                <AttendanceOverview />
              )}
              {activeSection === "message" && <AnonymousMessage />}
              {activeSection === "feedback" && <RandomFeedback />}
              {activeSection === "tasks" && <AssignedTasks />}
            </main>
          </div>
        </div>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#374151",
            color: "#fff",
            border: "1px solid #4B5563",
          },
        }}
      />
    </>
  );
}

