"use client";
import React, {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "@/contexts/AuthContext";
import {memberApi, Task, Attendance, AnonymousFeedback, User} from "@/lib/api";
import {presidentApi} from "@/lib/api";
import Navbar from "@/components/Navbar";
import {Toaster} from "react-hot-toast";
import toast from "react-hot-toast";
import {
  User as UserIcon,
  LogOut,
  Calendar,
  FileText,
  MessageSquare,
  CheckCircle,
  XCircle,
  Plus,
} from "lucide-react";
import UnverifiedView from "@/components/UnverifiedView";

export default function MemberDashboard() {
  const {user, logout, isAuthenticated, isVerified} = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "attendance" | "tasks" | "messages" | "feedback"
  >("attendance");
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [feedbacks, setFeedbacks] = useState<AnonymousFeedback[]>([]);
  const [presidents, setPresidents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageForm, setMessageForm] = useState({
    message: "",
    presidentId: "",
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "Member") {
      router.push("/login");
      return;
    }
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user, isVerified]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [attendanceData, tasksData, feedbacksData] = await Promise.all([
        memberApi.getAttendance(),
        memberApi.getTasks(),
        memberApi.getFeedback(),
      ]);
      setAttendance(attendanceData.attendance);
      setTasks(tasksData.tasks);
      setFeedbacks(feedbacksData.feedbacks);
      // Note: Since there's no API endpoint to get all presidents,
      // we'll use a placeholder. In production, you may want to add an endpoint
      // or store the current president ID in the user context
      setPresidents([
        {
          id: "current-president",
          name: "Current President",
          email: "president@debsoc.com",
          role: "President",
          isVerified: true,
        },
      ]);
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to load data"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await memberApi.sendMessageToPresident(
        messageForm.message,
        messageForm.presidentId
      );
      toast.success("Message sent successfully");
      setShowMessageModal(false);
      setMessageForm({message: "", presidentId: ""});
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send message"
      );
    }
  };

  // Calculate attendance statistics
  const attendanceStats = {
    total: attendance.length,
    present: attendance.filter((a) => a.status === "Present").length,
    absent: attendance.filter((a) => a.status === "Absent").length,
    percentage:
      attendance.length > 0
        ? Math.round(
            (attendance.filter((a) => a.status === "Present").length /
              attendance.length) *
              100
          )
        : 0,
  };

  if (!isAuthenticated || user?.role !== "Member") {
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
                <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
                  <UserIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Member Dashboard
                  </h1>
                  <p className="text-gray-400">
                    View your activities and updates
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
              {id: "attendance", label: "Attendance", icon: Calendar},
              {id: "tasks", label: "Tasks", icon: FileText},
              {id: "messages", label: "Messages", icon: MessageSquare},
              {id: "feedback", label: "Feedback", icon: MessageSquare},
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(
                    tab.id as "attendance" | "tasks" | "messages" | "feedback"
                  )
                }
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 mb-2 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
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
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              <p className="text-gray-400 mt-4">Loading...</p>
            </div>
          ) : (
            <>
              {/* Attendance Tab */}
              {activeTab === "attendance" && (
                <div className="space-y-6">
                  {/* Statistics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-4">
                      <p className="text-gray-400 text-sm mb-1">
                        Total Sessions
                      </p>
                      <p className="text-2xl font-bold text-white">
                        {attendanceStats.total}
                      </p>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-4">
                      <p className="text-gray-400 text-sm mb-1">Present</p>
                      <p className="text-2xl font-bold text-green-400">
                        {attendanceStats.present}
                      </p>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-4">
                      <p className="text-gray-400 text-sm mb-1">Absent</p>
                      <p className="text-2xl font-bold text-red-400">
                        {attendanceStats.absent}
                      </p>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-4">
                      <p className="text-gray-400 text-sm mb-1">Attendance %</p>
                      <p className="text-2xl font-bold text-orange-400">
                        {attendanceStats.percentage}%
                      </p>
                    </div>
                  </div>

                  {/* Attendance List */}
                  <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-6">
                    <h2 className="text-xl font-bold text-white mb-4">
                      Attendance History
                    </h2>
                    {attendance.length === 0 ? (
                      <p className="text-gray-400">
                        No attendance records found
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {attendance.map((record) => (
                          <div
                            key={record.id}
                            className="bg-gray-700/50 rounded-lg p-4"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <p className="text-white font-medium">
                                  {record.session?.motiontype || "Session"}
                                </p>
                                <p className="text-gray-400 text-sm">
                                  {record.session?.Chair &&
                                    `Chair: ${record.session.Chair}`}
                                </p>
                                <p className="text-gray-500 text-xs mt-1">
                                  {record.session?.sessionDate
                                    ? new Date(
                                        record.session.sessionDate
                                      ).toLocaleDateString()
                                    : "Date not available"}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                {record.status === "Present" ? (
                                  <div className="flex items-center space-x-1 px-3 py-1 bg-green-600/20 border border-green-600/50 rounded-lg">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    <span className="text-green-400 text-sm font-medium">
                                      Present
                                    </span>
                                  </div>
                                ) : (
                                  <div className="flex items-center space-x-1 px-3 py-1 bg-red-600/20 border border-red-600/50 rounded-lg">
                                    <XCircle className="w-4 h-4 text-red-400" />
                                    <span className="text-red-400 text-sm font-medium">
                                      Absent
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

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
                              className={`px-2 py-1 rounded text-xs ${
                                new Date(task.deadline) < new Date()
                                  ? "bg-red-600/20 text-red-400"
                                  : new Date(task.deadline) <
                                    new Date(
                                      Date.now() + 7 * 24 * 60 * 60 * 1000
                                    )
                                  ? "bg-yellow-600/20 text-yellow-400"
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

              {/* Messages Tab */}
              {activeTab === "messages" && (
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">
                      Send Message to President
                    </h2>
                    <button
                      onClick={() => setShowMessageModal(true)}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 rounded-lg text-white font-medium transition-colors flex items-center space-x-2"
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
                              className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 rounded-lg text-white font-medium"
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

              {/* Feedback Tab */}
              {activeTab === "feedback" && (
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-6">
                  <h2 className="text-xl font-bold text-white mb-4">
                    Received Feedback
                  </h2>
                  {feedbacks.length === 0 ? (
                    <p className="text-gray-400">No feedback received yet</p>
                  ) : (
                    <div className="space-y-4">
                      {feedbacks.map((feedback) => (
                        <div
                          key={feedback.id}
                          className="bg-gray-700/50 rounded-lg p-4"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span
                                  className={`px-2 py-1 rounded text-xs ${
                                    feedback.senderType === "President"
                                      ? "bg-yellow-600/20 text-yellow-400"
                                      : "bg-blue-600/20 text-blue-400"
                                  }`}
                                >
                                  From: {feedback.senderType}
                                </span>
                                <span className="text-gray-500 text-xs">
                                  {new Date(
                                    feedback.createdAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-white">{feedback.feedback}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
