
import React from 'react';
import { motion } from 'framer-motion';


const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* 
         Seamless Blend Gradient:
         1. from-[#030014]/0: Starts transparent but with the hue of the global background (Deep Blue).
         2. to-[#000000]: Fades to solid black at the bottom.
         3. extended-gradient: Using 'via' with a low opacity helps smooth the mid-point.
      */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030014]/0 via-[#000000]/60 to-[#000000] -z-20" />

      {/* Subtle bottom glow to integrate the black section */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary/5 to-transparent -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Terminal/Chat Window */}
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            className="w-full bg-[#0c0c0c] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
        >
            {/* Window Header */}
            <div className="h-10 bg-[#151515] border-b border-white/5 flex items-center px-4 justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-xs">●</span>
                    <span className="text-sm font-mono text-gray-300">benjo@contact-form: ~</span>
                </div>
                <div className="text-xs text-gray-600 font-mono">bash</div>
            </div>

            <div className="p-8 font-mono">
                <div className="mb-6 text-gray-400">
                    <p className="text-white">Have a project idea, question, or just want to connect? Send me a message below.</p>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="group">
                        <label className="flex items-center gap-2 text-green-400 text-sm mb-2">
                            <span className="text-pink-500">const</span> name <span className="text-white">=</span>
                        </label>
                        <div className="flex items-center bg-[#1a1a1a] border border-white/10 rounded px-3 py-2 focus-within:border-primary/50 transition-colors">
                            <span className="text-gray-500 mr-2">"</span>
                            <input 
                                type="text" 
                                className="bg-transparent border-none outline-none text-white w-full placeholder:text-gray-700 font-sans"
                                placeholder="John Doe"
                            />
                            <span className="text-gray-500">";</span>
                        </div>
                    </div>

                    <div className="group">
                        <label className="flex items-center gap-2 text-green-400 text-sm mb-2">
                            <span className="text-pink-500">const</span> email <span className="text-white">=</span>
                        </label>
                        <div className="flex items-center bg-[#1a1a1a] border border-white/10 rounded px-3 py-2 focus-within:border-primary/50 transition-colors">
                            <span className="text-gray-500 mr-2">"</span>
                            <input 
                                type="email" 
                                className="bg-transparent border-none outline-none text-white w-full placeholder:text-gray-700 font-sans"
                                placeholder="john@example.com"
                            />
                            <span className="text-gray-500">";</span>
                        </div>
                    </div>

                    <div className="group">
                        <label className="flex items-center gap-2 text-green-400 text-sm mb-2">
                            <span className="text-pink-500">let</span> message <span className="text-white">=</span>
                        </label>
                        <div className="flex bg-[#1a1a1a] border border-white/10 rounded px-3 py-2 focus-within:border-primary/50 transition-colors">
                            <span className="text-gray-500 mr-2">`</span>
                            <textarea 
                                rows={4}
                                className="bg-transparent border-none outline-none text-white w-full placeholder:text-gray-700 resize-none font-sans"
                                placeholder="Start typing..."
                            />
                            <span className="text-gray-500 self-end">`;</span>
                        </div>
                    </div>
                    
                    <button 
                        type="submit"
                        className="mt-6 px-6 py-2 bg-primary/20 border border-primary/50 text-primary hover:bg-primary/30 transition-colors rounded text-sm font-bold flex items-center gap-2"
                    >
                        $ ./send_message.sh <div className="w-2 h-4 bg-primary animate-pulse" />
                    </button>
                </form>
            </div>
        </motion.div>
        


      </div>
    </section>
  );
};

export default Contact;
