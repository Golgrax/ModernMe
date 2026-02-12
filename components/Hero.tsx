import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Activity, Bell, Terminal, Music, Facebook, Twitch, Youtube, Twitter, Code, Instagram } from 'lucide-react';

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor"
    strokeWidth="1.45"
    strokeLinecap="round" 
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ transform: 'scale(1.1)' }}
  >
    <path 
      d="M18.905 5.665c-1.29-.575-2.65-1-4.08-1.29h-.07c-.145.285-.36.715-.5 1.075a16.339 16.339 0 0 0-4.58 0c-.145-.36-.36-.715-.5-1.075h-.07c-1.43.215-2.79.645-4.08 1.29-2.575 3.865-3.29 7.66-2.935 11.38v.07c1.72 1.29 3.365 2.005 5.01 2.505h.07c.36-.5.715-1.075 1-1.645v-.07a10.541 10.541 0 0 1-1.575-.715c-.07 0-.07-.07 0-.07.07-.07.215-.145.285-.215h.07c3.29 1.505 6.8 1.505 10.09 0h.07c.07.07.215.145.285.215.07 0 0 .07 0 .07-.5.285-1 .575-1.575.715 0 0-.07.07 0 .07.285.575.645 1.145 1 1.645h.07c1.645-.5 3.29-1.29 5.01-2.505v-.07c.43-4.295-.715-8.015-3.005-11.38h.01ZM8.67 14.825c-1 0-1.79-.93-1.79-2.005 0-1.075.785-2.005 1.79-2.005s1.79.93 1.79 2.005c0 1.075-.785 2.005-1.79 2.005Zm6.655 0c-1 0-1.79-.93-1.79-2.005 0-1.075.785-2.005 1.79-2.005s1.79.93 1.79 2.005c0 1.075-.785 2.005-1.79 2.005Z" 
    />
  </svg>
);

interface HeroProps {
  lastUpdated: string;
}

