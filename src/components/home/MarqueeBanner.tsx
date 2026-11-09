import React from 'react';

export const MarqueeBanner: React.FC = () => {
  const phrases = [
    'TIMELESS BY DESIGN',
    'THE ART OF EVERYDAY LIVING',
    'LESS, BUT BETTER',
    'CONSIDERED SILHOUETTES',
    'LUXURY ACCESSIBILITY',
    'CONTEMPORARY ATELIER',
  ];

  return (
    <div className="bg-[#49111C] text-[#F9EDF0] py-3.5 overflow-hidden whitespace-nowrap border-y border-[#49111C]/40 select-none">
      <div className="inline-flex animate-marquee">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="inline-flex items-center space-x-8 mx-4">
            {phrases.map((phrase, idx) => (
              <span key={idx} className="flex items-center space-x-8 text-xs font-serif tracking-[0.28em] uppercase font-light">
                <span>{phrase}</span>
                <span className="text-[#E1A140] text-[10px]">•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
