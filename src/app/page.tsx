"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLenis } from "@studio-freight/react-lenis";
import {ReactLenis} from "@studio-freight/react-lenis";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { BsFacebook } from "react-icons/bs";
import { TfiYoutube } from "react-icons/tfi";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { reviews } from "@/lib/alumni";
import Link from "next/link";
const GradientMask = () => (
  <>
    <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-black via-black/80 to-transparent" />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-black via-black/80 to-transparent" />
  </>
);

const ReviewCard = ({ review }) => (
  <article className="relative z-10 shrink-0 w-64 sm:w-72 mx-2 bg-white backdrop-blur-md rounded-xl shadow-md p-4 cursor-pointer">
    <header className="mb-2">
      <h3 className="font-semibold text-base text-gray-900">{review.name}</h3>
      <p className="text-xs text-gray-600">{review.position}</p>
    </header>
    <p className="text-gray-800 text-sm leading-relaxed mb-3">“{review.text}”</p>
    <footer className="text-[10px] text-gray-500">{review.date}</footer>
  </article>
);

const date = new Date();
const year = date.getFullYear();
import Image from "next/image";
export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const lenis = useLenis();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section && lenis) {
      lenis.scrollTo(section, { offset: -80 });
    }
    closeMobileMenu();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
    setIsDropdownOpen(false);
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
  return (

 <>
 <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: true,
        touchMultiplier: 2,
        infinite: false,
      }}
    ></ReactLenis>
      <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md fixed top-0 left-0 w-full z-50">
        <h1
          onClick={() => scrollToSection("home")}
          className="text-2xl font-bold cursor-pointer text-orange-400 hover:text-orange-600 transition-colors duration-300"
        >
          SMVIT DEBSOC
        </h1>

        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <button onClick={() => scrollToSection("team")} className="hover:text-orange-400 transition">Team</button>
          </li>
          <li>
            <button onClick={() => scrollToSection("achievements")} className="hover:text-orange-400 transition">Achievements</button>
          </li>
          <li>
            <button onClick={() => scrollToSection("alumini")} className="hover:text-orange-400 transition">Alumni</button>
          </li>
          <li>
            <a href="/DebateTimer/index.html" className="hover:text-orange-400 transition" target="_blank" rel="noopener noreferrer">Debate Timer</a>
          </li>
          <li>
            <a href="/session" className="hover:text-orange-400 transition">Session</a>
          </li>
          <li>
            <button onClick={() => scrollToSection("equity")} className="hover:text-orange-400 transition">Equity</button>
          </li>
          <li>
            <a href="/Gallery/index.html" className="hover:text-orange-400 transition" target="_blank" rel="noopener noreferrer">Gallery</a>
          </li>
          <li
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="hover:text-orange-400 transition">Login</button>
            <div
              className={`absolute top-10 right-0 w-40 bg-gray-800 border border-gray-700 rounded shadow-lg z-20 transition-all duration-300 origin-top ${
                isDropdownOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
              }`}
            >
              <a
                href="/FormPage/index.html"
                className="block px-4 py-2 hover:bg-gray-700 hover:text-orange-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                Admin
              </a>
              <a
                href="/FormPage/index.html"
                className="block px-4 py-2 hover:bg-gray-700 hover:text-orange-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                Member
              </a>
            </div>
          </li>
        </ul>

        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-orange-400 z-60 relative">
            {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
          isMobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMobileMenu}
      />

      <div
        className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-gray-900 via-gray-800 to-black shadow-2xl z-50 transition-transform duration-300 ease-out md:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto">
          <div className="p-6 pt-20 min-h-full">
            <div className="space-y-6">
              <div className="border-b border-gray-700 pb-4">
                <h2 className="text-orange-400 font-bold text-lg mb-4">Navigation</h2>
                <div className="space-y-3">
                  <button 
                    onClick={() => scrollToSection("home")} 
                    className="block w-full text-left py-2 px-3 rounded-lg text-white hover:bg-gray-700 hover:text-orange-400 active:text-orange-400 transition-all duration-200 transform hover:translate-x-2"
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => scrollToSection("team")} 
                    className="block w-full text-left py-2 px-3 rounded-lg text-white hover:bg-gray-700 hover:text-orange-400 active:text-orange-400 transition-all duration-200 transform hover:translate-x-2"
                  >
                    Team
                  </button>
                  <button 
                    onClick={() => scrollToSection("achievements")} 
                    className="block w-full text-left py-2 px-3 rounded-lg text-white hover:bg-gray-700 hover:text-orange-400 active:text-orange-400 transition-all duration-200 transform hover:translate-x-2"
                  >
                    Achievements
                  </button>
                  <button 
                    onClick={() => scrollToSection("alumini")} 
                    className="block w-full text-left py-2 px-3 rounded-lg text-white hover:bg-gray-700 hover:text-orange-400 active:text-orange-400 transition-all duration-200 transform hover:translate-x-2"
                  >
                    Alumni
                  </button>
                  <button 
                    onClick={() => scrollToSection("equity")} 
                    className="block w-full text-left py-2 px-3 rounded-lg text-white hover:bg-gray-700 hover:text-orange-400 active:text-orange-400 transition-all duration-200 transform hover:translate-x-2"
                  >
                    Equity
                  </button>
                </div>
              </div>

              <div className="border-b border-gray-700 pb-4">
                <h2 className="text-orange-400 font-bold text-lg mb-4">Tools & Resources</h2>
                <div className="space-y-3">
                  <a 
                    href="/DebateTimer/index.html" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={closeMobileMenu} 
                    className="block py-2 px-3 rounded-lg text-white hover:bg-gray-700 hover:text-orange-400 active:text-orange-400 transition-all duration-200 transform hover:translate-x-2"
                  >
                    Debate Timer
                  </a>
          
                    <Link href="/session"     
                    onClick={closeMobileMenu} 
                    className="block py-2 px-3 rounded-lg text-white hover:bg-gray-700 hover:text-orange-400 active:text-orange-400 transition-all duration-200 transform hover:translate-x-2">
                      Session
                    </Link>                 
                  <a 
                    href="/Gallery/index.html" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={closeMobileMenu} 
                    className="block py-2 px-3 rounded-lg text-white hover:bg-gray-700 hover:text-orange-400 active:text-orange-400 transition-all duration-200 transform hover:translate-x-2"
                  >
                    Gallery
                  </a>
                </div>
              </div>

              <div className="pb-8">
                <h2 className="text-orange-400 font-bold text-lg mb-4">Login</h2>
                <div className="space-y-3">
                  <a
                    href="/FormPage/index.html"
                    className="block py-2 px-3 rounded-lg text-white hover:bg-gray-700 hover:text-orange-400 active:text-orange-400 transition-all duration-200 transform hover:translate-x-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                  >
                    Admin Login
                  </a>
                  <a
                    href="/FormPage/index.html"
                    className="block py-2 px-3 rounded-lg text-white hover:bg-gray-700 hover:text-orange-400 active:text-orange-400 transition-all duration-200 transform hover:translate-x-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                  >
                    Member Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div  id='home 'className="relative h-[70vh] md:h-screen w-full overflow-hidden">
 
      <Image
        src="/homepage/M5.jpg"
        alt="group photo"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 w-full h-full object-cover object-center"></Image>

      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-7xl font-extrabold text-orange-500 font-mono px-4 flex">
          <span className="overflow-hidden whitespace-nowrap border-r-4 border-orange-500 animate-typewriter">
            SMVIT DEBSOC 
          </span>
          <span className="animate-cursor ml-1"> </span>
        </h1>

        <p className="text-lg md:text-2xl text-white font-mono mt-4 flex">
          <span className="overflow-hidden whitespace-nowrap border-r-2 border-white text-2xl font-bold animate-typewriter-slogan">
            Think | Speak | Listen
          </span>
          <span className="animate-cursor ml-1"> </span>
        </p>
      </div>
    </div>
    {/* Alumni */}
     <div  id='alumini'className="bg-black overflow-x-hidden">
      <section className="relative isolate min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col justify-center space-y-12 py-10">
        <h1 className="text-2xl sm:text-3xl text-orange-600 text-center font-extrabold">ALUMNI</h1>

        <div className="relative">
          <GradientMask />
          <div className="flex w-max animate-marquee">
            {reviews.map((r, idx) => (
              <ReviewCard key={`top-${idx}`} review={r} />
            ))}
          </div>
        </div>

        <div className="relative">
          <GradientMask />
          <div className="flex w-max animate-marquee-reverse">
            {reviews.map((r, idx) => (
              <ReviewCard key={`bottom-${idx}`} review={r} />
            ))}
          </div>
        </div>
      </section>
    </div>
    {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 px-6 py-8">
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <p className="text-sm text-center md:text-left">
              © {year} <span className="text-orange-400 font-semibold">SMVIT DEBSOC</span>. All rights reserved.
            </p>

            {/* This is the new, unified heading */}
            <h5 className="text-sm uppercase tracking-wide text-center md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
              Follow us on social media
            </h5>

            <div className="flex space-x-5 text-2xl">
              <a
                href="https://www.instagram.com/smvit_debsoc/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors duration-300"
              >
                <BiLogoInstagramAlt />
              </a>
              <a
                href="https://www.facebook.com/people/SMVIT-DEBSOC/100085129608350/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors duration-300"
              >
                <BsFacebook />
              </a>
              <a
                href="https://www.youtube.com/@smvitdebsoc738"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors duration-300"
              >
                <TfiYoutube />
              </a>
              <a
                href="mailto:smvitdebsoc12@gmail.com"
                className="hover:text-orange-400 transition-colors duration-300"
              >
                <MdOutlineAlternateEmail />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <section className="bg-gray-950 text-gray-400 px-6 py-6">
        <div className="max-w-4xl mx-auto text-center">
          <a
            href="/founder/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-400 hover:text-orange-500 underline text-lg md:text-xl font-semibold"
          >
            Click here to Meet the Creators
          </a>
          <p className="text-sm md:text-base mt-3">
            This website was lovingly crafted by the development team of SMVIT Debating Society.
            From clean design to smooth functionality, everything you see is built by passionate minds who love tech and debates.
          </p>
          <p className="mt-2 text-sm">Want to collaborate or have suggestions? Reach out through our socials!</p>
        </div>
      </section>
    </>

  );
}
