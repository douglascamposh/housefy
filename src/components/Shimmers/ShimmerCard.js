import React from 'react';
import { colorsShimer } from '@/app/constants/colors';

const Shimmer = () => {
  return (
    <div className="grid gap-2 lg:grid-cols-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <div key={item} className="relative rounded-lg shadow-xl overflow-hidden">
          <div className={`relative h-48 md:h-58 lg:h-62 ${colorsShimer.shimerColorGray}`}></div>
          <div className="p-4">
            <div className={`h-6 w-40 mb-2 ${colorsShimer.shimerColorGray}`}></div>
            <div className={`h-8 w-full mb-2 ${colorsShimer.shimerColorGray}`}></div>
            <div className={`h-4 w-64 mb-4 ${colorsShimer.shimerColorGray}`}></div>
            <div className="mt-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
