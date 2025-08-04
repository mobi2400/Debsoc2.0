"use client";
import React, {useState} from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";
import Navbar from "@/components/Navbar";

const LoginPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSlide = () => {
    setIsAdmin(!isAdmin);
    setFormData({email: "", password: "", name: ""});
    setShowPassword(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${isAdmin ? "Admin" : "Member"} login:`, formData);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden pt-20">
        {/* Main Content */}
        <div className="relative z-10 h-[calc(100vh-5rem)] flex items-center justify-center p-4">
          <div className="w-full max-w-sm">
            {/* Card Container */}
            <div className="bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 overflow-hidden">
              {/* Header */}
              <div className="p-4 pb-3 text-center border-b border-gray-700/50">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-orange-500/20 rounded-full mb-2">
                  {isAdmin ? (
                    <Shield className="w-5 h-5 text-orange-400" />
                  ) : (
                    <User className="w-5 h-5 text-orange-400" />
                  )}
                </div>
                <h1 className="text-lg font-bold text-white mb-1">
                  SMVIT DEBSOC
                </h1>
                <p className="text-gray-400 text-xs">
                  {isAdmin ? "Admin Portal Access" : "Member Portal Access"}
                </p>
              </div>

              {/* Sliding Forms Container */}
              <div className="relative h-[320px] overflow-hidden">
                <div
                  className={`absolute inset-0 w-[200%] flex transition-transform duration-700 ease-in-out ${
                    isAdmin ? "-translate-x-1/2" : "translate-x-0"
                  }`}
                >
                  {/* Member Login Form */}
                  <div className="w-1/2 p-4">
                    <div className="space-y-3">
                      <div className="text-center mb-3">
                        <h2 className="text-base font-semibold text-white mb-1">
                          Member Login
                        </h2>
                        <p className="text-gray-400 text-xs">
                          Access your member dashboard
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-300 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200 text-xs"
                            placeholder="Enter your email"
                            required
                          />
                        </div>

                        <div className="relative">
                          <label className="block text-xs font-medium text-gray-300 mb-1">
                            Password
                          </label>
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 pr-9 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200 text-xs"
                            placeholder="Enter your password"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[28px] text-gray-400 hover:text-white transition-colors cursor-pointer"
                          >
                            {showPassword ? (
                              <EyeOff size={14} />
                            ) : (
                              <Eye size={14} />
                            )}
                          </button>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-xs cursor-pointer"
                        >
                          Sign In as Member
                        </button>
                      </form>

                      <div className="text-center pt-2">
                        <button
                          onClick={handleSlide}
                          className="text-orange-400 hover:text-orange-300 text-xs font-medium transition-colors duration-200 flex items-center justify-center mx-auto group cursor-pointer"
                        >
                          Not a member? Login as admin
                          <ChevronRight
                            size={12}
                            className="ml-1 group-hover:translate-x-1 transition-transform duration-200 cursor-pointer"
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Admin Login Form */}
                  <div className="w-1/2 p-4">
                    <div className="space-y-3">
                      <div className="text-center mb-3">
                        <h2 className="text-base font-semibold text-white mb-1">
                          Admin Login
                        </h2>
                        <p className="text-gray-400 text-xs">
                          Administrative access portal
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-300 mb-1">
                            Admin Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200 text-xs"
                            placeholder="Enter admin email"
                            required
                          />
                        </div>

                        <div className="relative">
                          <label className="block text-xs font-medium text-gray-300 mb-1">
                            Admin Password
                          </label>
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 pr-9 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200 text-xs"
                            placeholder="Enter admin password"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[28px] text-gray-400 hover:text-white transition-colors cursor-pointer"
                          >
                            {showPassword ? (
                              <EyeOff size={14} />
                            ) : (
                              <Eye size={14} />
                            )}
                          </button>
                        </div>

                        <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-2">
                          <div className="flex items-center space-x-2">
                            <Shield size={12} className="text-red-400" />
                            <p className="text-red-300 text-xs">
                              Admin access requires special authorization
                            </p>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-xs cursor-pointer"
                        >
                          Sign In as Admin
                        </button>
                      </form>

                      <div className="text-center pt-2">
                        <button
                          onClick={handleSlide}
                          className="text-orange-400 hover:text-orange-300 text-xs font-medium transition-colors duration-200 flex items-center justify-center mx-auto group cursor-pointer"
                        >
                          <ChevronLeft
                            size={12}
                            className="mr-1 group-hover:-translate-x-1 transition-transform duration-200 cursor-pointer"
                          />
                          Login as member
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center mt-4">
                <p className="text-gray-500 text-xs">
                  © 2025 SMVIT DEBSOC. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
