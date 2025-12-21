"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { cabinetApi, leaderboardApi, Task, Session, User, AnonymousMessage, AnonymousFeedback, Attendance, LeaderboardEntry } from "@/lib/api";
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
  X,
  Trophy,
  BarChart2,
} from "lucide-react";
import UnverifiedView from "@/components/UnverifiedView";

export const dynamic = "force-dynamic";

export default function CabinetDashboard() {
  const { user, logout, isAuthenticated, isVerified, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "tasks" | "attendance" | "feedback" | "messages" | "sessions" | "my-stats" | "leaderboard"
  >("tasks");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [members, setMembers] = useState<User[]>([]);
  const [cabinet, setCabinet] = useState<User[]>([]);
  const [presidents, setPresidents] = useState<User[]>([]);
  const [sentMessages, setSentMessages] = useState<AnonymousMessage[]>([]);
  const [sentFeedback, setSentFeedback] = useState<AnonymousFeedback[]>([]);
  const [myAttendance, setMyAttendance] = useState<Attendance[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [leaderboardType, setLeaderboardType] = useState<"all-time" | "bi-monthly">("all-time");
  const [loading, setLoading] = useState(true);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [attendanceForm, setAttendanceForm] = useState({
    sessionDate: "",
    motiontype: "",
    Chair: "",
    attendanceData: [] as Array<{
      id: string;
      type: "member" | "cabinet";
      status: "Present" | "Absent";
      speakerScore?: number;
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
  const [isSubmittingAttendance, setIsSubmittingAttendance] = useState(false);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  // Use a ref to prevent double submission immediately, as state updates are async
  const isSubmittingRef = React.useRef(false);

  const myStats = {
    total: sessions.length,
    present: myAttendance.filter((a) => a.status === "Present").length,
    absent: sessions.length - myAttendance.filter((a) => a.status === "Present").length,
    percentage:
      sessions.length > 0
        ? Math.round(
          (myAttendance.filter((a) => a.status === "Present").length /
            sessions.length) *
          100
        )
        : 0,
  };

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    // If authenticated but not the right role, just redirect to their dashboard or show unauthorized
    // But don't force logout/login redirect loop here if the user object is just stale
    if (user?.role !== "cabinet" && user?.role !== "President") {
      // Optional: you could redirect to the correct dashboard based on their actual role
      // For now, let's just let the API calls fail if they are truly unauthorized, 
      // or redirect to a generic "unauthorized" page if needed.
      // But removing the strict redirect prevents the "logout on refresh" if the state is hydrating.
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

      // Load core data first
      try {
        const [tasksData, sessionsData, dashboardData, myAttendanceData] = await Promise.all([
          cabinetApi.getTasks(),
          cabinetApi.getSessions(),
          cabinetApi.getDashboard(),
          cabinetApi.getMyAttendance(),
        ]);
        setTasks(tasksData.tasks);
        setSessions(sessionsData.sessions);
        setMembers(dashboardData.members);
        setCabinet(dashboardData.cabinet);
        setPresidents(dashboardData.presidents);
        setMyAttendance(myAttendanceData.attendance);
      } catch (error) {
        console.error("Failed to load core data", error);
        toast.error("Failed to load dashboard data");
      }

      // Load new features data (sent messages/feedback) separately
      // so failure here doesn't break the whole dashboard
      try {
        const [sentMessagesData, sentFeedbackData] = await Promise.all([
          cabinetApi.getSentMessages(),
          cabinetApi.getSentFeedback(),
        ]);
        setSentMessages(sentMessagesData.messages);
        setSentFeedback(sentFeedbackData.feedbacks);
      } catch (error) {
        console.error("Failed to load history data", error);
        // Don't show toast for this to avoid annoying user if backend isn't updated yet
      }
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
    if (isSubmittingAttendance || isSubmittingRef.current) return;

    isSubmittingRef.current = true;
    setIsSubmittingAttendance(true);

    try {
      // Convert datetime-local format to ISO string
      let sessionDateISO = attendanceForm.sessionDate;
      if (sessionDateISO && !sessionDateISO.includes('Z') && !sessionDateISO.includes('+')) {
        // If it's in datetime-local format (YYYY-MM-DDTHH:mm), convert to ISO
        const date = new Date(sessionDateISO);
        if (!isNaN(date.getTime())) {
          sessionDateISO = date.toISOString();
        }
      }

      // Validate that we have at least some data
      if (!attendanceForm.sessionDate || !attendanceForm.motiontype || !attendanceForm.Chair) {
        toast.error("Please fill in all required fields");
        return;
      }

      // Step 1: Create Session
      const sessionData = {
        sessionDate: sessionDateISO,
        motiontype: attendanceForm.motiontype.trim(),
        Chair: attendanceForm.Chair.trim(),
      };

      const sessionResponse = await cabinetApi.createSession(sessionData);
      const sessionId = sessionResponse.session.id;

      // Step 2: Mark Attendance
      const memberAttendance = members.map(member => {
        const record = attendanceForm.attendanceData.find(r => r.id === member.id && r.type === 'member');
        return {
          memberId: member.id,
          status: record ? record.status : "Absent",
          speakerScore: record?.status === "Present" ? record.speakerScore : undefined
        };
      });

      const cabinetAttendance = cabinet.map(cab => {
        const record = attendanceForm.attendanceData.find(r => r.id === cab.id && r.type === 'cabinet');
        return {
          cabinetId: cab.id,
          status: record ? record.status : "Absent",
          speakerScore: record?.status === "Present" ? record.speakerScore : undefined
        };
      });

      const completeAttendanceData = [...memberAttendance, ...cabinetAttendance];

      if (completeAttendanceData.length > 0) {
        // @ts-ignore - API type allows cabinetId but TS might strict check if I didn't update types perfectly yet, keeping safe
        // Actually I updated API type in previous step so it should be fine.
        await cabinetApi.markAttendance({
          sessionId: sessionId,
          attendanceData: completeAttendanceData as any
        });
      }

      toast.success("Session created and attendance marked successfully");
      setShowAttendanceModal(false);
      setAttendanceForm({
        sessionDate: "",
        motiontype: "",
        Chair: "",
        attendanceData: [],
      });
      loadData();
    } catch (error: unknown) {
      console.error("Error creating session or marking attendance:", error);

      // Extract detailed error message
      let errorMessage = "Failed to create session";
      if (error instanceof Error) {
        errorMessage = error.message;
        // Check if there are additional details
        type ErrorDetails = { error?: string };
        type ErrorWithDetails = Error & { details?: ErrorDetails };
        const errorWithDetails = error as ErrorWithDetails;
        if (errorWithDetails.details?.error) {
          errorMessage = `${errorMessage}: ${errorWithDetails.details.error}`;
        }
      }

      toast.error(errorMessage, {
        duration: 5000,
      });
    } finally {
      setIsSubmittingAttendance(false);
      isSubmittingRef.current = false;
    }
  };

  const handleGiveFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSendingFeedback || isSubmittingRef.current) return;

    isSubmittingRef.current = true;
    setIsSendingFeedback(true);

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
    } finally {
      setIsSendingFeedback(false);
      isSubmittingRef.current = false;
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSendingMessage || isSubmittingRef.current) return;

    isSubmittingRef.current = true;
    setIsSendingMessage(true);

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
    } finally {
      setIsSendingMessage(false);
      isSubmittingRef.current = false;
    }
  };

  const toggleAttendance = (id: string, type: "member" | "cabinet") => {
    setAttendanceForm((prev) => {
      const existing = prev.attendanceData.find((a) => a.id === id && a.type === type);
      if (existing) {
        return {
          ...prev,
          attendanceData: prev.attendanceData.map((a) =>
            a.id === id && a.type === type
              ? { ...a, status: a.status === "Present" ? "Absent" : "Present" }
              : a
          ),
        };
      } else {
        return {
          ...prev,
          attendanceData: [
            ...prev.attendanceData,
            { id, type, status: "Present" },
          ],
        };
      }
    });
  };

  const updateSpeakerScore = (id: string, type: "member" | "cabinet", score: number) => {
    setAttendanceForm((prev) => {
      const existing = prev.attendanceData.find((a) => a.id === id && a.type === type);
      if (existing) {
        return {
          ...prev,
          attendanceData: prev.attendanceData.map((a) =>
            a.id === id && a.type === type ? { ...a, speakerScore: score } : a
          ),
        };
      } else {
        // Should not happen if strictly controlled, but handle safely
        return {
          ...prev,
          attendanceData: [...prev.attendanceData, { id, type, status: "Present", speakerScore: score }]
        }
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
        <div className="container mx-auto px-4 py-4 md:py-8">
          {/* Header */}
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-4 md:p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
              { id: "tasks", label: "Tasks", icon: FileText },
              { id: "attendance", label: "Mark Attendance", icon: Calendar },
              { id: "feedback", label: "Give Feedback", icon: MessageSquare },
              { id: "messages", label: "Messages", icon: MessageSquare },
              { id: "sessions", label: "Sessions", icon: Calendar },
              { id: "my-stats", label: "My Stats", icon: BarChart2 },
              { id: "leaderboard", label: "Leaderboard", icon: Trophy },
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
                    | "my-stats"
                    | "leaderboard"
                  )
                }
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${activeTab === tab.id
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
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-6 md:p-12 text-center">
                  <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
                    <Calendar className="w-10 h-10 text-blue-400" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Mark Session Attendance
                  </h2>
                  <p className="text-gray-400 mb-8 max-w-lg mx-auto text-base md:text-lg">
                    Start a new debate session, record the motion, appoint a chair, and track member attendance efficiently.
                  </p>
                  <button
                    onClick={() => setShowAttendanceModal(true)}
                    className="w-full md:w-auto group px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl text-white font-bold text-lg transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 flex items-center justify-center space-x-3 mx-auto"
                  >
                    <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                    <span>Create New Session</span>
                  </button>
                </div>
              )}

              {/* Feedback Tab */}
              {activeTab === "feedback" && (
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                    <h2 className="text-xl font-bold text-white">
                      Give Anonymous Feedback
                    </h2>
                    <button
                      onClick={() => setShowFeedbackModal(true)}
                      className="w-full md:w-auto px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 rounded-lg text-white font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>New Feedback</span>
                    </button>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-white mb-4">
                      Sent Feedback History
                    </h3>
                    <div className="space-y-4">
                      {sentFeedback.length === 0 ? (
                        <p className="text-gray-400">No feedback sent yet</p>
                      ) : (
                        sentFeedback.map((fb) => (
                          <div
                            key={fb.id}
                            className="bg-gray-700/50 rounded-lg p-4"
                          >
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                              <p className="text-white font-medium">
                                To: {members.find((m) => m.id === fb.memberId)?.name || "Unknown Member"}
                              </p>
                              <p className="text-gray-400 text-sm">
                                {new Date(fb.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <p className="text-gray-300">{fb.feedback}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Messages Tab */}
              {
                activeTab === "messages" && (
                  <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                      <h2 className="text-xl font-bold text-white">
                        Send Message to President
                      </h2>
                      <button
                        onClick={() => setShowMessageModal(true)}
                        className="w-full md:w-auto px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 rounded-lg text-white font-medium transition-colors flex items-center justify-center space-x-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>New Message</span>
                      </button>
                    </div>

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
                )
              }

              {/* Sessions Tab */}
              {
                activeTab === "sessions" && (
                  <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-4 md:p-6">
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
                            className="bg-gray-700/50 rounded-lg p-4 relative group hover:bg-gray-700/80 focus:bg-gray-700/80 transition-all duration-300 outline-none cursor-pointer"
                            tabIndex={0}
                          >
                            <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-72 bg-gray-800 border border-gray-600 rounded-xl shadow-2xl p-4 hidden group-hover:block group-focus:block z-50 pointer-events-none opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 backdrop-blur-3xl">
                              <h4 className="text-lg font-bold text-white mb-2">Session Details</h4>
                              <div className="space-y-2 text-sm">
                                <p><span className="text-gray-400">Motion:</span> <span className="text-white">{session.motiontype}</span></p>
                                <p><span className="text-gray-400">Chair:</span> <span className="text-white">{session.Chair}</span></p>
                              </div>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
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
                )
              }
              {/* My Stats Tab */}
              {activeTab === "my-stats" && (
                <div className="space-y-6">
                  {/* Statistics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-4">
                      <p className="text-gray-400 text-sm mb-1">
                        Total Sessions
                      </p>
                      <p className="text-2xl font-bold text-white">
                        {myStats.total}
                      </p>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-4">
                      <p className="text-gray-400 text-sm mb-1">Present</p>
                      <p className="text-2xl font-bold text-green-400">
                        {myStats.present}
                      </p>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-4">
                      <p className="text-gray-400 text-sm mb-1">Absent</p>
                      <p className="text-2xl font-bold text-red-400">
                        {myStats.absent}
                      </p>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-4">
                      <p className="text-gray-400 text-sm mb-1">Attendance %</p>
                      <p className="text-2xl font-bold text-blue-400">
                        {myStats.percentage}%
                      </p>
                    </div>
                  </div>

                  {/* Attendance List */}
                  <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-4 md:p-6">
                    <h2 className="text-xl font-bold text-white mb-4">
                      My Attendance History
                    </h2>
                    {myAttendance.length === 0 ? (
                      <p className="text-gray-400">
                        No attendance records found
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {myAttendance.map((record) => (
                          <div
                            key={record.id}
                            className="bg-gray-700/50 rounded-lg p-4 relative group hover:bg-gray-700/80 focus:bg-gray-700/80 transition-all duration-300 outline-none cursor-pointer"
                            tabIndex={0}
                          >
                            {/* Hover Pop-out Details */}
                            <div className="absolute left-1/2 -top-2 -translate-x-1/2 -translate-y-full w-[calc(100%-2rem)] md:w-80 bg-gray-800 border border-gray-600 rounded-xl shadow-2xl p-4 hidden group-hover:block group-focus:block z-50 pointer-events-none opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 backdrop-blur-3xl">
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
                                    <div className="w-4 h-4 bg-green-400 rounded-full" />
                                    <span className="text-green-400 text-sm font-medium">
                                      Present
                                    </span>
                                  </div>
                                ) : (
                                  <div className="flex items-center space-x-1 px-3 py-1 bg-red-600/20 border border-red-600/50 rounded-lg">
                                    <div className="w-4 h-4 bg-red-400 rounded-full" />
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
                              className={`hover:bg-gray-700/30 transition-colors ${entry.name === user?.name ? "bg-blue-500/10 border-l-2 border-blue-500" : ""
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
                                {entry.name === user?.name && <span className="ml-2 text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">You</span>}
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
        </div >
      </div >
      {/* Modals moved to root to fix stacking context issues */}
      {showAttendanceModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in">
          <div className="bg-gray-900 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-800 relative shadow-2xl custom-scrollbar">
            <button
              onClick={() => setShowAttendanceModal(false)}
              className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex flex-col md:flex-row md:items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg w-fit">
                  <Calendar className="w-6 h-6 text-blue-400" />
                </div>
                Create Session & Mark Attendance
              </h3>

              <form onSubmit={handleMarkAttendance} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Session Date & Time
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
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
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
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      required
                      placeholder="e.g. THW ban..."
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300">
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
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      required
                      placeholder="Name of the Chair"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Cabinet Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-gray-300">
                        Cabinet Attendance
                      </label>
                      <span className="text-xs text-gray-500">
                        {attendanceForm.attendanceData.filter(a => a.type === 'cabinet' && a.status === 'Present').length} Present
                      </span>
                    </div>

                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {cabinet.map((cab) => {
                          const attendance = attendanceForm.attendanceData.find(
                            (a) => a.id === cab.id && a.type === "cabinet"
                          );
                          const isPresent = attendance?.status === "Present";

                          return (
                            <div
                              key={cab.id}
                              onClick={() => toggleAttendance(cab.id, "cabinet")}
                              className={`p-3 rounded-lg cursor-pointer transition-all border ${isPresent
                                ? "bg-blue-600/10 border-blue-500/50 hover:bg-blue-600/20"
                                : "bg-gray-700/30 border-gray-700 hover:bg-gray-700/50"
                                }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 overflow-hidden">
                                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isPresent ? "bg-blue-500" : "bg-gray-600"}`} />
                                  <div className="min-w-0">
                                    <p className={`font-medium truncate ${isPresent ? "text-white" : "text-gray-400"}`}>
                                      {cab.name}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                      {cab.position || "Cabinet"}
                                    </p>
                                  </div>
                                </div>

                                <div className={`px-3 py-1 rounded text-xs font-medium transition-colors ${isPresent
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-700 text-gray-400"
                                  }`}>
                                  {isPresent ? "Present" : "Absent"}
                                </div>
                              </div>
                              {isPresent && (
                                <div className="mt-2 pl-2" onClick={(e) => e.stopPropagation()}>
                                  <input
                                    type="number"
                                    placeholder="Score (0-100)"
                                    step="0.1"
                                    min="0"
                                    max="100"
                                    value={attendance?.speakerScore !== undefined ? attendance.speakerScore : ''}
                                    onChange={(e) => updateSpeakerScore(cab.id, "cabinet", parseFloat(e.target.value))}
                                    className="w-full px-3 py-1.5 bg-gray-900 border border-gray-600 rounded-lg text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500"
                                  />
                                </div>
                              )}
                            </div>
                          );
                        })}
                        {cabinet.length === 0 && (
                          <p className="text-gray-500 text-sm col-span-2 text-center py-2">No cabinet members found</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Member Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-gray-300">
                        Member Attendance
                      </label>
                      <span className="text-xs text-gray-500">
                        {attendanceForm.attendanceData.filter(a => a.type === 'member' && a.status === 'Present').length} Present
                      </span>
                    </div>

                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {members.map((member) => {
                          const attendance = attendanceForm.attendanceData.find(
                            (a) => a.id === member.id && a.type === "member"
                          );
                          const isPresent = attendance?.status === "Present";

                          return (
                            <div
                              key={member.id}
                              onClick={() => toggleAttendance(member.id, "member")}
                              className={`p-3 rounded-lg cursor-pointer transition-all border ${isPresent
                                ? "bg-blue-600/10 border-blue-500/50 hover:bg-blue-600/20"
                                : "bg-gray-700/30 border-gray-700 hover:bg-gray-700/50"
                                }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 overflow-hidden">
                                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isPresent ? "bg-blue-500" : "bg-gray-600"}`} />
                                  <div className="min-w-0">
                                    <p className={`font-medium truncate ${isPresent ? "text-white" : "text-gray-400"}`}>
                                      {member.name}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                      {member.email}
                                    </p>
                                  </div>
                                </div>

                                <div className={`px-3 py-1 rounded text-xs font-medium transition-colors ${isPresent
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-700 text-gray-400"
                                  }`}>
                                  {isPresent ? "Present" : "Absent"}
                                </div>
                              </div>
                              {isPresent && (
                                <div className="mt-2 pl-2" onClick={(e) => e.stopPropagation()}>
                                  <input
                                    type="number"
                                    placeholder="Score (0-100)"
                                    step="0.1"
                                    min="0"
                                    max="100"
                                    value={attendance?.speakerScore !== undefined ? attendance.speakerScore : ''}
                                    onChange={(e) => updateSpeakerScore(member.id, "member", parseFloat(e.target.value))}
                                    className="w-full px-3 py-1.5 bg-gray-900 border border-gray-600 rounded-lg text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500"
                                  />
                                </div>
                              )}
                            </div>
                          );
                        })}
                        {members.length === 0 && (
                          <p className="text-gray-500 text-sm col-span-2 text-center py-2">No members found</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col-reverse md:flex-row items-center gap-4 pt-4 border-t border-gray-800">
                  <button
                    type="button"
                    onClick={() => setShowAttendanceModal(false)}
                    className="w-full md:w-auto px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-gray-300 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingAttendance}
                    className="w-full md:flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl text-white font-bold shadow-lg shadow-blue-500/20 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmittingAttendance ? "Submitting..." : "Submit Session Report"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
      }

      {
        showFeedbackModal && (
          <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-2xl flex items-center justify-center p-4 transition-all duration-300">
            <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-8 w-full max-w-lg shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] border border-blue-500/30 animate-pop-in relative">
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <MessageSquare className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Give Feedback to Member
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Help them improve with constructive feedback
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleGiveFeedback}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 ml-1">
                    Select Member
                  </label>
                  <div className="relative">
                    <select
                      value={feedbackForm.memberId}
                      onChange={(e) =>
                        setFeedbackForm({
                          ...feedbackForm,
                          memberId: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all appearance-none"
                      required
                    >
                      <option value="">Select Member...</option>
                      {members.map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 ml-1">
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
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all resize-none"
                    rows={5}
                    required
                    placeholder="Type your feedback here..."
                  />
                </div>

                <div className="flex flex-col-reverse md:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowFeedbackModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-gray-300 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSendingFeedback}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl text-white font-bold shadow-lg shadow-blue-500/20 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSendingFeedback ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Send Feedback</span>
                        <MessageSquare className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }

      {
        showMessageModal && (
          <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-2xl flex items-center justify-center p-4 transition-all duration-300">
            <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-8 w-full max-w-lg shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] border border-blue-500/30 animate-pop-in relative">
              <button
                onClick={() => setShowMessageModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <MessageSquare className="w-6 h-6 text-blue-500" />
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
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all appearance-none"
                      required
                    >
                      <option value="">Select President...</option>
                      {presidents.map((president) => (
                        <option key={president.id} value={president.id}>
                          {president.name} - {president.email}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <Users className="w-4 h-4" />
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
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all resize-none"
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
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl text-white font-bold shadow-lg shadow-blue-500/20 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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
        )
      }
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
