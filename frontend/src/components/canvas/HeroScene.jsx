import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Icosahedron } from '@react-three/drei';

export default function HeroScene() {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Slow rotation
    meshRef.current.rotation.y = time * 0.2;
    meshRef.current.rotation.x = time * 0.1;

    // Slight parallax effect based on mouse
    const targetX = (state.mouse.x * Math.PI) / 10;
    const targetY = (state.mouse.y * Math.PI) / 10;
    
    meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.1;
    meshRef.current.rotation.x += (targetY - meshRef.current.rotation.x) * 0.1;
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={1.5}
      floatIntensity={2}
      position={[0, 0, 0]}
    >
      <mesh ref={meshRef} scale={1.5}>
        <Icosahedron args={[1, 4]}>
          <MeshDistortMaterial
            color="#FA5D29" // Accent color based on awwwards site (orange/red)
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            wireframe={false}
          />
        </Icosahedron>
      </mesh>
    </Float>
  );
}
