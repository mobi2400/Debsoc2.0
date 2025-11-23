"use client";
import React, { useState } from "react";
import { CheckSquare, Clock, Calendar, CheckCircle2, Circle, Loader2 } from "lucide-react";
import { mockTasks, Task } from "@/lib/dashboardData";
import toast from "react-hot-toast";

const AssignedTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const handleMarkAsDone = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: "completed" as const }
          : task
      )
    );
    toast.success("Task marked as completed!");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case "in_progress":
        return <Loader2 className="w-5 h-5 text-orange-400 animate-spin" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/50";
      case "in_progress":
        return "bg-orange-500/20 text-orange-400 border-orange-500/50";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50";
    }
  };

  const isOverdue = (deadline: string, status: string) => {
    if (status === "completed") return false;
    return new Date(deadline) < new Date();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const pendingTasks = tasks.filter((t) => t.status === "pending");
  const inProgressTasks = tasks.filter((t) => t.status === "in_progress");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  return (
    <div className="bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-6">
      <div className="flex items-center gap-3 mb-6">
        <CheckSquare className="w-6 h-6 text-orange-400" />
        <h2 className="text-2xl font-bold text-white">Assigned Tasks</h2>
      </div>

      {/* Task Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/50 text-center">
          <p className="text-gray-400 text-sm mb-1">Pending</p>
          <p className="text-2xl font-bold text-yellow-400">{pendingTasks.length}</p>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/50 text-center">
          <p className="text-gray-400 text-sm mb-1">In Progress</p>
          <p className="text-2xl font-bold text-orange-400">{inProgressTasks.length}</p>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/50 text-center">
          <p className="text-gray-400 text-sm mb-1">Completed</p>
          <p className="text-2xl font-bold text-green-400">{completedTasks.length}</p>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`bg-gray-700/50 rounded-lg p-5 border ${
                isOverdue(task.deadline, task.status)
                  ? "border-red-500/50"
                  : "border-gray-600/50"
              } hover:border-orange-500/50 transition-colors`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1">{getStatusIcon(task.status)}</div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-white font-semibold text-lg">{task.title}</h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {task.status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                      {isOverdue(task.deadline, task.status) && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/50">
                          Overdue
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 mb-3">{task.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>Deadline: {formatDate(task.deadline)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>Assigned: {formatDate(task.assignedDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {task.status !== "completed" && (
                  <button
                    onClick={() => handleMarkAsDone(task.id)}
                    className="flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-400 font-medium px-4 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Mark as Done</span>
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-400">
            <CheckSquare className="w-12 h-12 mx-auto mb-4 text-gray-500" />
            <p>No tasks assigned at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignedTasks;

