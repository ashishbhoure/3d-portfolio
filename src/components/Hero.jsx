import { lazy, Suspense, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Availability } from "./ui";

const HeroScene = lazy(() => import("./hero/HeroScene"));

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function Hero() {
  const [webgl, setWebgl] = useState(false);
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  useEffect(() => setWebgl(hasWebGL()), []);

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
      <div className="hero-scene">
        {webgl && (
          <Suspense fallback={null}>
            <HeroScene onSelect={(id) => navigate(`/work/${id}`)} />
          </Suspense>
        )}
      </div>

      <div className="hero-copy">
        <motion.div {...rise(0)}>
          <Availability />
        </motion.div>
        <motion.h1 className="hero-title" {...rise(0)}>
          Ashish Bhoure
        </motion.h1>
        <motion.p className="hero-lede" {...rise(0.12)}>
          I build web platforms, APIs and the tools people open every day, from security
          dashboards to Windows apps.
        </motion.p>
        <motion.p className="hero-meta" {...rise(0.2)}>
          Full-stack developer at 3Columns and freelancer, based in Indore, India. Working with clients worldwide.
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
    </section>
  );
}
