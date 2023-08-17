import React from 'react';

const Shimmer    = () => {
  return (
<div className="grid gap-2 lg:grid-cols-4">
    {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <div key={item} className="relative rounded-lg shadow-xl overflow-hidden bg-white">
            <div className="relative h-48 md:h-58 lg:h-62">
                <div className="absolute top-0 left-0 w-full h-full bg-gray-300"></div>
            </div>
            <div className="p-4">
                <div className="bg-gray-300 h-6 w-40 mb-2"></div>
                <div className="bg-gray-300 h-8 w-full mb-2"></div>
                <div className="bg-gray-300 h-4 w-64 mb-4"></div>
                <div className="mt-4"></div>
            </div>
        </div>
    ))}
</div>

    // <div className="animate-pulse">
    //   <div className="bg-gray-300 h-8 w-64 mb-4"></div>
    //   <div className="bg-gray-300 h-4 w-40 mb-2"></div>
    //   <div className="bg-gray-300 h-4 w-48 mb-2"></div>
    //   <div className="bg-gray-300 h-4 w-32"></div>
    // </div>
  );
};

export default Shimmer  ;

