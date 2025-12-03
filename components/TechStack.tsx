import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Box, Download, Github, Coffee, Star, Calculator, Gamepad2, 
  BrainCircuit, ToyBrick, Code, HardDrive, Figma, Share2, FileText, Sparkles, Brush, File, Hammer, Film, BarChart, 
  Smile, Key, Fish, Paintbrush, Turtle, AppWindow, Eye, Keyboard, Bot
} from 'lucide-react';
import { Skill } from '../types';

const languages: Skill[] = [
  { name: 'Lua', icon: '/logos/lua.svg', color: '#2C2D72' },
  { name: 'Python', icon: '/logos/python.png', color: '#3776AB' },
  { name: 'C', icon: '/logos/c.png', color: '#A8B9CC' },
  { name: 'Java', icon: '/logos/java.svg', color: '#007396' },
  { name: 'JavaScript', icon: '/logos/javascript.png', color: '#F7DF1E' },
  { name: 'HTML5', icon: '/logos/html5.svg', color: '#E34F26' },
  { name: 'CSS3', icon: '/logos/css3.svg', color: '#1572B6' },
  { name: 'SQL', icon: '/logos/sql.png', color: '#4479A1' },
  { name: 'Bash/Shell', icon: '/logos/bash.png', color: '#4EAA25' },
];

const frameworks: Skill[] = [
    { name: 'Node.js', icon: '/logos/nodejs.svg', color: '#339933' },
    { name: 'React', icon: '/logos/react.svg', color: '#61DAFB' },
    { name: 'jQuery', icon: '/logos/jquery.svg', color: '#0769AD' },
    { name: 'Syqlorix', icon: '/logos/syqlorix.svg', color: '#FFD700' },
    { name: 'Elyth', icon: '/logos/elyth.svg', color: '#7289DA' },
    { name: 'Flask', icon: '/logos/flask.svg', color: '#ffffff' },
    { name: 'dominate', icon: '/logos/python-powered.png', color: '#83a543' },
    { name: 'NumPy', icon: '/logos/numpy.svg', color: '#4D77CF' },
    { name: 'turtle', icon: '/logos/python-turtle.png', color: '#00A86B' },
    { name: 'pygame', icon: '/logos/pygame.svg', color: '#6a9727' },
    { name: 'scipy', icon: '/logos/scipy.png', color: '#8CAAE6' },
    { name: 'tkinter', icon: '/logos/python-powered.png', color: '#F0B917' },
    { name: 'TensorFlow', icon: '/logos/tensorflow.svg', color: '#FF6F00' },
    { name: 'PyTorch', icon: '/logos/pytorch.svg', color: '#EE4C2C' },
    { name: 'Keras', icon: '/logos/keras.png', color: '#D00000' },
    { name: 'Scikit-learn', icon: '/logos/scikit-learn.svg', color: '#F7931E'},
    { name: 'YOLO', icon: '/logos/yolo.png', color: '#00FFFF' },
];

