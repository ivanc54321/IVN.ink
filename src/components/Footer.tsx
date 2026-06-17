export function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/10 py-32 px-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-6 h-full w-full opacity-[0.03]">
        <div className="border-r border-white"></div>
        <div className="border-r border-white"></div>
        <div className="border-r border-white"></div>
        <div className="border-r border-white"></div>
        <div className="border-r border-white"></div>
        <div></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-white">
        <h2 className="text-5xl md:text-[8rem] font-sans font-black uppercase mb-8 tracking-tighter leading-none">
          <span className="text-gradient-white pr-4">Keep</span> <span className="text-[#f27d26]">Expanding</span>
        </h2>
        <p className="text-white/40 leading-relaxed italic font-serif text-lg max-w-xl mx-auto mb-16">
          This layout can seamlessly fit above or below any standard vertical sections, giving you complete flexibility in your design architecture.
        </p>
        <div className="flex gap-8 justify-center items-center text-xs font-mono tracking-[0.2em] text-[#f27d26] uppercase">
          <span>Responsive</span>
          <span className="text-white/20">—</span>
          <span>Parallax</span>
          <span className="text-white/20">—</span>
          <span>Immersive</span>
        </div>
      </div>
    </footer>
  );
}
