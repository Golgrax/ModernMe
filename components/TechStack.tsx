import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, Server, Layers, Box, Terminal, Smartphone, Code2, Download, Github, Coffee, Star, Calculator, Gamepad2, 
  BrainCircuit, ToyBrick, Code, HardDrive, Figma, Share2, FileText, Sparkles, Brush, File, Hammer, Film, BarChart, 
  Smile, Key, Fish, Paintbrush, Turtle, AppWindow, Eye, Keyboard
} from 'lucide-react';
import { Skill } from '../types';

const languages: Skill[] = [
  { name: 'Lua', icon: Code2, color: '#2C2D72' },
  { name: 'Python', icon: Code2, color: '#3776AB' },
  { name: 'C', icon: Code2, color: '#A8B9CC' },
  { name: 'Java', icon: Coffee, color: '#007396' },
  { name: 'JavaScript', icon: Code2, color: '#F7DF1E' },
  { name: 'HTML5', icon: Code2, color: '#E34F26' },
  { name: 'CSS3', icon: Code2, color: '#1572B6' },
  { name: 'SQL', icon: Database, color: '#4479A1' },
  { name: 'Bash/Shell', icon: Terminal, color: '#4EAA25' },
];

const frameworks: Skill[] = [
    { name: 'Node.js', icon: Server, color: '#339933' },
    { name: 'React', icon: Layers, color: '#61DAFB' },
    { name: 'jQuery', icon: Code2, color: '#0769AD' },
    { name: 'Syqlorix', icon: Star, color: '#FFD700' },
    { name: 'Flask', icon: Server, color: '#ffffff' },
    { name: 'dominate', icon: Code2, color: '#83a543' },
    { name: 'NumPy', icon: Calculator, color: '#4D77CF' },
    { name: 'turtle', icon: Turtle, color: '#00A86B' },
    { name: 'pygame', icon: Gamepad2, color: '#6a9727' },
    { name: 'scipy', icon: Calculator, color: '#8CAAE6' },
    { name: 'tkinter', icon: AppWindow, color: '#F0B917' },
    { name: 'TensorFlow', icon: BrainCircuit, color: '#FF6F00' },
    { name: 'PyTorch', icon: BrainCircuit, color: '#EE4C2C' },
    { name: 'Keras', icon: BrainCircuit, color: '#D00000' },
    { name: 'Scikit-learn', icon: BrainCircuit, color: '#F7931E'},
    { name: 'YOLO', icon: Eye, color: '#00FFFF' },
];

const tools: Skill[] = [
  { name: 'Git & GitHub', icon: Github, color: '#181717' },
  { name: 'Docker', icon: Box, color: '#2496ED' },
  { name: 'Roblox Studio', icon: ToyBrick, color: '#DA2D1F'},
  { name: 'VS Code', icon: Code, color: '#007ACC' },
  { name: 'Vim', icon: Terminal, color: '#019733' },
  { name: 'Glitch', icon: Fish, color: '#3333FF' },
  { name: 'Leetcode', icon: Code, color: '#FFA116'},
  { name: 'Blender', icon: Share2, color: '#E87D0D' },
  { name: 'Ghidra', icon: Key, color: '#000000'},
  { name: 'Android Studio', icon: Smartphone, color: '#3DDC84' },
  { name: 'AIDE', icon: Smartphone, color: '#FF6D00' },
  { name: 'CodeBoard', icon: Keyboard, color: '#8A2BE2' },
  { name: 'Spck Editor', icon: Code, color: '#1E90FF' },
  { name: 'ADB', icon: Terminal, color: '#3DDC84' },
  { name: 'GNU/Linux', icon: HardDrive, color: '#FCC624'},
  { name: 'Figma', icon: Figma, color: '#F24E1E' },
  { name: 'KWrite', icon: FileText, color: '#277399' },
  { name: 'Kate', icon: FileText, color: '#277399' },
  { name: 'GHex', icon: FileText, color: '#8B0000' },
  { name: 'Wonderland Editor', icon: Sparkles, color: '#8A2BE2' },
  { name: 'GIMP', icon: Brush, color: '#5C5547' },
  { name: 'Krita', icon: Brush, color: '#202E3A' },
  { name: 'KolourPaint', icon: Paintbrush, color: '#F612A0' },
  { name: 'LibreOffice', icon: File, color: '#18A303' },
  { name: 'Gedit', icon: FileText, color: '#F9D441' },
  { name: 'Builder', icon: Hammer, color: '#2E3436' },
  { name: 'Kdenlive', icon: Film, color: '#83A543'},
  { name: 'KDevelop', icon: Code, color: '#007396' },
  { name: 'Kaggle', icon: BarChart, color: '#20BEFF'},
  { name: 'Hugging Face', icon: Smile, color: '#FFD000' },
];

const skillCategories = {
  'Languages': languages,
  'Frameworks & Libraries': frameworks,
  'Tools & Platforms': tools,
};

type Tab = keyof typeof skillCategories;

const TechStack: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Languages');
  
  const skills = skillCategories[activeTab];

  return (
    <section id="skills" className="py-32 relative z-10">
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mb-4 border border-white/10 shadow-[0_0_30px_-10px_rgba(139,92,246,0.3)] backdrop-blur-md">
            <Box size={32} className="text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">
            Software Center
          </h2>
          <p className="text-gray-400 font-mono text-sm bg-white/5 px-4 py-1 rounded-full border border-white/5">
             pkgs.benjo.dev/repository/stable
          </p>
        </motion.div>

        {/* Window-style Grid Container */}
        <div className="bg-[#0f0f0f]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
            {/* Window Toolbar */}
            <div className="h-12 border-b border-white/5 bg-white/5 flex items-center px-6 justify-between">
                <div className="flex gap-4 text-sm font-medium text-gray-400">
                    {(Object.keys(skillCategories) as Tab[]).map((tab) => (
                      <span
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`cursor-pointer transition-colors p-2 ${
                          activeTab === tab
                            ? "text-white border-b-2 border-primary"
                            : "hover:text-white"
                        }`}
                      >
                        {tab}
                      </span>
                    ))}
                </div>

            </div>

            {/* Grid Content */}
            <div className="p-8 md:p-12 bg-grid-pattern">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
                >
                {skills.map((skill, idx) => (
                    <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group relative"
                    >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10" />
                    
                    <div className="p-5 flex flex-col items-center gap-4 relative z-10 cursor-pointer">
                        <motion.div 
                            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className="w-16 h-16 rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden bg-[#1a1a1a] group-hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.2)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                            <skill.icon 
                                size={32} 
                                style={{ color: skill.color }}
                                className="filter drop-shadow-md"
                            />
                        </motion.div>
                        
                        <div className="text-center">
                            <h3 className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">{skill.name}</h3>
                        </div>

                        <button className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 p-1 bg-white/10 rounded-full hover:bg-white/20">
                            <Download size={12} className="text-white" />
                        </button>
                    </div>
                    </motion.div>
                ))}
                </motion.div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;