const tools: Skill[] = [
  { name: 'Git', icon: '/logos/git.png', color: '#181717' },
  { name: 'GitHub', icon: '/logos/github.png', color: '#181717' },
  { name: 'Docker', icon: '/logos/docker.svg', color: '#2496ED' },
  { name: 'Roblox Studio', icon: '/logos/roblox-studio.png', color: '#00A2FF'},
  { name: 'VS Code', icon: '/logos/vscode.svg', color: '#007ACC' },
  { name: 'Vim', icon: '/logos/vim.svg', color: '#019733' },
  { name: 'Glitch', icon: '/logos/glitch.svg', color: '#3333FF' },
  { name: 'Leetcode', icon: '/logos/leetcode.png', color: '#FFA116'},
  { name: 'Blender', icon: '/logos/blender.svg', color: '#E87D0D' },
  { name: 'Ghidra', icon: '/logos/ghidra.png', color: '#000000'},
  { name: 'Android Studio', icon: '/logos/android-studio.png', color: '#3DDC84' },
  { name: 'AIDE', icon: '/logos/aide.png', color: '#FF6D00' },
  { name: 'CodeBoard', icon: '/logos/codeboard.png', color: '#8A2BE2' },
  { name: 'Spck Editor', icon: '/logos/spck-editor.png', color: '#1E90FF' },
  { name: 'ADB', icon: '/logos/adb.png', color: '#3DDC84' },
  { name: 'GNU', icon: '/logos/gnu.png', color: '#FCC624'},
  { name: 'Linux', icon: '/logos/linux.png', color: '#FCC624'},
  { name: 'Figma', icon: '/logos/figma.png', color: '#F24E1E' },
  { name: 'KWrite', icon: '/logos/kwrite.png', color: '#277399' },
  { name: 'Kate', icon: '/logos/kate.svg', color: '#277399' },
  { name: 'GHex', icon: '/logos/ghex.png', color: '#8B0000' },
  { name: 'Wonderland Editor', icon: '/logos/wonderland-editor.svg', color: '#8A2BE2' },
  { name: 'GIMP', icon: '/logos/gimp.png', color: '#5C5547' },
  { name: 'Krita', icon: '/logos/krita.svg', color: '#202E3A' },
  { name: 'KolourPaint', icon: '/logos/kolourpaint.png', color: '#F612A0' },
  { name: 'LibreOffice', icon: '/logos/libreoffice.png', color: '#18A303' },
  { name: 'Gedit', icon: '/logos/gedit.png', color: '#F9D441' },
  { name: 'Builder', icon: '/logos/builder.png', color: '#2E3436' },
  { name: 'Kdenlive', icon: '/logos/kdenlive.png', color: '#83A543'},
  { name: 'KDevelop', icon: '/logos/kdevelop.png', color: '#007396' },
  { name: 'Kaggle', icon: '/logos/kaggle.png', color: '#20BEFF'},
  { name: 'Hugging Face', icon: '/logos/huggingface.svg', color: '#FFD000' },
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
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
                >
                {skills.map((skill, idx) => (
                    <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group relative rounded-2xl p-5 flex flex-col items-center gap-4 cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl border border-white/10" />

                      <motion.div
                          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          className="w-24 h-24 rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden bg-[#1a1a1a] group-hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.2)]"
                      >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-2xl" />
                            {typeof skill.icon === 'string' ? (
                              <img src={skill.icon} alt={skill.name} className="w-20 h-20 object-contain" style={{filter: 'drop-shadow(2px 2px 0 rgba(0, 0, 0, 0)) drop-shadow(-2px -2px 0 rgba(0, 0, 0, 0)) drop-shadow(2px -2px 0 rgba(0, 0, 0, 0)) drop-shadow(-2px 2px 0 rgba(0, 0, 0, 0)) drop-shadow(1px 1px 0 #fff) drop-shadow(-1px -1px 0 #fff) drop-shadow(1px -1px 0 #fff) drop-shadow(-1px 1px 0 #fff)'}} />
                            ) : (
                              <skill.icon
                                size={32}
                                style={{ color: skill.color, filter: 'drop-shadow(2px 2px 0 rgba(0, 0, 0, 0)) drop-shadow(-2px -2px 0 rgba(0, 0, 0, 0)) drop-shadow(2px -2px 0 rgba(0, 0, 0, 0)) drop-shadow(-2px 2px 0 rgba(0, 0, 0, 0)) drop-shadow(1px 1px 0 #fff) drop-shadow(-1px -1px 0 #fff) drop-shadow(1px -1px 0 #fff) drop-shadow(-1px 1px 0 #fff)' }}
                                className="filter drop-shadow-md"
                              />
                            )}
                        </motion.div>
                        
                        <div className="text-center">
                            <h3 className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">{skill.name}</h3>
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