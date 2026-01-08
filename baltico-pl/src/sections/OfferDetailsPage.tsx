// src/sections/OfferDetailsPage.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
// ZMIANA: dodano 'type' przed Variants
import { motion, type Variants } from 'framer-motion';
// ZMIANA: dodano 'type' przed Cottage
import { getCottageById, createReservation, type Cottage } from './cottageService';
import styles from './OfferDetailsPage.module.css';

interface OfferDetailsPageProps {
  onOpenAuth?: () => void;
}

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

// --- KOMPONENT ---
const OfferDetailsPage: React.FC<OfferDetailsPageProps> = ({ onOpenAuth }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [cottage, setCottage] = useState<Cottage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // MOCK AUTH STATE
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setIsLoading(true);
      const data = await getCottageById(id);
      setCottage(data);
      setIsLoading(false);
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckIn = e.target.value;
    setCheckIn(newCheckIn);
    if (checkOut && newCheckIn >= checkOut) {
      setCheckOut('');
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
    e.currentTarget.onerror = null;
  };

  if (isLoading) {
    return (
      <div className={styles.pageWrapper} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2 style={{ color: 'white' }}>Ładowanie oferty...</h2>
      </div>
    );
  }

  if (!cottage) {
    return (
      <div className={styles.pageWrapper} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '20px' }}>
        <h2 className={styles.title}>Nie znaleziono oferty</h2>
        <button onClick={() => navigate('/offers')} className={styles.bookButton} style={{ maxWidth: '200px' }}>
          Wróć do listy
        </button>
      </div>
    );
  }

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

  // --- HANDLERY ---

  const handleGuestReserve = () => {
    alert(`[TRYB GOŚCIA]\nPrzechodzę do płatności.\nObiekt: ${cottage.title}\nCena: ${totalPrice} PLN`);
  };

  const handleLoginAndReserve = () => {
    if (onOpenAuth) {
      onOpenAuth(); 
      console.log("Otwieram modal logowania...");
    } else {
      alert("Funkcja logowania niedostępna");
    }
  };

// src/sections/OfferDetailsPage.tsx

const handleUserReserve = async () => {
    if (!checkIn || !checkOut || !cottage) return;

    try {
      const result = await createReservation({
        cottage_id: cottage.id,
        user_id: 1, 
        start_date: checkIn, 
        end_date: checkOut
        // ----------------------
      });

      alert(`✅ Rezerwacja udana! Koszt: ${result.total_price} PLN`);
      console.log("Potwierdzenie z backendu:", result);

    } catch (error: any) {
      alert(`❌ Błąd: ${error.message}`);
    }
};

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
            <p className={styles.descriptionText}>{cottage.description}</p>
            <h2 className={styles.sectionTitle}>Udogodnienia</h2>
            <div className={styles.amenitiesList}>
              {cottage.features.map((f, i) => <div key={i} className={styles.amenityTag}>✓ {f}</div>)}
            </div>
            
            <div style={{ marginTop: '50px', padding: '20px', border: '1px dashed #444', borderRadius: '10px', background: 'rgba(0,0,0,0.2)' }}>
              <h4 style={{marginBottom: '10px', color: '#888', fontSize: '0.8rem', textTransform: 'uppercase'}}>🔧 Panel Deweloperski</h4>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#ccc' }}>
                <input 
                  type="checkbox" 
                  checked={isLoggedIn} 
                  onChange={(e) => setIsLoggedIn(e.target.checked)} 
                />
                Symuluj bycie zalogowanym
              </label>
            </div>

          </motion.div>

          {/* PRAWA STRONA */}
          <motion.div className={styles.bookingCardWrapper} variants={itemVariants}>
            <div className={styles.bookingCard}>
              
              <div className={styles.cardHeader}>
                <div>
                  <span className={styles.priceLarge}>{basePrice} PLN</span>
                  <span className={styles.priceUnit}> / noc</span>
                </div>
                <div style={{ color: 'var(--color-gold)' }}>★ 4.9 <span style={{color:'var(--color-slate)'}}>(18)</span></div>
              </div>

              <div className={styles.datePickerGrid}>
                <div className={styles.dateInputGroup}>
                  <label className={styles.dateLabel}>Przyjazd</label>
                  <input type="date" className={styles.dateInput} value={checkIn} min={today} onChange={handleCheckInChange} />
                </div>
                <div className={styles.dateInputGroup}>
                  <label className={styles.dateLabel}>Wyjazd</label>
                  <input 
                    type="date" 
                    className={styles.dateInput} 
                    value={checkOut} 
                    min={checkIn ? checkIn : today} 
                    disabled={!checkIn}
                    style={{ opacity: !checkIn ? 0.5 : 1, cursor: !checkIn ? 'not-allowed' : 'pointer' }}
                    onChange={(e) => setCheckOut(e.target.value)} 
                  />
                </div>
              </div>

              {nightsCount > 0 ? (
                <motion.div className={styles.summary} initial={{opacity:0}} animate={{opacity:1}}>
                  <div className={styles.summaryRow}><span>{basePrice} zł x {nightsCount} noce</span><span>{totalPrice} zł</span></div>
                  <div className={styles.totalRow}><span>Razem</span><span>{totalPrice} zł</span></div>
                </motion.div>
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--color-slate)', margin: '1rem 0', fontStyle: 'italic', fontSize: '0.9rem' }}>
                  {checkIn && !checkOut ? 'Wybierz datę wyjazdu' : 'Wybierz daty pobytu'}
                </div>
              )}

              <div className={styles.buttonsContainer}>
                {isLoggedIn ? (
                  <button 
                    className={styles.btnPrimary}
                    disabled={nightsCount <= 0}
                    onClick={handleUserReserve}
                  >
                    {nightsCount > 0 ? 'Rezerwuj teraz' : 'Sprawdź dostępność'}
                  </button>
                ) : (
                  <>
                    <button 
                      className={styles.btnPrimary}
                      disabled={nightsCount <= 0}
                      onClick={handleLoginAndReserve}
                    >
                      Zaloguj i zarezerwuj
                    </button>
                    
                    <button 
                      className={styles.btnSecondary}
                      disabled={nightsCount <= 0}
                      onClick={handleGuestReserve}
                    >
                      Rezerwuj jako gość
                    </button>
                  </>
                )}
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default OfferDetailsPage;