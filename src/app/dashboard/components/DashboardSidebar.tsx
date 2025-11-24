"use client";
import React from "react";
import {
  Calendar,
  MessageSquare,
  MessageCircle,
  CheckSquare,
  LayoutDashboard,
} from "lucide-react";

interface DashboardSidebarProps {
  activeSection: string | null;
  setActiveSection: (section: string | null) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeSection,
  setActiveSection,
}) => {
  const menuItems = [
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "message", label: "Message President", icon: MessageSquare },
    { id: "feedback", label: "Random Feedback", icon: MessageCircle },
    { id: "tasks", label: "Assigned Tasks", icon: CheckSquare },
  ];

  return (
    <div className="bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-4 sticky top-24">
      <div className="space-y-2">
        <button
          onClick={() => setActiveSection(null)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            !activeSection
              ? "bg-orange-500/20 text-orange-400 border border-orange-500/50"
              : "text-gray-300 hover:bg-gray-700/50 hover:text-orange-400"
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </button>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-orange-500/20 text-orange-400 border border-orange-500/50"
                  : "text-gray-300 hover:bg-gray-700/50 hover:text-orange-400"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardSidebar;

