"use client";

import React, {memo, useEffect, useRef, useState} from "react";
import Image from "next/image";
import {motion} from "framer-motion";
import achievements, {Achievement} from "@/lib/achievements";

interface AchievementSectionProps {
    achievement: Achievement;
    index: number;
    onInView: (index: number) => void;
}

const AchievementSection = memo(function AchievementSection({
    achievement,
    index,
    onInView,
}: AchievementSectionProps) {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    onInView(index);
                }
            },
            {threshold: 0.5}
        );

        const element = sectionRef.current;
        if (element) observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, [index, onInView]);

    return (
        <section
            ref={sectionRef}
            className="w-full py-10 sm:py-14 bg-transparent"
        >
            <div className="w-full max-w-3xl mx-auto bg-white/5 ring-1 ring-white/10 rounded-2xl backdrop-blur-md px-6 md:px-10 py-8 md:py-10">
                <div
                    className={`w-full transition-all duration-700 ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                    }`}
                >
                    {/* Mobile Image - visible only on smaller screens */}
                    <div className="w-full mb-6 lg:hidden flex justify-center">
                        <div className="relative w-full max-w-[420px] h-[260px] rounded-xl overflow-hidden shadow-lg border border-white/20">
                            <Image
                                src={achievement.img}
                                alt={achievement.title}
                                fill
                                className="object-cover"
                                quality={90}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        </div>
                    </div>

                    <p className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-orange-400/80 mb-3 lg:mb-4">
                        Achievement {index + 1}
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight">
                        {achievement.title}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                        {achievement.desc}
                    </p>
                </div>
            </div>
        </section>
    );
});

interface DesktopTriggerProps {
    index: number;
    onInView: (index: number) => void;
}

const DesktopTrigger = memo(function DesktopTrigger({
    index,
    onInView,
}: DesktopTriggerProps) {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    onInView(index);
                }
            },
            {threshold: 0, rootMargin: "-45% 0px -45% 0px"}
        );

        const el = ref.current;
        if (el) observer.observe(el);

        return () => {
            if (el) observer.unobserve(el);
        };
    }, [index, onInView]);

    return <div ref={ref} className="h-screen" aria-hidden="true" />;
});

export function ExpandableCardDemo() {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!achievements.length) return null;

    const activeAchievement = achievements[activeIndex] ?? achievements[0];

    return (
        <div
            id="achievements"
            className="relative w-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-24"
        >
            <div className="max-w-7xl mx-auto px-4">
                <div className="sticky top-16 z-30 -mx-4 px-4 py-4 bg-gradient-to-b from-black/80 via-black/55 to-transparent backdrop-blur">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-orange-400 text-center tracking-wide">
                        ACHIEVEMENTS
                    </h1>
                </div>

                {/* Desktop: sticky two-card row + invisible scroll triggers */}
                <div className="hidden lg:block">
                    <div
                        className="relative"
                        style={{height: `${achievements.length * 100}vh`}}
                    >
                        <div className="sticky top-40 z-10">
                            <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
                                <div className="grid grid-cols-12 gap-8 items-stretch">
                                    {/* Image card */}
                                    <div className="col-span-5">
                                        <motion.div
                                            key={activeAchievement.title}
                                            initial={{
                                                opacity: 0,
                                                scale: 0.98,
                                                y: 10,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                y: 0,
                                            }}
                                            transition={{
                                                duration: 0.45,
                                                ease: "easeOut",
                                            }}
                                            className="relative w-full h-[68vh] rounded-2xl overflow-hidden ring-1 ring-white/10 bg-black/20"
                                        >
                                            <Image
                                                src={activeAchievement.img}
                                                alt={activeAchievement.title}
                                                fill
                                                className="object-cover"
                                                quality={95}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/70">
                                                <span className="font-medium tracking-wide">
                                                    {activeIndex + 1} /{" "}
                                                    {achievements.length}
                                                </span>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Text card */}
                                    <div className="col-span-7">
                                        <motion.div
                                            key={`${activeAchievement.title}-text`}
                                            initial={{opacity: 0, y: 10}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{
                                                duration: 0.45,
                                                ease: "easeOut",
                                            }}
                                            className="h-[68vh] rounded-2xl ring-1 ring-white/10 bg-black/20 px-8 py-8 flex flex-col"
                                        >
                                            <p className="text-xs uppercase tracking-[0.35em] text-orange-400/80 mb-4">
                                                Achievement {activeIndex + 1}
                                            </p>
                                            <h3 className="text-2xl font-bold text-white leading-tight mb-4">
                                                {activeAchievement.title}
                                            </h3>
                                            <div
                                                className="flex-1 overflow-y-auto pr-2 text-gray-300 text-base leading-relaxed"
                                                style={{
                                                    scrollBehavior: "smooth",
                                                }}
                                            >
                                                {activeAchievement.desc}
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {achievements.map((_, index) => (
                            <DesktopTrigger
                                key={index}
                                index={index}
                                onInView={setActiveIndex}
                            />
                        ))}
                    </div>
                </div>

                {/* Mobile/Tablet: stacked cards */}
                <div className="lg:hidden">
                    {achievements.map((achievement, index) => (
                        <AchievementSection
                            key={achievement.title}
                            achievement={achievement}
                            index={index}
                            onInView={setActiveIndex}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ExpandableCardDemo;
