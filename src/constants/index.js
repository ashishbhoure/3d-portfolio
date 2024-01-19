// import { meta, shopify, starbucks, tesla } from "../assets/images";
import {
  food,
  cafe,
  education,
  cards,
  lab,
  car,
  contact,
  css,
  estate,
  express,
  git,
  github,
  html,
  javascript,
  linkedin,
  mongodb,
  nextjs,
  nodejs,
  pricewise,
  react,
  redux,
  snapgram,
  summiz,
  tailwindcss,
  threads,
  typescript,
  java,
  python,
  docker,
  php,
  cpp,
} from "../assets/icons";

export const skills = [
  {
    imageUrl: html,
    name: "HTML",
    type: "Frontend",
  },
  {
    imageUrl: css,
    name: "CSS",
    type: "Frontend",
  },
  {
    imageUrl: javascript,
    name: "JavaScript",
    type: "Frontend",
  },
  {
    imageUrl: java,
    name: "JAVA",
    type: "Backend",
  },
  {
    imageUrl: python,
    name: "PYTHON",
    type: "Backend",
  },
  {
    imageUrl: docker,
    name: "DOCKER",
    type: "Containerization",
  },
  {
    imageUrl: php,
    name: "PHP",
    type: "Backend",
  },
  {
    imageUrl: cpp,
    name: "CPP",
    type: "Backend",
  },
  {
    imageUrl: mongodb,
    name: "MongoDB",
    type: "Database",
  },
  {
    imageUrl: express,
    name: "Express",
    type: "Backend",
  },
  {
    imageUrl: react,
    name: "React",
    type: "Frontend",
  },
  {
    imageUrl: nodejs,
    name: "Node.js",
    type: "Backend",
  },

  {
    imageUrl: git,
    name: "Git",
    type: "Version Control",
  },
  {
    imageUrl: github,
    name: "GitHub",
    type: "Version Control",
  },
  {
    imageUrl: nextjs,
    name: "Next.js",
    type: "Frontend",
  },

  {
    imageUrl: redux,
    name: "Redux",
    type: "State Management",
  },
  {
    imageUrl: tailwindcss,
    name: "Tailwind CSS",
    type: "Frontend",
  },
  {
    imageUrl: typescript,
    name: "TypeScript",
    type: "Frontend",
  },
];

export const experiences = [
  // {
  //   title: "React.js Developer",
  //   company_name: "Starbucks",
  //   icon: starbucks,
  //   iconBg: "#accbe1",
  //   date: "March 2020 - April 2021",
  //   points: [
  //     "Developing and maintaining web applications using React.js and other related technologies.",
  //     "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
  //     "Implementing responsive design and ensuring cross-browser compatibility.",
  //     "Participating in code reviews and providing constructive feedback to other developers.",
  //   ],
  // },
  // {
  //   title: "React Native Developer",
  //   company_name: "Tesla",
  //   icon: tesla,
  //   iconBg: "#fbc3bc",
  //   date: "Jan 2021 - Feb 2022",
  //   points: [
  //     "Developing and maintaining web applications using React.js and other related technologies.",
  //     "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
  //     "Implementing responsive design and ensuring cross-browser compatibility.",
  //     "Participating in code reviews and providing constructive feedback to other developers.",
  //   ],
  // },
  // {
  //   title: "Web Developer",
  //   company_name: "Shopify",
  //   icon: shopify,
  //   iconBg: "#b7e4c7",
  //   date: "Jan 2022 - Jan 2023",
  //   points: [
  //     "Developing and maintaining web applications using React.js and other related technologies.",
  //     "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
  //     "Implementing responsive design and ensuring cross-browser compatibility.",
  //     "Participating in code reviews and providing constructive feedback to other developers.",
  //   ],
  // },
  // {
  //   title: "Full stack Developer",
  //   company_name: "Meta",
  //   icon: meta,
  //   iconBg: "#a2d2ff",
  //   date: "Jan 2023 - Present",
  //   points: [
  //     "Developing and maintaining web applications using React.js and other related technologies.",
  //     "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
  //     "Implementing responsive design and ensuring cross-browser compatibility.",
  //     "Participating in code reviews and providing constructive feedback to other developers.",
  //   ],
  // },
];

export const socialLinks = [
  {
    name: "Contact",
    iconUrl: contact,
    link: "/contact",
  },
  {
    name: "GitHub",
    iconUrl: github,
    link: "https://github.com/ashishbhoure",
  },
  {
    name: "LinkedIn",
    iconUrl: linkedin,
    link: "https://www.linkedin.com/in/ashish-bhoure-945717204/",
  },
];

export const projects = [
  {
    iconUrl: food,
    theme: "btn-back-red",
    name: "Foodies",
    description:
      "Engineered a resilient food delivery app featuring secure user authentication and seamless ordering, utilizing the MERN stack (React.js, MongoDB, Express.js, Node.js).",
    link: "https://github.com/ashishbhoure/MERN_Project_foodies",
    linkTag: "GitHub Link",
  },
  {
    iconUrl: cafe,
    theme: "btn-back-green",
    name: "Café Management",
    description:
      "Architected and deployed a streamlined cafe management system using the MERN stack (React.js, MongoDB, Express.js, Node.js), enhancing daily customer order processes and operational efficiency.",
    link: "https://github.com/ochhanejay/ckn_management",
    linkTag: "GitHub Link",
  },
  {
    iconUrl: education,
    theme: "btn-back-blue",
    name: "Education Website",
    description:
      "Crafted an intuitive and user-friendly interface, ensuring effortless navigation and seamless access to a diverse educational resource library using React.js, CSS, and Bootstrap",
    link: "https://www.studychampionacademy.com",
    linkTag: "Live Link",
  },
  {
    iconUrl: lab,
    theme: "btn-back-pink",
    name: "Armour Lab Selection",
    description:
      "Empowered users to seamlessly explore various labs, each equipped with distinct resources, by selecting from a curated list. Detailed information about each lab is accessible, and administrators have the capability to create new labs using HTML, PHP, JavaScript, and Bootstrap.",
    link: "https://github.com/ashishbhoure/armour_labs",
    linkTag: "GitHub Link",
  },
  {
    iconUrl: cards,
    theme: "btn-back-black",
    name: "Blackjack: the mobile card game",
    description:
      "Engineered a multiplayer card game with a user-friendly interface, ensuring ease of use, using React Native as the development framework.",
    link: "https://github.com/ashishbhoure/21CardGame",
    linkTag: "GitHub Link",
  },
  {
    iconUrl: car,
    theme: "btn-back-yellow",
    name: "AI: Driver Drowsiness Detection",
    description:
      "Designed an AI-based application that intelligently detects a driver's state, distinguishing between drowsy, sleepy, and active states, contributing to enhanced road safety.",
    link: "https://github.com/ashishbhoure/Driver_Drowsiness_Detection",
    linkTag: "GitHub Link",
  },
];
