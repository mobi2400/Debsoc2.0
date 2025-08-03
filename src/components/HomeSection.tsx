import React from "react";
import Image from "next/image";

const HomeSection = () => {
  return (
    <div id='home' className="relative h-[70vh] md:h-screen w-full overflow-hidden">
      <Image
        src="/homepage/M5.jpg"
        alt="group photo"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

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
  );
};

export default HomeSection;
