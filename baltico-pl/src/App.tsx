// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Importy sekcji
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { LocationsMapSection } from './sections/LocationsMapSection';
import OffersCarousel from './sections/OffersCarousel';
import { Footer } from './sections/Footer';
import { AuthModal } from './sections/AuthModal';

// Importy stron (Upewnij się, że ścieżki są poprawne!)
import OffersPage from './sections/OffersPage'; 
import OfferDetailsPage from './sections/OfferDetailsPage';

// --- KOMPONENT STRONY GŁÓWNEJ (Stworzony, żeby wyczyścić główny routing) ---
const HomePage = ({ onOpenAuth }: { onOpenAuth: () => void }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection 
        onOpenAuth={onOpenAuth} 
        onGoToOffers={() => navigate('/offers')} 
      />
      
      <AboutSection />
      <LocationsMapSection />
      
      <OffersCarousel onGoToOffers={() => navigate('/offers')} /> 
      
      <div style={{ textAlign: 'center', padding: '40px 0', background: 'var(--color-navy)' }}>
         <button className="btn-standard" onClick={() => navigate('/offers')}>
           Zobacz pełną ofertę
         </button>
      </div>

      <Footer />
    </motion.div>
  );
};

// --- KOMPONENT Z ROUTINGIEM I ANIMACJAMI ---
// Musi być osobno, żeby móc użyć useLocation() wewnątrz BrowserRoutera
const AnimatedRoutes = ({ onOpenAuth }: { onOpenAuth: () => void }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        {/* TRASA 1: Strona Główna */}
        <Route path="/" element={<HomePage onOpenAuth={onOpenAuth} />} />
        
        {/* TRASA 2: Lista Ofert */}
        <Route 
          path="/offers" 
          element={
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              {/* Tutaj OffersPage nie potrzebuje już onBack, bo mamy przycisk wstecz w przeglądarce */}
              <OffersPage />
            </motion.div>
          } 
        />

        {/* TRASA 3: Szczegóły Oferty (To co dodaliśmy wcześniej) */}
        <Route 
          path="/offers/:id" 
          element={
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <OfferDetailsPage />
            </motion.div>
          } 
        />

      </Routes>
    </AnimatePresence>
  );
};

// --- GŁÓWNY APP ---
function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <BrowserRouter>
      <main style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
        
        {/* Główna zawartość z routingiem */}
        <AnimatedRoutes onOpenAuth={() => setIsAuthOpen(true)} />

        {/* Modal logowania (zawsze dostępny ponad stronami) */}
        <AuthModal 
          isOpen={isAuthOpen} 
          onClose={() => setIsAuthOpen(false)} 
        />
        
      </main>
    </BrowserRouter>
  );
}

export default App;