import React, {useState, useEffect, useRef} from "react";
import Image from "next/image";
import {motion, AnimatePresence} from "framer-motion";
import {Instagram, Mail, Facebook, Youtube} from "lucide-react";
import {useOutsideClick} from "../hooks/use-outside-click";

const HomeSection = () => {
  const [mainText, setMainText] = useState("");
  const [sloganText, setSloganText] = useState("");
  const [showMainCursor, setShowMainCursor] = useState(true);
  const [showSloganCursor, setSloganCursor] = useState(false);
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const connectRef = useRef<HTMLDivElement>(null);

  const mainString = "SMVIT DEBSOC";
  const sloganString = "Think | Speak | Listen";

  // Close dropdown when clicking outside
  useOutsideClick(connectRef, () => {
    if (isConnectOpen) {
      setIsConnectOpen(false);
    }
  });

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

  const socialLinks = [
    {
      icon: Facebook,
      label: "Facebook",
      href: "https://www.facebook.com/people/SMVIT-DEBSOC/100085129608350/",
      color: "from-blue-600 to-blue-800",
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://www.instagram.com/smvit_debsoc/",
      color: "from-pink-500 to-orange-500",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:smvitdebsoc12@gmail",
      color: "from-gray-600 to-gray-800",
    },
    {
      icon: Youtube,
      label: "YouTube",
      href: "https://www.youtube.com/@smvitdebsoc738",
      color: "from-red-600 to-red-800",
    },
  ];

  const toggleConnect = () => {
    setIsConnectOpen(!isConnectOpen);
  };

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

        {/* Connect Button and Social Links */}
        <div
          ref={connectRef}
          className="relative mt-8 flex flex-col items-center"
        >
          <motion.button
            onClick={toggleConnect}
            className="px-6 py-2 bg-white/10 backdrop-blur-sm text-white font-medium rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
          >
            Connect with us
          </motion.button>

          {/* Dynamic Arrow */}
          <motion.button
            onClick={toggleConnect}
            className="mt-2 p-1 text-white/70 hover:text-white transition-colors duration-200"
            animate={{rotate: isConnectOpen ? 180 : 0}}
            transition={{duration: 0.3, ease: "easeInOut"}}
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>

          {/* Social Links Dropdown */}
          <AnimatePresence>
            {isConnectOpen && (
              <motion.div
                initial={{opacity: 0, y: -10}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -10}}
                transition={{duration: 0.2}}
                className="absolute top-full mt-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 shadow-xl z-50"
              >
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200"
                      initial={{opacity: 0, scale: 0.8}}
                      animate={{opacity: 1, scale: 1}}
                      transition={{delay: index * 0.05}}
                      whileHover={{scale: 1.1}}
                      whileTap={{scale: 0.95}}
                    >
                      <social.icon className="w-5 h-5 text-white" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
