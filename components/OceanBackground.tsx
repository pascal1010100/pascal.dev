'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Importación dinámica de Sketch de react-p5
const Sketch = dynamic(
  () => import('react-p5').then((mod) => mod.default || mod),
  { 
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-blue-600" />
  }
);

// Tipo para p5
type P5 = any;

const OceanBackground = ({ className = '' }: { className?: string }) => {
  const timeRef = useRef<number>(0);
  const animationIdRef = useRef<number | null>(null);

  // Animación del tiempo
  useEffect(() => {
    const animate = () => {
      timeRef.current += 0.01;
      animationIdRef.current = requestAnimationFrame(animate);
    };
    
    const id = requestAnimationFrame(animate);
    animationIdRef.current = id;
    
    return () => {
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  // Configuración inicial
  const setup = (p5: P5, canvasParentRef: Element) => {
    // Crear el canvas que se ajuste al contenedor padre
    const resizeCanvas = () => {
      const parent = canvasParentRef as HTMLElement;
      p5.resizeCanvas(parent.offsetWidth, parent.offsetHeight);
    };
    
    const canvas = p5.createCanvas(
      (canvasParentRef as HTMLElement).offsetWidth,
      (canvasParentRef as HTMLElement).offsetHeight,
      p5.WEBGL
    ).parent(canvasParentRef);
    
    // Configuración de renderizado
    p5.pixelDensity(window.devicePixelRatio);
    
    // Manejar el redimensionamiento de la ventana
    const handleResize = () => {
      resizeCanvas();
      p5.redraw();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Configuración de la cámara y luces
    p5.perspective(p5.PI / 3, p5.width / p5.height, 0.1, 5000);
    p5.ambientLight(40, 40, 60);
    p5.pointLight(255, 255, 255, -100, -100, 100);
    p5.pointLight(200, 200, 255, 100, 100, 100);
    
    // Limpieza del event listener al desmontar
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  };

  // Función de dibujo
  const draw = (p5: P5) => {
    // Configuración inicial
    p5.push();
    
    try {
      // Limpiar el canvas con un color de fondo
      p5.background(5, 10, 30);
      
      // Configuración de la cámara
      p5.orbitControl(0.5, 0.5, 0.1); // Suavizar los controles de órbita
      p5.rotateX(p5.PI / 3);
      p5.rotateZ(timeRef.current * 0.05);
      p5.translate(0, 0, -200);
      
      // Configuración de luces (se deben configurar en cada frame en modo WEBGL)
      p5.ambientLight(40, 40, 60);
      p5.pointLight(255, 255, 255, -100, -100, 100);
      p5.pointLight(200, 200, 255, 100, 100, 100);
      
      // Dibujar olas
      p5.noStroke();
      for (let z = -500; z < 500; z += 50) {
        p5.beginShape(p5.TRIANGLE_STRIP);
        for (let x = -500; x <= 500; x += 50) {
          // Calcular la altura de la ola basada en la distancia al centro y el tiempo
          const distance = p5.dist(0, 0, x, z) * 0.01;
          const wave1 = p5.sin(distance + timeRef.current * 2) * 20;
          const wave2 = p5.sin(distance * 1.5 + timeRef.current * 1.5) * 10;
          const y = wave1 + wave2;
          
          // Color basado en la posición y
          const blueHue = p5.map(z, -500, 500, 180, 240);
          p5.fill(0, 100, blueHue, 150);
          
          // Crear vértices para la malla
          p5.vertex(x, y, z);
          p5.vertex(x, y, z + 50);
        }
        p5.endShape();
      }
      
      // Partículas flotantes
      p5.randomSeed(0);
      for (let i = 0; i < 50; i++) {
        const x = p5.random(-300, 300);
        const y = p5.random(-200, 200);
        const z = p5.random(-300, 300);
        const size = p5.random(2, 5);
        
        p5.push();
        p5.translate(x, y + p5.sin(timeRef.current * 0.5 + i) * 20, z);
        p5.fill(255, 255, 255, p5.random(100, 200));
        p5.noStroke();
        p5.sphere(size);
        p5.pop();
      }
    } catch (error) {
      console.error('Error en la función draw:', error);
    }
    
    p5.pop();
  };

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default OceanBackground;