import React from 'react';
import { useAuth } from '../context/AuthContext';

interface LoginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const LoginButton: React.FC<LoginButtonProps> = ({ children, className, ...props }) => {
  const { user, logout } = useAuth();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (user) {
      // Jeśli użytkownik jest zalogowany, wyloguj
      if (window.confirm('Czy na pewno chcesz się wylogować?')) {
        logout();
      }
    } else {
      // Jeśli nie jest zalogowany, wywołaj oryginalną funkcję onClick
      props.onClick?.(e);
    }
  };

  return (
    <button 
      className={`btn-gold ${className || ''}`} 
      {...props} 
      onClick={handleClick}
    >
      {user ? `Wyloguj (${user.first_name})` : (children || 'Strefa Klienta')}
    </button>
  );
};