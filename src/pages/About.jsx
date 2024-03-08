import React from "react";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { skills, experiences } from "../constants";
import CTA from "../components/CTA";
import ScrollAnimation from "../components/ScrollAnimation";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <section className="max-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>About - Ashish Bhoure</title>
        <meta
          name="description"
          content="Passionate software developer with a flair for crafting robust and scalable solutions. Proficient in full-stack development."
        />
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      <h1 className="head-text">
        Hello, I'm{" "}
        <span className="blue-gradient_text font-semibold drop-shadow">
          Ashish
        </span>{" "}
      </h1>
      <ScrollAnimation>
        <div className="mt-5 flex flex-col gap-3 text-slate-500">
          <p>
            Passionate software developer with a flair for crafting robust and
            scalable solutions. Proficient in full-stack development, I
            specialize in creating innovative applications that blend
            cutting-edge technology with a keen eye for user experience.
          </p>

          <div className="py-10 flex flex-col">
            <h3 className="subhead-text ">My Skills</h3>

            <div className="mt-16 flex flex-wrap gap-12 justify-center">
              {skills.map((skill) => (
                <div className="block-container w-20 h-20">
                  <div className="btn-back rounded-xl" />
                  <div className="btn-front rounded-xl flex justify-center items-center">
                    <img
                      src={skill.imageUrl}
                      alt={skill.name}
                      className="w-1/2 h-1/2 object.contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="py-16 ">
          <h3 className="subhead-text">Work Experience</h3>
          <div className="mt-5 flex flex-col gap-3 text-slate-500">
            <p>
              I've worked with many technology, leveling up my skills and
              teaming up with smart people.Here's the run down
            </p>
          </div>

          <div className="mt-12 flex">
            <VerticalTimeline>
              {experiences.map((experience) => (
                <VerticalTimelineElement
                  key={experience.company_name}
                  date={experience.date}
                  icon={
                    <div className="flex justify-center items-center w-full h-full">
                      <img
                        src={experience.icon}
                        alt={experience.company_name}
                        className="w-[60%] h-[60%] object-contain"
                      />
                    </div>
                  }
                  iconStyle={{
                    background: experience.iconBg,
                  }}
                  contentStyle={{
                    borderBottom: "8px",
                    borderStyle: "solid",
                    borderBottomColor: experience.iconBg,
                    boxShadow: "none",
                  }}
                >
                  <div>
                    <h3 className="text-black text-xl font-poopins font-semibold">
                      {experience.title}
                    </h3>
                    <p
                      className="text-black-500 font-medium font-base"
                      style={{ margin: 0 }}
                    >
                      {experience.company_name}
                    </p>
                  </div>
                  <ul className="my-5 list-disc ml-5 space-y-2">
                    {experience.points.map((point, index) => (
                      <li
                        key={`experience.-point-${index}`}
                        className="text-black-500/50 font-normal pl-1 text-sm"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </div>
        </div> */}
        </div>
      </ScrollAnimation>
      <hr className="border-slate-200" />
      <CTA />
    </section>
  );
};

export default About;
