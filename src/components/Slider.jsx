import React from "react";
import {
  cpp,
  css,
  docker,
  express,
  git,
  github,
  html,
  java,
  javascript,
  mongodb,
  nextjs,
  nodejs,
  php,
  python,
  react,
  redux,
  tailwindcss,
} from "../assets/icons";

function Slider() {
  return (
    <div className="slider ">
      <div className="slide-track items-center justify-center   ">
        <div className="slide ">
          <img
            className="  h-[50px]  w-[50px] object-contain   "
            src={express}
            alt="express"
          />
        </div>
        <div className="slide">
          <img
            className="   h-[50px]  w-[50px] object-contain"
            src={github}
            alt="github"
          />
        </div>
        <div className="slide">
          <img
            className="   h-[50px]  w-[50px] object-contain"
            src={git}
            alt="git"
          />
        </div>
        <div className="slide">
          <img
            className="    h-[50px]  w-[50px] object-contain"
            src={css}
            alt="css"
          />
        </div>
        <div className="slide">
          <img
            className="    h-[50px]  w-[50px] object-contain"
            src={html}
            alt="html"
          />
        </div>
        <div className="slide">
          <img
            className="    h-[50px]  w-[50px] object-contain"
            src={javascript}
            alt="javaScript"
          />
        </div>
        <div className="slide">
          <img
            className="    h-[50px]  w-[50px] object-contain"
            src={mongodb}
            alt="mongodb"
          />
        </div>
        <div className="slide">
          <img
            className="    h-[50px]  w-[50px] object-contain"
            src={nextjs}
            alt="nextjs"
          />
        </div>
        <div className="slide">
          <img
            className="    h-[50px]  w-[50px] object-contain"
            src={react}
            alt="react"
          />
        </div>
        <div className="slide">
          <img
            className="    h-[50px]  w-[50px] object-contain"
            src={nodejs}
            alt="nodejs"
          />
        </div>
        <div className="slide">
          <img
            className="    h-[50px]  w-[50px] object-contain"
            src={php}
            alt="php"
          />
        </div>
        <div className="slide">
          <img
            className="    h-[50px]  w-[50px] object-contain"
            src={redux}
            alt="redux"
          />
        </div>
        <div className="slide">
          <img
            className="    h-[50px]  w-[50px] object-contain"
            src={tailwindcss}
            alt="tailwindCss"
          />
        </div>
        <div className="slide">
          <img
            className="    h-[50px]  w-[50px] object-contain"
            src={java}
            alt="java"
          />
        </div>
        <div className="slide">
          <img
            className="    h-[50px]  w-[50px] object-contain"
            src={python}
            alt="python"
          />
        </div>
        <div className="slide">
          <img
            className="    h-[50px]  w-[50px] object-contain"
            src={cpp}
            alt="cpp"
          />
        </div>
        <div className="slide">
          <img
            className="    h-[50px]  w-[50px] object-contain"
            src={docker}
            alt="docker"
          />
        </div>
      </div>
    </div>
  );
}

export default Slider;
