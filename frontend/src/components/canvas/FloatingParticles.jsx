import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  attribute float size;
  attribute float phase;
  varying float vAlpha;
  uniform float uTime;

  void main() {
    vec3 pos = position;
    
    // Gentle floating motion
    pos.y += sin(uTime * 0.3 + phase) * 0.15;
    pos.x += cos(uTime * 0.2 + phase * 1.5) * 0.1;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    // Depth-based alpha
    float depth = -mvPosition.z;
    vAlpha = smoothstep(25.0, 5.0, depth) * 0.6;
    
    gl_PointSize = size * (200.0 / depth);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  varying float vAlpha;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  
  void main() {
    // Soft circular particle
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    
    float alpha = smoothstep(0.5, 0.1, d) * vAlpha;
    vec3 color = mix(uColor1, uColor2, gl_PointCoord.y);
    
    gl_FragColor = vec4(color, alpha);
  }
`

export default function FloatingParticles({ count = 800 }) {
  const meshRef = useRef()
  const uniformsRef = useRef({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color('#7c3aed') },
    uColor2: { value: new THREE.Color('#22d3ee') },
  })

  const [positions, sizes, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    const ph = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      // Spread across a wide area
      pos[i * 3] = (Math.random() - 0.5) * 50
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5
      
      sz[i] = Math.random() * 2 + 0.5
      ph[i] = Math.random() * Math.PI * 2
    }
    return [pos, sz, ph]
  }, [count])

  useFrame((state) => {
    uniformsRef.current.uTime.value = state.clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.008
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
        <bufferAttribute attach="attributes-phase" count={count} array={phases} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniformsRef.current}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
