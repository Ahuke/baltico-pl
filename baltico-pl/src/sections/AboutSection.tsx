// src/sections/AboutSection.tsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { aboutData } from '../data/about';
import styles from './AboutSection.module.css';

export const AboutSection: React.FC = () => {
  // --- EFEKT PARALAKSY DLA DEKORACJI "B" ---
  // Literka B będzie przesuwać się w pionie podczas scrollowania strony
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const yB = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // --- EFEKT 3D TILT DLA ZDJĘCIA ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Zmiękczamy ruch (spring physics), żeby nie był sztywny
  const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

  // Mapujemy pozycję myszki na kąt obrotu (rotateX, rotateY)
  // Zakres: -7 deg do 7 deg
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    
    // Obliczamy pozycję myszki względem środka elementu (od -0.5 do 0.5)
    const width = rect.width;
    const height = rect.height;
    
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className={styles.section} ref={ref}>
      {/* Dekoracja w tle przesuwana scrollem */}
      <motion.span style={{ y: yB }} className={styles.decoration}>B</motion.span>
      
      <div className={styles.container}>
        
        {/* LEWA KOLUMNA - Interaktywne zdjęcie */}
        <motion.div 
          className={styles.imageWrapper}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className={styles.imageContainer}
            style={{
              rotateX: rotateX,
              rotateY: rotateY,
            }}
          >
            <img 
              // Zdjęcie wnętrza/klimatu
              src="https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1932&auto=format&fit=crop" 
              alt="Wnętrze apartamentu Baltico" 
              className={styles.aboutImage}
            />
          </motion.div>

          {/* Lewitująca karta statystyk - przesuwa się lekko inaczej niż zdjęcie dla efektu głębi */}
          <motion.div 
            className={styles.statsCard}
            style={{
              x: useTransform(mouseX, [-0.5, 0.5], [-15, 15]), // Przesuwa się przeciwnie do zdjęcia
              y: useTransform(mouseY, [-0.5, 0.5], [-15, 15]),
            }}
          >
            {aboutData.stats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* PRAWA KOLUMNA - Tekst na szkle */}
        <motion.div 
          className={styles.contentWrapper}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.glassPanel}>
            <h2 className={styles.title}>
              Dlaczego <span className={styles.highlight}>Baltico?</span>
            </h2>
            
            {aboutData.paragraphs.map((text, index) => (
              <p key={index} className={styles.paragraph}>
                {text}
              </p>
            ))}

            <button className="btn-standard" style={{ marginTop: '2rem' }}>
              Poznaj naszą filozofię
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};