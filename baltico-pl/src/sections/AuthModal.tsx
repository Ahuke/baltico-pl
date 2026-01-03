// src/components/AuthModal.tsx
import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { DotGrid } from '../ui/DotGrid';
import styles from './AuthModal.module.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  
  // Referencje do elementów DOM dla GSAP
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // --- KONFIGURACJA KOLORÓW ---
  const colors = {
    login: {
      primary: '#D4AF37', // Złota ramka/przycisk
      glow: 'rgba(212, 175, 55, 0.4)',
      // KROPKI:
      baseDots: '#1d3557', 
      activeDots: '#F4C430' // Jasne złoto
    },
    register: {
      primary: '#FF8C00', // Pomarańczowa ramka/przycisk
      glow: 'rgba(255, 140, 0, 0.4)',
      // KROPKI:
      baseDots: '#1d3557', 
      activeDots: '#FF4500' // Żywy pomarańcz
    }
  };

  const currentColors = isLogin ? colors.login : colors.register;

  // --- ANIMACJA WEJŚCIA (GSAP) ---
  // Używamy useLayoutEffect, aby ustawić stan początkowy PRZED namalowaniem klatki.
  // To eliminuje problem "migania" starych stylów.
  useLayoutEffect(() => {
    if (isOpen) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();
        
        // 1. Ustawiamy natychmiastowo stan początkowy (niewidoczny)
        gsap.set(overlayRef.current, { opacity: 0 });
        gsap.set(cardRef.current, { scale: 0.8, opacity: 0, y: 50 });

        // 2. Animujemy do widoczności
        tl.to(overlayRef.current, { opacity: 1, duration: 0.3 });
        tl.to(cardRef.current, { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: "back.out(1.7)" 
        }, "-=0.1");
      }, cardRef);

      return () => ctx.revert();
    }
  }, [isOpen]);

  // --- ANIMACJA WYJŚCIA ---
  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(cardRef.current, { scale: 0.8, opacity: 0, duration: 0.3, ease: "power2.in" });
    tl.to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
  };

  // --- ANIMACJA PRZEŁĄCZANIA TRYBU (Login <-> Register) ---
  useEffect(() => {
    if (!isOpen) return;
    // Szybkie przesunięcie formularza na boki przy zmianie
    gsap.fromTo(formRef.current,
      { opacity: 0, x: isLogin ? -20 : 20 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
    );
  }, [isLogin, isOpen]);

  // Symulacja wysłania formularza
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin) {
      // Rejestracja
      alert("Rejestracja udana! Witamy w Baltico.");
      setIsLogin(true); // Powrót do logowania
    } else {
      // Logowanie
      console.log("Logowanie...");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} ref={overlayRef} onClick={handleClose}>
      <div 
        className={`${styles.modalCard} ${!isLogin ? styles.registerMode : ''}`} 
        ref={cardRef}
        onClick={(e) => e.stopPropagation()} // Zapobiega zamykaniu przy kliknięciu w kartę
        style={{
            // Przekazujemy zmienne CSS do modułu stylów
            '--accent-color': currentColors.primary,
            '--accent-color-glow': currentColors.glow
        } as React.CSSProperties}
      >
        {/* TŁO: Interaktywne kropki */}
        <DotGrid 
          baseColor={currentColors.baseDots} 
          activeColor={currentColors.activeDots} 
        />

        <button className={styles.closeButton} onClick={handleClose}>✕</button>

        <div className={styles.content}>
          <h2 className={styles.title}>
            {isLogin ? 'Witaj ponownie' : 'Dołącz do nas'}
          </h2>

          <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
            
            {/* Pola widoczne tylko przy rejestracji */}
            {!isLogin && (
              <>
                <div className={styles.inputGroup}>
                  <input type="text" placeholder="Imię" className={styles.input} required />
                </div>
                <div className={styles.inputGroup}>
                  <input type="tel" placeholder="Numer telefonu" className={styles.input} required />
                </div>
              </>
            )}

            <div className={styles.inputGroup}>
              <input type="email" placeholder="Adres e-mail" className={styles.input} required />
            </div>

            <div className={styles.inputGroup}>
              <input type="password" placeholder="Hasło" className={styles.input} required />
            </div>

            {!isLogin && (
              <div className={styles.inputGroup}>
                <input type="password" placeholder="Powtórz hasło" className={styles.input} required />
              </div>
            )}

            <button type="submit" className={styles.submitButton}>
              {isLogin ? 'Zaloguj się' : 'Zarejestruj się'}
            </button>
          </form>

          <p className={styles.toggleText}>
            {isLogin ? "Nie masz konta?" : "Masz już konto?"}
            <span 
              className={styles.toggleLink} 
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? " Dołącz do nas" : " Zaloguj się"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};