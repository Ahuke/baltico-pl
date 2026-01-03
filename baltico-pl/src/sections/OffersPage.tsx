// src/sections/OffersPage.tsx
import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom'; // NOWOŚĆ: Importujemy Link
import { motion } from 'framer-motion';
import { cottagesData } from '../data/cottages'; 
// USUNIĘTO: import { OfferModal } ... (już niepotrzebny)
import styles from './OffersPage.module.css';

// --- Helper do ścieżek (ZACHOWANY Z TWOJEGO KODU) ---
const fixImagePath = (rawPath: string) => {
  if (!rawPath) return '';
  let path = rawPath.replace('baltico-pl\\public', '').replace('baltico-pl/public', '');
  path = path.replace(/\\/g, '/');
  if (!path.startsWith('/')) path = '/' + path;
  return path;
};

// --- Helper do ceny (ZACHOWANY) ---
const parsePrice = (priceStr: string): number => {
  const match = priceStr.match(/(\d+)/);
  return match ? parseInt(match[0], 10) : 0;
};

// --- KOMPONENT ZDJĘCIA (ZACHOWANY) ---
const OfferImage = ({ src, alt }: { src: string, alt: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      <div className={`${styles.imagePlaceholder} ${isLoaded ? styles.hidden : ''}`} />
      <img 
        src={src} 
        alt={alt} 
        className={`${styles.cardImage} ${isLoaded ? styles.loaded : ''}`}
        loading="lazy"      
        decoding="async"    
        onLoad={() => setIsLoaded(true)}
      />
    </>
  );
};

// --- LISTA TAGÓW ---
const AVAILABLE_TAGS = ['Balkon', 'Klimatyzacja', 'Parking', 'Widok', 'Basen', 'Wi-Fi', 'Dla rodzin', 'Zwierzęta'];

