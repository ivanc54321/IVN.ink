import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import React, { useRef } from "react";
import { cn } from "../lib/utils";

interface Image3DProps {
  src: string;
  alt?: string;
  className?: string;
}

export function Image3D({ src, alt = "", className }: Image3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  const scale = useSpring(1, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  const handleMouseEnter = () => {
    scale.set(1.05);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
      }}
      className={cn("relative w-full h-full cursor-none overflow-hidden rounded-xl perspective-1000 border border-white/10", className)}
    >
      {/* Container to enforce actual 3D popping up element */}
      <motion.div 
        className="absolute inset-0 w-full h-full bg-cover bg-center grayscale mix-blend-screen opacity-50"
        style={{
          backgroundImage: `url(${src})`,
          // Add a slight translation outward to make it look like a floating layer inside the card
          translateZ: "30px", 
        }}
      />
      {/* Decorative reflection overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-[#f27d26]/20 to-transparent mix-blend-overlay"
        style={{ translateZ: "40px" }}
      />
      <div className="absolute top-8 left-8 w-full h-full border border-white/5 pointer-events-none"></div>
    </motion.div>
  );
}
