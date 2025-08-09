"use client";

import React, {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import Navbar from "@/components/Navbar";
import {Fullscreen, X} from "lucide-react";
import Image from "next/image";
import galleryEvents, {GalleryImage, GalleryEvent} from "@/lib/galleryData";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [imageAspectRatios, setImageAspectRatios] = useState<
    Record<number, number>
  >({});

  const handleImageLoad = (
    imageId: number,
    naturalWidth: number,
    naturalHeight: number
  ) => {
    const aspectRatio = naturalWidth / naturalHeight;
    setImageAspectRatios((prev) => ({
      ...prev,
      [imageId]: aspectRatio,
    }));
  };

  const getGridItemClass = (imageId: number, index: number): string => {
    const aspectRatio = imageAspectRatios[imageId];

    if (!aspectRatio) return "col-span-1 row-span-1";

    if (aspectRatio > 1.5) {
      return "col-span-2 row-span-1";
    } else if (aspectRatio < 0.7) {
      return "col-span-1 row-span-2";
    } else {
      return index % 3 === 0
        ? "col-span-2 row-span-1"
        : "col-span-1 row-span-1";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6}}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-orange-500 mb-4">
              GALLERY
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Capturing moments, preserving memories - explore our journey
              through debates, events, and achievements
            </p>
          </motion.div>

          {galleryEvents.map((event: GalleryEvent, eventIndex: number) => (
            <motion.section
              key={event.eventName}
              initial={{opacity: 0, y: 30}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.6, delay: eventIndex * 0.1}}
              className="mb-20"
            >
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {event.eventName}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
                {event.images.map((image: GalleryImage, imageIndex: number) => (
                  <motion.div
                    key={image.id}
                    className={`${getGridItemClass(
                      image.id,
                      imageIndex
                    )} group cursor-pointer overflow-hidden rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300`}
                    initial={{opacity: 0, scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.4, delay: imageIndex * 0.05}}
                    whileHover={{scale: 1.02}}
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
                        onLoad={(e) => {
                          const img = e.currentTarget as HTMLImageElement & {
                            naturalWidth: number;
                            naturalHeight: number;
                          };
                          handleImageLoad(
                            image.id,
                            img.naturalWidth,
                            img.naturalHeight
                          );
                        }}
                        priority={eventIndex === 0 && imageIndex < 4}
                      />

                      <div className="absolute top-2 right-2 w-8 h-8 bg-orange-500/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{scale: 0.5, opacity: 0}}
              animate={{scale: 1, opacity: 1}}
              exit={{scale: 0.5, opacity: 0}}
              transition={{type: "spring", damping: 25, stiffness: 300}}
              className="relative max-w-5xl max-h-[95vh] w-full bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/60 hover:bg-black/80 text-white hover:text-orange-500 transition-all duration-200 z-20 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="relative">
                <div className="relative w-full h-full max-h-[80vh]">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    className="object-contain rounded-t-2xl"
                    sizes="90vw"
                    priority
                  />
                </div>
              </div>

              <div className="bg-gray-900/80 backdrop-blur-md p-6 border-t border-gray-700/50">
                <h3 className="text-orange-400 text-xl font-bold">
                  {selectedImage.alt}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;