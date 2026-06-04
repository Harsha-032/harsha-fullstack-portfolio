import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei'
import * as THREE from 'three'
import PostProcessingEffects from './PostProcessingEffects'

const seededValue = (seed) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

function CameraRig() {
  useFrame((state, delta) => {
    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      state.pointer.x * 0.45,
      2.5,
      delta
    )
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      state.pointer.y * 0.25,
      2.5,
      delta
    )
    state.camera.lookAt(0, 0, 0)
  })

  return null
}

function CoreSystem() {
  const group = useRef()
  const inner = useRef()

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime()

    if (group.current) {
      group.current.rotation.y += delta * 0.18
      group.current.rotation.x = Math.sin(elapsed * 0.35) * 0.08
    }

    if (inner.current) {
      inner.current.rotation.y -= delta * 0.35
      inner.current.position.y = Math.sin(elapsed * 0.8) * 0.08
    }
  })

  return (
    <group ref={group} position={[1.35, 0.12, 0]}>
      <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.35}>
        <mesh ref={inner} scale={1.15}>
          <icosahedronGeometry args={[1.1, 5]} />
          <MeshDistortMaterial
            color="#e8fff6"
            emissive="#46ffd2"
            emissiveIntensity={0.38}
            metalness={0.82}
            roughness={0.18}
            distort={0.28}
            speed={1.6}
          />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.72, 0.012, 12, 160]} />
          <meshStandardMaterial
            color="#ff7a3d"
            emissive="#ff5f1f"
            emissiveIntensity={1.4}
          />
        </mesh>

        <mesh rotation={[0.95, 0.25, 0.15]}>
          <torusGeometry args={[2.08, 0.01, 12, 180]} />
          <meshStandardMaterial
            color="#7df9ff"
            emissive="#2ad9ff"
            emissiveIntensity={1.1}
          />
        </mesh>

        <mesh rotation={[0.2, Math.PI / 2, 0.85]}>
          <torusGeometry args={[2.42, 0.008, 12, 180]} />
          <meshStandardMaterial
            color="#c8ff54"
            emissive="#8dff38"
            emissiveIntensity={0.8}
          />
        </mesh>
      </Float>
    </group>
  )
}

function NodeField({ count = 96 }) {
  const mesh = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const nodes = useMemo(() => {
    return Array.from({ length: count }, (_, index) => {
      const radius = 3.2 + seededValue(index + 1) * 4.8
      const angle = (index / count) * Math.PI * 2
      return {
        position: [
          Math.cos(angle) * radius + (seededValue(index + 2) - 0.5) * 1.8,
          (seededValue(index + 3) - 0.5) * 5.2,
          Math.sin(angle) * radius + (seededValue(index + 4) - 0.5) * 1.8,
        ],
        scale: 0.035 + seededValue(index + 5) * 0.055,
      }
    })
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return

    const elapsed = state.clock.getElapsedTime()

    nodes.forEach((node, index) => {
      dummy.position.set(
        node.position[0],
        node.position[1] + Math.sin(elapsed + index) * 0.04,
        node.position[2]
      )
      dummy.scale.setScalar(node.scale)
      dummy.rotation.set(elapsed * 0.1, elapsed * 0.15, 0)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(index, dummy.matrix)
    })

    mesh.current.instanceMatrix.needsUpdate = true
    mesh.current.rotation.y = elapsed * 0.025
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#d8f7ff"
        emissive="#54e7ff"
        emissiveIntensity={0.65}
        roughness={0.42}
      />
    </instancedMesh>
  )
}

function DataRails() {
  const rails = useRef()

  useFrame((state, delta) => {
    if (!rails.current) return
    rails.current.rotation.z += delta * 0.025
    rails.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.08
  })

  return (
    <group ref={rails} position={[-2.2, -0.15, -1.1]}>
      {[-1.2, -0.45, 0.35, 1.08].map((offset, index) => (
        <mesh
          key={offset}
          position={[0, offset, 0]}
          rotation={[0.15 * index, 0.65, -0.35]}
        >
          <torusGeometry args={[1.8 + index * 0.35, 0.006, 8, 160]} />
          <meshStandardMaterial
            color={index % 2 ? '#ff8f5a' : '#8afcff'}
            emissive={index % 2 ? '#ff5f1f' : '#22d8ff'}
            emissiveIntensity={0.9}
            transparent
            opacity={0.72}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function GlobalCanvas() {
  return (
    <div className="fixed inset-0 z-0 bg-[#050505]">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 42 }}
        dpr={[1, 1.7]}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 6, 14]} />
        <ambientLight intensity={0.28} />
        <directionalLight position={[4, 5, 6]} intensity={1.6} color="#fff6e7" />
        <pointLight position={[-4, 2.2, 2]} intensity={2.2} color="#ff6b35" />
        <pointLight position={[3, -1, 2.8]} intensity={2.6} color="#36f6ff" />

        <Suspense fallback={null}>
          <CameraRig />
          <Stars
            radius={70}
            depth={38}
            count={1400}
            factor={3}
            fade
            speed={0.28}
          />
          <CoreSystem />
          <DataRails />
          <NodeField />
          <PostProcessingEffects />
        </Suspense>
      </Canvas>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_32%,rgba(250,93,41,0.20),transparent_30%),radial-gradient(circle_at_25%_60%,rgba(54,246,255,0.13),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,5,0.15),rgba(5,5,5,0.86))]" />
    </div>
  )
}
