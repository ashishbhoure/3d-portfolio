import React from "react";
import { Helmet } from "react-helmet";
import { ashi, ashi1, ashu } from "../assets/images";
import { contact, github, linkedin } from "../assets/icons";
import { Link } from "react-router-dom";
import Slider from "../components/Slider";

const Main = () => {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "jQuery",
    "Bootstarp",
    "Tailwind CSS",
    "PHP",
    "MERN Stack",
    "MongoDB",
    "Express",
    "React",
    "Node.js",
    "Redux",
    "Next.js",
    "SQL",
    "NoSQL",
    "MySQL",
    "Firebase",
    "React Native",
    "TypeScript",
    "RESTful APIs",
    "Postman",
    "JSON",
    "JAVA",
    "CPP",
    "PYTHON",
    "DOCKER",
    "Git",
    "GitHub",
    "GitLab",
    "AWS",
    "Deployment",
  ];

  return (
    <section className="max-w-8xl mx-auto max-sm:p-5  !pt-[100px] px-16 min-h-[calc(100vh-80px)] ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>PortFolio - Ashish Bhoure</title>
        <meta
          name="description"
          content="I've successfully delivered a multitude of awe-inspiring projects, each a testament to my passion for innovation."
        />
        <meta name="google-adsense-account" content="ca-pub-1210200290803283" />
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>

      <div className="flex gap-4 max-sm:flex max-sm:flex-col max-sm:mt-10 ">
        <div class="max-sm:w-auto w-1/3 flex justify-center items-center">
          <img
            src={ashi1}
            alt="ashi image"
            width="200px"
            height="200px"
            className="shadow-lg border-[#64d8ff] rounded-full "
          />
        </div>

        <div class=" bg-[#d9f6ff] rounded-lg w-2/3 max-sm:w-auto p-10 max-sm:p-5 items-center text-justify text-lg flex">
          <p>
            I'm passionate about creating innovative solutions and delivering
            great results. I rise to the challenge because I have a strong
            background in web and app development. I have the ability to learn
            and adapt to new technology and skills. I am known for my hard work,
            dedication, and ability to meet deadlines. I am passionate about my
            job, go to every job with enthusiasm and strive to be good.
          </p>
        </div>
      </div>
      <div className="flex mt-5 mb-5 gap-4 max-sm:flex-col">
        <div class="bg-[#FBF5DF]  p-5 w-1/3 max-sm:w-auto rounded-lg ">
          <div className="flex gap-4 mb-2">
            <img src={github} width="20px" alt="github" />
            <a
              className="font-bold hover:font-poppins hover:text-[#2B77E7]"
              href="https://github.com/ashishbhoure"
              target="_blank"
            >
              Github
            </a>
          </div>
          <div className="flex gap-4 mb-2">
            <img src={linkedin} width="20px" alt="github" />
            <a
              className="font-bold hover:font-poppins hover:text-[#2B77E7]"
              href="https://www.linkedin.com/in/ashish-bhoure-945717204/"
              target="_blank"
            >
              LinkedIn
            </a>
          </div>
          <div className="flex gap-4">
            <img src={contact} width="20px" alt="github" />
            <Link
              className="font-bold hover:font-poppins hover:text-[#2B77E7]"
              to="/contact"
            >
              Connect With Me
            </Link>
          </div>
        </div>
        <div class="max-sm:w-auto flex flex-wrap p-5 w-2/3 rounded-lg col-span-2 bg-slate-700">
          {skills.map((skill) => {
            return (
              <>
                <span class="text-s font-medium me-2 px-2.5 py-0.5 rounded  text-gray-300">
                  {skill}
                </span>
                <span>| </span>
              </>
            );
          })}

          {/* <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            Default
          </span>
          <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
            Dark
          </span>
          <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
            Red
          </span>
          <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
            Green
          </span>
          <span class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
            Yellow
          </span>
          <span class="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
            Indigo
          </span>
          <span class="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
            Purple
          </span>
          <span class="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
            Pink
          </span> */}
        </div>
      </div>
      <div className="flex w-[100%] p-5 bg-slate-400/20 rounded-lg ">
        <Slider />
      </div>

      {/* <div class="grid grid-rows-4 grid-flow-col gap-4">
        <div class="row-span-2 flex justify-center items-center w-96">
          <img
            src={ashi1}
            alt="ashi image"
            width="200px"
            height="200px"
            className="shadow-lg border-[#64d8ff] rounded-full "
          />
        </div>
        <div class="col-span-1 bg-[#FBF5DF] p-5 w-96 rounded-lg ">
          <div className="flex gap-4 mb-2">
            <img src={github} width="20px" alt="github" />
            <a
              className="font-bold hover:font-poppins hover:text-[#2B77E7]"
              href="https://github.com/ashishbhoure"
              target="_blank"
            >
              Github
            </a>
          </div>
          <div className="flex gap-4 mb-2">
            <img src={linkedin} width="20px" alt="github" />
            <a
              className="font-bold hover:font-poppins hover:text-[#2B77E7]"
              href="https://www.linkedin.com/in/ashish-bhoure-945717204/"
              target="_blank"
            >
              LinkedIn
            </a>
          </div>
          <div className="flex gap-4">
            <img src={contact} width="20px" alt="github" />
            <Link
              className="font-bold hover:font-poppins hover:text-[#2B77E7]"
              to="/contact"
            >
              Connect With Me
            </Link>
          </div>
        </div>
        <div class="col-span-3 bg-slate-700 rounded-lg w-[120%] ">
          <Slider />
        </div>
        <div class="row-span-2 col-flow-2 bg-[#d9f6ff] rounded-lg w-[120%] p-10 items-center align-middle text-justify text-lg flex">
          <p>
            As an experienced software developer, I've completed many impressive
            projects, showcasing my passion for innovation. I work in both
            freelance and corporate settings, creating advanced solutions that
            integrate various technologies. My portfolio reflects my commitment
            to excellence, creativity, and expertise in delivering unique
            software experiences.
          </p>
        </div>
        <div class="col-span-2 bg-slate-700">
          <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            Default
          </span>
          <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
            Dark
          </span>
          <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
            Red
          </span>
          <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
            Green
          </span>
          <span class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
            Yellow
          </span>
          <span class="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
            Indigo
          </span>
          <span class="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
            Purple
          </span>
          <span class="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
            Pink
          </span>
        </div>
      </div> */}

      {/* <div className="mt-5 flex flex-col gap-3 text-slate-500 text-justify">
        <p>
          As a seasoned software developer, I've successfully delivered a
          multitude of awe-inspiring projects, each a testament to my passion
          for innovation. Engaging in both freelance ventures and corporate
          collaborations, I thrive on creating cutting-edge solutions that
          seamlessly integrate diverse technologies. My portfolio is a
          reflection of my commitment to excellence, where I bring creativity
          and expertise to craft unique and impactful software experiences.
        </p>
      </div> */}
    </section>
  );
};

export default Main;
