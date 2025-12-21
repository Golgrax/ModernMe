import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, Variants } from 'framer-motion';
import { Github, ExternalLink, Folder, Maximize2, AlertCircle, Terminal as TerminalIcon } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: 1,
    title: "Syqlorix",
    description: "A hyper-minimalist Python micro-framework for building web applications. It offers a pure Python DSL for authoring web interfaces, complete with a live-reloading server, a powerful static site generator, and advanced features like middleware, blueprints, and a built-in test client.",
    tags: ["Python"],
    image: "https://repository-images.githubusercontent.com/993542113/f4ae1967-5f0e-401a-a2c7-9ca0f4a7c40f",
    link: "https://pypi.org/project/syqlorix",
    github: "https://github.com/Syqlorix/Syqlorix"
  },
  {
    id: 2,
    title: "Coming Soon 1",
    description: "Details coming soon...",
    tags: ["TBA"],
    image: "",
    link: "#",
    github: "#"
  },
  {
    id: 3,
    title: "Coming Soon 2",
    description: "Details coming soon...",
    tags: ["TBA"],
    image: "",
    link: "#",
    github: "#"
  },
  {
    id: 4,
    title: "Coming Soon 3",
    description: "Details coming soon...",
    tags: ["TBA"],
    image: "",
    link: "#",
    github: "#"
  }
];

