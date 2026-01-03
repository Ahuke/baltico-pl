// src/sections/HeroSection.tsx
import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap'; 
import { LoginButton } from '../ui/LoginButton';
import { OfferButton } from '../ui/OfferButton';
import styles from './HeroSection.module.css';

// PROSTA FUNKCJA THROTTLE (Ogranicznik częstotliwości)
// Pozwala funkcji uruchomić się maksymalnie raz na 'limit' milisekund
const throttle = (func: (...args: any[]) => void, limit: number) => {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

interface HeroSectionProps {
  onOpenAuth: () => void;
  onGoToOffers: () => void; 
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAuth, onGoToOffers }) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Zmniejszyłem trochę stiffness/damping dla płynniejszego efektu przy rzadszym odświeżaniu
  const mouseX = useSpring(x, { stiffness: 40, damping: 25 });
  const mouseY = useSpring(y, { stiffness: 40, damping: 25 });

  useEffect(() => {
    // KROK 4: Używamy throttle, by czytać pozycję myszki max co 50ms (20fps dla logiki wystarczy)
    const handleMouseMove = throttle((event: MouseEvent) => {
      x.set(event.clientX / window.innerWidth);
      y.set(event.clientY / window.innerHeight);
    }, 50);

    window.addEventListener("mousemove", handleMouseMove);
    // @ts-ignore - TypeScript czasem marudzi przy removeEventListener z wrapperem, ignore jest bezpieczny
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Transformacje bez zmian
  const bgX = useTransform(mouseX, [0, 1], ["-20px", "20px"]);
  const bgY = useTransform(mouseY, [0, 1], ["-20px", "20px"]);
  const orbX = useTransform(mouseX, [0, 1], ["-60px", "60px"]);
  const orbY = useTransform(mouseY, [0, 1], ["-60px", "60px"]);
  const textX = useTransform(mouseX, [0, 1], ["15px", "-15px"]);
  const textY = useTransform(mouseY, [0, 1], ["15px", "-15px"]);

  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(`.${styles.eyebrow}`, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2 });
      tl.fromTo(headlineRef.current, { y: 100, opacity: 0, skewY: 7 }, { y: 0, opacity: 1, skewY: 0, duration: 1.2 }, "-=0.6");
      tl.fromTo(descRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.8");
      tl.fromTo(actionsRef.current?.children || [], { y: 20, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.2 }, "-=0.6");
    }, contentRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section}>
      <motion.div className={styles.parallaxBackground} style={{ x: bgX, y: bgY }}>
        <div style={{ width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center',
          backgroundImage: `linear-gradient(to bottom, rgba(10, 25, 47, 0.6), var(--color-navy)), url('https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2070&auto=format&fit=crop')`
        }} />
      </motion.div>

      <motion.div className={`${styles.orb} ${styles.orbGold}`} style={{ x: orbX, y: orbY }} />
      <motion.div className={`${styles.orb} ${styles.orbTurquoise}`} style={{ x: useTransform(orbX, v => -parseFloat(v as string)), y: orbY }} />
      <div className={styles.grainOverlay} />
      
      <motion.div className={styles.content} ref={contentRef} style={{ x: textX, y: textY }}>
        <span className={styles.eyebrow}>Ekskluzywny Wypoczynek</span>
        <h1 className={styles.headline} ref={headlineRef}>
          Odkryj spokój <br /><span className={styles.highlight}>Polskiego Bałtyku</span>
        </h1>
        <p className={styles.description} ref={descRef}>
          Wyselekcjonowane apartamenty i domki nad morzem. Zarezerwuj swój azyl.
        </p>
        
        <div className={styles.actions} ref={actionsRef}>
          <OfferButton onClick={onGoToOffers}>
            Zobacz Oferty
          </OfferButton>
          <LoginButton onClick={onOpenAuth}>
            Strefa Klienta
          </LoginButton>
        </div>
      </motion.div>

      <motion.div className={styles.scrollIndicator} initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 1.5, duration: 1 }}>
        <div className={styles.mouse}><div className={styles.wheel} /></div>
        <span className={styles.scrollText}>Przewiń</span>
      </motion.div>
    </section>
  );
};