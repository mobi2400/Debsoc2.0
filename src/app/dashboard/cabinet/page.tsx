"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { cabinetApi, Task, Session, User } from "@/lib/api";

import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import {
  Users,
  LogOut,
  Calendar,
  MessageSquare,
  FileText,
  Plus,
} from "lucide-react";
import UnverifiedView from "@/components/UnverifiedView";

export default function CabinetDashboard() {
  const { user, logout, isAuthenticated, isVerified, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "tasks" | "attendance" | "feedback" | "messages" | "sessions"
  >("tasks");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [members, setMembers] = useState<User[]>([]);
  const [presidents, setPresidents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [attendanceForm, setAttendanceForm] = useState({
    sessionDate: "",
    motiontype: "",
    Chair: "",
    attendanceData: [] as Array<{
      memberId: string;
      status: "Present" | "Absent";
    }>,
  });
  const [feedbackForm, setFeedbackForm] = useState({
    feedback: "",
    memberId: "",
  });
  const [messageForm, setMessageForm] = useState({
    message: "",
    presidentId: "",
  });

  useEffect(() => {
    if (isLoading) return;
    if (
      !isAuthenticated ||
      (user?.role !== "cabinet" && user?.role !== "President")
    ) {
      router.push("/login");
      return;
    }
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user, isVerified, isLoading]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [tasksData, sessionsData, dashboardData] = await Promise.all([
        cabinetApi.getTasks(),
        cabinetApi.getSessions(),
        cabinetApi.getDashboard(),
      ]);
      setTasks(tasksData.tasks);
      setSessions(sessionsData.sessions);
      setMembers(dashboardData.members);
      setPresidents(dashboardData.presidents);
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to load data"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await cabinetApi.markAttendance(attendanceForm);
      toast.success("Attendance marked successfully");
      setShowAttendanceModal(false);
      setAttendanceForm({
        sessionDate: "",
        motiontype: "",
        Chair: "",
        attendanceData: [],
      });
      loadData();
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to mark attendance"
      );
    }
  };

  const handleGiveFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await cabinetApi.giveFeedback(
        feedbackForm.feedback,
        feedbackForm.memberId
      );
      toast.success("Feedback sent successfully");
      setShowFeedbackModal(false);
      setFeedbackForm({ feedback: "", memberId: "" });
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send feedback"
      );
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await cabinetApi.sendMessageToPresident(
        messageForm.message,
        messageForm.presidentId
      );
      toast.success("Message sent successfully");
      setShowMessageModal(false);
      setMessageForm({ message: "", presidentId: "" });
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send message"
      );
    }
  };

  const toggleMemberAttendance = (memberId: string) => {
    setAttendanceForm((prev) => {
      const existing = prev.attendanceData.find((a) => a.memberId === memberId);
      if (existing) {
        return {
          ...prev,
          attendanceData: prev.attendanceData.map((a) =>
            a.memberId === memberId
              ? { ...a, status: a.status === "Present" ? "Absent" : "Present" }
              : a
          ),
        };
      } else {
        return {
          ...prev,
          attendanceData: [
            ...prev.attendanceData,
            { memberId, status: "Present" },
          ],
        };
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (
    !isAuthenticated ||
    (user?.role !== "cabinet" && user?.role !== "President")
  ) {
    return null;
  }

  if (!isVerified) {
    return <UnverifiedView />;
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
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Cabinet Dashboard
                  </h1>
                  <p className="text-gray-400">
                    {user?.position || "Cabinet Member"}
                  </p>
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
          <div className="flex space-x-2 mb-6 flex-wrap">
            {[
              { id: "tasks", label: "Tasks", icon: FileText },
              { id: "attendance", label: "Mark Attendance", icon: Calendar },
              { id: "feedback", label: "Give Feedback", icon: MessageSquare },
              { id: "messages", label: "Messages", icon: MessageSquare },
              { id: "sessions", label: "Sessions", icon: Calendar },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(
                    tab.id as
                    | "tasks"
                    | "attendance"
                    | "feedback"
                    | "messages"
                    | "sessions"
                  )
                }
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 mb-2 ${activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
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
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="text-gray-400 mt-4">Loading...</p>
            </div>
          ) : (
            <>
              {/* Tasks Tab */}
              {activeTab === "tasks" && (
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-6">
                  <h2 className="text-xl font-bold text-white mb-4">
                    Assigned Tasks
                  </h2>
                  {tasks.length === 0 ? (
                    <p className="text-gray-400">No tasks assigned</p>
                  ) : (
                    <div className="space-y-4">
                      {tasks.map((task) => (
                        <div
                          key={task.id}
                          className="bg-gray-700/50 rounded-lg p-4"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-white font-medium text-lg">
                              {task.name}
                            </h3>
                            <span
                              className={`px-2 py-1 rounded text-xs ${new Date(task.deadline) < new Date()
                                  ? "bg-red-600/20 text-red-400"
                                  : "bg-green-600/20 text-green-400"
                                }`}
                            >
                              {new Date(task.deadline).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mb-2">
                            {task.description}
                          </p>
                          <p className="text-gray-500 text-xs">
                            Deadline: {new Date(task.deadline).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Attendance Tab */}
              {activeTab === "attendance" && (
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">
                      Mark Session Attendance
                    </h2>
                    <button
                      onClick={() => setShowAttendanceModal(true)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 rounded-lg text-white font-medium transition-colors flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>New Session</span>
                    </button>
                  </div>
                  {showAttendanceModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold text-white mb-4">
                          Create Session & Mark Attendance
                        </h3>
                        <form
                          onSubmit={handleMarkAttendance}
                          className="space-y-4"
                        >
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Session Date
                            </label>
                            <input
                              type="datetime-local"
                              value={attendanceForm.sessionDate}
                              onChange={(e) =>
                                setAttendanceForm({
                                  ...attendanceForm,
                                  sessionDate: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Motion Type
                            </label>
                            <input
                              type="text"
                              value={attendanceForm.motiontype}
                              onChange={(e) =>
                                setAttendanceForm({
                                  ...attendanceForm,
                                  motiontype: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Chair
                            </label>
                            <input
                              type="text"
                              value={attendanceForm.Chair}
                              onChange={(e) =>
                                setAttendanceForm({
                                  ...attendanceForm,
                                  Chair: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Member Attendance
                            </label>
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                              {members.map((member) => {
                                const attendance =
                                  attendanceForm.attendanceData.find(
                                    (a) => a.memberId === member.id
                                  );
                                return (
                                  <div
                                    key={member.id}
                                    className="flex items-center justify-between bg-gray-700/50 rounded-lg p-3"
                                  >
                                    <div>
                                      <p className="text-white font-medium">
                                        {member.name}
                                      </p>
                                      <p className="text-gray-400 text-sm">
                                        {member.email}
                                      </p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        toggleMemberAttendance(member.id)
                                      }
                                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${attendance?.status === "Present"
                                          ? "bg-green-600 text-white"
                                          : attendance?.status === "Absent"
                                            ? "bg-red-600 text-white"
                                            : "bg-gray-600 text-gray-300"
                                        }`}
                                    >
                                      {attendance?.status || "Mark"}
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <div className="flex space-x-3">
                            <button
                              type="submit"
                              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 rounded-lg text-white font-medium"
                            >
                              Submit Attendance
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowAttendanceModal(false)}
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
                    <h2 className="text-xl font-bold text-white">
                      Give Anonymous Feedback
                    </h2>
                    <button
                      onClick={() => setShowFeedbackModal(true)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 rounded-lg text-white font-medium transition-colors flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>New Feedback</span>
                    </button>
                  </div>
                  {showFeedbackModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold text-white mb-4">
                          Give Feedback to Member
                        </h3>
                        <form
                          onSubmit={handleGiveFeedback}
                          className="space-y-4"
                        >
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Select Member
                            </label>
                            <select
                              value={feedbackForm.memberId}
                              onChange={(e) =>
                                setFeedbackForm({
                                  ...feedbackForm,
                                  memberId: e.target.value,
                                })
                              }
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
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Feedback
                            </label>
                            <textarea
                              value={feedbackForm.feedback}
                              onChange={(e) =>
                                setFeedbackForm({
                                  ...feedbackForm,
                                  feedback: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                              rows={4}
                              required
                            />
                          </div>
                          <div className="flex space-x-3">
                            <button
                              type="submit"
                              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 rounded-lg text-white font-medium"
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

              {/* Messages Tab */}
              {activeTab === "messages" && (
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">
                      Send Message to President
                    </h2>
                    <button
                      onClick={() => setShowMessageModal(true)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 rounded-lg text-white font-medium transition-colors flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>New Message</span>
                    </button>
                  </div>
                  {showMessageModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold text-white mb-4">
                          Send Anonymous Message
                        </h3>
                        <form
                          onSubmit={handleSendMessage}
                          className="space-y-4"
                        >
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Select President
                            </label>
                            <select
                              value={messageForm.presidentId}
                              onChange={(e) =>
                                setMessageForm({
                                  ...messageForm,
                                  presidentId: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white mb-4"
                              required
                            >
                              <option value="">Select President...</option>
                              {presidents.map((president) => (
                                <option key={president.id} value={president.id}>
                                  {president.name} - {president.email}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Message
                            </label>
                            <textarea
                              value={messageForm.message}
                              onChange={(e) =>
                                setMessageForm({
                                  ...messageForm,
                                  message: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                              rows={4}
                              required
                              placeholder="Type your anonymous message to the President..."
                            />
                          </div>
                          <div className="flex space-x-3">
                            <button
                              type="submit"
                              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 rounded-lg text-white font-medium"
                            >
                              Send Message
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowMessageModal(false)}
                              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                  <div className="mt-4 p-4 bg-blue-600/20 border border-blue-600/50 rounded-lg">
                    <p className="text-blue-300 text-sm">
                      💡 Your messages are sent anonymously. The President will
                      not know who sent them.
                    </p>
                    <p className="text-blue-300 text-xs mt-2">
                      Note: Please ensure you have the correct President ID.
                      Contact TechHead if you need assistance.
                    </p>
                  </div>
                </div>
              )}

              {/* Sessions Tab */}
              {activeTab === "sessions" && (
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-6">
                  <h2 className="text-xl font-bold text-white mb-4">
                    Session Reports
                  </h2>
                  <div className="space-y-4">
                    {sessions.length === 0 ? (
                      <p className="text-gray-400">No sessions found</p>
                    ) : (
                      sessions.map((session) => (
                        <div
                          key={session.id}
                          className="bg-gray-700/50 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-white font-medium">
                              {session.motiontype}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {new Date(
                                session.sessionDate
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <p className="text-gray-400 text-sm">
                            Chair: {session.Chair}
                          </p>
                          {session.attendance && (
                            <p className="text-gray-400 text-sm mt-2">
                              Attendance:{" "}
                              {
                                session.attendance.filter(
                                  (a) => a.status === "Present"
                                ).length
                              }{" "}
                              present,{" "}
                              {
                                session.attendance.filter(
                                  (a) => a.status === "Absent"
                                ).length
                              }{" "}
                              absent
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
