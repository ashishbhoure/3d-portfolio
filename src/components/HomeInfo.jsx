import { Button } from "bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";

const InfoBox = ({ text, link, btnText }) => {
  return (
    <div className="info-box">
      <p className="font-medium sm:text-xm text-center">{text}</p>
      <Link to={link} className="neo-brutalism-white neo-btn">
        {btnText} <img src={arrow} className="w-4 h-4 object-contain" />
      </Link>
    </div>
  );
};

const renderContant = {
  1: (
    <h1 className="sm:text-xm sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
      Hi, I am <span className="font-semibold">Ashish Bhoure</span> 👋🏻
      <br />A Software Developer.
    </h1>
  ),
  2: (
    <InfoBox
      text="Worked with many technologies and picked up many SKILLs"
      link="/about"
      btnText="Learn more"
    />
  ),
  3: (
    <InfoBox
      text="Led multiple projects to sucess over the years."
      link="/projects"
      btnText="Visit my portfolio"
    />
  ),
  4: (
    <InfoBox
      text="Need a project done and looking for a dev? I'm just a few keystrokes away"
      link="/contact"
      btnText="Lets talk"
    />
  ),
};

const HomeInfo = ({ currentStage }) => {
  return renderContant[currentStage] || null;
};

export default HomeInfo;
