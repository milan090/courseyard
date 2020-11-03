import React from "react";
import SearchBar from "../../components/searchbar/searchbar.component";
const HeroSection = () => {
  return (
    <div className="bg-secondary flex flex-col justify-center items-center pb-10">
      <div className="mx-2">
        <h1 className="text-secondary text-center font-display font-semibold mt-12 xl:text-5.5xl md:text-5xl text-4xl leading-snug">
          Pay For Courses? <br /> We Don&apos;t Do That Over Here
        </h1>
      </div>
      <SearchBar />
    </div>
  );
};

export default HeroSection;
