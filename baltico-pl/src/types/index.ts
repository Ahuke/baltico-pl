// src/types/index.ts

export interface SectionProps {
  id?: string;
  className?: string;
}

export interface AnimationSettings {
  initial: object;
  animate: object;
  transition: object;
}

// Typy danych (placeholder pod przyszłe pliki data/)
// src/types.ts
export interface Cottage {
  id: string;
  title: string;
  description: string;
  price: string;
  capacity: number;
  features: string[];
  // Nowe pola:
  city: string;
  size: number; // w m2
  images: string[]; // tablica ścieżek do zdjęć
}

export interface Location {
  id: string;
  city: string;
  coordinates: { x: number; y: number };
  shortDescription: string; // To co w dymku (tooltip)
  fullDescription: string;  // Długi opis w panelu
  cottageCount: number;     // Ilość domków
  attractions: string[];    // Lista atrakcji
  image: string;            // Ścieżka do pliku (np. /images/locations/hel.jpg)
}