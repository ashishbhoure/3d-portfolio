import { lazy, Suspense, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "../data";

const HeroScene = lazy(() => import("./hero/HeroScene"));

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

const scrollToProject = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

export default function Hero() {
  const [webgl, setWebgl] = useState(false);
  const reduce = useReducedMotion();
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
    <section className="hero" id="top">
      <div className="hero-scene">
        {webgl && (
          <Suspense fallback={null}>
            <HeroScene onSelect={scrollToProject} />
          </Suspense>
        )}
      </div>

      <div className="hero-copy">
        <motion.h1 className="hero-title" {...rise(0)}>
          Ashish Bhoure
        </motion.h1>
        <motion.p className="hero-lede" {...rise(0.12)}>
          I build software people open every day: Windows tools, web apps, and the
          servers and data behind them.
        </motion.p>
        <motion.p className="hero-meta" {...rise(0.2)}>
          Full-stack developer in India, available for freelance and full-time work.
        </motion.p>
        <motion.div className="hero-actions" {...rise(0.28)}>
          <a className="btn btn--primary" href="#work">
            See my work
          </a>
          <a className="btn btn--ghost" href={profile.resume} target="_blank" rel="noopener noreferrer">
            Download résumé
          </a>
        </motion.div>
      </div>
    </section>
  );
}
