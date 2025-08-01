import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black/30 backdrop-blur-sm border-t border-cyan-500/20 p-2 w-full text-xs shrink-0">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center text-gray-500 font-mono">
        <span>[v2.0.0_release] - For Internal Analysis Only</span>
        <span>&copy; {new Date().getFullYear()} CyberLogix Dynamics - All Rights Reserved</span>
      </div>
    </footer>
  );
};