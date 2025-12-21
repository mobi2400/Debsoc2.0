"use client";
import Footer from "../components/Footer";
import ReviewSection from "../components/ReviewSection";
import HomeSection from "../components/HomeSection";
import WhyChooseUs from "../components/WhyChooseUs";
import TeamGrid from "../components/TeamGrid";
import ExpandableCardDemo from "../components/Achievements";
import Quote from "../components/Quote";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <HomeSection />
      <WhyChooseUs />
      <TeamGrid />
      <Quote />
      <ExpandableCardDemo />
      <ReviewSection />
      <Footer />
      <Toaster />
    </>
  );
}
