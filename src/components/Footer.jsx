import { Link } from "react-router-dom";

import { socialLinks } from "../constants";

const Footer = () => {
  return (
    <footer className="footer font-poppins">
      <hr className="border-slate-200" />

      <div className="footer-container">
        <p>
          © 2024 <strong>Ashish Bhoure</strong>. All rights reserved.
        </p>

        <div className="flex gap-3 justify-center items-center">
          {socialLinks.map((link) => (
            <Link key={link.name} to={link.link} target="_blank">
              <img
                src={link.iconUrl}
                alt={link.name}
                className="w-6 h-6 object-contain"
              />
            </Link>
          ))}
          <a
            href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=ashishbhoure"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col justify-center items-center px-4 py-2 text-center text-white w-48 h-8 rounded-full bg-[#0A66C2] font-sans"
          >
            Follow on LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
