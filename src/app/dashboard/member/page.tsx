"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { memberApi, leaderboardApi, Task, Attendance, AnonymousFeedback, User, AnonymousMessage, LeaderboardEntry } from "@/lib/api";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
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
  Trophy,
  BarChart2,
} from "lucide-react";
import UnverifiedView from "@/components/UnverifiedView";

export const dynamic = "force-dynamic";

export default function MemberDashboard() {
  const { user, logout, isAuthenticated, isVerified, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "attendance" | "tasks" | "messages" | "feedback" | "leaderboard"
  >("attendance");
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [feedbacks, setFeedbacks] = useState<AnonymousFeedback[]>([]);
  const [sentMessages, setSentMessages] = useState<AnonymousMessage[]>([]);
  const [presidents, setPresidents] = useState<User[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [leaderboardType, setLeaderboardType] = useState<"all-time" | "bi-monthly">("all-time");
  const [loading, setLoading] = useState(true);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageForm, setMessageForm] = useState({
    message: "",
    presidentId: "",
  });
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  // Use a ref to prevent double submission immediately, as state updates are async
  const isSubmittingRef = React.useRef(false);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (user?.role !== "Member" && user?.role !== "President") {
      router.push("/login");
      return;
    }

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user, isVerified, isLoading]);


  useEffect(() => {
    if (activeTab === "leaderboard") {
      const fetchLeaderboard = async () => {
        try {
          const data = await leaderboardApi.getLeaderboard(leaderboardType);
          setLeaderboard(data.leaderboard);
        } catch (error) {
          console.error("Failed to load leaderboard", error);
          toast.error("Failed to load leaderboard");
        }
      };
      fetchLeaderboard();
    }
  }, [activeTab, leaderboardType]);

  const loadData = async () => {
    try {
      setLoading(true);

      // Load core data
      try {
        const [attendanceData, tasksData, feedbacksData] = await Promise.all([
          memberApi.getAttendance(),
          memberApi.getTasks(),
          memberApi.getFeedback(),
        ]);
        setAttendance(attendanceData.attendance);
        setTasks(tasksData.tasks);
        setFeedbacks(feedbacksData.feedbacks);
      } catch (error) {
        console.error("Failed to load core data", error);
        toast.error("Failed to load dashboard data");
      }

      // Load new features data
      try {
        const [sentMessagesData, presidentsData] = await Promise.all([
          memberApi.getSentMessages(),
          memberApi.getPresidents(),
        ]);
        setSentMessages(sentMessagesData.messages);
        setPresidents(presidentsData.presidents);
      } catch (error) {
        console.error("Failed to load history data", error);
      }
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
    if (isSendingMessage || isSubmittingRef.current) return;

    isSubmittingRef.current = true;
    setIsSendingMessage(true);

    try {
      await memberApi.sendMessageToPresident(
        messageForm.message,
        messageForm.presidentId
      );
      toast.success("Message sent successfully");
      setShowMessageModal(false);
      setMessageForm({ message: "", presidentId: "" });
      loadData(); // Reload to see the sent message
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send message"
      );
    } finally {
      setIsSendingMessage(false);
      isSubmittingRef.current = false;
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

  if (
    !isAuthenticated ||
    (user?.role !== "Member" && user?.role !== "President")
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
        <div className="container mx-auto px-4 py-4 md:py-8">
          {/* Header */}
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-4 md:p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {!isVerified && (
                  <div className="px-3 py-1 bg-red-600/20 border border-red-600/50 rounded-lg self-start md:self-auto">
                    <p className="text-red-400 text-sm">Not Verified</p>
                  </div>
                )}
                <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
                  <div className="text-left md:text-right">
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
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { id: "attendance", label: "Attendance", icon: Calendar },
              { id: "tasks", label: "Tasks", icon: FileText },
              { id: "messages", label: "Messages", icon: MessageSquare },
              { id: "feedback", label: "Feedback", icon: MessageSquare },
              { id: "leaderboard", label: "Leaderboard", icon: Trophy },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(
                    tab.id as "attendance" | "tasks" | "messages" | "feedback"
                  )
                }
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${activeTab === tab.id
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
                  <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-4 md:p-6">
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
                            className="bg-gray-700/50 rounded-lg p-4 relative group hover:bg-gray-700/80 transition-all duration-300"
                          >
                            {/* Hover Pop-out Details */}
                            <div className="absolute left-1/2 -top-2 -translate-x-1/2 -translate-y-full w-[calc(100%-2rem)] md:w-80 bg-gray-800 border border-gray-600 rounded-xl shadow-2xl p-4 hidden group-hover:block z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-3xl">
                              <h4 className="text-lg font-bold text-white mb-3 leading-tight">{record.session?.motiontype || "Session Details"}</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between border-b border-gray-700 pb-1">
                                  <span className="text-gray-400">Date</span>
                                  <span className="text-gray-200 font-medium">
                                    {record.session?.sessionDate
                                      ? new Date(record.session.sessionDate).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
                                      : "N/A"}
                                  </span>
                                </div>
                                <div className="flex justify-between border-b border-gray-700 pb-1">
                                  <span className="text-gray-400">Chair</span>
                                  <span className="text-gray-200 font-medium">{record.session?.Chair || "N/A"}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-700 pb-1">
                                  <span className="text-gray-400">Status</span>
                                  <span className={`font-bold ${record.status === "Present" ? "text-green-400" : "text-red-400"}`}>
                                    {record.status}
                                  </span>
                                </div>
                                <div className="flex justify-between pt-1">
                                  <span className="text-gray-400">Speaker Score</span>
                                  <span className="text-blue-400 font-bold">{record.speakerScore ?? "N/A"}</span>
                                </div>
                              </div>
                              {/* Arrow Tip */}
                              <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-4 h-4 bg-gray-800 border-r border-b border-gray-600 rotate-45"></div>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                              <div>
                                <p className="text-white font-medium">
                                  {record.session?.motiontype || "Session"}
                                </p>
                                <p className="text-gray-400 text-sm">
                                  {record.session?.Chair &&
                                    `Chair: ${record.session.Chair}`}
                                </p>
                                {record.speakerScore !== undefined && record.speakerScore !== null && (
                                  <p className="text-blue-400 text-sm font-medium mt-1 flex items-center gap-1">
                                    <BarChart2 className="w-3 h-3" />
                                    Score: {record.speakerScore}
                                  </p>
                                )}
                                <p className="text-gray-500 text-xs mt-1">
                                  {record.session?.sessionDate
                                    ? new Date(
                                      record.session.sessionDate
                                    ).toLocaleDateString()
                                    : "Date not available"}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2 self-start md:self-center">
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
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-4 md:p-6">
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
                          <div className="flex flex-col md:flex-row md:items-start justify-between mb-2 gap-2">
                            <h3 className="text-white font-medium text-lg">
                              {task.name}
                            </h3>
                            <span
                              className={`px-2 py-1 rounded text-xs self-start ${new Date(task.deadline) < new Date()
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
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                    <h2 className="text-xl font-bold text-white">
                      Send Message to President
                    </h2>
                    <button
                      onClick={() => setShowMessageModal(true)}
                      className="w-full md:w-auto px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 rounded-lg text-white font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>New Message</span>
                    </button>
                  </div>

                  <div className="mt-4 p-4 bg-orange-600/20 border border-orange-600/50 rounded-lg">
                    <p className="text-orange-300 text-sm">
                      💡 Your messages are sent anonymously. The President will
                      not know who sent them.
                    </p>
                    <p className="text-orange-300 text-xs mt-2">
                      Note: Please ensure you have the correct President ID.
                      Contact TechHead if you need assistance.
                    </p>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-white mb-4">
                      Sent Messages History
                    </h3>
                    <div className="space-y-4">
                      {sentMessages.length === 0 ? (
                        <p className="text-gray-400">No messages sent yet</p>
                      ) : (
                        sentMessages.map((msg) => (
                          <div
                            key={msg.id}
                            className="bg-gray-700/50 rounded-lg p-4"
                          >
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                              <p className="text-white font-medium">
                                To: {presidents.find(p => p.id === msg.presidentId)?.name || 'Unknown President'}
                              </p>
                              <p className="text-gray-400 text-sm">
                                {new Date(msg.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <p className="text-gray-300">{msg.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Feedback Tab */}
              {activeTab === "feedback" && (
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-4 md:p-6">
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
                                  className={`px-2 py-1 rounded text-xs ${feedback.senderType === "President"
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

              {/* Leaderboard Tab */}
              {activeTab === "leaderboard" && (
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-yellow-500/20 rounded-lg">
                        <Trophy className="w-6 h-6 text-yellow-500" />
                      </div>
                      <h2 className="text-xl font-bold text-white">Leaderboard</h2>
                    </div>

                    <div className="flex bg-gray-700/50 rounded-lg p-1">
                      <button
                        onClick={() => setLeaderboardType("all-time")}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${leaderboardType === "all-time"
                          ? "bg-gray-600 text-white shadow"
                          : "text-gray-400 hover:text-white"
                          }`}
                      >
                        All Time
                      </button>
                      <button
                        onClick={() => setLeaderboardType("bi-monthly")}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${leaderboardType === "bi-monthly"
                          ? "bg-gray-600 text-white shadow"
                          : "text-gray-400 hover:text-white"
                          }`}
                      >
                        Bi-Monthly
                      </button>
                    </div>
                  </div>

                  {leaderboard.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">No leaderboard data available</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-gray-700 text-gray-400 text-sm">
                            <th className="p-4 font-medium">Rank</th>
                            <th className="p-4 font-medium">Name</th>
                            <th className="p-4 font-medium">Total Score</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700/50">
                          {leaderboard.map((entry, index) => (
                            <tr
                              key={entry.id}
                              className={`hover:bg-gray-700/30 transition-colors ${entry.name === user?.name ? "bg-orange-500/10 border-l-2 border-orange-500" : ""
                                }`}
                            >
                              <td className="p-4">
                                {(index + 1) === 1 && <Trophy className="w-5 h-5 text-yellow-500 inline mr-2" />}
                                {(index + 1) === 2 && <Trophy className="w-5 h-5 text-gray-400 inline mr-2" />}
                                {(index + 1) === 3 && <Trophy className="w-5 h-5 text-amber-700 inline mr-2" />}
                                <span className={`font-bold ${(index + 1) === 1 ? "text-yellow-500" :
                                  (index + 1) === 2 ? "text-gray-400" :
                                    (index + 1) === 3 ? "text-amber-700" : "text-gray-300"
                                  }`}>
                                  #{index + 1}
                                </span>
                              </td>
                              <td className="p-4 text-white font-medium">
                                {entry.name}
                                {entry.name === user?.name && <span className="ml-2 text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded">You</span>}
                              </td>
                              <td className="p-4">
                                <span className="font-bold text-blue-400">{entry.score.toFixed(1)}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {showMessageModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-2xl flex items-center justify-center p-4 transition-all duration-300">
          <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-8 w-full max-w-lg shadow-[0_0_50px_-12px_rgba(249,115,22,0.3)] border border-orange-500/30 animate-pop-in relative">
            <button
              onClick={() => setShowMessageModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <XCircle className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                <MessageSquare className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Send Anonymous Message
                </h3>
                <p className="text-gray-400 text-sm">
                  Your identity will remain hidden
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSendMessage}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 ml-1">
                  Select President
                </label>
                <div className="relative">
                  <select
                    value={messageForm.presidentId}
                    onChange={(e) =>
                      setMessageForm({
                        ...messageForm,
                        presidentId: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all appearance-none"
                    required
                  >
                    <option value="">Select President...</option>
                    {presidents.map((president) => (
                      <option key={president.id} value={president.id}>
                        {president.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <UserIcon className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 ml-1">
                  Your Message
                </label>
                <textarea
                  value={messageForm.message}
                  onChange={(e) =>
                    setMessageForm({
                      ...messageForm,
                      message: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all resize-none"
                  rows={5}
                  required
                  placeholder="Type your message here..."
                />
              </div>

              <div className="flex flex-col-reverse md:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowMessageModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-gray-300 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSendingMessage}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl text-white font-bold shadow-lg shadow-orange-500/20 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSendingMessage ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <MessageSquare className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
