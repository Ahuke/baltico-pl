// src/ui/OfferButton.tsx
import React from 'react';

// Rozszerzamy standardowe atrybuty przycisku HTML, żeby onClick działał
interface OfferButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const OfferButton: React.FC<OfferButtonProps> = ({ children, className, ...props }) => {
  return (
    <button 
      // Przekazujemy wszystkie propsy (w tym onClick!) do elementu button
      {...props}
      className={`btn-standard ${className || ''}`}
      style={{
        // Tutaj możesz dodać inline style jeśli nie używasz klasy globalnej,
        // ale zakładam, że klasa .btn-standard z globals.css załatwia sprawę.
        // Jeśli przycisk wygląda źle, upewnij się, że .btn-standard jest w globals.css
        cursor: 'pointer',
        zIndex: 10
      }}
    >
      {children}
    </button>
  );
};