// src/sections/OffersCarousel.tsx
import React, { useMemo, useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cottagesData } from '../data/cottages';
import { OfferModal } from './OfferModal';
import type { Cottage } from '../types';
import styles from './OffersCarousel.module.css';

const fixImagePath = (rawPath: string) => {
  if (!rawPath) return '';
  let path = rawPath.replace('baltico-pl\\public', '').replace('baltico-pl/public', '');
  path = path.replace(/\\/g, '/');
  if (!path.startsWith('/')) path = '/' + path;
  return path;
};

interface OffersCarouselProps {
  onGoToOffers?: () => void;
}

const OffersCarousel: React.FC<OffersCarouselProps> = ({ onGoToOffers }) => {
  const [selectedCottage, setSelectedCottage] = useState<{ data: Cottage, layoutId: string } | null>(null);

  const selectedCottages = useMemo(() => {
    return cottagesData.filter((_, i) => i % 3 === 0).slice(0, 12);
  }, []);

  const loopedOffers = [...selectedCottages, ...selectedCottages, ...selectedCottages];

  const trackRef = useRef<HTMLDivElement>(null);
  const reqIdRef = useRef<number>(0);
  const positionRef = useRef(0);
  const speedRef = useRef(1.2);
  const isHoveredRef = useRef(false);
  const isInView = useRef(false); // Ref z Kroku 1

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { isInView.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    if (trackRef.current) observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, []);

  const BASE_SPEED = 1.2;
  const FRICTION = 0.05;

  useEffect(() => {
    const animate = () => {
      if (!isInView.current) {
        reqIdRef.current = requestAnimationFrame(animate);
        return;
      }

      const isModalOpen = !!selectedCottage;
      const targetSpeed = (isHoveredRef.current || isModalOpen) ? 0 : BASE_SPEED;

      speedRef.current += (targetSpeed - speedRef.current) * FRICTION;
      if (Math.abs(speedRef.current) < 0.001) speedRef.current = 0;

      positionRef.current -= speedRef.current;

      if (trackRef.current) {
        const track = trackRef.current;
        const singleSetWidth = track.scrollWidth / 3;

        if (Math.abs(positionRef.current) >= singleSetWidth) {
          positionRef.current += singleSetWidth;
        }
        track.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
      }
      reqIdRef.current = requestAnimationFrame(animate);
    };

    reqIdRef.current = requestAnimationFrame(animate);
    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
    };
  }, [selectedCottage]);

  const handleCardClick = (cottage: Cottage, index: number) => {
    const uniqueLayoutId = `cottage-card-${cottage.id}-${index}`;
    setSelectedCottage({ data: cottage, layoutId: uniqueLayoutId });
  };

  return (
    <>
      <section className={styles.section} id="oferta">
        <div className={styles.headingWrapper}>
          <h2 className={styles.headline}>Nasze Miejsca</h2>
        </div>

        <div className={styles.track} ref={trackRef}>
          {loopedOffers.map((cottage, index) => {
            const displayTags = [cottage.city, ...cottage.features].slice(0, 3);
            const rawImage = cottage.images && cottage.images.length > 0 ? cottage.images[0] : '';
            const imageUrl = fixImagePath(rawImage);
            const uniqueLayoutId = `cottage-card-${cottage.id}-${index}`;

            return (
              <motion.div 
                key={`${cottage.id}-${index}`} 
                className={styles.card}
                layoutId={uniqueLayoutId}
                onClick={() => handleCardClick(cottage, index)}
                onMouseEnter={() => { isHoveredRef.current = true; }}
                onMouseLeave={() => { isHoveredRef.current = false; }}
                initial={false} 
              >
                <div 
                  className={styles.cardBackground}
                  style={{ 
                    // KROK 3: Dodano parametry &w=500&q=60 aby pobierać mniejsze zdjęcia
                    // Jeśli używasz swoich zdjęć lokalnych (imageUrl), upewnij się, że są one też zoptymalizowane
                    backgroundImage: `url('${imageUrl}'), url('https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=500&q=60')` 
                  }}
                />
                <div className={styles.contentOverlay}>
                  <div className={styles.tags}>
                    {displayTags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                  <motion.h3 className={styles.cardTitle} layout="position">
                    {cottage.title}
                  </motion.h3>
                  <span className={styles.price}>{cottage.price}</span>
                  <p className={styles.description}>{cottage.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <AnimatePresence>
        {selectedCottage && (
          <OfferModal 
            cottage={selectedCottage.data} 
            layoutId={selectedCottage.layoutId} 
            onClose={() => setSelectedCottage(null)}
            onNavigateToFullOffer={onGoToOffers} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default OffersCarousel;