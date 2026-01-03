// src/sections/OfferModal.tsx
import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './OfferModal.module.css';
import type { Cottage } from '../types';

const fixImagePath = (rawPath: string) => {
  if (!rawPath) return '';
  let path = rawPath.replace('baltico-pl\\public', '').replace('baltico-pl/public', '');
  path = path.replace(/\\/g, '/');
  if (!path.startsWith('/')) path = '/' + path;
  return path;
};

interface OfferModalProps {
  cottage: Cottage;
  layoutId?: string;
  onClose: () => void;
  // Opcjonalna funkcja nawigacji
  onNavigateToFullOffer?: () => void;
}

export const OfferModal: React.FC<OfferModalProps> = ({ 
  cottage, 
  layoutId, // layoutId może być użyty w motion.div jeśli chcemy shared layout z framer motion
  onClose, 
  onNavigateToFullOffer 
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isBookingMode, setIsBookingMode] = useState(false);

  // Animacje wejścia (GSAP)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.mainImage}`, {
        opacity: 0,
        scale: 1.1,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out"
      });
      
      if (!isBookingMode) {
        gsap.from(`.${styles.contentColumn} > *`, {
          y: 20, opacity: 0, duration: 0.6, stagger: 0.05, delay: 0.3, ease: "power3.out", clearProps: "all"
        });
      }
    }, modalRef);
    return () => ctx.revert();
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const btn = (e.target as HTMLFormElement).querySelector('button[type="submit"]') as HTMLButtonElement;
    if(btn) btn.innerText = "Przetwarzanie...";
    
    setTimeout(() => {
        alert(`Dziękujemy! Wstępna rezerwacja dla ${cottage.title} została wysłana.`);
        onClose();
    }, 1500);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <motion.div 
        className={styles.modal} 
        ref={modalRef}
        layoutId={layoutId} // Framer Motion Shared Layout
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>✕</button>

        <div className={styles.galleryColumn}>
          <div className={styles.mainImageWrapper}>
            <img 
              src={fixImagePath(cottage.images[0])} 
              alt={cottage.title}
              className={styles.mainImage}
            />
          </div>
        </div>

        <div className={styles.contentColumn}>
          <AnimatePresence mode="wait">
            
            {/* WIDOK 1: SZCZEGÓŁY */}
            {!isBookingMode ? (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
              >
                <span className={styles.locationBadge}>
                  {cottage.city} • {cottage.size} m²
                </span>
                
                <h2 className={styles.title}>{cottage.title}</h2>
                <span className={styles.price}>{cottage.price}</span>
                
                <p className={styles.description}>
                  {cottage.description}
                  <br /><br />
                  Pełen opis: Obiekt zapewnia prywatność i najwyższy standard wykończenia. 
                  Idealny wybór dla osób szukających ucieczki od codzienności.
                </p>

                <h4 className={styles.featuresTitle}>Udogodnienia:</h4>
                <div className={styles.featuresGrid}>
                  {cottage.features.map((feature, idx) => (
                    <span key={idx} className={styles.featureTag}>{feature}</span>
                  ))}
                </div>

                <div className={styles.footerActions}>
                  {/* LOGIKA PRZYCISKU */}
                  {onNavigateToFullOffer ? (
                    <button 
                      className="btn-standard" 
                      style={{ width: '100%' }}
                      onClick={() => {
                        onClose();
                        onNavigateToFullOffer();
                      }}
                    >
                      Przejdź do oferty
                    </button>
                  ) : (
                    <button 
                      className="btn-standard" 
                      style={{ width: '100%' }}
                      onClick={() => setIsBookingMode(true)}
                    >
                      Rezerwuj Termin
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              
              /* WIDOK 2: FORMULARZ */
              <motion.div
                key="booking-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className={styles.formContainer}
              >
                <h3 className={styles.formTitle}>Rezerwacja</h3>
                <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', flexGrow: 1 }}>
                    <div className={styles.inputRow}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Od</label>
                            <input type="date" className={styles.input} required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Do</label>
                            <input type="date" className={styles.input} required />
                        </div>
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Email</label>
                        <input type="email" placeholder="jan@example.com" className={styles.input} required />
                    </div>

                    <div className={styles.summaryBox}>
                        <span className={styles.totalPriceLabel}>Cena / noc:</span>
                        <span className={styles.totalPriceValue}>{cottage.price}</span>
                    </div>

                    <div className={styles.buttonsRow}>
                        <button 
                            type="button" 
                            className={styles.backButtonLink}
                            onClick={() => setIsBookingMode(false)}
                        >
                            Wróć
                        </button>
                        <button type="submit" className="btn-standard" style={{ flexGrow: 1 }}>
                            Potwierdź
                        </button>
                    </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};