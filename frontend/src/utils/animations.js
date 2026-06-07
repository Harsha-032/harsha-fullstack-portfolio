/**
 * Generates deterministic random initial animation parameters for Framer Motion.
 * Useful to make elements fly in from unique, pseudo-random directions when scrolling.
 * 
 * @param {string|number} seed A unique key or number index to seed the generator.
 * @returns {object} Framer Motion animation properties (initial, whileInView)
 */
export const getSystematicRandomProps = (seed) => {
  // Simple LCG (Linear Congruential Generator) to get deterministic pseudo-random values
  const getRand = (s) => {
    let value = s;
    return () => {
      value = (value * 1664525 + 1013904223) % 4294967296;
      return value / 4294967296;
    };
  };

  // Turn string seed into a numeric seed if needed
  let numericSeed = 0;
  if (typeof seed === 'string') {
    for (let i = 0; i < seed.length; i++) {
      numericSeed = (numericSeed << 5) - numericSeed + seed.charCodeAt(i);
      numericSeed |= 0; // Convert to 32bit integer
    }
  } else if (typeof seed === 'number') {
    numericSeed = seed;
  }
  
  // Ensure the seed is positive
  numericSeed = Math.abs(numericSeed);

  const rand = getRand(numericSeed || 1);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // We want coordinates to come from random direction offsets
  // On mobile, keep translations much smaller to avoid layout thrashing and jank
  const angle = rand() * Math.PI * 2;
  const distance = isMobile ? (40 + rand() * 60) : (200 + rand() * 200); 
  
  const x = Math.round(Math.cos(angle) * distance);
  const y = Math.round(Math.sin(angle) * distance);

  // Rotation: -30 to 30 degrees (Desktop), -10 to 10 (Mobile)
  const rotate = isMobile ? Math.round((rand() - 0.5) * 20) : Math.round((rand() - 0.5) * 60);

  // Scale: 0.6 to 0.85 (Desktop), 0.85 to 0.95 (Mobile)
  const scale = isMobile ? parseFloat((0.85 + rand() * 0.1).toFixed(2)) : parseFloat((0.6 + rand() * 0.25).toFixed(2));

  return {
    initial: {
      opacity: 0,
      x,
      y,
      rotate,
      scale
    },
    whileInView: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1
    }
  };
};
