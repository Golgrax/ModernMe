import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Wifi, Battery, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: '~/about', href: '#about' },
  { label: '~/skills', href: '#skills' },
  { label: '~/projects', href: '#projects' },
  { label: '~/contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Top Floating Panel - KDE/GNOME Style */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
      >
        <div className="glass-panel rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl max-w-5xl w-full justify-between">
          
          {/* Logo / Menu Button */}
          <div className="flex items-center gap-4">
             <motion.a 
                href="#"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-2 rounded-full bg-gradient-to-br from-primary to-secondary text-white"
             >
                <Terminal size={20} />
             </motion.a>
             <span className="hidden md:block font-bold tracking-tight">Golgrax@benjo</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1 border border-white/5">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* System Tray Indicators */}
          <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
             <div className="hidden md:flex items-center gap-3 border-r border-white/10 pr-4">
                <Wifi size={14} />
                <Volume2 size={14} />
                <Battery size={14} />
             </div>
             <div className="min-w-[80px] text-center">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
             </div>
             
             {/* Mobile Hamburger */}
             <button
                className="md:hidden text-white ml-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
             </button>
          </div>

        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-24 left-4 right-4 z-40 glass-panel rounded-2xl overflow-hidden md:hidden"
          >
            <div className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;