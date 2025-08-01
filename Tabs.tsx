import React from 'react';

interface TabsProps<T extends string> {
  tabs: T[];
  activeTab: T;
  setActiveTab: (tab: T) => void;
}

export const Tabs = <T extends string>({ tabs, activeTab, setActiveTab }: TabsProps<T>) => {
  return (
    <div className="flex space-x-2 bg-gray-900/70 p-1 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 relative overflow-hidden
            ${
              activeTab === tab
                ? 'text-cyan-300'
                : 'text-gray-400 hover:text-white'
            }`}
        >
          {activeTab === tab && (
            <span className="absolute inset-0 bg-cyan-500/20 glow-shadow-secondary rounded-md"></span>
          )}
          <span className="relative z-10">{tab}</span>
        </button>
      ))}
    </div>
  );
};
