// src/sections/Footer.tsx
import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Górna sekcja z kolumnami */}
        <div className={styles.grid}>
          
          {/* 1. Marka */}
          <div className={styles.brandColumn}>
            <div className={styles.logo}>
              Baltico<span>.</span>
            </div>
            <p className={styles.tagline}>
              Łączymy wymagających podróżników z najbardziej unikalnymi 
              lokalizacjami nad polskim morzem. Twój spokój jest naszym priorytetem.
            </p>
          </div>

          {/* 2. Nawigacja */}
          <div>
            <h4 className={styles.columnTitle}>Odkrywaj</h4>
            <ul className={styles.linkList}>
              <li><a href="#" className={styles.link}>Strona główna</a></li>
              <li><a href="#oferta" className={styles.link}>Nasze obiekty</a></li>
              <li><a href="#lokalizacje" className={styles.link}>Lokalizacje</a></li>
              <li><a href="#" className={styles.link}>O nas</a></li>
            </ul>
          </div>

          {/* 3. Strefa Gościa */}
          <div>
            <h4 className={styles.columnTitle}>Strefa Gościa</h4>
            <ul className={styles.linkList}>
              <li><a href="#" className={styles.link}>Panel klienta</a></li>
              <li><a href="#" className={styles.link}>Najczęstsze pytania (FAQ)</a></li>
              <li><a href="#" className={styles.link}>Voucher podarunkowy</a></li>
              <li><a href="#" className={styles.link}>Zgłoś problem</a></li>
            </ul>
          </div>

          {/* 4. Kontakt */}
          <div>
            <h4 className={styles.columnTitle}>Kontakt</h4>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📍</span>
              <span>
                ul. Nadmorska 12<br />
                81-300 Gdynia, Polska
              </span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📞</span>
              <a href="tel:+48500600700" className={styles.link}>+48 500 600 700</a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>✉️</span>
              <a href="mailto:rezerwacje@baltico.pl" className={styles.link}>rezerwacje@baltico.pl</a>
            </div>
          </div>
        </div>

        {/* Dolna belka */}
        <div className={styles.bottomBar}>
          <div>
            &copy; {currentYear} Baltico. Wszelkie prawa zastrzeżone.
          </div>
          <div className={styles.legalLinks}>
            <a href="#" className={styles.legalLink}>Polityka Prywatności</a>
            <a href="#" className={styles.legalLink}>Regulamin</a>
            <a href="#" className={styles.legalLink}>Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};