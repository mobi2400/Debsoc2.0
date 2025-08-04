import React, {useState} from "react";
import {ChevronLeft, ChevronRight} from "lucide-react";
import achievements from "../lib/achievements";

const AchievementCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % achievements.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? achievements.length - 1 : prev - 1));
  };

  return (
    <div
      id="achievements"
      className="relative w-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4 pt-24 pb-12 overflow-hidden"
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-orange-500 text-center mb-10">
        ACHIEVEMENTS
      </h1>

      <div className="relative w-full max-w-7xl h-[440px] sm:h-[420px] mx-auto flex items-center justify-center">
        {achievements.map((item, index) => {
          const offset =
            (index - activeIndex + achievements.length) % achievements.length;
          const isActive = index === activeIndex;
          const layer = offset === 0 ? 10 : 10 - offset;

          return (
            <div
              key={index}
              className={`absolute w-[95%] max-w-6xl h-[420px] sm:h-[360px] transition-all duration-700 ease-in-out transform
                ${
                  isActive
                    ? "scale-100 opacity-100 z-30"
                    : "scale-[0.95] opacity-40"
                }
              `}
              style={{
                zIndex: layer,
                transform: `
                  translateX(-50%) translateY(${offset * 20}px)
                  scale(${isActive ? 1 : 1 - offset * 0.03})
                `,
                left: "50%",
              }}
            >
              <div className="w-full h-full bg-white bg-opacity-80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden flex flex-col sm:flex-row">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full sm:w-1/2 h-52 sm:h-full object-cover"
                />
                <div className="w-full sm:w-1/2 p-4 sm:p-6 flex flex-col justify-start text-black text-center sm:text-left overflow-y-auto max-h-full">
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">
                    {item.title}
                  </h2>
                  <p className="text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          );
        })}

        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 text-orange-600 bg-white/10 hover:bg-white/20 backdrop-blur p-2 sm:p-3 rounded-full z-50 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
        </button>

        <button
          onClick={handleNext}
          className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 text-orange-600 bg-white/10 hover:bg-white/20 backdrop-blur p-2 sm:p-3 rounded-full z-50 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default AchievementCarousel;
