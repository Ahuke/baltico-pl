// src/sections/LocationsMapSection.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { locationsData } from '../data/locations';
import { cottagesData } from '../data/cottages';
import type { Location } from '../types';
import styles from './LocationsMapSection.module.css';

export const LocationsMapSection: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [hoveredLocationId, setHoveredLocationId] = useState<string | null>(null);

  const handleMapClick = (e: React.MouseEvent) => {
    if (
      e.target === e.currentTarget || 
      (e.target as HTMLElement).classList.contains(styles.mapImage) ||
      (e.target as HTMLElement).classList.contains(styles.mapAspectRatioBox)
    ) {
      setSelectedLocation(null);
    }
  };

  return (
    <section className={styles.section} id="lokalizacje">
      <div className={styles.heading}>
        <motion.h2 
          className={styles.headline}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Nasze Lokalizacje
        </motion.h2>
        <p className={styles.subheadline}>
          Kliknij na miasto, aby odkryć unikalne miejsca.
        </p>
      </div>

      <div className={styles.contentWrapper}>
        <motion.div 
          className={styles.mapColumn}
          // Przesunięcie mapy, gdy panel wjeżdża
          animate={{ x: selectedLocation ? '-15%' : '0%' }} 
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={handleMapClick}
        >
          <div className={styles.mapAspectRatioBox}>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/b/bf/POL_location_map.svg"
              alt="Mapa Polski"
              className={styles.mapImage}
            />

            {locationsData.map((location) => {
              const isHovered = hoveredLocationId === location.id;
              const isSelected = selectedLocation?.id === location.id;
              
              return (
                <div
                  key={location.id}
                  className={`${styles.markerWrapper} ${isSelected ? styles.active : ''}`}
                  style={{ 
                    left: `${location.coordinates.x}%`, 
                    top: `${location.coordinates.y}%`,
                    zIndex: isHovered ? 100 : (isSelected ? 50 : 10)
                  }}
                  onMouseEnter={() => setHoveredLocationId(location.id)}
                  onMouseLeave={() => setHoveredLocationId(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedLocation(location);
                  }}
                >
                  <motion.div 
                    className={styles.marker}
                    animate={isSelected ? {} : { 
                      boxShadow: ["0 0 0 0px rgba(212, 175, 55, 0.2)", "0 0 0 8px rgba(212, 175, 55, 0)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  <AnimatePresence>
                    {isHovered && !isSelected && (
                      <motion.div
                        className={styles.tooltip}
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                      >
                        <span className={styles.tooltipTitle}>{location.city}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* PANEL BOCZNY */}
        <AnimatePresence>
          {selectedLocation && (
            <motion.div 
              className={styles.detailsPanel}
              initial={{ x: '110%', opacity: 0 }}
              animate={{ x: '0%', opacity: 1 }}
              exit={{ x: '110%', opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className={styles.panelImageContainer}>
                <img 
                   src={selectedLocation.image} 
                   alt={selectedLocation.city}
                   className={styles.panelImage}
                   onError={(e) => {
                     const target = e.target as HTMLImageElement;
                     target.src = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80";
                   }}
                />
                <button 
                  className={styles.closeButton} 
                  onClick={() => setSelectedLocation(null)}
                >
                  ✕
                </button>
              </div>

              <div className={styles.panelContent}>
                {/* Header panelu: Tytuł + Badge ilości */}
                <div className={styles.panelHeader}>
                    <h3 className={styles.panelTitle}>{selectedLocation.city}</h3>
                    <span className={styles.statsBadge}>
                      {cottagesData.filter(c => c.city === selectedLocation.city).length} Obiektów
                    </span>
                </div>

                <p className={styles.panelDesc}>
                  {selectedLocation.fullDescription}
                </p>

                <div className={styles.attractionsSection}>
                    <span className={styles.attractionsTitle}>W okolicy:</span>
                    <div className={styles.attractionsTags}>
                    {selectedLocation.attractions.map((attr, idx) => (
                        <span key={idx} className={styles.attractionTag}>
                            {attr}
                        </span>
                    ))}
                    </div>
                </div>

                <button 
                // ZMIANA: Zamiast stylów modułowych, dodajemy też klasę globalną
                  className={`${styles.actionButton} btn-standard`} 
                  onClick={() => console.log(`Rezerwuj: ${selectedLocation.city}`)}
                >
                Zobacz Dostępność
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};