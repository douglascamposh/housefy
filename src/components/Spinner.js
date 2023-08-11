import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="border-t-4 border-blue-800 border-solid rounded-full animate-spin w-12 h-12"></div>
    </div>
  );
};

export default Spinner;
