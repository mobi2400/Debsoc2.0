import React, {useState, useEffect, useRef} from "react";
import Image from "next/image";
import {X, Instagram} from "lucide-react";
import {teamMembers} from "../lib/teamData";
import {useLenis} from "@studio-freight/react-lenis";

interface TeamMember {
  name: string;
  position: string;
  avatar: string;
  description: string;
  ig?: string;
}

function TeamGrid() {
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalAnimating, setIsModalAnimating] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // Add CSS to hide scrollbars and smooth animations
  React.useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .modal-content::-webkit-scrollbar {
        display: none;
      }
      .modal-content {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .modal-backdrop {
        transition: opacity 0.3s ease-in-out, backdrop-filter 0.3s ease-in-out;
      }
      .modal-backdrop.entering {
        opacity: 0;
        backdrop-filter: blur(0px);
      }
      .modal-backdrop.entered {
        opacity: 1;
        backdrop-filter: blur(12px);
      }
      .modal-backdrop.exiting {
        opacity: 0;
        backdrop-filter: blur(0px);
      }
      .modal-container {
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease-in-out;
      }
      .modal-container.entering {
        transform: scale(0.7) translateY(50px);
        opacity: 0;
      }
      .modal-container.entered {
        transform: scale(1) translateY(0px);
        opacity: 1;
      }
      .modal-container.exiting {
        transform: scale(0.8) translateY(30px);
        opacity: 0;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const openModal = (member: TeamMember) => {
    setActiveMember(member);
    setIsModalVisible(true);
    setIsModalAnimating(true);

    // Small delay to ensure the modal is rendered before animation
    setTimeout(() => {
      setIsModalAnimating(false);
    }, 50);
  };

  const close = () => {
    setIsModalAnimating(true);

    // Wait for exit animation to complete
    setTimeout(() => {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
      document.body.style.paddingRight = "0px";
      document.documentElement.style.overflow = "auto";

      if (lenis) lenis.start();
      setActiveMember(null);
      setIsModalVisible(false);
      setIsModalAnimating(false);
    }, 300); // Match the CSS transition duration
  };
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isDesktop) setShowAllMembers(true);
  }, [isDesktop]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  useEffect(() => {
    if (activeMember && isModalVisible) {
      // Get scrollbar width before hiding it
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      // Add padding to prevent layout shift when scrollbar disappears
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      // Hide scrollbar completely
      document.documentElement.style.overflow = "hidden";

      if (lenis) lenis.stop();

      const preventLenisWheel = (e: Event) => e.stopPropagation();
      const modalNode = modalRef.current;
      if (modalNode) {
        modalNode.addEventListener("wheel", preventLenisWheel, {
          passive: false,
        });
        modalNode.addEventListener("touchmove", preventLenisWheel, {
          passive: false,
        });
      }

      return () => {
        if (modalNode) {
          modalNode.removeEventListener("wheel", preventLenisWheel);
          modalNode.removeEventListener("touchmove", preventLenisWheel);
        }
      };
    }
  }, [activeMember, isModalVisible, lenis]);

  const coreMembers = teamMembers.filter(
    (m: TeamMember) => m.position !== "Member"
  );
  const generalMembers = teamMembers.filter(
    (m: TeamMember) => m.position === "Member"
  );
  const visibleMembers = showAllMembers
    ? generalMembers
    : generalMembers.slice(0, 2);
  const combinedTeam = [...coreMembers, ...visibleMembers];

  return (
    <section
      id="team"
      className="relative min-h-screen flex flex-col items-center bg-gradient-to-br from-black via-gray-900 to-black py-12"
    >
      <h2 className="text-orange-600 text-2xl md:text-3xl font-semibold mb-4">
        TEAM MEMBERS
      </h2>

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8 w-full px-8 ${
          activeMember ? "pointer-events-none blur-sm" : ""
        }`}
      >
        {combinedTeam.map((m, i) => (
          <div
            key={i}
            onClick={() => openModal(m)}
            className="flex flex-col items-center bg-white/10 backdrop-blur-md border border-orange-600 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_25px_#f97316] cursor-pointer transform hover:scale-105"
          >
            <Image
              src={m.avatar}
              alt={m.name}
              width={160}
              height={160}
              quality={95}
              className="w-32 h-32 rounded-full object-cover border-4 border-orange-600 mb-6"
              sizes="128px"
              priority={i < 4}
            />
            <h3 className="text-white text-xl font-bold mb-2">{m.name}</h3>
            <div className="text-orange-500 text-lg border-t border-orange-600 pt-2 w-full text-center">
              {m.position}
            </div>
          </div>
        ))}
      </div>

      {!showAllMembers && !isDesktop && (
        <button
          className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-full font-semibold shadow-lg hover:bg-orange-700 transition md:hidden"
          onClick={() => setShowAllMembers(true)}
        >
          View All Members
        </button>
      )}

      {activeMember && isModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className={`modal-backdrop absolute inset-0 bg-black/70 ${
              isModalAnimating ? "entering" : "entered"
            }`}
            onClick={close}
          />
          <div
            ref={modalRef}
            className={`modal-container modal-content relative w-11/12 sm:w-2/3 lg:w-1/3 max-h-[85vh] overflow-y-auto overscroll-contain bg-gradient-to-b from-gray-900 to-black border border-orange-600 rounded-3xl p-8 shadow-[0_0_40px_#f97316] ${
              isModalAnimating ? "entering" : "entered"
            }`}
            style={{
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE/Edge
            }}
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 text-orange-500 hover:text-orange-400 z-10"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <h3 className="text-white text-3xl font-bold text-center mb-2">
              {activeMember.name}
            </h3>
            <p className="text-orange-500 text-lg text-center mb-4">
              {activeMember.position}
            </p>
            <p className="text-gray-300 text-center text-base leading-relaxed mb-6 whitespace-pre-line">
              {activeMember.description}
            </p>
            {activeMember.ig &&
              activeMember.ig !== "www.instagram.com" &&
              activeMember.ig.includes("instagram.com") && (
                <div className="flex justify-center">
                  <a
                    href={
                      activeMember.ig.startsWith("http")
                        ? activeMember.ig
                        : `https://${activeMember.ig}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:text-orange-400 transition"
                  >
                    <Instagram size={28} />
                  </a>
                </div>
              )}
          </div>
        </div>
      )}
    </section>
  );
}

export default TeamGrid;
