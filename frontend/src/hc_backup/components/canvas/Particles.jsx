import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

const seededValue = (seed) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

export default function Particles({ count = 500 }) {
  const pointsRef = useRef();

  // Generate random positions for particles
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (seededValue(i + 1) - 0.5) * 20; // x
      positions[i * 3 + 1] = (seededValue(i + 2) - 0.5) * 20; // y
      positions[i * 3 + 2] = (seededValue(i + 3) - 0.5) * 20; // z
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.05;
    pointsRef.current.rotation.x += delta * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#a7a7a7"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}
