import React from "react";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="relative group inline-block">
      {children}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-blue-600 text-white text-sm px-2 py-1 rounded-md shadow-md whitespace-nowrap z-10">
        {text}
      </span>
    </div>
  );
};

export default Tooltip;
