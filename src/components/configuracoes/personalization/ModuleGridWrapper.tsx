import React from 'react';

interface ModuleGridWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const ModuleGridWrapper = ({ children, className = '' }: ModuleGridWrapperProps) => {
  return (
    <div 
      className={`
        grid w-full mx-auto
        justify-items-center
        px-2
        ${className}
      `}
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
        gap: '8px',
        justifyContent: 'center',
        width: '100%'
      }}
    >
      {children}
    </div>
  );
};

export default ModuleGridWrapper;