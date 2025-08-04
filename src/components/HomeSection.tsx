import React, {useState, useEffect} from "react";
import Image from "next/image";

const HomeSection = () => {
  const [mainText, setMainText] = useState("");
  const [sloganText, setSloganText] = useState("");
  const [showMainCursor, setShowMainCursor] = useState(true);
  const [showSloganCursor, setSloganCursor] = useState(false);

  const mainString = "SMVIT DEBSOC";
  const sloganString = "Think | Speak | Listen";

  useEffect(() => {
    const typeWriter = () => {
      let mainIndex = 0;
      let sloganIndex = 0;
      let isTypingMain = true;
      let isTypingSlogan = false;
      let isErasingMain = false;
      let isErasingSlogan = false;

      const interval = setInterval(() => {
        if (isTypingMain && mainIndex <= mainString.length) {
          setMainText(mainString.slice(0, mainIndex));
          mainIndex++;
          if (mainIndex > mainString.length) {
            isTypingMain = false;
            setShowMainCursor(false);
            setSloganCursor(true);
            setTimeout(() => {
              isTypingSlogan = true;
            }, 500);
          }
        } else if (isTypingSlogan && sloganIndex <= sloganString.length) {
          setSloganText(sloganString.slice(0, sloganIndex));
          sloganIndex++;
          if (sloganIndex > sloganString.length) {
            isTypingSlogan = false;
            setTimeout(() => {
              isErasingSlogan = true;
              setSloganCursor(false);
            }, 2000);
          }
        } else if (isErasingSlogan && sloganIndex >= 0) {
          setSloganText(sloganString.slice(0, sloganIndex));
          sloganIndex--;
          if (sloganIndex < 0) {
            isErasingSlogan = false;
            setShowMainCursor(true);
            setTimeout(() => {
              isErasingMain = true;
            }, 300);
          }
        } else if (isErasingMain && mainIndex >= 0) {
          setMainText(mainString.slice(0, mainIndex));
          mainIndex--;
          if (mainIndex < 0) {
            isErasingMain = false;
            setTimeout(() => {
              mainIndex = 0;
              sloganIndex = 0;
              isTypingMain = true;
              setShowMainCursor(true);
              setSloganCursor(false);
            }, 1000);
          }
        }
      }, 120);

      return () => clearInterval(interval);
    };

    const cleanup = typeWriter();
    return cleanup;
  }, []);

  return (
    <div
      id="home"
      className="relative h-[70vh] md:h-screen w-full overflow-hidden"
    >
      <Image
        src="/homepage/M5.jpg"
        alt="group photo"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center">
        <h1
          className="text-4xl md:text-7xl font-extrabold text-orange-500 px-4 flex items-center"
          style={{fontFamily: "'Courier New', monospace"}}
        >
          <span className="whitespace-nowrap">{mainText}</span>
          {showMainCursor && <span className="animate-blink ml-1">|</span>}
        </h1>

        <p
          className="text-lg md:text-2xl text-white mt-4 flex items-center"
          style={{
            fontFamily: "'Courier New', monospace",
            height: "2.5rem",
            minHeight: "2.5rem",
          }}
        >
          <span className="whitespace-nowrap text-2xl font-bold">
            {sloganText}
          </span>
          {showSloganCursor && <span className="animate-blink ml-1">|</span>}
        </p>
      </div>
    </div>
  );
};

export default HomeSection;
