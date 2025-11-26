import React from 'react';

interface FooterProps {
  lastUpdated: string;
}

const Footer: React.FC<FooterProps> = ({ lastUpdated }) => {
  return (
    <footer className="relative z-50 bg-[#050505]/80 backdrop-blur-md border-t border-white/5 py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left text-sm text-gray-500">
        
        {/* Column 1: Status */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-bold text-gray-400 mb-2">Status</h3>
          <p className="font-mono text-xs">
            {lastUpdated ? `Last Updated: ${new Date(lastUpdated).toLocaleDateString()}` : '...'}
          </p>
        </div>

        {/* Column 2: Engagement Prompt */}
        <div className="flex flex-col items-center">
          <h3 className="font-bold text-gray-400 mb-2">Let's Connect</h3>
          <p className="font-mono text-xs">Got an idea? Let's build something great.</p>
        </div>

        {/* Column 3: Source Code */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="font-bold text-gray-400 mb-2">Code</h3>
          <a 
            href="https://github.com/Golgrax/wow" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-mono text-xs hover:text-primary transition-colors"
          >
            GitHub Repository
          </a>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;