import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={clsx(
      "p-6 neumorphic rounded-2xl bg-[#f0f3ff]",
      className
    )}>
      {children}
    </div>
  );
};