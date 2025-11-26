"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { techHeadApi, UnverifiedUsers } from "@/lib/api";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { Settings, Users, CheckCircle, LogOut, Crown, User } from "lucide-react";

export const dynamic = "force-dynamic";

export default function TechHeadDashboard() {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [unverifiedUsers, setUnverifiedUsers] =
    useState<UnverifiedUsers | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated || user?.role !== "TechHead") {
      router.push("/login");
      return;
    }
    loadUnverifiedUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user, isLoading]);

  const loadUnverifiedUsers = async () => {
    try {
      setLoading(true);
      const data = await techHeadApi.getUnverifiedUsers();
      setUnverifiedUsers(data);
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load unverified users"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (
    type: "president" | "cabinet" | "member",
    id: string
  ) => {
    try {
      setVerifying(id);
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
      await loadUnverifiedUsers();
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to verify user"
      );
    } finally {
      setVerifying(null);
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
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-6 mb-6">
            <div className="flex items-center justify-between">
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
              <div className="flex items-center space-x-4">
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

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              <p className="text-gray-400 mt-4">Loading unverified users...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Unverified Presidents */}
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-6">
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
                        className="bg-gray-700/50 rounded-lg p-4 flex items-center justify-between"
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
                        <button
                          onClick={() =>
                            handleVerify("president", president.id)
                          }
                          disabled={verifying === president.id}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded-lg text-white font-medium transition-colors flex items-center space-x-2"
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
                    ))}
                  </div>
                )}
              </div>

              {/* Unverified Cabinet */}
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-6">
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
                        className="bg-gray-700/50 rounded-lg p-4 flex items-center justify-between"
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
                        <button
                          onClick={() => handleVerify("cabinet", cabinet.id)}
                          disabled={verifying === cabinet.id}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded-lg text-white font-medium transition-colors flex items-center space-x-2"
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
                    ))}
                  </div>
                )}
              </div>

              {/* Unverified Members */}
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-6">
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
                        className="bg-gray-700/50 rounded-lg p-4 flex items-center justify-between"
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
                        <button
                          onClick={() => handleVerify("member", member.id)}
                          disabled={verifying === member.id}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded-lg text-white font-medium transition-colors flex items-center space-x-2"
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
                    ))}
                  </div>
                )}
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
