/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Hero } from './components/Hero';
import { HorizontalScroll } from './components/HorizontalScroll';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="bg-[#050505] text-white min-h-screen antialiased selection:bg-[#f27d26] selection:text-[#050505]">
      {/* Navigation Bar */}
      <nav className="absolute top-0 w-full flex justify-between items-center px-8 md:px-12 py-8 z-50 pointer-events-none">
        <div className="text-xl font-black tracking-tighter uppercase italic pointer-events-auto">Vanguard.</div>
        <div className="hidden md:flex gap-10 text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 pointer-events-auto">
          <a href="#" className="text-white border-b border-white pb-1">Home</a>
          <a href="#" className="hover:text-white">Exhibits</a>
          <a href="#" className="hover:text-white">Archive</a>
          <a href="#" className="hover:text-white">About</a>
        </div>
        <div className="h-10 w-10 flex flex-col justify-center gap-1.5 cursor-pointer group pointer-events-auto">
          <div className="h-[2px] w-8 bg-white"></div>
          <div className="h-[2px] w-5 bg-white group-hover:w-8 transition-all"></div>
        </div>
      </nav>

      <Hero />
      <HorizontalScroll />
      <Footer />
    </div>
  );
}
