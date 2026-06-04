import { useRef } from 'react'
import { useGLTF, Html, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function MacbookScene({ children }) {
  const group = useRef()
  // Load the Macbook model from the pmndrs remote storage
  const { nodes, materials } = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf'
  )
  
  const scroll = useScroll()

  useFrame((state, delta) => {
    if (!group.current) return

    // Scroll Rigging: Animate the macbook based on scroll offset (0 to 1)
    const r1 = scroll.range(0, 1) // Overall scroll progress
    
    // Rotate the laptop as the user scrolls
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      Math.PI / 8 - r1 * (Math.PI / 8), 
      4,
      delta
    )
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      r1 * Math.PI * 2, 
      4,
      delta
    )
    
    // Move it closer as user scrolls down
    group.current.position.z = THREE.MathUtils.damp(
      group.current.position.z,
      r1 * 2,
      4,
      delta
    )
  })

  return (
    <group ref={group} position={[0, -1, 0]}>
      {/* Macbook Base Group */}
      <group position={[0, -0.04, 0.41]} rotation={[0.01, 0, 0]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh material={materials.aluminium} geometry={nodes['Cube008'].geometry} />
          <mesh material={materials['matte.001']} geometry={nodes['Cube008_1'].geometry} />
          <mesh geometry={nodes['Cube008_2'].geometry}>
            <Html
              className="macbook-screen-html"
              rotation-x={-Math.PI / 2}
              position={[0, 0.05, -0.09]}
              transform
              occlude
              distanceFactor={1.16}
            >
              <div
                className="w-[1280px] h-[800px] bg-black overflow-y-auto overflow-x-hidden rounded-lg custom-scrollbar pointer-events-auto"
                style={{
                  boxShadow: '0px 0px 50px rgba(0,0,0,0.8) inset',
                }}
              >
                {/* The actual HTML React app goes here! */}
                {children}
              </div>
            </Html>
          </mesh>
        </group>
      </group>
      {/* Keyboard and Base */}
      <mesh material={materials.keys} geometry={nodes.keyboard.geometry} position={[1.79, 0, 3.45]} />
      <group position={[0, -0.1, 3.39]}>
        <mesh material={materials.aluminium} geometry={nodes['Cube002'].geometry} />
        <mesh material={materials.trackpad} geometry={nodes['Cube002_1'].geometry} />
      </group>
      <mesh material={materials.touchbar} geometry={nodes.touchbar.geometry} position={[0, -0.03, 1.2]} />
    </group>
  )
}

useGLTF.preload('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')
