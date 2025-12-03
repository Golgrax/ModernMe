
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate, Variants } from 'framer-motion';
import { User, Globe, Sparkles, Cpu, FolderOpen, Music, Coffee, Settings, Shield, Activity } from 'lucide-react';

const layerVariants: Variants = {
  rest: { 
    x: 0, 
    y: 0, 
    scale: 1, 
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "backOut" }
  },
  hover: (custom: any) => ({
    ...custom,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }
  })
};

interface Profile3DCardProps {
  repoCount: number | string;
  grade: string;
}

const Profile3DCard: React.FC<Profile3DCardProps> = ({ repoCount, grade }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for rotation
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const hoverOpacity = useMotionValue(0);

  // Motion values for lighting/shadow tracking
  const mouseXPct = useMotionValue(0.5); 
  const mouseYPct = useMotionValue(0.5);

  const springConfig = { stiffness: 100, damping: 30, mass: 1 };

  const rotateX = useSpring(y, springConfig);
  const rotateY = useSpring(x, springConfig);
  const opacitySpring = useSpring(hoverOpacity, { stiffness: 200, damping: 30 });
  
  const shadowX = useSpring(mouseXPct, springConfig);
  const shadowY = useSpring(mouseYPct, springConfig);

  const highlightGradient = useMotionTemplate`radial-gradient(600px circle at ${shadowX.get() * 100}% ${shadowY.get() * 100}%, rgba(255,255,255,0.15) 0%, transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;
      
      const xPct = localX / width;
      const yPct = localY / height;
      
      mouseXPct.set(xPct);
      mouseYPct.set(yPct);
      hoverOpacity.set(1);

      // "Avoid Cursor" Logic
      const rX = (yPct - 0.5) * -45; 
      const rY = (xPct - 0.5) * 45; 

      x.set(rY);
      y.set(rX);
  };

  const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
      hoverOpacity.set(0);
      mouseXPct.set(0.5);
      mouseYPct.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY
      }}
      initial="rest"
      whileHover="hover"
      whileInView="rest"
      viewport={{ once: false, margin: "-100px" }}
      className="group relative h-[600px] w-full perspective-1000 cursor-pointer"
    >
       {/* --- GROUND ANCHOR SHADOW --- */}
       <motion.div
          style={{ z: -300 }}
          className="absolute -inset-20 bg-black/80 blur-3xl rounded-[40%] pointer-events-none"
       />

       {/* --- DEEP BACKING STACK --- */}
       
       {/* Layer 5: Base - Moves DOWN & RIGHT */}
       <motion.div 
          variants={layerVariants}
          custom={{ y: 100, x: 40, rotate: 2 }}
          style={{ z: -200 }}
          className="absolute inset-0 bg-[#050505] rounded-xl border border-white/5 overflow-hidden"
       >
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
          <div className="absolute bottom-4 left-4 text-[9px] font-mono text-gray-700">USER_DAEMON_CONFIG_V2</div>
       </motion.div>

       {/* Layer 4: Wide Plate - Moves UP & SCALES */}
       <motion.div 
          variants={layerVariants}
          custom={{ y: -90, scaleX: 1.15 }}
          style={{ z: -160 }}
          className="absolute top-8 bottom-8 -left-12 -right-12 bg-[#0a0a0a] rounded-xl border border-white/5 flex items-center justify-between px-3"
       >
          <div className="flex flex-col gap-1.5 opacity-50">
              {[1,2,3,4,5,6].map(i => <div key={i} className="w-1 h-6 bg-gray-700 rounded-full" />)}
          </div>
          <div className="flex flex-col gap-1.5 opacity-50">
              {[1,2,3,4,5,6].map(i => <div key={i} className="w-1 h-6 bg-gray-700 rounded-full" />)}
          </div>
       </motion.div>

       {/* Layer 3: Tech Grid Layer - SCALES UP & ROTATES */}
       <motion.div 
          variants={layerVariants}
          custom={{ scale: 1.35, rotate: -3 }}
          style={{ z: -120 }}
          className="absolute inset-0 bg-[#080808] rounded-xl border border-primary/10 bg-grid-pattern opacity-60 overflow-hidden flex items-center justify-center"
       >
          <div className="w-[120%] h-[120%] border-2 border-dashed border-primary/5 rounded-full animate-[spin_30s_linear_infinite]" />
       </motion.div>

       {/* Layer 2: Left Shifted Plate - Moves FAR LEFT & DOWN */}
       <motion.div 
          variants={layerVariants}
          custom={{ x: -130, y: 40, rotate: -2 }}
          style={{ z: -80 }}
          className="absolute inset-0 bg-[#0c0c0c] rounded-xl border-l-2 border-l-yellow-900 border-y border-r border-white/10 flex flex-col justify-end p-4 items-start"
       >
          <div className="flex items-center gap-2 mb-2 opacity-60">
              <Shield size={12} className="text-yellow-700" />
              <span className="text-[8px] font-mono text-yellow-800">FIREWALL_ACTIVE</span>
          </div>
          <div className="w-full space-y-1 opacity-20">
              <div className="h-1 w-full bg-yellow-900 rounded-full" />
              <div className="h-1 w-2/3 bg-yellow-900 rounded-full" />
          </div>
       </motion.div>

       {/* Layer 1: Right Shifted Plate - Moves FAR RIGHT & UP */}
       <motion.div 
          variants={layerVariants}
          custom={{ x: 130, y: -40, rotate: 2 }}
          style={{ z: -40 }}
          className="absolute inset-0 bg-[#0c0c0c] rounded-xl border-r-2 border-r-purple-900 border-y border-l border-white/10 flex flex-col p-4 items-end"
       >
          <div className="flex items-center gap-2 mb-2 opacity-60">
              <span className="text-[8px] font-mono text-purple-800">AUTH_KEYS</span>
              <Settings size={12} className="text-purple-900" />
          </div>
          <div className="text-[8px] font-mono text-purple-900/40 text-right leading-tight select-none">
              ssh-rsa AAAAB3<br/>
              NzaC1yc2EAAA<br/>
              ADAQABAAABgQ<br/>
              DlKj9+...
          </div>
       </motion.div>


       {/* === MAIN CHASSIS (Exploded Parts) === */}

       {/* PART 1: HEADER (Window Title) - FIXED TO BODY */}
       <motion.div 
          variants={{
              rest: { y: 0, z: 0 },
              hover: { y: 0, z: 20 }
          }}
          className="absolute top-0 left-0 right-0 h-12 bg-[#151515] border-x border-t border-white/10 rounded-t-xl z-40 flex items-center px-4 justify-between"
          style={{ transformStyle: "preserve-3d" }}
       >
          <div className="flex gap-2">
             <div className="w-3 h-3 rounded-full bg-[#2a2a2a] group-hover:bg-red-500 transition-colors shadow-inner" />
             <div className="w-3 h-3 rounded-full bg-[#2a2a2a] group-hover:bg-yellow-500 transition-colors shadow-inner" />
             <div className="w-3 h-3 rounded-full bg-[#2a2a2a] group-hover:bg-green-500 transition-colors shadow-inner" />
          </div>
          <div className="text-xs text-gray-500 font-mono flex items-center gap-2 group-hover:text-white transition-colors">
            <Settings size={12} /> System Settings - User
          </div>
          <div className="w-10"></div>
       </motion.div>

       {/* PART 2: THE CORE (Profile Content) - Hollow Effect */}
       {/* Converted to motion.div to sync Z-movement with Header */}
       <motion.div 
          variants={{
              rest: { z: 0 },
              hover: { z: 20 }
          }}
          className="absolute top-12 bottom-0 left-0 right-0 bg-[url('https://github.com/Golgrax/Golgrax/blob/main/yeeepeee.gif?raw=true')] bg-contain bg-top bg-no-repeat border-x border-b border-white/10 rounded-b-xl z-30 overflow-hidden"
          style={{ transformStyle: "preserve-3d", backgroundColor: '#0f0f0f' }}
       >
          {/* 1. Deep Background Texture */}
          <div 
              className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" 
              style={{ transform: "translateZ(-80px) scale(1.5)" }}
          />
          
          {/* 2. Background Gradient Blob */}
          <div 
            className="absolute top-0 w-full h-40 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"
            style={{ transform: "translateZ(-60px)" }}
          />

          {/* 3. Floating Content (Diorama) */}
          <div className="absolute inset-0 p-6 flex flex-col items-center z-50 pointer-events-none">
             
             {/* Profile Picture - Floats Forward */}
             <motion.div 
                variants={{
                    rest: { z: 20, scale: 1 },
                    hover: { z: 100, scale: 1.1 }
                }}
                className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-primary to-secondary relative mb-6 shadow-2xl ring-4 ring-black/50 pointer-events-auto"
             >
                <img 
                  src="https://github.com/Golgrax.png" 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover" 
                />
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-[#0c0c0c] rounded-full flex items-center justify-center">
                    <Activity size={10} className="text-black" />
                </div>
             </motion.div>

             {/* Name & Handle */}
             <motion.div
                variants={{ rest: { z: 10 }, hover: { z: 60 } }}
                className="text-center mb-6"
             >
                 <h3 className="text-3xl font-bold text-white mb-1">Karl Benjamin R. Bughaw</h3>
                 <p className="text-primary font-mono text-sm bg-primary/10 px-3 py-1 rounded-full inline-block border border-primary/20">
                    Golgrax
                 </p>
             </motion.div>

             {/* Stats Grid */}
             <motion.div
                variants={{ rest: { z: 5 }, hover: { z: 40 } }}
                className="w-full grid grid-cols-2 gap-3 mb-6 pointer-events-auto"
             >
                <div className="bg-[#151515] rounded-lg p-3 flex flex-col items-center hover:bg-[#202020] transition-colors border border-white/5 shadow-lg group/stat">
                   <span className="text-xl font-bold text-white group-hover/stat:text-primary transition-colors">{repoCount}</span>
                   <span className="text-[10px] text-gray-500 uppercase tracking-widest">Public Repos</span>
                </div>
                <div className="bg-[#151515] rounded-lg p-3 flex flex-col items-center hover:bg-[#202020] transition-colors border border-white/5 shadow-lg group/stat">
                   <span className="text-xl font-bold text-white group-hover/stat:text-secondary transition-colors">{grade}</span>
                   <span className="text-[10px] text-gray-500 uppercase tracking-widest">Grade</span>
                </div>
             </motion.div>

             {/* Links / Folders */}
             <motion.div
                variants={{ rest: { z: 0 }, hover: { z: 80 } }}
                className="w-full space-y-2 pointer-events-auto"
             >
                <a href="https://github.com/Golgrax?tab=repositories" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-[#151515] border border-white/5 text-xs sm:text-sm text-gray-300 hover:bg-[#202020] hover:scale-105 transition-all cursor-pointer group/link shadow-md">
                   <FolderOpen size={16} className="text-blue-400 group-hover/link:text-blue-300 transition-colors" />
                   <span>My Projects</span>
                </a>
                <a href="https://ko-fi.com/golgrax" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-[#151515] border border-white/5 text-xs sm:text-sm text-gray-300 hover:bg-[#202020] hover:scale-105 transition-all cursor-pointer group/link shadow-md">
                   <Coffee size={16} className="text-amber-600 group-hover/link:text-amber-500 transition-colors" />
                   <span>Wanna buy me some Coffee?</span>
                </a>
                <a href="https://www.youtube.com/watch?v=1TO48Cnl66w&list=RD1TO48Cnl66w&start_radio=1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-[#151515] border border-white/5 text-xs sm:text-sm text-gray-300 hover:bg-[#202020] hover:scale-105 transition-all cursor-pointer group/link shadow-md">
                   <Music size={16} className="text-purple-400 group-hover/link:text-purple-300 transition-colors" />
                   <span>My Mix Radio</span>
                </a>
             </motion.div>

          </div>

          {/* 4. Glass Reflection Layer */}
          <motion.div 
              className="absolute inset-0 z-40 pointer-events-none mix-blend-overlay border-t border-white/5"
              style={{ background: highlightGradient, opacity: opacitySpring, transform: "translateZ(20px)" }}
          />
       </motion.div>

    </motion.div>
  );
};

interface AboutProps {
  repoCount: number | string;
  grade: string;
}

const About: React.FC<AboutProps> = ({ repoCount, grade }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect: The card moves slower than the text
  const yCard = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yText = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="about" ref={containerRef} className="py-32 relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - 3D Profile Card */}
          <motion.div style={{ y: yCard }} className="md:col-span-5 relative perspective-1000">
             <Profile3DCard repoCount={repoCount} grade={grade} />
          </motion.div>

          {/* Right Column - Details */}
          <motion.div style={{ y: yText }} className="md:col-span-7 pt-10 md:pt-0">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <h2 className="text-sm font-mono text-primary mb-4 tracking-widest uppercase flex items-center gap-2">
                <span className="w-8 h-[1px] bg-primary"></span>
                System Information
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Architecting digital <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">ecosystems</span>.
              </h3>
              
              <div className="space-y-6 text-gray-400 leading-relaxed text-lg font-light">
                <p>
                  I'm a Full-Stack Developer based in Southeast Asia with a strong focus on backend development. I build efficient, scalable, and secure systems.
                </p>
                <p>
                  My favorite languages are Lua/Luau and Python. I enjoy turning complex requirements into solutions that just work and collaborating with teams to ensure every project feels cohesive.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-10">
                {[
                  { icon: User, label: 'Full Stack Engineer' },
                  { icon: Globe, label: 'Distributed Systems' },
                  { icon: Cpu, label: 'Performance Obsessed' },
                  { icon: Sparkles, label: 'UI/UX Enthusiast' },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.02, x: 5 }} 
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all shadow-sm group"
                  >
                    <div className="p-2 rounded-lg bg-white/5 text-secondary group-hover:text-primary transition-colors">
                        <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-200">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
