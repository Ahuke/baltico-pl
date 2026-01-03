import React from 'react';

interface LoginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const LoginButton: React.FC<LoginButtonProps> = ({ children, className, ...props }) => {
  // Używamy globalnej klasy .btn-gold
  return (
    <button className={`btn-gold ${className || ''}`} {...props}>
      {children}
    </button>
  );
};