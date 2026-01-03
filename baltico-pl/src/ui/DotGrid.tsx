// src/ui/DotGrid.tsx
import React, { useEffect, useRef, useMemo } from 'react';

interface DotGridProps {
  baseColor?: string;
  activeColor?: string;
}

// Helper: zamiana HEX na obiekt RGB
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
};

export const DotGrid: React.FC<DotGridProps> = ({ 
  baseColor = '#112240', 
  activeColor = '#D4AF37' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mousePosition = useRef({ x: -1000, y: -1000 });

  // Parsujemy kolory raz (dla wydajności), a nie w pętli animacji
  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Ustawianie rozmiaru
    const setSize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    const resizeObserver = new ResizeObserver(() => setSize());
    resizeObserver.observe(container);
    setSize();
    
    // 2. Obsługa myszki (GLOBALNA)
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current.x = e.clientX;
      mousePosition.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- KONFIGURACJA ---
    const gap = 17;  // Mniejszy odstęp = GĘŚCIEJ
    const radius = 1.4; 
    const hoverRadius = 100; // Zasięg
    const maxDisplacement = 7; // Siła odpychania (subtelna)

    let animationFrameId: number;

    // 3. Pętla rysowania
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rect = canvas.getBoundingClientRect();
      const relativeMouseX = mousePosition.current.x - rect.left;
      const relativeMouseY = mousePosition.current.y - rect.top;

      for (let x = gap / 2; x < canvas.width; x += gap) {
        for (let y = gap / 2; y < canvas.height; y += gap) {
          const dx = relativeMouseX - x;
          const dy = relativeMouseY - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let drawX = x;
          let drawY = y;
          let drawRadius = radius;
          
          // Domyślny kolor (jako string RGB dla wydajności)
          let r = baseRgb.r;
          let g = baseRgb.g;
          let b = baseRgb.b;

          // Jeśli kropka jest w zasięgu...
          if (dist < hoverRadius && dist > 0) {
            // Obliczamy "moc" efektu od 0 do 1
            const force = (hoverRadius - dist) / hoverRadius; 
            
            // 1. INTERPOLACJA KOLORU (Gradient)
            // Wzór: Nowy = Baza + (Różnica * Siła)
            r = baseRgb.r + (activeRgb.r - baseRgb.r) * force;
            g = baseRgb.g + (activeRgb.g - baseRgb.g) * force;
            b = baseRgb.b + (activeRgb.b - baseRgb.b) * force;

            // 2. ODCHYLENIE (Displacement)
            const displacement = force * maxDisplacement;
            drawX -= (dx / dist) * displacement;
            drawY -= (dy / dist) * displacement;

            // 3. SKALOWANIE
            drawRadius = radius + (force * 1.0); 
          }

          ctx.beginPath();
          ctx.arc(drawX, drawY, drawRadius, 0, Math.PI * 2);
          // Używamy obliczonych wartości RGB (zaokrąglonych, bo canvas lubi liczby całkowite)
          ctx.fillStyle = `rgb(${r | 0}, ${g | 0}, ${b | 0})`;
          ctx.fill();
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [baseRgb, activeRgb]); // Zależności od sparsowanych kolorów

  return (
    <div 
      ref={containerRef}
      style={{ 
        position: 'absolute', 
        top: 0, left: 0, 
        width: '100%', height: '100%', 
        zIndex: 0, 
        pointerEvents: 'none'
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
};