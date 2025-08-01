import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-black/30 backdrop-blur-sm border-b border-cyan-500/20 p-4 w-full">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-cyan-400 tracking-widest uppercase glow-shadow-secondary">CyberOps Command</h1>
          <p className="text-xs text-gray-400">System Status: <span className="text-green-400">Nominal</span></p>
        </div>
        <div className="hidden md:flex items-center space-x-4 text-xs text-gray-500 font-mono">
            <span>[SYS_CLK: {new Date().toLocaleTimeString()}]</span>
            <span>[USR: analyst_01]</span>
        </div>
      </div>
    </header>
  );
};