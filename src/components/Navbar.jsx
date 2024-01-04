import React from "react";
import { NavLink } from "react-router-dom";
import resume from "../assets/Resume Ashish Bhoure.pdf";

const Navbar = () => {
  return (
    <header className="header ">
      <NavLink
        to="/"
        className="w-20 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md"
      >
        <p className="blue-gradient_text">ASHISH</p>
      </NavLink>
      <nav className="flex text-lg gap-7 font-medium">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-blue-500" : "text-black"
          }
        >
          {" "}
          About
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? "text-blue-500" : "text-black"
          }
        >
          {" "}
          Projects
        </NavLink>
        <NavLink
          to={resume}
          color="transparent"
          download="Ashish_Bhoure_Resume"
          target="_blank"
          className={({ isActive }) =>
            isActive ? "text-blue-500" : "text-black"
          }
        >
          {" "}
          Resume
          <img src="" />
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
