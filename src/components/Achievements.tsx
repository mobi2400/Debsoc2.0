"use client";

import React, {useEffect, useId, useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {useOutsideClick} from "@/hooks/use-outside-click";
import achievements, {Achievement} from "@/lib/achievements";

export function ExpandableCardDemo() {
  const [active, setActive] = useState<Achievement | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div
      id="achievements"
      className="relative w-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4 pt-24 pb-12"
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-orange-500 text-center mb-10">
        ACHIEVEMENTS
      </h1>

      <div className="max-w-4xl mx-auto">
        <AnimatePresence>
          {active && typeof active === "object" && (
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              className="fixed inset-0 bg-black/20 h-full w-full z-10"
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {active && typeof active === "object" ? (
            <div className="fixed inset-0  grid place-items-center z-[100]">
              <motion.button
                key={`button-${active.title}-${id}`}
                layout
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.05,
                  },
                }}
                className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="w-full max-w-[650px] h-[90vh] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden shadow-2xl mx-4"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                <motion.div layoutId={`image-${active.title}-${id}`}>
                  <img
                    width={200}
                    height={200}
                    src={active.img}
                    alt={active.title}
                    className="w-full h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-center flex-shrink-0"
                  />
                </motion.div>

                <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
                  <div className="p-4 flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200 text-lg leading-tight"
                    >
                      {active.title}
                    </motion.h3>
                  </div>
                  <div
                    className="flex-1 overflow-y-auto scrollbar-hide p-4"
                    onWheel={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                    style={{overscrollBehavior: "contain"}}
                  >
                    <motion.div
                      layout
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      exit={{opacity: 0}}
                      className="text-neutral-600 text-sm md:text-base leading-relaxed dark:text-neutral-400"
                    >
                      {active.desc}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>
        <div
          className="max-w-2xl mx-auto h-[400px] overflow-y-auto scrollbar-hide bg-white/5 backdrop-blur rounded-lg p-4 relative"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          style={{overscrollBehavior: "contain"}}
        >
          {/* Scroll indicator at top */}
          <div className="flex justify-center mb-4 text-orange-400 text-sm font-medium">
            <div className="bg-orange-500/20 px-3 py-1 rounded-full">
              Swipe ↕ to see all achievements
            </div>
          </div>

          <ul className="w-full space-y-3">
            {achievements.map((achievement, index) => (
              <motion.div
                layoutId={`card-${achievement.title}-${id}`}
                key={`card-${achievement.title}-${id}`}
                onClick={() => setActive(achievement)}
                className="p-3 flex items-center justify-between hover:bg-white/10 rounded-xl cursor-pointer transition-all duration-200 bg-white/5"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <motion.div
                    layoutId={`image-${achievement.title}-${id}`}
                    className="flex-shrink-0"
                  >
                    <img
                      width={100}
                      height={100}
                      src={achievement.img}
                      alt={achievement.title}
                      className="h-12 w-12 rounded-full object-cover border-2 border-orange-400/50 aspect-square"
                    />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <motion.h3
                      layoutId={`title-${achievement.title}-${id}`}
                      className="font-medium text-white text-sm md:text-base leading-tight line-clamp-2"
                    >
                      {achievement.title}
                    </motion.h3>
                    <motion.p className="text-gray-300 text-xs mt-1 line-clamp-1 md:line-clamp-2">
                      {achievement.desc}
                    </motion.p>
                  </div>
                </div>
                <motion.button
                  layoutId={`button-${achievement.title}-${id}`}
                  className="px-3 py-1.5 text-xs rounded-full font-bold bg-orange-500 hover:bg-orange-600 text-white flex-shrink-0 ml-2"
                >
                  View
                </motion.button>
              </motion.div>
            ))}
          </ul>

          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-b-lg"></div>
        </div>
      </div>
    </div>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

export default ExpandableCardDemo;
