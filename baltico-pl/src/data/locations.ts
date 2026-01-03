// src/data/locations.ts
import type { Location } from '../types';

export const locationsData: Location[] = [
  {
    id: 'swinoujscie',
    city: 'Świnoujście',
    coordinates: { x: 26.5, y: 19 },
    shortDescription: 'Domy na wodzie w krainie 44 wysp.',
    fullDescription: 'Najdalej na zachód wysunięte polskie uzdrowisko, położone na kilkudziesięciu wyspach. Słynie z najszerszej plaży w Polsce i unikalnej architektury dzielnicy nadmorskiej.',
    cottageCount: 12,
    attractions: ['Stawa Młyny', 'Podziemne Miasto', 'Latarnia Morska'],
    image: '/locations/swinoujscie.jpg'
  },
  {
    id: 'kolobrzeg',
    city: 'Kołobrzeg',
    coordinates: { x: 32, y: 15 },
    shortDescription: 'Nowoczesne lofty w strefie uzdrowiskowej.',
    fullDescription: 'Polska stolica SPA. Miasto, które nigdy nie śpi, łączące historię twierdzy z nowoczesnym luksusem. Idealne dla szukających regeneracji biologicznej.',
    cottageCount: 8,
    attractions: ['Molo', 'Muzeum Oręża Polskiego', 'Latarnia Morska'],
    image: '/locations/kolobrzeg.jpg'
  },
  {
    id: 'darlowo',
    city: 'Darłowo',
    coordinates: { x: 37, y: 12 },
    shortDescription: 'Królewskie miasto z klimatem.',
    fullDescription: 'Historyczne miasto króla Eryka z unikalnym rozsuwanym mostem. Darłówko to idealny balans między turystycznym gwarem a spokojem portowego miasteczka.',
    cottageCount: 5,
    attractions: ['Zamek Książąt Pomorskich', 'Rozsuwany Most', 'Port Rybacki'],
    image: '/locations/darlowo.jpg'
  },
  {
    id: 'ustka',
    city: 'Ustka',
    coordinates: { x: 39.5, y: 8 },
    shortDescription: 'Bursztynowe serce wybrzeża.',
    fullDescription: 'Urokliwa osada rybacka przekształcona w nowoczesny kurort. Słynie z pięknej promenady, ruchomej kładki w porcie i specyficznego mikroklimatu.',
    cottageCount: 7,
    attractions: ['Bunkry Blüchera', 'Promenada Nadmorska', 'Muzeum Chleba'],
    image: '/locations/ustka.jpg'
  },
  {
    id: 'leba',
    city: 'Łeba',
    coordinates: { x: 42, y: 6 },
    shortDescription: 'Rezydencje przy Słowińskim Parku Narodowym.',
    fullDescription: 'Brama do ruchomych wydm. Miejsce, gdzie pustynny krajobraz spotyka się z morzem. Idealna baza wypadowa dla miłośników dzikiej natury i sportów wodnych.',
    cottageCount: 15,
    attractions: ['Ruchome Wydmy', 'Jezioro Łebsko', 'Muzeum Motyli'],
    image: '/locations/leba.jpg'
  },
  {
    id: 'sopot',
    city: 'Sopot',
    coordinates: { x: 47.0, y: 11 },
    shortDescription: 'Wille w stylu secesyjnym blisko molo.',
    fullDescription: 'Najbardziej prestiżowy kurort w Polsce. Secesyjne wille, najdłuższe drewniane molo w Europie i legendarne życie nocne przy Monciaku.',
    cottageCount: 4,
    attractions: ['Molo w Sopocie', 'Opera Leśna', 'Krzywy Domek'],
    image: '/locations/sopot.jpg'
  },
  {
    id: 'hel',
    city: 'Hel',
    coordinates: { x: 48, y: 7.5 },
    shortDescription: 'Apartamenty na cyplu z widokiem na zatokę.',
    fullDescription: 'Początek Polski. Wyjątkowe położenie na cyplu otoczonym wodą z trzech stron. Raj dla windsurferów i miłośników militariów.',
    cottageCount: 6,
    attractions: ['Fokarium', 'Muzeum Obrony Wybrzeża', 'Cypel Helski'],
    image: '/locations/hel.jpg'
  }
];