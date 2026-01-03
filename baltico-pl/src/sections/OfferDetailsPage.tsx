// src/sections/OfferDetailsPage.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { cottagesData } from '../data/cottages'; 
import styles from './OfferDetailsPage.module.css';

// --- ANIMACJE ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  },
  exit: { opacity: 0 }
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0, scale: 0.98 },
  visible: { 
    y: 0, opacity: 1, scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 15 }
  }
};

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80";

const fixImagePath = (rawPath: string) => {
  if (!rawPath) return '';
  let path = rawPath.replace('baltico-pl\\public', '').replace('baltico-pl/public', '');
  path = path.replace(/\\/g, '/');
  if (!path.startsWith('/')) path = '/' + path;
  return path;
};

const parsePrice = (priceStr: string): number => {
  const match = priceStr.match(/(\d+)/);
  return match ? parseInt(match[0], 10) : 0;
};

const OfferDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const cottage = useMemo(() => {
    return cottagesData.find((c) => c.id === id);
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // --- LOGIKA DAT ---
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  // Dzisiejsza data w formacie YYYY-MM-DD (do blokowania przeszłości)
  const today = new Date().toISOString().split('T')[0];

  // Obsługa zmiany daty przyjazdu
  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckIn = e.target.value;
    setCheckIn(newCheckIn);

    // LOGIKA ZABEZPIECZAJĄCA:
    // Jeśli wybrana data przyjazdu jest późniejsza niż aktualna data wyjazdu,
    // resetujemy datę wyjazdu (użytkownik musi wybrać ją ponownie).
    if (checkOut && newCheckIn >= checkOut) {
      setCheckOut('');
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
    e.currentTarget.onerror = null;
  };

  if (!cottage) return null; // (Lub Twój komponent loading/error)

  const basePrice = parsePrice(cottage.price);

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    if (diffTime <= 0) return 0;
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return nights * basePrice;
  };

  const totalPrice = calculateTotal();
  const nightsCount = totalPrice > 0 ? totalPrice / basePrice : 0;

  // Galeria logic
  const rawImages = cottage.images && cottage.images.length > 0 ? cottage.images : [FALLBACK_IMAGE];
  const validImages = rawImages.map(fixImagePath);
  const count = validImages.length;
  let galleryClass = styles.layout1;
  let imagesToShow = validImages;
  if (count === 2) galleryClass = styles.layout2;
  else if (count === 3) galleryClass = styles.layout3;
  else if (count === 4) galleryClass = styles.layout4;
  else if (count >= 5) { galleryClass = styles.layout5; imagesToShow = validImages.slice(0, 5); }

  return (
    <motion.div 
      className={styles.pageWrapper}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className={styles.container}>
        
        <motion.div variants={itemVariants}>
          <Link to="/offers" className={styles.backLink}>← Wróć do listy ofert</Link>
        </motion.div>

        <motion.header className={styles.header} variants={itemVariants}>
          <h1 className={styles.title}>{cottage.title}</h1>
          <div className={styles.location}><span>📍</span> {cottage.city}, Polska</div>
        </motion.header>

        <motion.div className={`${styles.galleryContainer} ${galleryClass}`} variants={itemVariants}>
          {imagesToShow.map((src, index) => (
            <img key={index} src={src} alt="Widok" className={styles.galleryImage} onError={handleImageError} loading={index===0?"eager":"lazy"}/>
          ))}
        </motion.div>

        <div className={styles.contentGrid}>
          {/* LEWA STRONA */}
          <motion.div className={styles.descriptionSection} variants={itemVariants}>
            <div className={styles.stats}>
              <span className={styles.statItem}>🏠 {cottage.size} m²</span>
              <span className={styles.statItem}>👥 Max {cottage.capacity} os.</span>
              <span className={styles.statItem}>💎 Premium</span>
            </div>
            <h2 className={styles.sectionTitle}>O tym miejscu</h2>
            <p className={styles.descriptionText}>{cottage.description}<br/><br/>Wnętrze zostało zaprojektowane z myślą o najwyższym komforcie...</p>
            <h2 className={styles.sectionTitle}>Udogodnienia</h2>
            <div className={styles.amenitiesList}>
              {cottage.features.map((f, i) => <div key={i} className={styles.amenityTag}>✓ {f}</div>)}
            </div>
          </motion.div>

          {/* PRAWA STRONA - KARTA REZERWACJI */}
          <motion.div className={styles.bookingCardWrapper} variants={itemVariants}>
            <div className={styles.bookingCard}>
              
              <div className={styles.cardHeader}>
                <div>
                  <span className={styles.priceLarge}>{basePrice} PLN</span>
                  <span className={styles.priceUnit}> / noc</span>
                </div>
                <div style={{ color: 'var(--color-gold)' }}>★ 4.9 <span style={{color:'var(--color-slate)'}}>(18)</span></div>
              </div>

              {/* ULEPSZONE INPUTY DATY */}
              <div className={styles.datePickerGrid}>
                
                {/* CHECK-IN */}
                <div className={styles.dateInputGroup}>
                  <label className={styles.dateLabel}>Przyjazd</label>
                  <input 
                    type="date" 
                    className={styles.dateInput}
                    value={checkIn}
                    min={today} // Blokada dat przeszłych
                    onChange={handleCheckInChange}
                  />
                </div>

                {/* CHECK-OUT */}
                <div className={styles.dateInputGroup}>
                  <label className={styles.dateLabel}>Wyjazd</label>
                  <input 
                    type="date" 
                    className={styles.dateInput}
                    value={checkOut}
                    // KLUCZOWE: Minimum to data przyjazdu (lub dzisiaj, jeśli brak przyjazdu)
                    min={checkIn ? checkIn : today}
                    // Jeśli nie wybrano daty przyjazdu, blokujemy pole wyjazdu (UX optional)
                    disabled={!checkIn}
                    style={{ opacity: !checkIn ? 0.5 : 1, cursor: !checkIn ? 'not-allowed' : 'pointer' }}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
              </div>

              {nightsCount > 0 ? (
                <motion.div 
                  className={styles.summary}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <div className={styles.summaryRow}>
                    <span>{basePrice} zł x {nightsCount} noce</span>
                    <span>{totalPrice} zł</span>
                  </div>
                  <div className={styles.summaryRow}><span>Serwis</span><span>0 zł</span></div>
                  <div className={styles.totalRow}><span>Razem</span><span>{totalPrice} zł</span></div>
                </motion.div>
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--color-slate)', margin: '1rem 0', fontStyle: 'italic', fontSize: '0.9rem' }}>
                  {checkIn && !checkOut ? 'Wybierz datę wyjazdu' : 'Wybierz daty pobytu'}
                </div>
              )}

              <button 
                className={styles.bookButton}
                disabled={nightsCount <= 0}
                onClick={() => alert(`Rezerwacja: ${cottage.title} (${checkIn} - ${checkOut})`)}
              >
                {nightsCount > 0 ? 'Rezerwuj teraz' : 'Sprawdź dostępność'}
              </button>

            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default OfferDetailsPage;