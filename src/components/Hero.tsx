import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

const WORDS = ["SCROLLING", "WEBSITE", "TEST"];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full flex items-center overflow-hidden bg-[#050505] text-white">
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-6 h-full w-full opacity-[0.03]">
        <div className="border-r border-white"></div>
        <div className="border-r border-white"></div>
        <div className="border-r border-white"></div>
        <div className="border-r border-white"></div>
        <div className="border-r border-white"></div>
        <div></div>
      </div>

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-[150px] md:text-[250px] lg:text-[300px] font-black leading-[0.8] tracking-tighter text-white/5 z-0 select-none pointer-events-none whitespace-nowrap">
        MOTION
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-12 flex flex-col items-start pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="font-mono text-[#f27d26] uppercase tracking-widest text-sm md:text-base font-bold">
            00 &mdash; BEGINNING
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-[8rem] lg:text-[10rem] font-sans font-black tracking-tighter uppercase leading-none mb-8 flex flex-col md:block"
        >
          HORIZONTAL<br className="hidden md:block" />
          <span className="text-[#f27d26] pl-0 md:pl-20 inline-flex overflow-hidden relative h-[1.1em] align-top md:align-text-bottom min-w-[200px] md:min-w-[500px]">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={wordIndex}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="block whitespace-nowrap"
              >
                {WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        <motion.p
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.6 }}
           className="text-white/40 leading-relaxed max-w-xl ml-0 md:ml-12 text-sm italic font-serif"
        >
          A bold approach to web layout. Scroll down to experience seamless 
          horizontal sections, 3D parallax, and responsive interactions.
        </motion.p>
      </motion.div>

      {/* Animated Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center gap-2 cursor-pointer"
        onClick={() => {
          const step = window.innerHeight;
          window.scrollBy({ top: step, behavior: 'smooth' });
        }}
      >
        <span className="text-xs md:text-sm font-sans tracking-tight text-white uppercase">SCROLL DOWN</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-white stroke-[1]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
