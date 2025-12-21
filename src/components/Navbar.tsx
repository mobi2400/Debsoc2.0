"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const lenis = useLenis();

  const scrollToSection = (id: string) => {
    // If we're not on the home page, navigate to home first
    if (window.location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }

    const section = document.getElementById(id);
    if (section && lenis) {
      lenis.scrollTo(section, { offset: -80 });
    } else {
      console.warn(`Section with id "${id}" not found`);
    }
    closeMobileMenu();
  };



  const toggleMobileMenu = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileOpen]);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] px-6 py-4 flex items-center justify-between transition-all duration-300 ${isScrolled ? "bg-gray-900 shadow-md" : "bg-transparent"
          }`}
      >
        <h1
          onClick={() => scrollToSection("home")}
          className="text-2xl font-bold cursor-pointer text-orange-400 hover:text-orange-600 transition-colors duration-300"
        >
          <Link href="/">SMVIT DEBSOC</Link>
        </h1>

        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <button
              onClick={() => scrollToSection("team")}
              className="hover:text-orange-400 transition cursor-pointer"
            >
              Team
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("achievements")}
              className="hover:text-orange-400 transition cursor-pointer"
            >
              Achievements
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("alumini")}
              className="hover:text-orange-400 transition cursor-pointer"
            >
              Alumni
            </button>
          </li>
          <li>
            <Link
              href="/debateTimer"
              className="hover:text-orange-400 transition cursor-pointer"
            >
              Debate Timer
            </Link>
          </li>
          <li>
            <Link
              href="/session"
              className="hover:text-orange-400 transition cursor-pointer"
            >
              Session
            </Link>
          </li>
          <li>
            <Link
              href="/equity"
              className="hover:text-orange-400 transition cursor-pointer"
            >
              Equity
            </Link>
          </li>
          <li>
            <Link
              href="/gallery"
              className="hover:text-orange-400 transition cursor-pointer"
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              className="hover:text-orange-400 transition cursor-pointer"
            >
              Login
            </Link>
          </li>
        </ul>

        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-orange-400 z-[80] relative"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  <X size={28} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  <Menu size={28} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity duration-300 md:hidden ${isMobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={closeMobileMenu}
      />

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-gray-900 via-gray-800 to-black shadow-2xl z-[70] transition-transform duration-300 ease-out md:hidden ${isMobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >

        <div className="h-full overflow-y-auto">
          <div className="p-6 pt-20 min-h-full">
            <motion.div
              className="space-y-6"
              initial="closed"
              animate={isMobileOpen ? "open" : "closed"}
              variants={{
                open: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
            >
              <div className="border-b border-gray-700 pb-4">
                <motion.h2
                  variants={{ closed: { opacity: 0, x: -20 }, open: { opacity: 1, x: 0 } }}
                  className="text-orange-400 font-bold text-lg mb-4"
                >
                  Navigation
                </motion.h2>
                <div className="space-y-3">
                  {[
                    { label: "Home", action: () => scrollToSection("home") },
                    { label: "Team", action: () => scrollToSection("team") },
                    { label: "Achievements", action: () => scrollToSection("achievements") },
                    { label: "Alumni", action: () => scrollToSection("alumini") },
                  ].map((item) => (
                    <motion.button
                      key={item.label}
                      variants={{ closed: { opacity: 0, x: -20 }, open: { opacity: 1, x: 0 } }}
                      onClick={item.action}
                      className="block w-full text-left py-2 px-3 rounded-lg text-white hover:bg-gray-700 hover:text-orange-400 transition-all duration-200 transform hover:translate-x-2 cursor-pointer"
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="border-b border-gray-700 pb-4">
                <motion.h2
                  variants={{ closed: { opacity: 0, x: -20 }, open: { opacity: 1, x: 0 } }}
                  className="text-orange-400 font-bold text-lg mb-4"
                >
                  Tools & Resources
                </motion.h2>
                <div className="space-y-3">
                  {[
                    { label: "Debate Timer", href: "/debateTimer" },
                    { label: "Session", href: "/session" },
                    { label: "Equity", href: "/equity" },
                    { label: "Gallery", href: "/gallery" },
                  ].map((item) => (
                    <motion.div
                      key={item.label}
                      variants={{ closed: { opacity: 0, x: -20 }, open: { opacity: 1, x: 0 } }}
                    >
                      <Link
                        href={item.href}
                        rel="noopener noreferrer"
                        onClick={closeMobileMenu}
                        className="block py-2 px-3 rounded-lg text-white hover:bg-gray-700 hover:text-orange-400 transition-all duration-200 transform hover:translate-x-2 cursor-pointer"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="pb-8">
                <motion.h2
                  variants={{ closed: { opacity: 0, x: -20 }, open: { opacity: 1, x: 0 } }}
                  className="text-orange-400 font-bold text-lg mb-4"
                >
                  Login
                </motion.h2>
                <div className="space-y-3">
                  <motion.div
                    variants={{ closed: { opacity: 0, x: -20 }, open: { opacity: 1, x: 0 } }}
                  >
                    <Link
                      href="/login"
                      className="block py-2 px-3 rounded-lg text-white hover:bg-gray-700 hover:text-orange-400 transition-all duration-200 transform hover:translate-x-2 cursor-pointer"
                      onClick={closeMobileMenu}
                    >
                      Login
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
