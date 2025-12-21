import React from "react";
import { reviews, Review } from "@/lib/alumni";
import { motion } from "framer-motion";


const GradientMask = () => (
  <>
    <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-black via-black/80 to-transparent" />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-black via-black/80 to-transparent" />
  </>
);

const ReviewCard = ({ review }: { review: Review }) => (
  <article className="relative z-10 shrink-0 w-64 sm:w-72 mx-2 bg-white backdrop-blur-md rounded-xl shadow-md p-4 cursor-pointer">
    <header className="mb-2">
      <h3 className="font-semibold text-base text-gray-900">{review.name}</h3>
      <p className="text-xs text-gray-600">{review.position}</p>
    </header>
    <p className="text-gray-800 text-sm leading-relaxed mb-3">“{review.text}”</p>
  </article>
);

const ReviewSection = () => {
  return (
    <div id='alumini' className="bg-black overflow-x-hidden">
      <section className="relative isolate min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col justify-center space-y-12 py-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl text-orange-600 text-center font-extrabold"
        >
          ALUMNI
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative"
        >
          <GradientMask />
          <div className="flex w-max animate-marquee">
            {reviews.map((r, idx) => (
              <ReviewCard key={`top-${idx}`} review={r} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative"
        >
          <GradientMask />
          <div className="flex w-max animate-marquee-reverse">
            {reviews.map((r, idx) => (
              <ReviewCard key={`bottom-${idx}`} review={r} />
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ReviewSection;
