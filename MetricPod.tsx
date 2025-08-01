import React from 'react';

interface MetricPodProps {
  title: string;
  value: string;
  icon: string;
  tooltip?: string;
}

export const MetricPod: React.FC<MetricPodProps> = ({ title, value, icon, tooltip }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-md shadow-lg flex items-center space-x-4 relative group transition-all duration-300 hover:bg-gray-900/80 shimmer overflow-hidden">
      {/* Corner decoration */}
      <div className="absolute top-1 left-1 w-4 h-4 border-t border-l border-green-500/30 group-hover:border-green-500/80 transition-all duration-300"></div>
      <div className="absolute bottom-1 right-1 w-4 h-4 border-b border-r border-green-500/30 group-hover:border-green-500/80 transition-all duration-300"></div>

      <div className="bg-green-500/10 p-3 border border-green-500/20 rounded-full glow-shadow-hover transition-all duration-300">
        <i className={`fas ${icon} text-green-400 text-2xl w-8 h-8 flex items-center justify-center`}></i>
      </div>
      <div className="flex-1">
        <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">{title}</h3>
        <p className="text-2xl font-bold text-gray-100">{value}</p>
      </div>
      {tooltip && (
         <div className="absolute bottom-full mb-2 w-max px-3 py-1.5 bg-black border border-green-500/50 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 font-mono">
           {tooltip}
           <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-black"></div>
         </div>
      )}
    </div>
  );
};