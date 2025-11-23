"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { presidentApi, User, Task, Session } from "@/lib/api";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { Crown, LogOut, Plus, CheckCircle, Calendar, Users, FileText, MessageSquare } from "lucide-react";

export default function PresidentDashboard() {
  const { user, logout, isAuthenticated, isVerified } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"dashboard" | "tasks" | "feedback" | "sessions">("dashboard");
  const [members, setMembers] = useState<User[]>([]);
  const [cabinet, setCabinet] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [taskForm, setTaskForm] = useState({
    name: "",
    description: "",
    deadline: "",
    assignedToId: "",
    assignedToMemberId: "",
    assignType: "cabinet" as "cabinet" | "member",
  });
  const [feedbackForm, setFeedbackForm] = useState({
    feedback: "",
    memberId: "",
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "President") {
      router.push("/login");
      return;
    }
    if (!isVerified) {
      toast.error("Your account is not verified. Please contact TechHead.");
    }
    loadDashboard();
  }, [isAuthenticated, user, isVerified]);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const dashboardData = await presidentApi.getDashboard();
      setMembers(dashboardData.members);
      setCabinet(dashboardData.cabinet);
      const sessionsData = await presidentApi.getSessions();
      setSessions(sessionsData.sessions);
    } catch (error: any) {
      toast.error(error.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleAssignTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await presidentApi.assignTask({
        name: taskForm.name,
        description: taskForm.description,
        deadline: taskForm.deadline,
        assignedToId: taskForm.assignType === "cabinet" ? taskForm.assignedToId : undefined,
        assignedToMemberId: taskForm.assignType === "member" ? taskForm.assignedToMemberId : undefined,
      });
      toast.success("Task assigned successfully");
      setShowTaskModal(false);
      setTaskForm({
        name: "",
        description: "",
        deadline: "",
        assignedToId: "",
        assignedToMemberId: "",
        assignType: "cabinet",
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to assign task");
    }
  };

  const handleGiveFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await presidentApi.giveFeedback(feedbackForm.feedback, feedbackForm.memberId);
      toast.success("Feedback sent successfully");
      setShowFeedbackModal(false);
      setFeedbackForm({ feedback: "", memberId: "" });
    } catch (error: any) {
      toast.error(error.message || "Failed to send feedback");
    }
  };

  if (!isAuthenticated || user?.role !== "President") {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">President Dashboard</h1>
                  <p className="text-gray-400">Manage society operations</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {!isVerified && (
                  <div className="px-3 py-1 bg-red-600/20 border border-red-600/50 rounded-lg">
                    <p className="text-red-400 text-sm">Not Verified</p>
                  </div>
                )}
                <div className="text-right">
                  <p className="text-white font-medium">{user?.name}</p>
                  <p className="text-gray-400 text-sm">{user?.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-2 mb-6">
            {[
              { id: "dashboard", label: "Dashboard", icon: FileText },
              { id: "tasks", label: "Assign Tasks", icon: Plus },
              { id: "feedback", label: "Give Feedback", icon: MessageSquare },
              { id: "sessions", label: "Sessions", icon: Calendar },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white"
                    : "bg-gray-800/50 text-gray-400 hover:text-white"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
              <p className="text-gray-400 mt-4">Loading...</p>
            </div>
          ) : (
            <>
              {/* Dashboard Tab */}
              {activeTab === "dashboard" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Users className="w-6 h-6 text-orange-500" />
                      <h2 className="text-xl font-bold text-white">Members</h2>
                      <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-sm">
                        {members.length}
                      </span>
                    </div>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {members.map((member) => (
                        <div key={member.id} className="bg-gray-700/50 rounded-lg p-3">
                          <p className="text-white font-medium">{member.name}</p>
                          <p className="text-gray-400 text-sm">{member.email}</p>
                          {member.isVerified ? (
                            <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                          ) : (
                            <span className="text-red-400 text-xs">Not Verified</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Users className="w-6 h-6 text-blue-500" />
                      <h2 className="text-xl font-bold text-white">Cabinet</h2>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">
                        {cabinet.length}
                      </span>
                    </div>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {cabinet.map((cab) => (
                        <div key={cab.id} className="bg-gray-700/50 rounded-lg p-3">
                          <p className="text-white font-medium">{cab.name}</p>
                          <p className="text-gray-400 text-sm">{cab.email}</p>
                          <p className="text-gray-400 text-sm">Position: {cab.position}</p>
                          {cab.isVerified ? (
                            <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                          ) : (
                            <span className="text-red-400 text-xs">Not Verified</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tasks Tab */}
              {activeTab === "tasks" && (
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Assign Task</h2>
                    <button
                      onClick={() => setShowTaskModal(true)}
                      className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:opacity-90 rounded-lg text-white font-medium transition-colors flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>New Task</span>
                    </button>
                  </div>
                  {showTaskModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold text-white mb-4">Assign New Task</h3>
                        <form onSubmit={handleAssignTask} className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Task Name</label>
                            <input
                              type="text"
                              value={taskForm.name}
                              onChange={(e) => setTaskForm({ ...taskForm, name: e.target.value })}
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                            <textarea
                              value={taskForm.description}
                              onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                              rows={3}
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Deadline</label>
                            <input
                              type="datetime-local"
                              value={taskForm.deadline}
                              onChange={(e) => setTaskForm({ ...taskForm, deadline: e.target.value })}
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Assign To</label>
                            <select
                              value={taskForm.assignType}
                              onChange={(e) => setTaskForm({ ...taskForm, assignType: e.target.value as "cabinet" | "member" })}
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                            >
                              <option value="cabinet">Cabinet</option>
                              <option value="member">Member</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Select {taskForm.assignType === "cabinet" ? "Cabinet Member" : "Member"}
                            </label>
                            <select
                              value={taskForm.assignType === "cabinet" ? taskForm.assignedToId : taskForm.assignedToMemberId}
                              onChange={(e) =>
                                setTaskForm({
                                  ...taskForm,
                                  assignedToId: taskForm.assignType === "cabinet" ? e.target.value : "",
                                  assignedToMemberId: taskForm.assignType === "member" ? e.target.value : "",
                                })
                              }
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                              required
                            >
                              <option value="">Select...</option>
                              {taskForm.assignType === "cabinet"
                                ? cabinet.map((cab) => (
                                    <option key={cab.id} value={cab.id}>
                                      {cab.name} - {cab.position}
                                    </option>
                                  ))
                                : members.map((member) => (
                                    <option key={member.id} value={member.id}>
                                      {member.name}
                                    </option>
                                  ))}
                            </select>
                          </div>
                          <div className="flex space-x-3">
                            <button
                              type="submit"
                              className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:opacity-90 rounded-lg text-white font-medium"
                            >
                              Assign Task
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowTaskModal(false)}
                              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Feedback Tab */}
              {activeTab === "feedback" && (
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Give Anonymous Feedback</h2>
                    <button
                      onClick={() => setShowFeedbackModal(true)}
                      className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:opacity-90 rounded-lg text-white font-medium transition-colors flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>New Feedback</span>
                    </button>
                  </div>
                  {showFeedbackModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold text-white mb-4">Give Feedback to Member</h3>
                        <form onSubmit={handleGiveFeedback} className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Select Member</label>
                            <select
                              value={feedbackForm.memberId}
                              onChange={(e) => setFeedbackForm({ ...feedbackForm, memberId: e.target.value })}
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                              required
                            >
                              <option value="">Select Member...</option>
                              {members.map((member) => (
                                <option key={member.id} value={member.id}>
                                  {member.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Feedback</label>
                            <textarea
                              value={feedbackForm.feedback}
                              onChange={(e) => setFeedbackForm({ ...feedbackForm, feedback: e.target.value })}
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                              rows={4}
                              required
                            />
                          </div>
                          <div className="flex space-x-3">
                            <button
                              type="submit"
                              className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:opacity-90 rounded-lg text-white font-medium"
                            >
                              Send Feedback
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowFeedbackModal(false)}
                              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Sessions Tab */}
              {activeTab === "sessions" && (
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Session Reports</h2>
                  <div className="space-y-4">
                    {sessions.length === 0 ? (
                      <p className="text-gray-400">No sessions found</p>
                    ) : (
                      sessions.map((session) => (
                        <div key={session.id} className="bg-gray-700/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-white font-medium">{session.motiontype}</p>
                            <p className="text-gray-400 text-sm">
                              {new Date(session.sessionDate).toLocaleDateString()}
                            </p>
                          </div>
                          <p className="text-gray-400 text-sm">Chair: {session.Chair}</p>
                          {session.attendance && (
                            <p className="text-gray-400 text-sm mt-2">
                              Attendance: {session.attendance.filter((a) => a.status === "Present").length} present,{" "}
                              {session.attendance.filter((a) => a.status === "Absent").length} absent
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </>
          )}
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