const layerVariants: Variants = {
  rest: { 
    x: 0, 
    y: 0, 
    scale: 1, 
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "backOut" }
  },
  hover: (custom) => ({
    ...custom,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } // Spring-like ease
  })
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const ref = useRef<HTMLDivElement>(null);
    
    // Motion values for rotation
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const hoverOpacity = useMotionValue(0);
    
    // Motion values for lighting/shadow tracking
    const mouseXPct = useMotionValue(0.5); 
    const mouseYPct = useMotionValue(0.5);

    // Spring physics
    const springConfig = { stiffness: 100, damping: 30, mass: 1 };
    
    const rotateX = useSpring(y, springConfig);
    const rotateY = useSpring(x, springConfig);
    const opacitySpring = useSpring(hoverOpacity, { stiffness: 200, damping: 30 });
    
    // Lighting Springs
    const shadowX = useSpring(mouseXPct, springConfig);
    const shadowY = useSpring(mouseYPct, springConfig);

    // Light follows cursor (Flashlight effect)
    // REVERSED: Highlight is AT the cursor position
    const highlightGradient = useMotionTemplate`radial-gradient(600px circle at ${shadowX.get() * 100}% ${shadowY.get() * 100}%, rgba(255,255,255,0.15) 0%, transparent 80%)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const localX = e.clientX - rect.left;
        const localY = e.clientY - rect.top;
        
        // Calculate Percentages for Lighting
        const xPct = localX / width;
        const yPct = localY / height;
        
        mouseXPct.set(xPct);
        mouseYPct.set(yPct);
        hoverOpacity.set(1);

        // "Avoid Cursor" Logic:
        const rX = (yPct - 0.5) * -45; // Tilt range
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
            // Ensure animation resets when out of view by allowing re-entry
            viewport={{ once: false, margin: "-100px" }}
            className="group relative h-[460px] w-full perspective-1000 cursor-pointer"
        >
             {/* --- GROUND ANCHOR SHADOW --- */}
             {/* Stays deep in the background, doesn't move with layers, acts as the wall shadow */}
             <motion.div
                style={{ z: -300 }}
                className="absolute -inset-20 bg-black/80 blur-3xl rounded-[40%] pointer-events-none"
             />

             {/* --- DEEP BACKING STACK (Deconstructed Engine Block) --- */}
             {/* Uses Framer Motion variants to prevent CSS transform conflicts */}
             
             {/* Layer 5: Deepest Base (Circuitry Texture) - Moves DOWN & RIGHT */}
             <motion.div 
                variants={layerVariants}
                custom={{ y: 100, x: 40, rotate: 2 }}
                style={{ z: -200 }}
                className="absolute inset-0 bg-[#050505] rounded-xl border border-white/5 overflow-hidden"
             >
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                <div className="absolute bottom-4 left-4 text-[9px] font-mono text-gray-700">SYS_KERNEL_PANIC_PROTECTION</div>
             </motion.div>

             {/* Layer 4: Wide Plate (Cooling Vents) - Moves UP & SCALES */}
             <motion.div 
                variants={layerVariants}
                custom={{ y: -90, scaleX: 1.15 }}
                style={{ z: -160 }}
                // Removed shadow-2xl to prevent floating shadow artifact
                className="absolute top-8 bottom-8 -left-12 -right-12 bg-[#0a0a0a] rounded-xl border border-white/5 flex items-center justify-between px-3"
             >
                {/* Left Vents */}
                <div className="flex flex-col gap-1.5 opacity-50">
                    {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-8 bg-gray-700 rounded-full" />)}
                </div>
                {/* Right Vents */}
                <div className="flex flex-col gap-1.5 opacity-50">
                    {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-8 bg-gray-700 rounded-full" />)}
                </div>
             </motion.div>

             {/* Layer 3: Tech Grid Layer (Schematic) - SCALES UP & ROTATES */}
             <motion.div 
                variants={layerVariants}
                custom={{ scale: 1.35, rotate: -3 }}
                style={{ z: -120 }}
                className="absolute inset-0 bg-[#080808] rounded-xl border border-primary/10 bg-grid-pattern opacity-60 overflow-hidden flex items-center justify-center"
             >
                <div className="w-[120%] h-[120%] border-2 border-dashed border-primary/5 rounded-full animate-[spin_20s_linear_infinite]" />
             </motion.div>

             {/* Layer 2: Left Shifted Plate (Error Logs) - Moves FAR LEFT & DOWN */}
             <motion.div 
                variants={layerVariants}
                custom={{ x: -130, y: 40, rotate: -2 }}
                style={{ z: -80 }}
                // Removed shadow-lg
                className="absolute inset-0 bg-[#0c0c0c] rounded-xl border-l-2 border-l-red-900 border-y border-r border-white/10 flex flex-col justify-end p-4 items-start"
             >
                <div className="flex items-center gap-2 mb-2 opacity-60">
                    <AlertCircle size={12} className="text-red-700" />
                    <span className="text-[8px] font-mono text-red-800">CRITICAL_PROCESS</span>
                </div>
                <div className="w-full space-y-1 opacity-20">
                    <div className="h-1 w-full bg-red-900 rounded-full" />
                    <div className="h-1 w-2/3 bg-red-900 rounded-full" />
                    <div className="h-1 w-3/4 bg-red-900 rounded-full" />
                </div>
             </motion.div>

             {/* Layer 1: Right Shifted Plate (Binary Stream) - Moves FAR RIGHT & UP */}
             <motion.div 
                variants={layerVariants}
                custom={{ x: 130, y: -40, rotate: 2 }}
                style={{ z: -40 }}
                // Removed shadow-lg
                className="absolute inset-0 bg-[#0c0c0c] rounded-xl border-r-2 border-r-cyan-900 border-y border-l border-white/10 flex flex-col p-4 items-end"
             >
                <div className="flex items-center gap-2 mb-2 opacity-60">
                    <span className="text-[8px] font-mono text-cyan-800">STREAM_01</span>
                    <TerminalIcon size={12} className="text-cyan-900" />
                </div>
                <div className="text-[8px] font-mono text-cyan-900/40 text-right leading-tight select-none">
                    10110010<br/>
                    01001101<br/>
                    11100010<br/>
                    00111001
                </div>
             </motion.div>


             {/* === MAIN CHASSIS (Exploded Parts) === */}

             {/* PART 1: HEADER (Window Title) - FIXED TO BODY */}
             <motion.div 
                variants={{
                    rest: { y: 0, z: 0 },
                    hover: { y: 0, z: 20 }
                }}
                className="absolute top-0 left-0 right-0 h-14 bg-[#151515] border-x border-t border-white/10 rounded-t-xl z-40 flex items-center px-4 justify-between"
                style={{ transformStyle: "preserve-3d" }}
             >
                <div className="flex gap-2.5">
                   <div className="w-3 h-3 rounded-full bg-[#2a2a2a] group-hover:bg-red-500 transition-colors shadow-inner" />
                   <div className="w-3 h-3 rounded-full bg-[#2a2a2a] group-hover:bg-yellow-500 transition-colors shadow-inner" />
                   <div className="w-3 h-3 rounded-full bg-[#2a2a2a] group-hover:bg-green-500 transition-colors shadow-inner" />
                </div>
                <div className="text-[11px] font-mono text-gray-500 group-hover:text-white transition-colors flex items-center gap-2">
                   <Folder size={12} /> ~/workspace/{project.title.toLowerCase().replace(/\s/g, '_')}
                </div>
                <div className="p-1.5 rounded-md bg-[#222] group-hover:bg-primary/20 transition-colors">
                    <Maximize2 size={12} className="text-gray-500 group-hover:text-primary" />
                </div>
             </motion.div>

             {/* PART 2: THE CORE (Image Container) - CONNECTED TO HEADER/FOOTER */}
             {/* Converted to motion.div to sync Z-movement with Header/Footer */}
             <motion.div 
                variants={{
                    rest: { z: 0 },
                    hover: { z: 20 }
                }}
                className="absolute top-14 bottom-20 left-0 right-0 bg-[#0f0f0f] border-x border-white/10 z-30 overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
             >
                {/* 1. Deep Background Texture */}
                <div 
                    className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" 
                    style={{ transform: "translateZ(-80px) scale(1.5)" }}
                />

                {/* 2. The Image (Deep Inside the Box) */}
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110 opacity-40 group-hover:opacity-60"
                    style={{ 
                        backgroundImage: `url(${project.image})`, 
                        transform: "translateZ(-50px) scale(1.1)" 
                    }}
                />
                
                {/* 3. Floating Content (Foreground) */}
                <div className="absolute inset-0 p-6 flex flex-col justify-center items-center text-center z-50 pointer-events-none">
                   <motion.h3 
                      variants={{
                          rest: { z: 30 },
                          hover: { z: 80 }
                      }}
                      className="text-3xl font-bold text-white mb-4"
                   >
                      {project.title}
                   </motion.h3>
                   <motion.div 
                      variants={{
                          rest: { z: 15 },
                          hover: { z: 60 }
                      }}
                      className="bg-[#000000] border border-white/20 px-4 py-2.5 rounded-lg text-xs text-gray-300 max-w-[85%]"
                   >
                      {project.description}
                   </motion.div>
                </div>

                {/* 4. Glass Reflection Layer (Surface) */}
                <motion.div 
                    className="absolute inset-0 z-40 pointer-events-none mix-blend-overlay border-y border-white/5"
                    style={{ background: highlightGradient, opacity: opacitySpring, transform: "translateZ(20px)" }}
                />
             </motion.div>

             {/* PART 3: FOOTER (Control Panel) - FIXED TO BODY */}
             <motion.div 
                variants={{
                    rest: { y: 0, z: 0 },
                    hover: { y: 0, z: 20 }
                }}
                className="absolute bottom-0 left-0 right-0 h-20 bg-[#151515] border-x border-b border-white/10 rounded-b-xl z-40 flex items-center justify-between px-6"
                style={{ transformStyle: "preserve-3d" }}
             >
                 <div className="flex gap-2">
                    {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono text-cyan-200 bg-[#0a2f35] border border-cyan-800/50 px-2.5 py-1 rounded shadow-sm">
                            {tag}
                        </span>
                    ))}
                 </div>

                 <div className="flex gap-3">
                     <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-[#222] border border-white/10 rounded-lg hover:bg-white hover:text-black hover:scale-110 transition-all shadow-lg">
                        <Github size={16} />
                     </a>
                     <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-primary/20 border border-primary/30 text-primary rounded-lg hover:bg-primary hover:text-white hover:scale-110 transition-all shadow-lg">
                        <ExternalLink size={16} />
                     </a>
                 </div>
             </motion.div>
        </motion.div>
    );
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-40 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-8 bg-primary rounded-full"></div>
                <h2 className="text-4xl font-bold text-white">Projects</h2>
            </div>
            <p className="text-gray-400 font-mono text-sm bg-[#0a0a0a] px-4 py-1.5 rounded-lg border border-white/5 inline-flex items-center gap-2 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> /home/benjo/projects/current
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 perspective-container">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;