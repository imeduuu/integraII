import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-lg font-semibold focus:outline-none transition-colors duration-200 motion-safe-transition text-base";

  const variants = {
    primary:
      "bg-[var(--primary)] text-[var(--primary-contrast)] hover:brightness-90 disabled:opacity-60 disabled:cursor-not-allowed disabled:brightness-75 disabled:shadow-none",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-none",
  };

  return (
    <button
      {...props}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      // focus-visible handled globally in theme.css
    >
      {children}
    </button>
  );
};

export default Button;