const Hero: React.FC<HeroProps> = ({ lastUpdated }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const termY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Enhanced Mouse Tilt - Smoothed Configuration
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Lower stiffness = softer feel. Higher damping = less bounce.
  const springConfig = { stiffness: 100, damping: 30, mass: 0.5 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]); // Reduced angle for subtlety
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-visible pt-32 pb-20 perspective-1000"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Text Content */}
        <motion.div
          style={{ y: textY }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-20 pointer-events-auto lg:-ml-24"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-mono mb-6 backdrop-blur-md shadow-[0_0_15px_-3px_rgba(139,92,246,0.3)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="tracking-wide font-mono">
              {lastUpdated ? `Last updated: ${new Date(lastUpdated).toLocaleString()}` : '...'}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[0.9] tracking-tight">
            <span className="block text-white mb-2 filter drop-shadow-lg">Golgrax</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent filter drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
              Karl Benjamin R. Bughaw
            </span>
          </h1>

          <p className="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed border-l-2 border-white/10 pl-6 font-light">
            I'm <strong className="text-white font-medium">Karl Benjamin R. Bughaw (Golgrax)</strong>. A Full-Stack Developer with a strong focus on backend development, crafting efficient, scalable, and secure systems.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-3 bg-white text-black font-semibold rounded-lg overflow-hidden flex items-center gap-2 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.5)] transition-all"
            >
               Execute <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            
            <div className="flex flex-wrap gap-2">
              {[
                { Icon: Github, href: "https://github.com/Golgrax" },
                { Icon: Twitter, href: "https://twitter.com/BughawBenjo" }, // Used Twitter icon for X
                { Icon: Facebook, href: "https://fb.com/Golgrax" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/golgrax/" },
                { Icon: DiscordIcon, href: "https://discord.com/users/415464095030968320" }, // Replaced Discord
                { Icon: Twitch, href: "https://www.twitch.tv/golgrax" },
                { Icon: Youtube, href: "https://www.youtube.com/channel/UCd3MyQ0HJv_TprG0GHtJ6cQ" },
                { Icon: Code, href: "https://dev.to/bosstdiscord" }, // Replaced DevTo
                { Icon: Instagram, href: "https://instagram.com/golgrax" },
                { Icon: Mail, href: "mailto:benjo@pro.space" }
              ].map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.1)" }}
                  className="p-3 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all bg-black/20 backdrop-blur-sm"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: Interactive 3D Desktop Environment */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            y: termY,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="hidden lg:block relative w-[130%] max-w-6xl perspective-1000 lg:-ml-8" 
        >
          {/* Main Terminal Window */}
          <div 
            className="relative bg-[#0c0c0c]/90 backdrop-blur-xl rounded-xl border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col w-full h-auto min-h-[400px]"
            style={{ transform: "translateZ(20px)" }}
          >
             {/* Window Title Bar */}
             <div className="h-7 bg-[#181818] border-b border-white/5 flex items-center px-4 justify-between select-none shrink-0">
                <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                   <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                   <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-[10px] text-gray-500 font-mono flex items-center gap-2">
                  <Terminal size={10} />
                  Golgrax@benjo: ~
                </div>
                <div className="w-10" />
             </div>

             {/* Terminal Content */}
             <div className="p-6 font-mono text-[10px] leading-[1.3] text-gray-300 relative">
                <div className="flex gap-6 items-start">
                   {/* ASCII Art - Fedora Logo */}
                   <div className="text-blue-500 font-bold select-none leading-[1.1] whitespace-pre hidden sm:block pt-1 opacity-90 text-[9px]">
{`             .',;::::;,'.
         .';:cccccccccccc:;,.
      .;cccccccccccccccccccccc;.
    .:cccccccccccccccccccccccccc:.
  .;ccccccccccccc;.:dddl:.;ccccccc;.
 .:ccccccccccccc;OWMKOOXMWd;ccccccc:.
.:ccccccccccccc;KMMc;cc;xMMc;ccccccc:.
,cccccccccccccc;MMM.;cc;;WW:;cccccccc,
:cccccccccccccc;MMM.;cccccccccccccccc:
:ccccccc;oxOOOo;MMM000k.;cccccccccccc:
cccccc;0MMKxdd:;MMMkddc.;cccccccccccc;
ccccc;XMO';cccc;MMM.;cccccccccccccccc'
ccccc;MMo;ccccc;MMW.;ccccccccccccccc;
ccccc;0MNc.ccc.xMMd;ccccccccccccccc;
cccccc;dNMWXXXWM0:;cccccccccccccc:,
cccccccc;.:odl:.;cccccccccccccc:,.
ccccccccccccccccccccccccccccc:'.
:ccccccccccccccccccccccc:;,..
 ':cccccccccccccccc::;,.`}
                   </div>
                   
                   {/* Fastfetch Info */}
                   <div className="space-y-[1px] flex-1 min-w-0 pt-0.5">
                      <div className="mb-2">
                         <span className="text-blue-400 font-bold">Golgrax</span>
                         <span className="text-white">@</span>
                         <span className="text-blue-400 font-bold">benjo</span>
                         <div className="h-[1px] w-full bg-gray-700 mt-1"></div>
                      </div>

                      <div className="grid grid-cols-[70px_1fr] gap-x-2 content-start">
                        <span className="text-blue-400">OS</span> <span className="truncate">Fedora Linux 42 (KDE Plasma Desktop Edition) x86_64</span>
                        <span className="text-blue-400">Host</span> <span>PC-VKL24XZG1</span>
                        <span className="text-blue-400">Kernel</span> <span>Linux 6.16.8-200.fc42.x86_64</span>
                        <span className="text-blue-400">Uptime</span> <span>2 hours, 46 mins</span>
                        <span className="text-blue-400">Packages</span> <span>2623 (rpm), 65 (flatpak), 25 (snap)</span>
                        <span className="text-blue-400">Shell</span> <span>bash 5.2.37</span>
                        <span className="text-blue-400">Display</span> <span>1366x768 @ 60 Hz (as 1705x959) in 16" [Built-in]</span>
                        <span className="text-blue-400">DE</span> <span>KDE Plasma 6.4.5</span>
                        <span className="text-blue-400">WM</span> <span>KWin (Wayland)</span>
                        <span className="text-blue-400">WM Theme</span> <span>plastik</span>
                        <span className="text-blue-400">Theme</span> <span>Windows (BreezeDark) [Qt], Breeze [GTK3/4]</span>
                        <span className="text-blue-400">Icons</span> <span>breeze [Qt], breeze [GTK3/4]</span>
                        <span className="text-blue-400">Font</span> <span>Noto Sans (10pt) [Qt], Noto Sans (10pt) [GTK3/4]</span>
                        <span className="text-blue-400">Cursor</span> <span>breeze (24px)</span>
                        <span className="text-blue-400">Terminal</span> <span>konsole 25.8.1</span>
                        <span className="text-blue-400">CPU</span> <span>Intel(R) Core(TM) i3-7100U (4) @ 2.40 GHz</span>
                        <span className="text-blue-400">GPU</span> <span>Intel HD Graphics 620 @ 1.00 GHz [Integrated]</span>
                        <span className="text-blue-400">Memory</span> <span>4.56 GiB / 7.51 GiB (61%)</span>
                        <span className="text-blue-400">Swap</span> <span>312.64 MiB / 7.51 GiB (4%)</span>
                        <span className="text-blue-400">Disk (/)</span> <span>109.75 GiB / 464.17 GiB (24%) - btrfs</span>
                        <span className="text-blue-400">Local IP</span> <span>192.168.1.9/24</span>
                        <span className="text-blue-400">Battery</span> <span>99% [AC Connected]</span>
                        <span className="text-blue-400">Locale</span> <span>en_US.UTF-8</span>
                      </div>
                      
                      <div className="flex gap-0 mt-3">
                         <div className="w-5 h-4 bg-gray-500" />
                         <div className="w-5 h-4 bg-red-500" />
                         <div className="w-5 h-4 bg-green-500" />
                         <div className="w-5 h-4 bg-yellow-500" />
                         <div className="w-5 h-4 bg-blue-500" />
                         <div className="w-5 h-4 bg-purple-500" />
                         <div className="w-5 h-4 bg-cyan-500" />
                         <div className="w-5 h-4 bg-white" />
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-blue-400 font-bold">Golgrax@benjo</span>
                        <span className="text-white">:</span>
                        <span className="text-blue-400 font-bold">~</span>
                        <span className="text-white">$</span>
                        <span className="text-white animate-pulse">_</span>
                     </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Floating Widget 1: System Stats */}
          <motion.div
            className="absolute -right-8 top-12 w-36 bg-[#151515]/80 backdrop-blur-md rounded-lg border border-white/10 p-2 shadow-2xl z-30"
            style={{ transform: "translateZ(60px)" }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-2 mb-2 border-b border-white/5 pb-1">
              <Activity size={10} className="text-green-400" />
              <span className="text-[9px] font-bold text-gray-300">System Load</span>
            </div>
            <div className="space-y-1.5">
              <div>
                <div className="flex justify-between text-[8px] text-gray-400 mb-0.5">
                  <span>CPU</span>
                  <span>12%</span>
                </div>
                <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[12%] bg-blue-500 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[8px] text-gray-400 mb-0.5">
                  <span>MEM</span>
                  <span>61%</span>
                </div>
                <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[61%] bg-purple-500 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Widget 2: Music Player */}
          <motion.div
            className="absolute -left-8 bottom-12 w-44 bg-[#151515]/80 backdrop-blur-md rounded-lg border border-white/10 p-2 shadow-2xl z-30"
            style={{ transform: "translateZ(80px)" }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
             <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                   <Music size={12} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                   <div className="text-[9px] font-bold text-white truncate">Lofi Beats 24/7</div>
                   <div className="text-[8px] text-gray-400 truncate">Unknown Artist</div>
                </div>
                <div className="flex gap-0.5">
                   <div className="w-0.5 h-2 bg-green-400 animate-pulse" />
                   <div className="w-0.5 h-1.5 bg-green-400 animate-pulse delay-75" />
                   <div className="w-0.5 h-3 bg-green-400 animate-pulse delay-150" />
                </div>
             </div>
          </motion.div>

           {/* Floating Widget 3: Notification */}
           <motion.div
            className="absolute -right-4 bottom-28 bg-[#151515]/90 backdrop-blur-md rounded-full border border-white/10 py-1.5 px-3 shadow-xl z-40 flex items-center gap-2"
            style={{ transform: "translateZ(100px)" }}
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
             <div className="relative">
                <Bell size={12} className="text-yellow-400" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-[#151515]" />
             </div>
             <span className="text-[9px] text-gray-200">Updates Available (3)</span>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;