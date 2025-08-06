"use client";

import React, {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import Navbar from "@/components/Navbar";
import {X} from "lucide-react";
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

  const getGridItemClass = (imageId: number, index: number) => {
    const aspectRatio = imageAspectRatios[imageId];

    if (!aspectRatio) return "col-span-1 row-span-1";

    // Landscape images (wider than tall)
    if (aspectRatio > 1.5) {
      return "col-span-2 row-span-1";
    }
    // Portrait images (taller than wide)
    else if (aspectRatio < 0.7) {
      return "col-span-1 row-span-2";
    }
    // Square or slightly rectangular images
    else {
      // Add some variety for square images
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
          {/* Page Header */}
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

          {/* Gallery Events */}
          {galleryEvents.map((event: GalleryEvent, eventIndex: number) => (
            <motion.section
              key={event.eventName}
              initial={{opacity: 0, y: 30}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.6, delay: eventIndex * 0.1}}
              className="mb-20"
            >
              {/* Event Header */}
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {event.eventName}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
              </div>

              {/* Dynamic Grid */}
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
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onLoad={(e) => {
                          const img = e.target as HTMLImageElement;
                          handleImageLoad(
                            image.id,
                            img.naturalWidth,
                            img.naturalHeight
                          );
                        }}
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="text-white text-sm font-medium line-clamp-2">
                            {image.description}
                          </p>
                        </div>
                      </div>

                      {/* Hover Icon */}
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{scale: 0.5, opacity: 0}}
              animate={{scale: 1, opacity: 1}}
              exit={{scale: 0.5, opacity: 0}}
              transition={{type: "spring", damping: 25, stiffness: 300}}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-orange-500 transition-colors duration-200 z-10"
              >
                <X size={32} />
              </button>

              {/* Image */}
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              />

              {/* Description */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <p className="text-white text-lg font-medium">
                  {selectedImage.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
