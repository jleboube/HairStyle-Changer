
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-400"></div>
      <p className="text-lg text-gray-300">Generating your new look...</p>
    </div>
  );
};

export default Loader;
