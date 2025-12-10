import React, { useEffect, useRef } from 'react';

// Internal class definitions for the particle system
class Vector {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  rotate(dir: 'x' | 'y', ang: number) {
    const X = this.x;
    const Y = this.y;
    const Z = this.z;

    const SIN = Math.sin(ang);
    const COS = Math.cos(ang);

    if (dir === "x") {
      this.y = Y * COS - Z * SIN;
      this.z = Y * SIN + Z * COS;
    } else if (dir === "y") {
      this.x = X * COS - Z * SIN;
      this.z = X * SIN + Z * COS;
    }
  }

  project(ww: number, wh: number, cameraZ: number): [number, number, number] {
    const ZP = this.z + cameraZ;
    const DIV = ZP / wh; // Perspective projection
    const XP = (this.x) / DIV; 
    const YP = (this.y) / DIV; 
    const CENTER_X = ww / 2;
    const CENTER_Y = wh / 2;
    return [XP + CENTER_X, YP + CENTER_Y, ZP];
  }
}

class Char {
  letter: string;
  pos: Vector;

  constructor(letter: string, pos: Vector) {
    this.letter = letter;
    this.pos = pos;
  }

  rotate(dir: 'x' | 'y', ang: number) {
    this.pos.rotate(dir, ang);
  }

  render(ctx: CanvasRenderingContext2D, ww: number, wh: number, cameraZ: number) {
    const PIXEL = this.pos.project(ww, wh, cameraZ);
    const XP = PIXEL[0];
    const YP = PIXEL[1];
    const Z_DEPTH = PIXEL[2];
    
    const MAX_SIZE = 50;
    // Prevent division by zero or negative depth issues
    if (Z_DEPTH <= 0) return;

    const SIZE = (1 / Z_DEPTH * MAX_SIZE) | 0;
    const BRIGHTNESS = SIZE / MAX_SIZE;
    
    // Green/Cyber theme color palette
    // const COL = `rgba(0, 255, ${100 * BRIGHTNESS | 0 + 150}, ${BRIGHTNESS})`;
    // White/Grey variant based on original
    const COL = `rgba(200, 200, 200, ${BRIGHTNESS})`;

    ctx.beginPath();
    ctx.fillStyle = COL;
    ctx.font = SIZE + "px 'Courier New'";
    ctx.fillText(this.letter, XP, YP);
    ctx.fill();
    ctx.closePath();
  }
}

const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let ww = window.innerWidth;
    let wh = window.innerHeight;
    const MAX_CHARS = 250;
    const SEPARATION = 1.5;
    const chars: Char[] = [];
    let time = 0;
    
    // Set Dimensions
    const setDim = () => {
      ww = window.innerWidth;
      wh = window.innerHeight;
      canvas.width = ww * window.devicePixelRatio;
      canvas.height = wh * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    setDim();
    window.addEventListener('resize', setDim);

    // Helpers
    const signedRandom = () => Math.random() - Math.random();
    
    // Initialize Particles
    for (let i = 0; i < MAX_CHARS; i++) {
      const CHARACTER = String.fromCharCode((Math.random() * 93 + 34) | 0);
      const X = signedRandom() * SEPARATION;
      const Y = signedRandom() * SEPARATION;
      const Z = signedRandom() * SEPARATION;
      const POS = new Vector(X, Y, Z);
      chars.push(new Char(CHARACTER, POS));
    }

    const cameraZ = SEPARATION + 1;

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, ww, wh);
      
      const DX = 0.003 * Math.sin(time * 0.001);
      const DY = 0.003 * Math.cos(time * 0.001);

      for (let i = 0; i < chars.length; i++) {
        chars[i].rotate("x", DX);
        chars[i].rotate("y", DY);
        chars[i].render(ctx, ww, wh, cameraZ);
      }
      
      time++;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', setDim);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 bg-cyber-dark opacity-80"
    />
  );
};

export default BackgroundCanvas;