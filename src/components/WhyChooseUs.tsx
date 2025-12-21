"use client";

import { FaGlobe, FaChalkboardTeacher, FaTrophy, FaMicrophone } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
    {
        icon: <FaGlobe className="w-8 h-8 text-black" />,
        title: "Weekly Sessions",
        description:
            "Engage in regular on-campus sessions and test your mettle in international online spars with global debaters.",
    },
    {
        icon: <FaChalkboardTeacher className="w-8 h-8 text-black" />,
        title: "Mentorship Program",
        description:
            "Accelerate your progress through exclusive workshops led by elite debaters and distinguished alumni.",
    },
    {
        icon: <FaTrophy className="w-8 h-8 text-black" />,
        title: "Competitive Edge",
        description:
            "Gain unmatched exposure by competing in premier national circuits and our own flagship tournaments.",
    },
    {
        icon: <FaMicrophone className="w-8 h-8 text-black" />,
        title: "Oratory Excellence",
        description:
            "Master the art of persuasion. Our sessions are crafted to transform your public speaking and critical thinking.",
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function WhyChooseUs() {
    return (
        <section className="py-24 relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 bg-white/5 opacity-10 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter text-white"
                    >
                        Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">DEBSOC</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-medium"
                    >
                        Experience the difference with our supportive community, flexible policies, and world-class mentorship.
                    </motion.p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-orange-500/20 transition-all duration-500 group border border-white/10 relative overflow-hidden hover:-translate-y-2"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150"></div>

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform duration-500 text-white">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 uppercase text-white tracking-wide group-hover:text-orange-400 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-300 leading-relaxed font-medium">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default WhyChooseUs;
