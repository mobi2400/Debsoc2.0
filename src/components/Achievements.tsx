"use client";

import React, {useEffect, useId, useRef, useState} from "react";
import Image from "next/image";
import {AnimatePresence, motion} from "framer-motion";
import {useOutsideClick} from "@/hooks/use-outside-click";
import achievements, {Achievement} from "@/lib/achievements";

// Augment scroll area element with an internal tracking property without using 'any'
interface TouchTrackElement extends HTMLDivElement {
  _lastTouchY?: number;
}

export function ExpandableCardDemo() {
  const [active, setActive] = useState<Achievement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const id = useId();

  // Close on Escape & lock body scroll
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
    }
    if (active) {
      lastFocused.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    } else {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", onKeyDown);
      // restore focus
      if (lastFocused.current) {
        lastFocused.current.focus();
        lastFocused.current = null;
      }
    }
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  // Focus the close button when dialog opens
  useEffect(() => {
    if (active && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [active]);

  useOutsideClick(dialogRef, () => setActive(null));

  const openAchievement = (a: Achievement) => setActive(a);

  return (
    <div
      id="achievements"
      className="relative w-full min-h-screen md:min-h-screen h-screen md:h-auto bg-gradient-to-br from-black via-gray-900 to-black px-4 pt-24 pb-12 flex flex-col overflow-hidden md:overflow-visible"
      aria-labelledby={`achievements-heading-${id}`}
    >
      <h1
        id={`achievements-heading-${id}`}
        className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent text-center mb-6 md:mb-10 flex-shrink-0 drop-shadow"
      >
        ACHIEVEMENTS
      </h1>

      <div className="max-w-4xl mx-auto flex-1 flex flex-col min-h-0 md:min-h-auto">
        {/* Backdrop */}
        <AnimatePresence>
          {active && (
            <motion.button
              aria-label="Close achievements dialog"
              onClick={() => setActive(null)}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm focus:outline-none"
            />
          )}
        </AnimatePresence>

        {/* Dialog / Expanded Card */}
        <AnimatePresence>
          {active ? (
            <div className="fixed inset-0 z-50 grid place-items-center p-4">
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`dialog-title-${id}`}
                aria-describedby={`dialog-desc-${id}`}
                initial={{opacity: 0, scale: 0.95, y: 12}}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: {type: "spring", stiffness: 160, damping: 20},
                }}
                exit={{
                  opacity: 0,
                  scale: 0.92,
                  y: 8,
                  transition: {duration: 0.18, ease: "easeInOut"},
                }}
                className="relative w-full max-w-[650px] h-[90vh] flex flex-col bg-neutral-900/90 backdrop-blur-xl ring-1 ring-white/10 sm:rounded-3xl overflow-hidden shadow-[0_8px_40px_-8px_rgba(0,0,0,0.6)]"
                onWheel={(e) => {
                  const area = scrollAreaRef.current;
                  if (!area) return;
                  const deltaY = e.deltaY;
                  const atTop = area.scrollTop <= 0;
                  const atBottom =
                    area.scrollHeight - area.clientHeight - area.scrollTop <= 1;
                  // Scroll inner area manually
                  area.scrollTop += deltaY;
                  if ((deltaY < 0 && atTop) || (deltaY > 0 && atBottom)) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
                onTouchStart={(e) => {
                  const area =
                    scrollAreaRef.current as TouchTrackElement | null;
                  if (!area) return;
                  area._lastTouchY = e.touches[0].clientY;
                }}
                onTouchMove={(e) => {
                  const area =
                    scrollAreaRef.current as TouchTrackElement | null;
                  if (!area) return;
                  const touchY = e.touches[0].clientY;
                  const lastY = area._lastTouchY;
                  if (lastY !== undefined) {
                    const deltaY = lastY - touchY; // positive when swiping up
                    const atTop = area.scrollTop <= 0;
                    const atBottom =
                      area.scrollHeight - area.clientHeight - area.scrollTop <=
                      1;
                    area.scrollTop += deltaY;
                    if ((deltaY < 0 && atTop) || (deltaY > 0 && atBottom)) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }
                  area._lastTouchY = touchY;
                }}
                onTouchEnd={() => {
                  const area =
                    scrollAreaRef.current as TouchTrackElement | null;
                  if (area && area._lastTouchY !== undefined) {
                    delete area._lastTouchY;
                  }
                }}
              >
                {/* Close button */}
                <motion.button
                  ref={closeBtnRef}
                  whileHover={{scale: 1.06}}
                  whileTap={{scale: 0.92}}
                  onClick={() => setActive(null)}
                  className="group absolute top-3 right-3 z-10 flex items-center justify-center h-8 w-8 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/70 transition"
                >
                  <CloseIcon />
                  <span className="sr-only">Close</span>
                </motion.button>

                <motion.div
                  layoutId={`image-${active.title}-${id}`}
                  className="relative"
                >
                  <Image
                    width={800}
                    height={288}
                    src={active.img}
                    alt={active.title}
                    priority
                    quality={90}
                    className="w-full h-72 object-cover object-center select-none"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-neutral-900/10 to-transparent pointer-events-none" />
                </motion.div>

                <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
                  <div className="p-5 flex-shrink-0 border-b border-white/10 backdrop-blur">
                    <motion.h3
                      id={`dialog-title-${id}`}
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-white text-xl leading-tight tracking-tight"
                    >
                      {active.title}
                    </motion.h3>
                  </div>
                  <div
                    id={`dialog-desc-${id}`}
                    ref={scrollAreaRef}
                    className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-hide"
                    style={{
                      overscrollBehavior: "contain",
                      WebkitOverflowScrolling: "touch",
                    }}
                  >
                    <motion.div
                      layout
                      initial={{opacity: 0, y: 8}}
                      animate={{opacity: 1, y: 0, transition: {delay: 0.05}}}
                      exit={{opacity: 0}}
                      className="text-neutral-300 text-sm md:text-base leading-relaxed"
                    >
                      {active.desc}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>

        {/* List */}
        <div
          className="max-w-2xl mx-auto flex-1 overflow-y-auto scrollbar-hide bg-white/[0.04] backdrop-blur-md rounded-2xl p-5 relative md:h-[420px] ring-1 ring-white/10 shadow-inner"
          style={{overscrollBehavior: "contain"}}
          aria-label="Achievements list"
        >
          {/* Scroll indicator */}
          <div className="flex justify-center mb-4 text-orange-300 text-xs font-medium">
            <div className="bg-gradient-to-r from-orange-600/30 to-amber-500/30 px-4 py-1.5 rounded-full backdrop-blur-sm border border-orange-500/30">
              Swipe or scroll to view more
            </div>
          </div>

          <ul className="w-full space-y-3">
            {achievements.map((achievement) => (
              <motion.li
                key={`card-${achievement.title}-${id}`}
                layoutId={`card-${achievement.title}-${id}`}
                whileHover={{y: -2}}
                whileTap={{scale: 0.97}}
                onClick={() => openAchievement(achievement)}
                className="group p-3 flex items-center justify-between rounded-xl cursor-pointer bg-white/[0.06] hover:bg-white/[0.12] transition-colors border border-white/10 hover:border-orange-500/40 focus-within:ring-2 focus-within:ring-orange-500/60"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <motion.div
                    layoutId={`image-${achievement.title}-${id}`}
                    className="flex-shrink-0 relative"
                  >
                    <Image
                      width={64}
                      height={64}
                      src={achievement.img}
                      alt={achievement.title}
                      quality={95}
                      className="h-12 w-12 rounded-full object-cover border-2 border-orange-400/50 shadow-sm select-none"
                      draggable={false}
                      sizes="48px"
                    />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <motion.h3
                      layoutId={`title-${achievement.title}-${id}`}
                      className="font-medium text-white text-sm md:text-base leading-tight line-clamp-2"
                    >
                      {achievement.title}
                    </motion.h3>
                    <motion.p className="text-gray-300/80 text-xs mt-1 line-clamp-1 md:line-clamp-2">
                      {achievement.desc}
                    </motion.p>
                  </div>
                </div>
                <motion.button
                  layoutId={`button-${achievement.title}-${id}`}
                  whileHover={{scale: 1.05}}
                  whileTap={{scale: 0.93}}
                  className="px-3 py-1.5 text-[11px] md:text-xs rounded-full font-semibold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-orange-400/70 focus-visible:ring-offset-neutral-900"
                  onClick={(e) => {
                    e.stopPropagation();
                    openAchievement(achievement);
                  }}
                >
                  View
                </motion.button>
              </motion.li>
            ))}
          </ul>

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black via-black/40 to-transparent rounded-b-2xl" />
        </div>
      </div>
    </div>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{opacity: 0}}
      animate={{opacity: 1, transition: {delay: 0.05}}}
      exit={{opacity: 0, transition: {duration: 0.05}}}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

export default ExpandableCardDemo;
