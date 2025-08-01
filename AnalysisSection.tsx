import React from 'react';
import { AnalysisResult } from '../types';

interface AnalysisSectionProps {
  result: AnalysisResult | null;
}

const AnalysisItem: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
    <li className="flex items-start space-x-3">
        <div className="flex-shrink-0 pt-1">
            <i className={`fas ${icon} text-cyan-400 text-xs`}></i>
        </div>
        <p className="text-gray-300 font-mono text-sm">{text}</p>
    </li>
);

export const AnalysisSection: React.FC<AnalysisSectionProps> = ({ result }) => {
  if (!result) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center text-center text-gray-500 p-4">
        <i className="fas fa-chart-bar text-5xl mb-4 text-gray-600"></i>
        <h4 className="text-lg font-bold text-gray-400">No Analysis Available</h4>
        <p className="text-sm">Data could not be loaded.</p>
      </div>
    );
  }

  const { bottlenecks, recommendations } = result.analysis;

  return (
    <div className="p-1 h-full flex flex-col font-mono overflow-y-auto pr-2 text-xs sm:text-sm">
      <div className="space-y-4 flex-grow">
        <div>
          <h4 className="font-bold text-cyan-400 mb-2">
            &gt; Potential Bottlenecks
          </h4>
          <ul className="space-y-2 pl-2 border-l-2 border-cyan-500/20">
            {bottlenecks.map((item, index) => (
              <AnalysisItem key={`b-${index}`} icon="fa-chevron-right" text={item} />
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-cyan-400 mb-2 mt-4">
            &gt; Tactical Recommendations
          </h4>
          <ul className="space-y-2 pl-2 border-l-2 border-cyan-500/20">
            {recommendations.map((item, index) => (
              <AnalysisItem key={`r-${index}`} icon="fa-check" text={item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};