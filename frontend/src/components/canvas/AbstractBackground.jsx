import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function AbstractBackground({ count = 2000 }) {
  const pointsRef = useRef()

  // Generate a field of particles that looks like a flowing data stream
  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const phs = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      // Widespread distribution
      pos[i * 3] = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5
      phs[i] = Math.random() * Math.PI * 2
    }
    return [pos, phs]
  }, [count])

  useFrame((state, delta) => {
    if (!pointsRef.current) return
    
    const time = state.clock.getElapsedTime()
    
    // Very slow, elegant rotation to mimic Everswap's smooth feel
    pointsRef.current.rotation.y = time * 0.02
    pointsRef.current.rotation.z = time * 0.01

    // Update positions slightly for a flowing wave effect (optional, keep it simple and performant)
    // The subtle rotation handles the movement beautifully.
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-phase"
          count={phases.length}
          array={phases}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#F8F7F2"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
