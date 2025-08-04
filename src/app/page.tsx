"use client";
import React from "react";
import {ReactLenis} from "@studio-freight/react-lenis";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReviewSection from "../components/ReviewSection";
import HomeSection from "../components/HomeSection";
import TeamGrid from "../components/TeamGrid";
export default function Home() {
  return (
    <>
      <ReactLenis
        root
        options={{
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        }}
      />
      <Navbar />
      <HomeSection />
      <TeamGrid />
      <ReviewSection />
      <Footer />
    </>
  );
}
