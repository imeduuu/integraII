import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  isLoading = false,
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
      disabled={isLoading || props.disabled}
      className={`${baseStyles} ${variants[variant]} ${className} ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
      // focus-visible handled globally in theme.css
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
            <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <span>{children}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
