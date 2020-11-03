import React, { useEffect } from "react";
import HeroSection from "../../layouts/hero-section/hero-section.layout";
import CoursePreview from "../../layouts/course-overview/courses-overview.layout";
import ScrollToTopButton from "../../components/scroll-to-top-button/scroll-to-top-button.component";

const HomePage = () => {
  useEffect(() => {
    document.title = "Courseyard | Home";
  });

  return (
    <div>
      <ScrollToTopButton />
      <HeroSection />
      <CoursePreview />
    </div>
  );
};

export default HomePage;
