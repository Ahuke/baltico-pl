// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Import klienta Supabase (zgodnie z Twoją ścieżką w src/)
import { supabase } from './supabaseClient';

// Importy sekcji
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { LocationsMapSection } from './sections/LocationsMapSection';
import OffersCarousel from './sections/OffersCarousel';
import { Footer } from './sections/Footer';
import { AuthModal } from './sections/AuthModal';

// Importy stron
import OffersPage from './sections/OffersPage'; 
import OfferDetailsPage from './sections/OfferDetailsPage';

// --- KOMPONENT STRONY GŁÓWNEJ ---
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
              <OffersPage />
            </motion.div>
          } 
        />

        {/* TRASA 3: Szczegóły Oferty */}
        <Route 
          path="/offers/:id" 
          element={
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* WAŻNE: Przekazujemy onOpenAuth, żeby działał przycisk "Zaloguj i rezerwuj" */}
              <OfferDetailsPage onOpenAuth={onOpenAuth} />
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

  // --- TEST POŁĄCZENIA Z BAZĄ DANYCH ---
  useEffect(() => {
    const checkConnection = async () => {
      console.log("%c📡 Supabase: Testowanie połączenia...", "color: cyan; font-weight: bold;");
      
      try {
        // Próbujemy pobrać 1 wiersz z tabeli 'cottages'
        const { data, error } = await supabase
          .from('cottages')
          .select('*')
          .limit(1);

        if (error) {
          console.error("%c❌ BŁĄD Supabase:", "color: red; font-weight: bold;", error.message);
        } else {
          console.log("%c✅ Supabase: Połączono!", "color: lightgreen; font-weight: bold;");
          console.log("📦 Pobrane dane testowe:", data);
          
          if (data.length === 0) {
            console.warn("⚠️ Tabela 'cottages' jest pusta. Połączenie działa, ale nie ma danych do wyświetlenia.");
          }
        }
      } catch (err) {
        console.error("❌ Krytyczny błąd klienta:", err);
      }
    };

    checkConnection();
  }, []); // Pusta tablica [] oznacza, że wykona się tylko raz po załadowaniu strony

  return (
    <BrowserRouter>
      <main style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
        
        <AnimatedRoutes onOpenAuth={() => setIsAuthOpen(true)} />

        <AuthModal 
          isOpen={isAuthOpen} 
          onClose={() => setIsAuthOpen(false)} 
        />
        
      </main>
    </BrowserRouter>
  );
}

export default App;