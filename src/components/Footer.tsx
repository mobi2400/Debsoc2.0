import React from "react";
import Image from "next/image";
import {BiLogoInstagramAlt} from "react-icons/bi";
import {BsFacebook} from "react-icons/bs";
import {TfiYoutube} from "react-icons/tfi";
import {HiOutlineEnvelope} from "react-icons/hi2";
import {AiFillLinkedin, AiFillGithub} from "react-icons/ai";
import toast from "react-hot-toast";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  const showDevToast = () => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-gray-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-gray-600 ring-opacity-50`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <Image
                  className="h-10 w-10 rounded-full object-cover"
                  src="/Ayush.jpg"
                  alt="Ayush Kumar"
                  width={48}
                  height={48}
                  quality={95}
                  sizes="48px"
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-white">Ayush Kumar</p>
                <p className="mt-1 text-sm text-gray-300">
                  Assistant Developer | Got a query? Connect below!
                </p>
                <div className="flex space-x-3 mt-2">
                  <a
                    href="https://www.instagram.com/ayushnotkumar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
                  >
                    <BiLogoInstagramAlt className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ayushnotkumar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
                  >
                    <AiFillLinkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/ayushkumar320"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
                  >
                    <AiFillGithub className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-600">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-orange-400 hover:text-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      ),
      {
        duration: 4000, // 4 seconds
      }
    );

    setTimeout(() => {
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-gray-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-gray-600 ring-opacity-50`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <Image
                    className="h-10 w-10 rounded-full object-cover"
                    src="/Mobi-toast.jpg"
                    alt="Mobasshir Khan"
                    width={48}
                    height={48}
                    quality={95}
                    sizes="48px"
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-white">
                    Md. Mobasshir Shakil Khan
                  </p>
                  <p className="mt-1 text-sm text-gray-300">
                    Lead Developer | Got a query? Connect below!
                  </p>
                  <div className="flex space-x-3 mt-2">
                    <a
                      href="https://www.instagram.com/mobi__2400/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
                    >
                      <BiLogoInstagramAlt className="w-4 h-4" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/md-mobasshir-shakil-khan-8ba835326/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
                    >
                      <AiFillLinkedin className="w-4 h-4" />
                    </a>
                    <a
                      href="https://github.com/mobi2400"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
                    >
                      <AiFillGithub className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-600">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-orange-400 hover:text-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ),
        {
          duration: 4000,
        }
      );
    }, 500);
  };

  return (
    <>
      <footer className="bg-gray-900 text-gray-300 px-6 py-8">
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-center md:text-left">
              © {year}{" "}
              <span className="text-orange-400 font-semibold">
                SMVIT DEBSOC
              </span>
              . All rights reserved.
            </p>

            <h5 className="text-sm uppercase tracking-wide text-center md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
              Follow us on social media
            </h5>

            <div className="flex space-x-5 text-2xl">
              <a
                href="https://www.instagram.com/smvit_debsoc/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors duration-300"
              >
                <BiLogoInstagramAlt />
              </a>
              <a
                href="https://www.facebook.com/people/SMVIT-DEBSOC/100085129608350/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors duration-300"
              >
                <BsFacebook />
              </a>
              <a
                href="https://www.youtube.com/@smvitdebsoc738"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors duration-300"
              >
                <TfiYoutube />
              </a>
              <a
                href="mailto:smvitdebsoc12@gmail.com"
                className="hover:text-orange-400 transition-colors duration-300"
              >
                <HiOutlineEnvelope />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <section className="bg-gray-950 text-gray-400 px-6 py-6">
        <div className="max-w-4xl mx-auto text-center">
          <button
            onClick={showDevToast}
            className="text-orange-400 hover:text-orange-500 underline text-lg md:text-xl font-semibold cursor-pointer transition-colors duration-300"
          >
            Meet the devs!
          </button>
          <p className="text-sm md:text-base mt-3">
            This website was lovingly crafted by the development team of SMVIT
            Debating Society. From clean design to smooth functionality,
            everything you see is built by passionate minds who love tech and
            debates.
          </p>
          <p className="mt-2 text-sm">
            Want to collaborate or have suggestions? Reach out through our
            socials!
          </p>
        </div>
      </section>
    </>
  );
};

export default Footer;
