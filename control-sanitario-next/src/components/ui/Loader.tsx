import React from 'react';

interface LoaderProps {
  size?: number;
  className?: string;
  label?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 18, className = '', label = 'Cargando' }) => {
  return (
    <span role="status" aria-live="polite" className={`inline-flex items-center ${className}`}>
      <svg
        className="animate-spin motion-safe:animate-spin"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
        <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
};

export default Loader;
