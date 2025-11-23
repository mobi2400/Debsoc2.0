import React from "react";
import {ShieldAlert} from "lucide-react";
import Navbar from "@/components/Navbar";

const UnverifiedView = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-20 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-red-500/20 rounded-full">
                <ShieldAlert className="w-12 h-12 text-red-500" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">
              Account Not Verified
            </h1>
            <p className="text-gray-300 mb-6">
              Please wait until your account is verified by the Tech Head. You
              will gain access to the dashboard once your verification is
              complete.
            </p>
            <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
              <p className="text-sm text-gray-400">
                If this takes too long, please contact the administration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnverifiedView;
