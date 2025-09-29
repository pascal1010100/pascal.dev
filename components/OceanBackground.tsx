'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Importar p5 dinámicamente para evitar problemas con SSR
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
});

const OceanBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const timeRef = useRef(0);

  useEffect(() => {
    setMounted(true);
    return () => {
      // Limpiar recursos si es necesario
    };
  }, []);

  const setup = (p5: any, canvasParentRef: Element) => {
    const width = containerRef.current?.clientWidth || window.innerWidth;
    const height = containerRef.current?.clientHeight || window.innerHeight;
    
    const canvas = p5.createCanvas(width, height, p5.WEBGL).parent(canvasParentRef);
    canvas.style('display', 'block');
    canvas.style('position', 'absolute');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '-1');
    
    p5.colorMode(p5.HSB, 255);
    p5.angleMode(p5.RADIANS);
  };
  
  const draw = (p5: any) => {
    // Fondo sólido
    p5.background(0, 0, 20);
    
    // Configuración 3D básica
    p5.rotateX(p5.PI / 3);
    p5.scale(0.8);
    
    // Actualizar tiempo
    timeRef.current += 0.01;
    
    // Dibujar ondas de agua
    p5.noFill();
    p5.stroke(160, 200, 255, 150);
    p5.strokeWeight(1);
    
    const gridSize = 30;
    const waveHeight = 20;
    
    // Dibujar malla de ondas simple
    p5.push();
    p5.rotateZ(timeRef.current * 0.2);
    
    for (let x = -p5.width; x < p5.width; x += gridSize) {
      p5.beginShape();
      for (let y = -p5.height; y < p5.height; y += gridSize) {
        // Usar una función de onda simple
        const distance = p5.dist(x, y, 0, 0);
        const angle = p5.atan2(y, x);
        const z = p5.sin(distance * 0.01 - timeRef.current * 2) * waveHeight;
        
        p5.vertex(x, y, z);
      }
      p5.endShape();
    }
    p5.pop();
  };

  const windowResized = (p5: any) => {
    const width = containerRef.current?.clientWidth || window.innerWidth;
    const height = containerRef.current?.clientHeight || window.innerHeight;
    p5.resizeCanvas(width, height);
  };

  if (!mounted) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full pointer-events-none -z-50"
      aria-hidden="true"
    >
      <Sketch 
        setup={setup}
        draw={draw}
        windowResized={windowResized}
      />
    </div>
  );
};

export default OceanBackground;