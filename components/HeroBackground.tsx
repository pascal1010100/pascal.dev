"use client";

import React from "react";
import Sketch from "react-p5";
import type p5 from "p5";
import { useTheme } from "next-themes";

export default function HeroBackground() {
  const { theme } = useTheme();

  let t = 0;

  const setup = (p5: p5, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL)
       .parent(canvasParentRef);
    p5.noStroke();
    p5.colorMode(p5.HSB, 360, 100, 100, 255); // colorMode con alfa 255
  };

  const draw = (p5: p5) => {
    p5.clear(0,0,0,0 );

    if (theme === "dark") {
      // Fondo oscuro translúcido para modo oscuro
      p5.background(230, 10, 10, 15); // azul muy oscuro transparente
      p5.directionalLight(200, 200, 255, 0, -1, 0);
    } else {
      // Modo claro: exactamente igual que tu versión original
      p5.clear(0, 0, 0, 0);
      p5.background(0, 0); // fondo transparente como antes
      p5.directionalLight(200, 200, 255, 0, -1, 0);
    }

    // Cámara igual que antes
    p5.camera(
      0, -p5.height / 4, p5.height / 2,
      0, 0, 0,
      0, 1, 0
    );

    const cols = 80;
    const rows = 60;
    const spacing = p5.width / cols;

    p5.push();
    p5.rotateX(p5.PI / 2);
    p5.translate(-p5.width / 2, -p5.height / 2 + p5.height * 0.25, 0);

    for (let y = 0; y < rows; y++) {
      p5.beginShape(p5.TRIANGLE_STRIP);
      for (let x = 0; x <= cols; x++) {
        const xPos = x * spacing;
        const yPos = y * spacing;

        const baseWave = p5.sin((x + y + t * 20) * 0.1) * 20;
        const noiseWave1 = p5.noise(x * 0.1, y * 0.1, t) * 10;
        const noiseWave2 = p5.noise(x * 0.1, (y + 1) * 0.1, t) * 10;

        const z1 = baseWave + noiseWave1;
        const z2 = baseWave + noiseWave2;

        // En modo oscuro, colores más brillantes y saturados
        if (theme === "dark") {
          const hue = 210; // azul neón
          const saturation = 90;
          const brightness = p5.map(z1, -30, 30, 60, 100);
          const alpha = 180;
          p5.fill(hue, saturation, brightness, alpha);
        } else {
          // En modo claro, uso el color original
          const hue = p5.map(z1, -30, 30, 180, 255);
          p5.fill(hue, 200, 255, 180);
        }

        p5.vertex(xPos, yPos, z1);
        p5.vertex(xPos, yPos + spacing, z2);
      }
      p5.endShape();
    }
    p5.pop();

    t += 0.05;
  };

  const windowResized = (p5: p5) => p5.resizeCanvas(p5.windowWidth, p5.windowHeight);

  return (
    <Sketch
      setup={setup}
      draw={draw}
      windowResized={windowResized}
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}
