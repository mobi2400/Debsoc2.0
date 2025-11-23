"use client";
import React, { useState, useEffect } from "react";
import { MessageCircle, RefreshCw, Quote } from "lucide-react";
import { mockFeedback, Feedback } from "@/lib/dashboardData";
import toast from "react-hot-toast";

const RandomFeedback: React.FC = () => {
  const [currentFeedback, setCurrentFeedback] = useState<Feedback | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getRandomFeedback = () => {
    if (mockFeedback.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * mockFeedback.length);
    return mockFeedback[randomIndex];
  };

  useEffect(() => {
    setCurrentFeedback(getRandomFeedback());
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newFeedback = getRandomFeedback();
      setCurrentFeedback(newFeedback);
      setIsRefreshing(false);
      toast.success("Feedback refreshed!");
    }, 800);
  };

  return (
    <div className="bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-6 h-6 text-orange-400" />
          <h2 className="text-2xl font-bold text-white">Random Feedback Received</h2>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 bg-orange-500/20 hover:bg-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed border border-orange-500/50 text-orange-400 font-medium px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {currentFeedback ? (
        <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-lg p-6 border border-gray-600/50">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center border border-orange-500/50">
              <Quote className="w-6 h-6 text-orange-400" />
            </div>
            <div className="flex-1">
              <p className="text-white text-lg leading-relaxed mb-4 italic">
                "{currentFeedback.message}"
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-600/50">
                <p className="text-gray-400 text-sm">
                  Received on{" "}
                  {new Date(currentFeedback.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                {currentFeedback.from && (
                  <p className="text-gray-400 text-sm">From: {currentFeedback.from}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-500" />
          <p>No feedback available at the moment.</p>
        </div>
      )}

      <div className="mt-4 text-center">
        <p className="text-gray-400 text-sm">
          Click refresh to see a different piece of feedback
        </p>
      </div>
    </div>
  );
};

export default RandomFeedback;

