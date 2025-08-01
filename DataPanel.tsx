import React from 'react';

interface DataPanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const DataPanel: React.FC<DataPanelProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-gray-900/50 backdrop-blur-sm p-4 sm:p-6 h-full flex flex-col relative overflow-hidden rounded-sm ${className}`}>
      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-cyan-500/50 opacity-50"></div>
      <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-cyan-500/50 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-cyan-500/50 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-cyan-500/50 opacity-50"></div>

      <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-4 pl-2 font-mono">{title}</h3>
      <div className="flex-grow h-full relative">
        {children}
      </div>
    </div>
  );
};