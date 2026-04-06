"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Copy, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegistrationPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const interests = ["Debater", "Designer", "Video Editor", "Tech"];
  
  // Open the popup automatically on load
  useEffect(() => {
    // Delaying it slightly for a smoother effect
    const timer = setTimeout(() => setIsOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      year: formData.get('year'),
      usn: formData.get('usn'),
      branch: formData.get('branch'),
      phone: formData.get('phone'),
      interest: formData.get('interest'),
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://debsoc-backend.vercel.app';
      const response = await fetch(`${apiUrl}/api/applicants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Registration successful! We will be in touch.");
        setIsSubmitted(true);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4">
          <div className="min-h-full flex items-center justify-center py-4 md:py-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-stone-950 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              {/* Poster Section */}
              <div className="w-full md:w-1/2 relative min-h-[250px] md:min-h-full bg-stone-900 border-b md:border-b-0 md:border-r border-stone-800">
                <img 
                  src="/quote-image.jpg" 
                  alt="Recruitment Quote" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-6 md:p-8 relative flex flex-col justify-center">
                <button
                  onClick={closePopup}
                  className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-stone-900 hover:bg-stone-800 rounded-full text-stone-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>

                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center space-y-6 py-4 md:py-8"
                  >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-2">
                       <CheckCircle size={40} className="text-green-500" />
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Application Received!</h3>
                      <p className="text-stone-400 text-sm max-w-[280px] mx-auto">
                        Please join the official WhatsApp group for next steps and announcements.
                      </p>
                    </div>

                    <div className="w-full space-y-3 pt-4">
                      <a 
                        href="https://chat.whatsapp.com/F7LPljCtCeUAQrcCpY7dXy" 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20bd5a] transition-colors flex justify-center items-center gap-2"
                      >
                        Join WhatsApp Group <ExternalLink size={18} />
                      </a>
                      
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText("https://chat.whatsapp.com/F7LPljCtCeUAQrcCpY7dXy");
                          toast.success("Link copied to clipboard!");
                        }}
                        className="w-full py-4 bg-stone-900 border border-stone-800 text-white font-semibold rounded-xl hover:bg-stone-800 transition-colors flex justify-center items-center gap-2"
                      >
                        Copy Group Link <Copy size={18} />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-6 md:mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2">Register Now</h3>
                      <p className="text-stone-400 text-sm">Fill out your details to join the club.</p>
                    </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Full Name</label>
                    <input required name="name" type="text" className="w-full px-4 py-3 bg-stone-900 border border-stone-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white text-sm md:text-base" placeholder="John Doe" />
                  </div>
                
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Year</label>
                      <input required name="year" type="text" className="w-full px-4 py-3 bg-stone-900 border border-stone-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white text-sm md:text-base" placeholder="e.g. 1st Year" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider">USN</label>
                      <input required name="usn" type="text" className="w-full px-4 py-3 bg-stone-900 border border-stone-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white text-sm md:text-base" placeholder="1XY23CS001" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Branch</label>
                      <input required name="branch" type="text" className="w-full px-4 py-3 bg-stone-900 border border-stone-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white text-sm md:text-base" placeholder="Computer Science" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Phone</label>
                      <input required name="phone" type="tel" className="w-full px-4 py-3 bg-stone-900 border border-stone-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white text-sm md:text-base" placeholder="+91 12345 67890" />
                    </div>
                  </div>

                  <div className="space-y-1 relative">
                    <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Other Interest</label>
                    <input type="hidden" name="interest" value={selectedInterest} required />
                    
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`w-full px-4 py-3 bg-stone-900 border ${isDropdownOpen ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-stone-800'} rounded-xl text-left flex justify-between items-center transition-all`}
                    >
                      <span className={selectedInterest ? "text-white" : "text-stone-400"}>
                        {selectedInterest || "Select an interest..."}
                      </span>
                      <motion.span 
                        animate={{ rotate: isDropdownOpen ? 180 : 0 }} 
                        className="text-stone-400 text-xs"
                      >
                        ▼
                      </motion.span>
                    </button>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute z-10 w-full mt-1 bg-stone-900 border border-stone-800 rounded-xl overflow-hidden shadow-2xl py-1 bottom-full mb-2 md:bottom-auto md:mb-0"
                        >
                          {interests.map((interest) => (
                            <button
                              key={interest}
                              type="button"
                              onClick={() => {
                                setSelectedInterest(interest);
                                setIsDropdownOpen(false);
                              }}
                              className="w-full px-4 py-3 text-left text-white hover:bg-stone-800 transition-colors text-sm"
                            >
                              {interest}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 py-4 bg-white text-black font-semibold rounded-xl hover:bg-stone-200 transition-colors flex justify-center items-center"
                  >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                    />
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
