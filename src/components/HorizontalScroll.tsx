import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "motion/react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Image3D } from "./Image3D";
import { AutoChangingHeadings } from "./AutoChangingHeadings";

// Helper component for customized reveal animation inside horizontal context
function RevealText({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.5, rootMargin: "0px 1000px 0px 0px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Parallax Image component
function ParallaxImage({ 
  src, 
  scrollYProgress, 
  startStr, 
  endStr, 
  rotateStart, 
  rotateEnd,
  className 
}: { 
  src: string, 
  scrollYProgress: MotionValue<number>, 
  startStr: string, 
  endStr: string,
  rotateStart: number,
  rotateEnd: number,
  className?: string 
}) {
  const x = useTransform(scrollYProgress, [0, 1], [startStr, endStr]);
  const rotate = useTransform(scrollYProgress, [0, 1], [rotateStart, rotateEnd]);

  return (
    <motion.div style={{ x, rotate }} className={`absolute ${className}`}>
        <img src={src} alt="" className="w-full h-full object-cover shadow-2xl" />
    </motion.div>
  );
}

export function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  // We are creating 4 horizontal screens, so 400vw width in total.
  // We need 400vh to scroll them naturally.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // When the top of container hits top of viewport to bottom hitting bottom.
    // Actually standard for sticky scroll:
    offset: ["start start", "end end"] 
  });

  // Smooth the scroll slightly so the background translation isn't too jarring natively
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100, damping: 20, restDelta: 0.001
  });

  // 4 screens = 3 shifts (0 to -75% of a container that's 400vw wide)
  // Which is equivalent to moving from 0% to -300vw
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  const scrollToScreen = (screenIndex: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const offsetTop = rect.top + scrollTop;
    const totalHeight = containerRef.current.scrollHeight - window.innerHeight;
    
    // Each screen index represents a fraction of the total scrollable area
    const targetScroll = offsetTop + (totalHeight * (screenIndex / 3));
    
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#050505]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]">
        {/* Horizontal Scroll Progress Bar */}
        <motion.div 
          className="absolute top-0 left-0 h-[2px] bg-[#f27d26] z-50 origin-left w-full"
          style={{ scaleX: scrollYProgress }}
        />

        {/* Decorative Grid Overlay for entire scroll area */}
        <div className="absolute inset-0 pointer-events-none grid grid-cols-6 h-full w-full opacity-[0.03] z-[5]">
          <div className="border-r border-white"></div>
          <div className="border-r border-white"></div>
          <div className="border-r border-white"></div>
          <div className="border-r border-white"></div>
          <div className="border-r border-white"></div>
          <div></div>
        </div>

        <motion.div 
          style={{ x }} 
          className="flex h-full w-[400vw] relative z-10"
        >
          {/* SLIDE 1 */}
          <div className="w-[100vw] h-full flex items-center justify-center p-8 lg:p-24 shrink-0 relative px-8 md:px-12 border-r border-white/5">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center w-full max-w-7xl">
                <div className="order-2 md:order-1 h-[40vh] md:h-[60vh] perspective" style={{ perspective: 1200 }}>
                   <Image3D src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" />
                </div>
                <div className="order-1 md:order-2">
                   <RevealText>
                     <span className="text-[#f27d26] font-mono text-sm tracking-widest block mb-4 uppercase">01 &mdash; PERSPECTIVE</span>
                     <h2 className="text-5xl md:text-[5rem] lg:text-[6rem] font-black font-sans uppercase tracking-tighter leading-none mb-8">
                       <span className="text-gradient-white pb-2 pr-2">Interactive</span> <br/> <span className="text-[#f27d26] pl-0 md:pl-20">Dimensions</span>
                     </h2>
                   </RevealText>
                   <RevealText>
                     <p className="text-white/40 leading-relaxed max-w-md ml-0 md:ml-12 text-sm italic font-serif">
                       Move your mouse over the image to experience a true 3D spatial effect. This horizontal scrolling section allows for deep immersion.
                     </p>
                   </RevealText>
                </div>
             </div>
          </div>

          {/* SLIDE 2 */}
          <div className="w-[100vw] h-full flex items-center justify-center p-8 shrink-0 relative bg-[#0a0a0a] border-r border-white/5">
             <div className="w-full max-w-7xl relative h-full flex text-center flex-col items-center justify-center z-10">
                <span className="text-[#f27d26] font-mono text-sm tracking-widest block mb-4 uppercase">02 &mdash; ROTATION</span>
                <AutoChangingHeadings className="text-5xl md:text-[6rem] lg:text-[7rem] font-black font-sans uppercase tracking-tighter leading-none mb-12" />
                
                {/* Parallax Rotating Elements in Background */}
                <ParallaxImage 
                  src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop"
                  scrollYProgress={smoothProgress}
                  startStr="-20vw" endStr="30vw"
                  rotateStart={-10} rotateEnd={20}
                  className="w-48 md:w-72 aspect-[3/4] top-[10%] left-[5%] shadow-2xl opacity-40 mix-blend-screen grayscale border border-white/10"
                />
                
                <ParallaxImage 
                  src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop"
                  scrollYProgress={smoothProgress}
                  startStr="20vw" endStr="-40vw"
                  rotateStart={15} rotateEnd={-25}
                  className="w-56 md:w-80 aspect-square bottom-[15%] right-[5%] shadow-2xl opacity-40 mix-blend-screen grayscale border border-white/10"
                />

                <RevealText>
                   <p className="text-white/60 leading-relaxed italic font-serif text-lg max-w-xl mx-auto z-20 bg-black/60 p-8 backdrop-blur-md border border-white/10 relative">
                     Discover the perfect blend of horizontal momentum and vertical scroll depth, tied together with native react integrations.
                     <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#f27d26]"></span>
                     <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#f27d26]"></span>
                   </p>
                </RevealText>
             </div>
          </div>

          {/* SLIDE 3 */}
          <div className="w-[100vw] h-full flex flex-col items-center justify-center p-8 shrink-0 relative bg-[#050505] text-white border-r border-white/5">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1600783457197-d86ce0715392?q=80&w=2000&auto=format&fit=crop')] bg-cover mix-blend-overlay grayscale" />
              <div className="z-10 w-full max-w-7xl mx-auto px-8 md:px-12">
                 <RevealText>
                   <span className="text-[#f27d26] font-mono text-sm tracking-widest block mb-4 uppercase">03 &mdash; VOLUME</span>
                   <div className="text-6xl md:text-[9rem] lg:text-[11rem] font-sans font-black uppercase tracking-tighter leading-none mb-8 whitespace-nowrap">
                     <span className="text-gradient-white pb-4 pr-4">Fluid Design</span>
                   </div>
                 </RevealText>
                 <div className="flex justify-end">
                    <RevealText>
                      <p className="text-white/40 leading-relaxed max-w-md ml-0 md:ml-20 text-sm italic font-serif text-right border-r-2 border-[#f27d26] pr-6">
                        Crafted to transition smoothly across sections. Utilizing precise parallax mapping directly from scroll progress.
                      </p>
                    </RevealText>
                 </div>
              </div>
          </div>

          {/* SLIDE 4 */}
          <div className="w-[100vw] h-full flex flex-col items-center justify-center p-8 shrink-0 relative bg-[#0a0a0a] text-white overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-[#f27d26]/5 to-transparent"></div>
             <div className="w-full max-w-5xl text-center z-10 flex flex-col items-center border border-white/5 p-8 md:p-16 relative">
                 <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/30"></span>
                 <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/30"></span>
                 <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/30"></span>
                 <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/30"></span>

                <RevealText>
                  <span className="text-[#f27d26] font-mono text-sm tracking-widest block mb-4 uppercase">04 &mdash; FINALE</span>
                  <h2 className="text-5xl md:text-[6rem] lg:text-[8rem] font-black font-sans uppercase tracking-tighter mb-8 leading-none">
                    <span className="text-gradient-white pb-4 pr-4">Ready for Limitless?</span>
                  </h2>
                </RevealText>
                <RevealText>
                  <p className="text-white/40 text-lg md:text-xl italic font-serif max-w-2xl mx-auto">
                    The horizontal journey ends here, but the experience continues seamlessly as you scroll down back to standard view.
                  </p>
                </RevealText>
             </div>
          </div>
        </motion.div>

        {/* Floating Horizontal Navigation - Bold Theme */}
        <div className="absolute bottom-8 w-full hidden md:flex justify-between items-end px-12 z-50 pointer-events-none">
          <div className="flex flex-col items-start gap-4 pointer-events-auto">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">Chapter Navigation</span>
            <div className="flex gap-4">
              <button onClick={() => scrollToScreen(0)} className="text-lg font-black tracking-tighter text-white/40 hover:text-white transition-colors">01</button>
              <button onClick={() => scrollToScreen(1)} className="text-lg font-black tracking-tighter text-white/40 hover:text-white transition-colors">02</button>
              <button onClick={() => scrollToScreen(2)} className="text-lg font-black tracking-tighter text-white/40 hover:text-white transition-colors">03</button>
              <button onClick={() => scrollToScreen(3)} className="text-lg font-black tracking-tighter text-white/40 hover:text-white transition-colors">04</button>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2 pointer-events-auto">
            <div className="flex gap-4">
              <button onClick={() => {
                const step = window.innerHeight;
                window.scrollBy({ top: -step, behavior: 'smooth' });
              }} className="h-12 w-12 border border-white/10 flex items-center justify-center hover:bg-white/5 text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button onClick={() => {
                const step = window.innerHeight;
                window.scrollBy({ top: step, behavior: 'smooth' });
              }} className="h-12 w-12 border border-[#f27d26] bg-[#f27d26] text-[#050505] flex items-center justify-center hover:bg-[#ff8a33] transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
