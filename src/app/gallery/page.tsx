"use client";

import React, {useState} from "react";
import {motion} from "framer-motion";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import galleryEvents, {GalleryImage, GalleryEvent} from "@/lib/galleryData";

const Gallery = () => {
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
                    )} group overflow-hidden rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300`}
                    initial={{opacity: 0, scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.4, delay: imageIndex * 0.05}}
                    whileHover={{scale: 1.02}}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        quality={88}
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width:640px) 55vw, (max-width:1024px) 36vw, 28vw"
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
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
