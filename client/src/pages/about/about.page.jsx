import React, { useEffect } from "react";
import "./about.styles.scss";
import IdeatorImg from "../../assets/undraw_instruction_manual_cyae.svg";
import WorkaholicImg from "../../assets/undraw_Freelancer_re_irh4.svg";
import PhilomathImg from "../../assets/undraw_selecting_1lx3.svg";
import LearningImg from "../../assets/undraw_studying_s3l7.svg";
import LogoLight from "../../assets/courseyard-logo-light.png";

const About = () => {
  useEffect(() => {
    document.title = "Courseyard | About";
  });

  return (
    <div className="text-primary mx-auto bg-accent">
      <h1 className="title-about mb-10 text-center text-5xl lg:text-6xl md:text-5xl font-bold font-display text-primary">
        About Us
      </h1>
      <div className="w-4/5 mx-auto text-center">
        <span className="text-secondary font-display">
          A group of 3 juvenile from India trying to create solutions to almost every student’s
          problems. We have just started with programming and building and learning it in the
          process.
          <br />
          <span className="text-4xl font-semibold font-display">We Are A Perfect Team!</span>
          <div className="grid justify-items-center align-middle grid-flow-row xl:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 grid-cols-1">
            <div className="px-5">
              <img src={IdeatorImg} className="text-sm h-40 mt-16" />
              <span className="text-secondary font-display text-xl">
                <a
                  href="https://github.com/KaranSinghBisht"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent"
                >
                  Karan
                </a>
                <br />
                <span className="text-gray-500 font-display text-sm">-The Ideator</span>
              </span>
            </div>
            <div className="px-5">
              <img src={WorkaholicImg} className="text-sm h-40 mt-16" />
              <span className="text-secondary font-display text-xl">
                <a
                  href="https://github.com/saptarshibasu15"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent"
                >
                  Saptarshi
                </a>
                <br />
                <span className="text-gray-500 font-display text-sm">-The Workaholic</span>
              </span>
            </div>
            <div className="px-5">
              <img src={PhilomathImg} className="text-sm h-40 mt-16" />
              <span className="text-secondary font-display text-xl">
                <a
                  href="https://github.com/milan090"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent"
                >
                  Milan
                </a>
                <br />
                <span className="text-gray-500 font-display text-sm">-The Philomath</span>
              </span>
            </div>
          </div>
          <div className="mt-10">
            We communicate, discuss, and most importantly enjoy working together!
          </div>
          <div className="mt-12">
            <img className="inline h-20 w-auto mb-2" src={LogoLight} alt="Courseyard logo" />
            <span className="ml-3 text-secondary text-4xl font-semibold font-display inline">
              Courseyard
            </span>
            <div className="text-secondary font-display mt-5">
              Nowadays everyone can learn anything from the internet for free. Courseyard aims
              to help these learners get the right courses that are absolutely free. Students
              often find themselves thinking which course would be best for them. Well, here
              you can find the best, free & handpicked courses just for you!
            </div>
            <div className="text-4xl font-semibold font-display mt-10">
              Why Should You Learn New Things?
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 pb-20">
              <img src={LearningImg} className="inline h-48 mx-auto" />
              <div className="text-secondary font-display mt-5 inline">
                Learning is essential to our existence. Just like food nourishes our bodies,
                information, and continued learning nourishes our minds. In this hard time, you
                can learn new things which will not only equip you with a new skill but also
                develop you as a better person.
              </div>
            </div>
          </div>
        </span>
      </div>
    </div>
  );
};

export default About;
