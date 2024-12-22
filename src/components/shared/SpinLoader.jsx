import React from 'react';

const SpinLoader = () => {
  return (
    <div className="flex-center h-full">
      <div className="size-5 border-4 border-t-primary border-neutral-white rounded-full animate-spin"></div>
    </div>
  );
};

export default SpinLoader;
