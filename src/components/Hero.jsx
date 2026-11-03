import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Availability } from "./ui";
import { HeroDesk } from "./v2/Scenes3D";

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] },
        };

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <motion.div {...rise(0)}>
            <Availability />
          </motion.div>
          <motion.h1 className="hero-title" {...rise(0.05)}>
            Ashish
            <br />
            Bhoure
          </motion.h1>
          <motion.p className="hero-lede" {...rise(0.12)}>
            I build the software your business runs on: web platforms, dashboards, APIs and Windows apps.
          </motion.p>
          <motion.p className="hero-meta" {...rise(0.2)}>
            Full-stack developer at 3Columns and freelancer, based in Indore, India.
          </motion.p>
          <motion.div className="hero-actions" {...rise(0.28)}>
            <Link className="btn btn--primary" to="/contact">
              Start a project
            </Link>
            <Link className="btn btn--ghost" to="/work">
              See my work
            </Link>
          </motion.div>
        </div>
        <HeroDesk />
      </div>
    </section>
  );
}
