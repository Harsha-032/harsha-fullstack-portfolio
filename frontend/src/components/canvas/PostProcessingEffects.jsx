import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'

export default function PostProcessingEffects() {
  return (
    <EffectComposer disableNormalPass>
      <Bloom 
        luminanceThreshold={0.2} 
        luminanceSmoothing={0.9} 
        height={300} 
        opacity={1.2} 
      />
      <Noise opacity={0.02} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  )
}
