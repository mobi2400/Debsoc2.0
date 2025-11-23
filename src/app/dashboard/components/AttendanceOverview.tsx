"use client";
import React, { useState, useMemo } from "react";
import { Calendar, Filter, TrendingUp } from "lucide-react";
import { mockAttendance, AttendanceRecord } from "@/lib/dashboardData";

const AttendanceOverview: React.FC = () => {
  const [filterType, setFilterType] = useState<"all" | "session" | "spar" | "meeting">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "present" | "absent" | "late">("all");

  const filteredAttendance = useMemo(() => {
    return mockAttendance.filter((record) => {
      const typeMatch = filterType === "all" || record.type === filterType;
      const statusMatch = filterStatus === "all" || record.status === filterStatus;
      return typeMatch && statusMatch;
    });
  }, [filterType, filterStatus]);

  const stats = useMemo(() => {
    const total = mockAttendance.length;
    const present = mockAttendance.filter((r) => r.status === "present").length;
    const absent = mockAttendance.filter((r) => r.status === "absent").length;
    const late = mockAttendance.filter((r) => r.status === "late").length;
    const attendanceRate = total > 0 ? ((present / total) * 100).toFixed(1) : "0";

    return { total, present, absent, late, attendanceRate };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-500/20 text-green-400 border-green-500/50";
      case "absent":
        return "bg-red-500/20 text-red-400 border-red-500/50";
      case "late":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50";
    }
  };

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-6 h-6 text-orange-400" />
        <h2 className="text-2xl font-bold text-white">Attendance Overview</h2>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/50">
          <p className="text-gray-400 text-sm mb-1">Total Records</p>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
          <p className="text-green-400 text-sm mb-1">Present</p>
          <p className="text-2xl font-bold text-green-400">{stats.present}</p>
        </div>
        <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
          <p className="text-red-400 text-sm mb-1">Absent</p>
          <p className="text-2xl font-bold text-red-400">{stats.absent}</p>
        </div>
        <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/30">
          <p className="text-orange-400 text-sm mb-1">Attendance Rate</p>
          <p className="text-2xl font-bold text-orange-400">{stats.attendanceRate}%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <span className="text-gray-400 text-sm">Type:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-orange-500"
          >
            <option value="all">All</option>
            <option value="session">Session</option>
            <option value="spar">SPAR</option>
            <option value="meeting">Meeting</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-orange-500"
          >
            <option value="all">All</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
          </select>
        </div>
      </div>

      {/* Attendance Records */}
      <div className="space-y-3">
        {filteredAttendance.length > 0 ? (
          filteredAttendance.map((record) => (
            <div
              key={record.id}
              className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/50 hover:border-orange-500/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1">{record.title}</h3>
                  <p className="text-gray-400 text-sm">
                    {new Date(record.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      record.status
                    )}`}
                  >
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/50">
                    {getTypeLabel(record.type)}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p>No attendance records found matching the filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceOverview;

