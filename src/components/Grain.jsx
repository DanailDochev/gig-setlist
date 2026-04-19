import { useRef, useEffect } from 'react';

export function useGrain() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    let t;
    const draw = () => {
      const w = cv.width = 160, h = cv.height = 160;
      const img = ctx.createImageData(w, h);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = 80 + Math.random() * 175;
        img.data[i] = v; img.data[i + 1] = v; img.data[i + 2] = v;
        img.data[i + 3] = Math.random() * 24;
      }
      ctx.putImageData(img, 0, 0);
      t = setTimeout(() => requestAnimationFrame(draw), 110);
    };
    draw();
    return () => clearTimeout(t);
  }, []);
  return ref;
}

export function Grain({ o = 0.22 }) {
  const r = useGrain();
  return (
    <canvas ref={r} style={{
      position: 'absolute', inset: 0, width: '100%', height: '100%',
      pointerEvents: 'none', mixBlendMode: 'overlay', opacity: o,
      imageRendering: 'pixelated'
    }}/>
  );
}
