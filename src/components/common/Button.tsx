import React from 'react';
import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: LucideIcon;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  icon: Icon,
  fullWidth = false,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'relative overflow-hidden px-6 py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 font-medium',
        {
          'w-full': fullWidth,
          'btn-primary': variant === 'primary',
          'text-indigo-600 hover:text-indigo-700 hover:bg-white/50': variant === 'ghost',
          'bg-white/50 text-indigo-600 hover:bg-white/70': variant === 'secondary',
        },
        className
      )}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
};