import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logoAB.png";
// import resume from "../assets/Resume Ashish Bhoure.pdf";
// import { download } from "../assets/icons";

const Navbar = () => {
  return (
    <header className="header snap-start">
      <NavLink
        to="/"
        className="w-25 h-10 rounded-lg px-2 max-sm:px-0 bg-white items-center justify-center flex font-bold shadow-md"
      >
        <img src={logo} alt="logo" className="w-8 h-auto" />
        <p className="blue-gradient_text hidden sm:block ">ASHISH</p>
      </NavLink>
      <nav className="flex text-lg gap-7 font-medium">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "text-blue-500" : "text-black"
          }
        >
          {" "}
          3D_Model
        </NavLink>
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
          to="/resume"
          className={({ isActive }) =>
            isActive ? "text-blue-500" : "text-black"
          }
        >
          {" "}
          Resume
        </NavLink>
        {/* <NavLink
          to={resume}
          color="transparent"
          download="Ashish_Bhoure_Resume"
          target="_blank"
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 flex gap-0.5 items-center"
              : "text-black flex gap-0.5 items-center"
          }
        >
          {" "}
          Resume
          <img
            src={download}
            alt="download"
            className="w-5 h-5 object-contain"
          />
        </NavLink> */}
      </nav>
    </header>
  );
};

export default Navbar;
