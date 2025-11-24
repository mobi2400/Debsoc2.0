"use client";
import React from "react";
import Image from "next/image";
import { User } from "lucide-react";
import { User as UserType } from "@/lib/dashboardData";

interface UserProfileProps {
  user: UserType;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Avatar */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-orange-400/50 shadow-lg">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 96px, 112px"
            />
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              <User className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {user.name}
          </h1>
          <p className="text-lg sm:text-xl text-orange-400 font-semibold mb-1">
            {user.position}
          </p>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-sm font-medium">Active</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

