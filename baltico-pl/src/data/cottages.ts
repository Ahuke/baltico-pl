// src/data/cottages.ts
import type { Cottage } from '../types';

export const cottagesData: Cottage[] = [
  // --- ŚWINOUJŚCIE (12) ---
  {
    id: 'sw-1',
    title: 'Baltic Park Loft',
    description: 'Nowoczesny apartament z widokiem na promenadę, zaledwie 50m od plaży. Idealny dla rodzin.',
    price: 'od 650 PLN / noc',
    capacity: 4,
    features: ['Widok na morze', 'Garaż', 'Winda', 'Balkon'],
    city: 'Świnoujście',
    size: 55,
    images: ['/cottageImages/sw-1.jpg', '/cottageImages/sw-1-b.jpg']
  },
  {
    id: 'sw-2',
    title: 'Willa Cesarska',
    description: 'Stylowa willa w dzielnicy uzdrowiskowej. Klimat lat 20. połączony z nowoczesnym komfortem.',
    price: 'od 400 PLN / noc',
    capacity: 2,
    features: ['Klimatyzacja', 'Ogród', 'Historyczny budynek'],
    city: 'Świnoujście',
    size: 35,
    images: ['/cottageImages/sw-2.jpg', '/cottageImages/sw-2.jpg-b', '/cottageImages/sw-2.jpg-c']
  },
  {
    id: 'sw-3',
    title: 'Apartamenty Promenada',
    description: 'Luksusowe wnętrze w samym centrum wydarzeń. Blisko restauracji i atrakcji.',
    price: 'od 550 PLN / noc',
    capacity: 4,
    features: ['Wi-Fi', 'Smart TV', 'Aneks kuchenny'],
    city: 'Świnoujście',
    size: 48,
    images: ['/cottageImages/sw-3.jpg', '/cottageImages/sw-3.jpg-b']
  },
  {
    id: 'sw-4',
    title: 'Domki na Wydmie',
    description: 'Kameralne domki całoroczne położone w cichej części miasta, blisko granicy.',
    price: 'od 380 PLN / noc',
    capacity: 6,
    features: ['Grill', 'Taras', 'Parking', 'Pet Friendly'],
    city: 'Świnoujście',
    size: 70,
    images: ['/cottageImages/sw-4.jpg', '/cottageImages/sw-4.jpg-b', '/cottageImages/sw-4-c.jpg']
  },
  {
    id: 'sw-5',
    title: 'Rezydencja Sawa',
    description: 'Apartament typu penthouse z prywatnym jacuzzi na tarasie i panoramą portu.',
    price: 'od 1200 PLN / noc',
    capacity: 4,
    features: ['Jacuzzi', 'Penthouse', 'Widok na port', 'Kominek'],
    city: 'Świnoujście',
    size: 90,
    images: ['/cottageImages/sw-5.jpg', '/cottageImages/sw-5.jpg-b', '/cottageImages/sw-5.jpg-c']
  },
  {
    id: 'sw-6',
    title: 'Portowy Zakątek',
    description: 'Przytulne studio blisko przeprawy promowej. Świetna baza wypadowa na rowery.',
    price: 'od 250 PLN / noc',
    capacity: 2,
    features: ['Rowerownia', 'Cisza', 'Niska cena'],
    city: 'Świnoujście',
    size: 28,
    images: ['/cottageImages/sw-6.jpg', '/cottageImages/sw-6.jpg-b', '/cottageImages/sw-6.jpg-c', '/cottageImages/sw-6.jpg-a']
  },
  {
    id: 'sw-7',
    title: 'Błękitna Laguna',
    description: 'Przestronny apartament z dwoma sypialniami w kompleksie z basenem.',
    price: 'od 700 PLN / noc',
    capacity: 5,
    features: ['Dostęp do basenu', 'SPA', 'Dla rodzin'],
    city: 'Świnoujście',
    size: 65,
    images: ['/cottageImages/sw-7.jpg', '/cottageImages/sw-7.jpg-a', '/cottageImages/sw-7.jpg-b', '/cottageImages/sw-7.jpg-c']
  },
  {
    id: 'sw-8',
    title: 'Sun & Sand Apartments',
    description: 'Minimalistyczny design, duże przeszklenia i bliskość natury.',
    price: 'od 480 PLN / noc',
    capacity: 3,
    features: ['Design', 'Balkon', 'Ekspres do kawy'],
    city: 'Świnoujście',
    size: 40,
    images: ['/cottageImages/sw-8.jpg', '/cottageImages/sw-8.jpg-a', '/cottageImages/sw-8.jpg-b', '/cottageImages/sw-8.jpg-c']
  },
  {
    id: 'sw-9',
    title: 'Latarnia View',
    description: 'Unikalny apartament z widokiem na najwyższą latarnię morską w Polsce.',
    price: 'od 320 PLN / noc',
    capacity: 4,
    features: ['Widok', 'Parking', 'Plac zabaw'],
    city: 'Świnoujście',
    size: 50,
    images: ['/cottageImages/sw-9.jpg', '/cottageImages/sw-9.jpg-a', '/cottageImages/sw-9.jpg-b', '/cottageImages/sw-9.jpg-c']
  },
  {
    id: 'sw-10',
    title: 'Eco-Cottages Uznam',
    description: 'Ekologiczne domki drewniane na obrzeżach miasta. Pełen relaks.',
    price: 'od 420 PLN / noc',
    capacity: 5,
    features: ['Ogród', 'Ekologia', 'Hamaki'],
    city: 'Świnoujście',
    size: 60,
    images: ['/cottageImages/sw-10.jpg', '/cottageImages/sw-10.jpg-a', '/cottageImages/sw-10.jpg-b', '/cottageImages/sw-10.jpg-c']
  },
  {
    id: 'sw-11',
    title: 'Apartamenty Plażowa',
    description: 'Klasyczny standard hotelowy w formie prywatnego apartamentu.',
    price: 'od 300 PLN / noc',
    capacity: 2,
    features: ['Recepcja 24h', 'Śniadania', 'Blisko morza'],
    city: 'Świnoujście',
    size: 32,
    images: ['/cottageImages/sw-11.jpg', '/cottageImages/sw-11.jpg-a']
  },
  {
    id: 'sw-12',
    title: 'Willa Magnolia',
    description: 'Zabytkowa willa z pięknym ogrodem, idealna na romantyczny weekend.',
    price: 'od 380 PLN / noc',
    capacity: 2,
    features: ['Ogród', 'Romantyczny', 'Cisza'],
    city: 'Świnoujście',
    size: 45,
    images: ['/cottageImages/sw-12-a.jpg', '/cottageImages/sw-12-b.jpg']
  },

  // --- KOŁOBRZEG (8) ---
  {
    id: 'kol-1',
    title: 'Grand Seaside Kołobrzeg',
    description: 'Apartament w pięciogwiazdkowym kompleksie tuż przy molo.',
    price: 'od 900 PLN / noc',
    capacity: 4,
    features: ['Basen', 'Siłownia', 'Widok na morze'],
    city: 'Kołobrzeg',
    size: 58,
    images: ['/cottageImages/kol-1.jpg', '/cottageImages/kol-1-a.jpg', '/cottageImages/kol-1-b.jpg']
  },
  {
    id: 'kol-2',
    title: 'Apartamenty Solne',
    description: 'Wygodne mieszkanie blisko źródeł solankowych i parku zdrojowego.',
    price: 'od 350 PLN / noc',
    capacity: 4,
    features: ['Blisko parku', 'Balkon', 'TV'],
    city: 'Kołobrzeg',
    size: 42,
    images: ['/cottageImages/kol-2.jpg', '/cottageImages/kol-2-a.jpg', '/cottageImages/kol-2-b.jpg']
  },
  {
    id: 'kol-3',
    title: 'Willa Parkowa',
    description: 'Kameralny obiekt położony w cichej dzielnicy willowej.',
    price: 'od 280 PLN / noc',
    capacity: 3,
    features: ['Ogród', 'Grill', 'Parking'],
    city: 'Kołobrzeg',
    size: 38,
    images: ['/cottageImages/kol-3.jpg', '/cottageImages/kol-3-a.jpg', '/cottageImages/kol-3-b.jpg']
  },
  {
    id: 'kol-4',
    title: 'Marine Luxury',
    description: 'Designerski apartament z przeszkleniami od podłogi do sufitu.',
    price: 'od 750 PLN / noc',
    capacity: 2,
    features: ['Design', 'Klimatyzacja', 'Widok'],
    city: 'Kołobrzeg',
    size: 50,
    images: ['/cottageImages/kol-4.jpg', '/cottageImages/kol-4-a.jpg']
  },
  {
    id: 'kol-5',
    title: 'Bursztynowy Las',
    description: 'Domki letniskowe w otoczeniu drzew, 10 minut spacerem od plaży.',
    price: 'od 300 PLN / noc',
    capacity: 6,
    features: ['Las', 'Dla rodzin', 'Taras'],
    city: 'Kołobrzeg',
    size: 65,
    images: ['/cottageImages/kol-5.jpg', '/cottageImages/kol-5-a.jpg', '/cottageImages/kol-5-b.jpg']
  },
  {
    id: 'kol-6',
    title: 'Molo View Residence',
    description: 'Ekskluzywne wnętrza dla wymagających klientów.',
    price: 'od 1100 PLN / noc',
    capacity: 4,
    features: ['Luksus', 'Concierge', 'Garaż'],
    city: 'Kołobrzeg',
    size: 75,
    images: ['/cottageImages/kol-6.jpg', '/cottageImages/kol-6-a.jpg']
  },
  {
    id: 'kol-7',
    title: 'Old Town Loft',
    description: 'Klimatyczny loft w odrestaurowanej kamienicy na starówce.',
    price: 'od 420 PLN / noc',
    capacity: 2,
    features: ['Stare Miasto', 'Cegła', 'Klimat'],
    city: 'Kołobrzeg',
    size: 55,
    images: ['/cottageImages/kol-7.jpg', '/cottageImages/kol-7-a.jpg', '/cottageImages/kol-7-b.jpg', '/cottageImages/kol-7-c.jpg']
  },
  {
    id: 'kol-8',
    title: 'Family Resort Kołobrzeg',
    description: 'Duże mieszkanie przygotowane specjalnie pod rodziny z dziećmi.',
    price: 'od 500 PLN / noc',
    capacity: 6,
    features: ['Łóżeczko dziecięce', 'Zabawki', 'Bezpieczeństwo'],
    city: 'Kołobrzeg',
    size: 80,
    images: ['/cottageImages/sw-8.jpg', '/cottageImages/sw-8-b.jpg', '/cottageImages/kol-8-a.jpg']
  },

  // --- DARŁOWO (5) ---
  {
    id: 'dar-1',
    title: 'Przystań Królewska',
    description: 'Apartamenty z widokiem na rozsuwany most w Darłówku.',
    price: 'od 400 PLN / noc',
    capacity: 4,
    features: ['Widok na rzekę', 'Centrum', 'Balkon'],
    city: 'Darłowo',
    size: 45,
    images: ['/cottageImages/dar-1.jpg', '/cottageImages/dar-1-a.jpg', '/cottageImages/dar-1-b.jpg', '/cottageImages/dar-1-c.jpg']
  },
  {
    id: 'dar-2',
    title: 'Domki Rybackie',
    description: 'Stylizowane domki tuż przy wydmach. Morski klimat gwarantowany.',
    price: 'od 350 PLN / noc',
    capacity: 5,
    features: ['Blisko plaży', 'Klimat', 'Taras'],
    city: 'Darłowo',
    size: 50,
    images: ['/cottageImages/dar-2.jpg', '/cottageImages/dar-2-a.jpg', '/cottageImages/dar-2-b.jpg']
  },
  {
    id: 'dar-3',
    title: 'Apartamenty Marina',
    description: 'Nowoczesny kompleks z dostępem do basenu zewnętrznego.',
    price: 'od 550 PLN / noc',
    capacity: 4,
    features: ['Basen', 'Parking', 'Winda'],
    city: 'Darłowo',
    size: 52,
    images: ['/cottageImages/dar-3.jpg', '/cottageImages/dar-3-a.jpg', '/cottageImages/dar-3-b.jpg']
  },
  {
    id: 'dar-4',
    title: 'Słoneczny Brzeg',
    description: 'Ekonomiczne kwatery dla grup znajomych blisko aquaparku.',
    price: 'od 200 PLN / noc',
    capacity: 6,
    features: ['Tanie', 'Duża przestrzeń', 'Grill'],
    city: 'Darłowo',
    size: 70,
    images: ['/cottageImages/dar-4.jpg', '/cottageImages/dar-4-a.jpg', '/cottageImages/dar-4-b.jpg']
  },
  {
    id: 'dar-5',
    title: 'Willa Zamek',
    description: 'Eleganckie pokoje w historycznej części miasta, blisko Zamku Książąt Pomorskich.',
    price: 'od 280 PLN / noc',
    capacity: 2,
    features: ['Historia', 'Centrum', 'Cisza'],
    city: 'Darłowo',
    size: 30,
    images: ['/cottageImages/dar-5.jpg', '/cottageImages/dar-5-a.jpg']
  },

  // --- USTKA (7) ---
  {
    id: 'ust-1',
    title: 'Syrenka Apartments',
    description: 'Apartament przy samej promenadzie. Kawa na balkonie z widokiem na morze.',
    price: 'od 600 PLN / noc',
    capacity: 4,
    features: ['Widok na morze', 'Promenada', 'Winda'],
    city: 'Ustka',
    size: 48,
    images: ['/cottageImages/ala-1.jpg', '/cottageImages/ala-1-a.jpg']
  },
  {
    id: 'ust-2',
    title: 'Willa Klifowa',
    description: 'Położona na klifie, oferuje niesamowite zachody słońca.',
    price: 'od 450 PLN / noc',
    capacity: 3,
    features: ['Widok', 'Ogród', 'Prywatność'],
    city: 'Ustka',
    size: 40,
    images: ['/cottageImages/ala-2.jpg', '/cottageImages/ala-2-a.jpg', '/cottageImages/ala-2-b.jpg']
  },
  {
    id: 'ust-3',
    title: 'Domki Sosnowe',
    description: 'Drewniane domki w lesie, idealne dla alergików i szukających zdrowego powietrza.',
    price: 'od 320 PLN / noc',
    capacity: 5,
    features: ['Las', 'Natura', 'Plac zabaw'],
    city: 'Ustka',
    size: 60,
    images: ['/cottageImages/ala-3.jpg', '/cottageImages/ala-3-a.jpg', '/cottageImages/ala-3-b.jpg']
  },
  {
    id: 'ust-4',
    title: 'Apartamenty Portowe',
    description: 'Industrialny styl w starym spichlerzu portowym.',
    price: 'od 500 PLN / noc',
    capacity: 2,
    features: ['Loft', 'Port', 'Unikalny styl'],
    city: 'Ustka',
    size: 55,
    images: ['/cottageImages/ala-4.jpg', '/cottageImages/ala-4-a.jpg', '/cottageImages/ala-4-b.jpg']
  },
  {
    id: 'ust-5',
    title: 'Rezydencja Kapitańska',
    description: 'Duży dom na wynajem dla dwóch rodzin.',
    price: 'od 800 PLN / noc',
    capacity: 8,
    features: ['Duża powierzchnia', 'Dwie łazienki', 'Ogród'],
    city: 'Ustka',
    size: 120,
    images: ['/cottageImages/ala-5.jpg', '/cottageImages/ala-5-a.jpg', '/cottageImages/ala-5-b.jpg', '/cottageImages/ala-5-c.jpg']
  },
  {
    id: 'ust-6',
    title: 'Sunny Terrace',
    description: 'Apartament z ogromnym tarasem na dachu.',
    price: 'od 550 PLN / noc',
    capacity: 4,
    features: ['Taras 40m2', 'Leżaki', 'Grill'],
    city: 'Ustka',
    size: 50,
    images: ['/cottageImages/ala-6.jpg', '/cottageImages/ala-6-a.jpg', '/cottageImages/ala-6-b.jpg']
  },
  {
    id: 'ust-7',
    title: 'Blue Marine Ustka',
    description: 'Standard hotelowy, blisko plaży zachodniej.',
    price: 'od 380 PLN / noc',
    capacity: 3,
    features: ['Nowoczesny', 'Parking', 'Wi-Fi'],
    city: 'Ustka',
    size: 35,
    images: ['/cottageImages/ala-7.jpg', '/cottageImages/ala-7-a.jpg', '/cottageImages/ala-7-b.jpg', '/cottageImages/ala-7-c.jpg']
  },

  // --- ŁEBA (5) ---
  {
    id: 'leb-1',
    title: 'Wydma Resort',
    description: 'Luksusowe domki blisko ruchomych wydm.',
    price: 'od 450 PLN / noc',
    capacity: 4,
    features: ['Blisko natury', 'Komfort', 'Rowerownia'],
    city: 'Łeba',
    size: 50,
    images: ['/cottageImages/leb-1.jpg', '/cottageImages/leb-1-a.jpg', '/cottageImages/leb-1-b.jpg']
  },
  {
    id: 'leb-2',
    title: 'Domki Słowińskie',
    description: 'Regionalna architektura i dużo przestrzeni zielonej.',
    price: 'od 300 PLN / noc',
    capacity: 6,
    features: ['Ognisko', 'Boisko', 'Dla grup'],
    city: 'Łeba',
    size: 65,
    images: ['/cottageImages/leb-2.jpg', '/cottageImages/leb-2-a.jpg', '/cottageImages/leb-2-b.jpg']
  },
  {
    id: 'leb-3',
    title: 'Willa Neptun',
    description: 'Pensjonat w centrum Łeby, blisko kanału portowego.',
    price: 'od 250 PLN / noc',
    capacity: 2,
    features: ['Centrum', 'TV', 'Lodówka'],
    city: 'Łeba',
    size: 25,
    images: ['/cottageImages/leb-3.jpg', '/cottageImages/leb-3-a.jpg', '/cottageImages/leb-3-b.jpg', '/cottageImages/leb-3-c.jpg']
  },
  {
    id: 'leb-4',
    title: 'Apartamenty Piaskowe',
    description: 'Nowoczesne osiedle zaledwie 300m od plaży.',
    price: 'od 400 PLN / noc',
    capacity: 4,
    features: ['Nowe budownictwo', 'Balkon', 'Garaż'],
    city: 'Łeba',
    size: 45,
    images: ['/cottageImages/leb-4.jpg', '/cottageImages/leb-4-a.jpg', '/cottageImages/leb-4-b.jpg', '/cottageImages/leb-4-c.jpg', '/cottageImages/leb-4-d.jpg']
  },
  {
    id: 'leb-5',
    title: 'Sea & Wind',
    description: 'Idealne miejsce dla windsurferów, blisko jeziora Sarbsko.',
    price: 'od 280 PLN / noc',
    capacity: 3,
    features: ['Sporty wodne', 'Przechowalnia sprzętu', 'Taras'],
    city: 'Łeba',
    size: 40,
    images: ['/cottageImages/leb-5.jpg', '/cottageImages/leb-5-a.jpg', '/cottageImages/leb-5-b.jpg', '/cottageImages/leb-5-c.jpg']
  },

  // --- HEL (6) ---
  {
    id: 'hel-1',
    title: 'Cypel Residence',
    description: 'Mieszkaj na samym początku Polski. Widok na zatokę i morze.',
    price: 'od 650 PLN / noc',
    capacity: 4,
    features: ['Unikalna lokalizacja', 'Widok 360', 'Luksus'],
    city: 'Hel',
    size: 60,
    images: ['/cottageImages/hel-1.jpg', '/cottageImages/hel-1-a.jpg', '/cottageImages/hel-1-b.jpg', '/cottageImages/hel-1-b.jpg', '/cottageImages/hel-1-c.jpg']
  },
  {
    id: 'hel-2',
    title: 'Fokarium View',
    description: 'Przytulne mieszkanie naprzeciwko fokarium.',
    price: 'od 350 PLN / noc',
    capacity: 3,
    features: ['Centrum', 'Blisko atrakcji', 'Wi-Fi'],
    city: 'Hel',
    size: 38,
    images: ['/cottageImages/hel-2.jpg']
  },
  {
    id: 'hel-3',
    title: 'Surfer\'s House',
    description: 'Klimatyczny dom dla miłośników kitesurfingu na kempingu Chałupy (blisko Helu).',
    price: 'od 400 PLN / noc',
    capacity: 5,
    features: ['Klimat surf', 'Blisko zatoki', 'Imprezy'],
    city: 'Hel',
    size: 55,
    images: ['/cottageImages/hel-3.jpg', '/cottageImages/hel-3-a.jpg', '/cottageImages/hel-3-b.jpg']
  },
  {
    id: 'hel-4',
    title: 'Willa Rybacka',
    description: 'Tradycyjny kaszubski dom rybacki z duszą.',
    price: 'od 300 PLN / noc',
    capacity: 4,
    features: ['Tradycja', 'Drewno', 'Kominek'],
    city: 'Hel',
    size: 70,
    images: ['/cottageImages/hel-4.jpg', '/cottageImages/hel-4-a.jpg', '/cottageImages/hel-4-b.jpg']
  },
  {
    id: 'hel-5',
    title: 'Apartamenty Helskie',
    description: 'Standardowe apartamenty wakacyjne w dobrej cenie.',
    price: 'od 280 PLN / noc',
    capacity: 4,
    features: ['Ekonomiczne', 'Parking', 'Balkon'],
    city: 'Hel',
    size: 42,
    images: ['/cottageImages/hel-5.jpg', '/cottageImages/hel-5-a.jpg', '/cottageImages/hel-5-b.jpg']
  },
  {
    id: 'hel-6',
    title: 'Baltic Sands Hel',
    description: 'Apartamenty premium położone w lesie wydmowym.',
    price: 'od 800 PLN / noc',
    capacity: 4,
    features: ['Premium', 'Las', 'Cisza'],
    city: 'Hel',
    size: 65,
    images: ['/cottageImages/hel-6.jpg', '/cottageImages/hel-6-a.jpg', '/cottageImages/hel-6-b.jpg']
  },

  // --- SOPOT (4) ---
  {
    id: 'sop-1',
    title: 'Grand Sopot Apartment',
    description: 'Apartament w sercu Sopotu, tuż przy Krzywym Domku.',
    price: 'od 950 PLN / noc',
    capacity: 4,
    features: ['Monciak', 'Luksus', 'Klimatyzacja', 'Parking'],
    city: 'Sopot',
    size: 75,
    images: ['/cottageImages/sop-1.jpg', '/cottageImages/sop-1-a.jpg', '/cottageImages/sop-1-b.jpg', '/cottageImages/sop-1-c.jpg']
  },
  {
    id: 'sop-2',
    title: 'Monciak Luxury',
    description: 'Dla ceniących życie nocne i bliskość najlepszych klubów.',
    price: 'od 700 PLN / noc',
    capacity: 2,
    features: ['Centrum', 'Design', 'Smart Home'],
    city: 'Sopot',
    size: 45,
    images: ['/cottageImages/sop-2.jpg', '/cottageImages/sop-2-a.jpg']
  },
  {
    id: 'sop-3',
    title: 'Willa Secesja',
    description: 'Odrestaurowana kamienica w dolnym Sopocie. Wysokie sufity i sztukaterie.',
    price: 'od 600 PLN / noc',
    capacity: 3,
    features: ['Historia', 'Styl', 'Blisko plaży'],
    city: 'Sopot',
    size: 55,
    images: ['/cottageImages/sop-3.jpg', '/cottageImages/sop-3-a.jpg', '/cottageImages/sop-3-b.jpg', '/cottageImages/sop-3-c.jpg']
  },
  {
    id: 'sop-4',
    title: 'Sopot Beach House',
    description: 'Rzadkość w Sopocie – domek z wyjściem bezpośrednio na plażę.',
    price: 'od 1500 PLN / noc',
    capacity: 6,
    features: ['Plaża', 'Prywatność', 'Sauna', 'Taras'],
    city: 'Sopot',
    size: 110,
    images: ['/cottageImages/sop-4.jpg', '/cottageImages/sop-4-a.jpg', '/cottageImages/sop-4-b.jpg', '/cottageImages/sop-4-c.jpg', '/cottageImages/sop-4-d.jpg']
  }
];