// Zmiana: Usuwamy props interface, bo nie potrzebujemy już onBack z zewnątrz
const OffersPage: React.FC = () => {
  
  // 1. OBLICZANIE MIN/MAX CENY Z DANYCH
  const { minPriceData, maxPriceData } = useMemo(() => {
    const prices = cottagesData.map(c => parsePrice(c.price));
    return {
      minPriceData: Math.min(...prices),
      maxPriceData: Math.max(...prices)
    };
  }, []);

  // --- STAN FILTRÓW ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([minPriceData, maxPriceData]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  
  // USUNIĘTO: const [selectedCottage, setSelectedCottage] ... (już nie otwieramy modala)

  // Blokada scrolla body (opcjonalne, przy pełnej stronie czasem lepiej to usunąć, ale zostawiam jak chciałeś)
  useEffect(() => {
    // Odblokuj scrolla, bo to jest pełna strona, a nie modal!
    document.body.style.overflow = 'auto'; 
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Unikalne miasta
  const cities = useMemo(() => {
    const allCities = cottagesData.map(c => c.city);
    return ['all', ...Array.from(new Set(allCities))];
  }, []);

  // --- LOGIKA FILTROWANIA (ZACHOWANA) ---
  const filteredOffers = useMemo(() => {
    return cottagesData.filter(cottage => {
      // 1. Text search
      const matchesSearch = cottage.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            cottage.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // 2. Miasto
      const matchesCity = selectedCity === 'all' || cottage.city === selectedCity;

      // 3. Cena
      const priceVal = parsePrice(cottage.price);
      const matchesPrice = priceVal >= priceRange[0] && priceVal <= priceRange[1];

      // 4. Tagi
      const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => {
        const lowerTag = tag.toLowerCase();
        if (lowerTag === 'zwierzęta') return cottage.features.some(f => f.toLowerCase().includes('pet'));
        if (lowerTag === 'parking') return cottage.features.some(f => f.toLowerCase().includes('parking') || f.toLowerCase().includes('garaż'));
        return cottage.features.some(f => f.toLowerCase().includes(lowerTag));
      });

      const matchesDate = true; 
      
      return matchesSearch && matchesCity && matchesPrice && matchesTags && matchesDate;
    });
  }, [searchTerm, selectedCity, priceRange, selectedTags, dateRange]);

  // Obsługa zmiany tagów
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Obsługa slidera ceny
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: 0 | 1) => {
    const val = parseInt(e.target.value);
    setPriceRange(prev => {
      const newRange = [...prev] as [number, number];
      newRange[index] = val;
      if (index === 0 && val > newRange[1]) newRange[0] = newRange[1];
      if (index === 1 && val < newRange[0]) newRange[1] = newRange[0];
      return newRange;
    });
  };

  // Reset filtrów
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCity('all');
    setPriceRange([minPriceData, maxPriceData]);
    setSelectedTags([]);
    setDateRange({ start: '', end: '' });
  };

  return (
    <motion.div 
      className={styles.pageContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      
      <div className={styles.backButtonWrapper}>
        {/* ZMIANA: Zamiast button onClick, używamy Link to="/" */}
        <Link to="/" className={styles.backButton} style={{ textDecoration: 'none' }}>
          ← Wróć na główną
        </Link>
      </div>

      <header className={styles.header}>
        <h1 className={styles.title}>Wszystkie Oferty</h1>
        <p className={styles.subtitle}>
          Znaleziono {filteredOffers.length} obiektów spełniających Twoje kryteria.
        </p>
      </header>

      {/* --- PANEL FILTRÓW (BEZ ZMIAN) --- */}
      <div className={styles.filtersContainer}>
        {/* ... (Tu kod filtrów pozostaje identyczny jak w Twoim pliku) ... */}
        
        {/* Kopiuję strukturę filtrów dla kompletności pliku */}
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Lokalizacja / Nazwa</span>
          <input 
            type="text" 
            placeholder="Szukaj po nazwie..." 
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className={styles.filterSelect}
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="all">Wszystkie lokalizacje</option>
            {cities.filter(c => c !== 'all').map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Termin pobytu</span>
          <div className={styles.dateGroupRow}>
            <input 
              type="date" 
              className={styles.dateInput}
              value={dateRange.start}
              onChange={(e) => setDateRange(p => ({...p, start: e.target.value}))}
            />
            <input 
              type="date" 
              className={styles.dateInput}
              value={dateRange.end}
              min={dateRange.start}
              onChange={(e) => setDateRange(p => ({...p, end: e.target.value}))}
            />
          </div>
        </div>

        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Cena za noc</span>
          <div className={styles.priceRangeContainer}>
            <div className={styles.sliderTrack} />
            <div 
              className={styles.sliderRange}
              style={{
                left: `${((priceRange[0] - minPriceData) / (maxPriceData - minPriceData)) * 100}%`,
                right: `${100 - ((priceRange[1] - minPriceData) / (maxPriceData - minPriceData)) * 100}%`
              }}
            />
            <input 
              type="range" 
              min={minPriceData} max={maxPriceData} 
              value={priceRange[0]} 
              onChange={(e) => handlePriceChange(e, 0)}
              className={styles.rangeInput}
            />
            <input 
              type="range" 
              min={minPriceData} max={maxPriceData} 
              value={priceRange[1]} 
              onChange={(e) => handlePriceChange(e, 1)}
              className={styles.rangeInput}
            />
          </div>
          <div className={styles.priceLabels}>
            <span>{priceRange[0]} PLN</span>
            <span>{priceRange[1]} PLN</span>
          </div>
        </div>

        <div className={`${styles.filterGroup} ${styles.tagsRow}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '10px' }}>
             <span className={styles.filterLabel}>Udogodnienia</span>
             <div className={styles.resetBtnWrapper}>
                {(searchTerm || selectedCity !== 'all' || selectedTags.length > 0 || priceRange[0] !== minPriceData || priceRange[1] !== maxPriceData) && (
                  <button className={styles.resetBtn} onClick={resetFilters}>
                    Wyczyść filtry ✕
                  </button>
                )}
             </div>
          </div>
          
          <div className={styles.tagsContainer}>
            {AVAILABLE_TAGS.map(tag => (
              <span 
                key={tag} 
                className={`${styles.filterChip} ${selectedTags.includes(tag) ? styles.active : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* --- GRID Z OFERTAMI --- */}
      <div className={styles.offersGrid}>
        {filteredOffers.map((cottage, index) => {
           const imageUrl = fixImagePath(cottage.images[0]);
           const displayImage = `https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=600&q=50`; 
           
           return (
             // ZMIANA: Wrapujemy kafelek w Link. Usuwamy onClick ze środka.
             <Link 
               to={`/offers/${cottage.id}`} 
               key={cottage.id} 
               style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
             >
               <motion.div
                 className={styles.offerCard}
                 // USUNIĘTO onClick={() => setSelectedCottage(cottage)}
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
                 whileHover={{ y: -5 }} // Dodatkowy mały efekt hover
               >
                 <div className={styles.cardImageWrapper}>
                   <OfferImage 
                      src={imageUrl || displayImage} 
                      alt={cottage.title} 
                   />
                 </div>
                 
                 <div className={styles.cardContent}>
                   <div className={styles.cardHeader}>
                     <div>
                         <span className={styles.cardCity}>{cottage.city}</span>
                         <h3 className={styles.cardTitle}>{cottage.title}</h3>
                     </div>
                   </div>
                   <div className={styles.cardInfo}>
                     <span>{cottage.size} m²</span>
                     <span>•</span>
                     <span>Max {cottage.capacity} os.</span>
                   </div>
                   <div className={styles.cardFooter}>
                      <span className={styles.price}>{cottage.price}</span>
                      <span className={styles.detailsLink}>Szczegóły →</span>
                   </div>
                 </div>
               </motion.div>
             </Link>
           );
        })}
      </div>

      {filteredOffers.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '50px', color: 'var(--color-slate)' }}>
          <h3>Brak wyników</h3>
          <p>Spróbuj zmienić kryteria wyszukiwania.</p>
        </div>
      )}

      {/* USUNIĘTO: Blok z <OfferModal ... /> */}
      
    </motion.div>
  );
};

// ZMIANA: Dodajemy export default, żeby pasowało do App.tsx
export default OffersPage;