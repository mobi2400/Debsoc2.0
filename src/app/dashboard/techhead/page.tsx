"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { techHeadApi, UnverifiedUsers, VerifiedUsers } from "@/lib/api";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { Settings, Users, CheckCircle, LogOut, Crown, User, XCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default function TechHeadDashboard() {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [unverifiedUsers, setUnverifiedUsers] =
    useState<UnverifiedUsers | null>(null);
  const [verifiedUsers, setVerifiedUsers] =
    useState<VerifiedUsers | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState<string | null>(null);
  const [unverifying, setUnverifying] = useState<string | null>(null);

  // Use a ref to prevent double submission immediately, as state updates are async
  const isSubmittingRef = React.useRef(false);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (user?.role !== "TechHead") {
      router.push("/login");
      return;
    }

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user, isLoading]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [unverifiedData, verifiedData] = await Promise.all([
        techHeadApi.getUnverifiedUsers(),
        techHeadApi.getVerifiedUsers(),
      ]);
      setUnverifiedUsers(unverifiedData);
      setVerifiedUsers(verifiedData);
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (
    type: "president" | "cabinet" | "member",
    id: string
  ) => {
    // Check if any verification is in progress using the ref
    if (isSubmittingRef.current) return;

    isSubmittingRef.current = true;
    setVerifying(id);

    try {
      if (type === "president") {
        await techHeadApi.verifyPresident(id);
        toast.success("President verified successfully");
      } else if (type === "cabinet") {
        await techHeadApi.verifyCabinet(id);
        toast.success("Cabinet member verified successfully");
      } else if (type === "member") {
        await techHeadApi.verifyMember(id);
        toast.success("Member verified successfully");
      }
      await loadData();
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to verify user"
      );
    } finally {
      setVerifying(null);
      isSubmittingRef.current = false;
    }
  };

  const handleReject = async (
    type: "president" | "cabinet" | "member",
    id: string
  ) => {
    if (isSubmittingRef.current) return;

    // Use window.confirm to prevent accidental deletions
    if (!window.confirm("Are you sure you want to reject and remove this user?")) {
      return;
    }

    isSubmittingRef.current = true;
    // We can reuse setVerifying to show loading state on the item
    setVerifying(id);

    try {
      if (type === "president") {
        await techHeadApi.deletePresident(id);
        toast.success("President rejected successfully");
      } else if (type === "cabinet") {
        await techHeadApi.deleteCabinet(id);
        toast.success("Cabinet member rejected successfully");
      } else if (type === "member") {
        await techHeadApi.deleteMember(id);
        toast.success("Member rejected successfully");
      }
      await loadData();
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to reject user"
      );
    } finally {
      setVerifying(null);
      isSubmittingRef.current = false;
    }
  };

  const handleUnverify = async (
    type: "president" | "cabinet" | "member",
    id: string
  ) => {
    if (isSubmittingRef.current) return;

    isSubmittingRef.current = true;
    setUnverifying(id);

    try {
      if (type === "president") {
        await techHeadApi.unverifyPresident(id);
        toast.success("President unverified successfully");
      } else if (type === "cabinet") {
        await techHeadApi.unverifyCabinet(id);
        toast.success("Cabinet member unverified successfully");
      } else if (type === "member") {
        await techHeadApi.unverifyMember(id);
        toast.success("Member unverified successfully");
      }
      await loadData();
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to unverify user"
      );
    } finally {
      setUnverifying(null);
      isSubmittingRef.current = false;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "TechHead") {
    return null;
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
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Tech Head Dashboard
                  </h1>
                  <p className="text-gray-400">User Verification Portal</p>
                </div>
              </div>
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

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              <p className="text-gray-400 mt-4">Loading users...</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Unverified Users Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Pending Verifications</h2>
                {/* Unverified Presidents */}
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-4 md:p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Crown className="w-6 h-6 text-yellow-500" />
                    <h2 className="text-xl font-bold text-white">
                      Unverified Presidents
                    </h2>
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-sm">
                      {unverifiedUsers?.unverifiedPresidents.length || 0}
                    </span>
                  </div>
                  {unverifiedUsers?.unverifiedPresidents.length === 0 ? (
                    <p className="text-gray-400">No unverified presidents</p>
                  ) : (
                    <div className="space-y-3">
                      {unverifiedUsers?.unverifiedPresidents.map((president) => (
                        <div
                          key={president.id}
                          className="bg-gray-700/50 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div>
                            <p className="text-white font-medium">
                              {president.name}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {president.email}
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                              Registered:{" "}
                              {new Date(president.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2 w-full md:w-auto">
                            <button
                              onClick={() => handleReject("president", president.id)}
                              disabled={verifying === president.id}
                              className="flex-1 md:flex-none px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-lg text-white font-medium transition-colors flex items-center justify-center space-x-2"
                            >
                              <XCircle className="w-4 h-4" />
                              <span>Reject</span>
                            </button>
                            <button
                              onClick={() =>
                                handleVerify("president", president.id)
                              }
                              disabled={verifying === president.id}
                              className="flex-1 md:flex-none px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded-lg text-white font-medium transition-colors flex items-center justify-center space-x-2"
                            >
                              {verifying === president.id ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                  <span>Verifying...</span>
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="w-4 h-4" />
                                  <span>Verify</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Unverified Cabinet */}
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-4 md:p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Users className="w-6 h-6 text-blue-500" />
                    <h2 className="text-xl font-bold text-white">
                      Unverified Cabinet Members
                    </h2>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">
                      {unverifiedUsers?.unverifiedCabinet.length || 0}
                    </span>
                  </div>
                  {unverifiedUsers?.unverifiedCabinet.length === 0 ? (
                    <p className="text-gray-400">No unverified cabinet members</p>
                  ) : (
                    <div className="space-y-3">
                      {unverifiedUsers?.unverifiedCabinet.map((cabinet) => (
                        <div
                          key={cabinet.id}
                          className="bg-gray-700/50 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div>
                            <p className="text-white font-medium">
                              {cabinet.name}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {cabinet.email}
                            </p>
                            <p className="text-gray-400 text-sm">
                              Position: {cabinet.position}
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                              Registered:{" "}
                              {new Date(cabinet.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2 w-full md:w-auto">
                            <button
                              onClick={() => handleReject("cabinet", cabinet.id)}
                              disabled={verifying === cabinet.id}
                              className="flex-1 md:flex-none px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-lg text-white font-medium transition-colors flex items-center justify-center space-x-2"
                            >
                              <XCircle className="w-4 h-4" />
                              <span>Reject</span>
                            </button>
                            <button
                              onClick={() => handleVerify("cabinet", cabinet.id)}
                              disabled={verifying === cabinet.id}
                              className="flex-1 md:flex-none px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded-lg text-white font-medium transition-colors flex items-center justify-center space-x-2"
                            >
                              {verifying === cabinet.id ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                  <span>Verifying...</span>
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="w-4 h-4" />
                                  <span>Verify</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Unverified Members */}
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-4 md:p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <User className="w-6 h-6 text-orange-500" />
                    <h2 className="text-xl font-bold text-white">
                      Unverified Members
                    </h2>
                    <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-sm">
                      {unverifiedUsers?.unverifiedMembers.length || 0}
                    </span>
                  </div>
                  {unverifiedUsers?.unverifiedMembers.length === 0 ? (
                    <p className="text-gray-400">No unverified members</p>
                  ) : (
                    <div className="space-y-3">
                      {unverifiedUsers?.unverifiedMembers.map((member) => (
                        <div
                          key={member.id}
                          className="bg-gray-700/50 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div>
                            <p className="text-white font-medium">
                              {member.name}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {member.email}
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                              Registered:{" "}
                              {new Date(member.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2 w-full md:w-auto">
                            <button
                              onClick={() => handleReject("member", member.id)}
                              disabled={verifying === member.id}
                              className="flex-1 md:flex-none px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-lg text-white font-medium transition-colors flex items-center justify-center space-x-2"
                            >
                              <XCircle className="w-4 h-4" />
                              <span>Reject</span>
                            </button>
                            <button
                              onClick={() => handleVerify("member", member.id)}
                              disabled={verifying === member.id}
                              className="flex-1 md:flex-none px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded-lg text-white font-medium transition-colors flex items-center justify-center space-x-2"
                            >
                              {verifying === member.id ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                  <span>Verifying...</span>
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="w-4 h-4" />
                                  <span>Verify</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Verified Users Section */}
              <div className="space-y-6 pt-6 border-t border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-4">Verified Users</h2>

                {/* Verified Presidents */}
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-4 md:p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Crown className="w-6 h-6 text-green-500" />
                    <h2 className="text-xl font-bold text-white">
                      Verified Presidents
                    </h2>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                      {verifiedUsers?.verifiedPresidents.length || 0}
                    </span>
                  </div>
                  {verifiedUsers?.verifiedPresidents.length === 0 ? (
                    <p className="text-gray-400">No verified presidents</p>
                  ) : (
                    <div className="space-y-3">
                      {verifiedUsers?.verifiedPresidents.map((president) => (
                        <div
                          key={president.id}
                          className="bg-gray-700/50 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div>
                            <p className="text-white font-medium">
                              {president.name}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {president.email}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              handleUnverify("president", president.id)
                            }
                            disabled={unverifying === president.id}
                            className="w-full md:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-lg text-white font-medium transition-colors flex items-center justify-center space-x-2"
                          >
                            {unverifying === president.id ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Unverifying...</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4" />
                                <span>Unverify</span>
                              </>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Verified Cabinet */}
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-4 md:p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Users className="w-6 h-6 text-green-500" />
                    <h2 className="text-xl font-bold text-white">
                      Verified Cabinet Members
                    </h2>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                      {verifiedUsers?.verifiedCabinet.length || 0}
                    </span>
                  </div>
                  {verifiedUsers?.verifiedCabinet.length === 0 ? (
                    <p className="text-gray-400">No verified cabinet members</p>
                  ) : (
                    <div className="space-y-3">
                      {verifiedUsers?.verifiedCabinet.map((cabinet) => (
                        <div
                          key={cabinet.id}
                          className="bg-gray-700/50 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div>
                            <p className="text-white font-medium">
                              {cabinet.name}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {cabinet.email}
                            </p>
                            <p className="text-gray-400 text-sm">
                              Position: {cabinet.position}
                            </p>
                          </div>
                          <button
                            onClick={() => handleUnverify("cabinet", cabinet.id)}
                            disabled={unverifying === cabinet.id}
                            className="w-full md:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-lg text-white font-medium transition-colors flex items-center justify-center space-x-2"
                          >
                            {unverifying === cabinet.id ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Unverifying...</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4" />
                                <span>Unverify</span>
                              </>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Verified Members */}
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-4 md:p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <User className="w-6 h-6 text-green-500" />
                    <h2 className="text-xl font-bold text-white">
                      Verified Members
                    </h2>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                      {verifiedUsers?.verifiedMembers.length || 0}
                    </span>
                  </div>
                  {verifiedUsers?.verifiedMembers.length === 0 ? (
                    <p className="text-gray-400">No verified members</p>
                  ) : (
                    <div className="space-y-3">
                      {verifiedUsers?.verifiedMembers.map((member) => (
                        <div
                          key={member.id}
                          className="bg-gray-700/50 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
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
                            onClick={() => handleUnverify("member", member.id)}
                            disabled={unverifying === member.id}
                            className="w-full md:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-lg text-white font-medium transition-colors flex items-center justify-center space-x-2"
                          >
                            {unverifying === member.id ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Unverifying...</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4" />
                                <span>Unverify</span>
                              </>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>
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
