import React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const sizeMap: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'py-1 px-3 text-sm',
  md: 'py-2 px-4 text-base',
  lg: 'py-3 px-6 text-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  isLoading = false,
  ...rest
}: ButtonProps) {
  const base = 'btn';
  const variantClass =
    variant === 'primary'
      ? 'btn-primary'
      : variant === 'secondary'
      ? 'btn-secondary'
      : 'bg-transparent text-current';

  return (
    <button
      className={`${base} ${variantClass} ${sizeMap[size]} ${className} ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
      disabled={isLoading || rest.disabled}
      {...rest}
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
}
