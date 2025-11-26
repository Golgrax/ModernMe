import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [cursorXY, setCursorXY] = useState({ x: -100, y: -100 });
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [repoCount, setRepoCount] = useState<number | string>('...');
  const [grade, setGrade] = useState<string>('...');

  const { scrollYProgress } = useScroll();
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorXY({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', moveCursor);

    const fetchStats = async () => {
      try {
        const res = await fetch('/stats.json');
        if (res.ok) {
          const data = await res.json();
          setLastUpdated(data.lastUpdated);
          setRepoCount(data.repoCount);
          setGrade(data.grade);
        }
      } catch (error) {
        console.error('Failed to fetch stats for date:', error);
      }
    };

    fetchStats();

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <div className="bg-[#030014] min-h-screen text-white selection:bg-primary/30 selection:text-white overflow-x-hidden perspective-wrapper relative">
      <style>{`
        .perspective-wrapper {
          perspective: 2000px;
        }
        .perspective-grid {
          background-size: 60px 60px;
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          transform: rotateX(45deg) scale(2);
          transform-origin: 50% 0%;
        }
      `}</style>
      
      {/* 3D Moving Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-start justify-center">
          <motion.div 
            style={{ y: gridY }}
            className="w-[200vw] h-[200vh] perspective-grid absolute top-[-50vh]"
          />
          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-[#030014]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030014] via-transparent to-[#030014]" />
          
          {/* Spotlight */}
          <div 
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(1000px circle at ${cursorXY.x}px ${cursorXY.y}px, rgba(139, 92, 246, 0.08), transparent 50%)`
            }}
          />
      </div>

      <Navbar />
      
      <main className="relative z-10 flex flex-col gap-0">
        <Hero lastUpdated={lastUpdated} />
        <About repoCount={repoCount} grade={grade} />
        <TechStack />
        <Projects />
        <Contact />
      </main>

      <Footer lastUpdated={lastUpdated} />
    </div>
  );
};

export default App;