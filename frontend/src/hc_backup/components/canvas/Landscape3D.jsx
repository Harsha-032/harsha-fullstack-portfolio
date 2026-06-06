import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Stars } from "@react-three/drei";
import * as THREE from "three";

import { useTheme } from "../../lib/theme";

function smoothstep(min, max, value) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

const fbmGLSL = `
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ; m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Ridged FBM for jagged peaks with domain warping
float getTerrainHeight(vec2 p) {
   float h = 0.0;
   float amp = 60.0; 
   float freq = 0.005;
   
   // domain warping to create twisted, dramatic peaks
   float warp = snoise(p * 0.008) * 18.0;
   vec2 warpedP = p + warp;
   
   float weight = 1.0;
   for(int i = 0; i < 3; i++) {
      float n = snoise(warpedP * freq);
      n = 1.0 - abs(n);
      n *= n;
      n *= weight;
      weight = clamp(n * 2.0, 0.0, 1.0);
      h += n * amp; 
      amp *= 0.45;
      freq *= 2.1;
   }
   
   // MATCH EXACTLY WITH CameraRig pathX
   float pathX = sin(p.y * 0.01) * 20.0 + sin(p.y * 0.02) * 10.0;
   float distFromPath = abs(p.x - pathX);
   float valley = smoothstep(5.0, 70.0, distFromPath);
   
   h = h * valley - (1.0 - valley) * 8.0;
   
   // Create a giant towering mountain hero feature further down the path
   float dPeak = length(p - vec2(25.0, -90.0));
   float giantPeak = smoothstep(200.0, 0.0, dPeak) * 260.0; 
   giantPeak *= 1.0 + snoise(p * 0.04) * 0.3; // jagged details
   
   // Multiply by valley to ensure the canyon aggressively cuts THROUGH the mountain
   giantPeak *= valley; 
   
   h = max(h, giantPeak);
   
   if (valley > 0.8) {
      h += snoise(p * 0.1) * 3.5;
   }
   
   return h;
}
`;

const materialOnBeforeCompile = (shader, theme) => {
  shader.vertexShader = shader.vertexShader.replace(
    `#include <common>`,
    `#include <common>
     varying float vPosY;
     varying float vSteepness;
     ${fbmGLSL}
    `
  );

  shader.vertexShader = shader.vertexShader.replace(
    `#include <beginnormal_vertex>`,
    `
    vec2 p = position.xz;
    float h = getTerrainHeight(p);
    
    // High-frequency sampling for precise normals
    float delta = 0.5;
    float hX = getTerrainHeight(p + vec2(delta, 0.0));
    float hZ = getTerrainHeight(p + vec2(0.0, delta));
    
    vec3 objectNormal = normalize(cross(vec3(0.0, hZ - h, delta), vec3(delta, hX - h, 0.0)));
    `
  );

  shader.vertexShader = shader.vertexShader.replace(
    `#include <begin_vertex>`,
    `
     vec3 transformed = vec3( position );
     transformed.y = h;
     vPosY = h;
     vSteepness = 1.0 - objectNormal.y;
    `
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    `#include <common>`,
    `#include <common>
     varying float vPosY;
     varying float vSteepness;
    `
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    `#include <color_fragment>`,
    `#include <color_fragment>
     
     vec3 valleyColor = vec3(${theme.terrain.valley.join(', ')}); 
     vec3 lushColor = vec3(${theme.terrain.lush.join(', ')});   
     vec3 midColor = vec3(${theme.terrain.mid.join(', ')});    
     vec3 rockColor = vec3(${theme.terrain.rock.join(', ')});   
     vec3 snowColor = vec3(${theme.terrain.snow.join(', ')});
     
     float snowThresh = 130.0; 
     float rockThresh = 70.0;
     float lushThresh = 30.0;
     
     vec3 texCol = mix(valleyColor, lushColor, smoothstep(-10.0, lushThresh, vPosY));
     texCol = mix(texCol, midColor, smoothstep(lushThresh, rockThresh, vPosY));
     
     float isRock = smoothstep(0.4, 0.7, vSteepness) + smoothstep(rockThresh - 15.0, rockThresh + 20.0, vPosY);
     texCol = mix(texCol, rockColor, clamp(isRock, 0.0, 1.0));
     
     float isSnow = smoothstep(rockThresh, snowThresh, vPosY) * smoothstep(0.8, 0.4, vSteepness);
     texCol = mix(texCol, snowColor, clamp(isSnow, 0.0, 1.0));
     
     diffuseColor.rgb = texCol;
    `
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    `#include <fog_fragment>`,
    `#include <fog_fragment>
     #ifdef USE_FOG
       float fogHeightFactor = clamp(exp(-max(0.0, vPosY - 5.0) * 0.04) * 0.9, 0.0, 1.0);
       float combinedFog = clamp(fogFactor + fogHeightFactor * (1.0 - fogFactor), 0.0, 1.0);
       gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, combinedFog );
     #endif
    `
  );
};

const Terrain = () => {
  const { activeTheme } = useTheme();
  const { geometry } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(400, 1200, 64, 128); 
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, 0, -450);
    
    return { geometry: geo };
  }, []);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial 
        key={activeTheme.name + '-terrain'}
        roughness={0.9}
        metalness={0.1}
        onBeforeCompile={(shader) => materialOnBeforeCompile(shader, activeTheme)}
      />
    </mesh>
  );
};

const CameraRig = ({ scrollProgress }) => {
  const targetRef = useRef(0);
  
  useFrame((state) => {
    targetRef.current += (scrollProgress.get() - targetRef.current) * 0.05;
    const progress = targetRef.current;
    
    const zPos = 80 - progress * 650; 
    
    const pathX = Math.sin(zPos * 0.01) * 20 + Math.sin(zPos * 0.02) * 10;
    
    const bob = Math.sin(state.clock.elapsedTime * 2) * 0.3;
    
    // Altitude descent then climb
    let yPos = 45 - progress * 35; // slightly higher start
    if (progress > 0.75) {
      yPos += (progress - 0.75) * 80; // steep climb at the end
    }
    
    state.camera.position.set(pathX, yPos + bob, zPos);
    
    const lookZ = zPos - 60; // look slightly further ahead to see full peak
    const lookPathX = Math.sin(lookZ * 0.01) * 20 + Math.sin(lookZ * 0.02) * 10;
    
    state.camera.lookAt(lookPathX, yPos - 5, lookZ); // look slightly more upward/straight
    
    const deltaX = lookPathX - pathX;
    state.camera.rotation.z = -deltaX * 0.02;
  });
  
  return null;
};

const AtmosphericEffects = ({ scrollProgress }) => {
  const { scene } = useThree();
  const targetRef = useRef(0);
  const { activeTheme } = useTheme();

  const colors = useMemo(() => ({
    start: new THREE.Color(activeTheme.sky.start),
    mid: new THREE.Color(activeTheme.sky.mid),
    end: new THREE.Color(activeTheme.sky.end)
  }), [activeTheme]);

  useFrame(() => {
    targetRef.current += (scrollProgress.get() - targetRef.current) * 0.05;
    const progress = targetRef.current;
    
    const currentBg = new THREE.Color();
    if (progress < 0.5) {
      currentBg.lerpColors(colors.start, colors.mid, progress * 2);
    } else {
      currentBg.lerpColors(colors.mid, colors.end, (progress - 0.5) * 2);
    }
    
    scene.background = currentBg;
    if (scene.fog) {
      scene.fog.color.copy(currentBg);
      scene.fog.density = 0.0005 + progress * 0.003; // Less fog
    }
  });

  return (
    <fogExp2 attach="fog" args={[activeTheme.sky.start, 0.0005]} />
  );
};

const WindParticles = ({ count = 2000 }) => {
  const { activeTheme } = useTheme();
  const particlesRef = useRef(null);
  
  const circleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext('2d');
    if (context) {
      context.beginPath();
      context.arc(16, 16, 14, 0, 2 * Math.PI, false);
      context.fillStyle = 'white';
      context.fill();
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  const [positions, speeds] = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    const speedArray = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
        // Spread particles
        posArray[i * 3] = (Math.random() - 0.5) * 300; // x
        posArray[i * 3 + 1] = Math.random() * 100 - 20; // y
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 600; // z
        speedArray[i] = Math.random() * 2 + 1.5; // z speed
    }
    return [posArray, speedArray];
  }, [count]);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;
    const geo = particlesRef.current.geometry;
    const pos = geo.attributes.position.array;
    const camZ = state.camera.position.z;
    const time = state.clock.elapsedTime;
    
    // Animate particles towards the camera to create a "fast flight" wind effect
    for (let i = 0; i < count; i++) {
        // Z movement (flying past the camera)
        pos[i * 3 + 2] += speeds[i] * 80 * delta; 
        
        // Reset if they pass behind the camera
        if (pos[i * 3 + 2] > camZ + 50) {
            pos[i * 3 + 2] = camZ - 500;
            pos[i * 3] = state.camera.position.x + (Math.random() - 0.5) * 300;
            pos[i * 3 + 1] = state.camera.position.y + Math.random() * 100 - 30;
        }
        
        // Add slight wave/wobble for turbulence tracking the wind
        pos[i * 3] += Math.sin(time * 3 + i) * 0.15 * speeds[i];
        pos[i * 3 + 1] += Math.cos(time * 2 + i) * 0.1 * speeds[i];
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.15} 
        color={activeTheme.sky.start} 
        transparent 
        opacity={0.8}
        map={circleTexture}
        depthWrite={false}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const River = () => {
  const { activeTheme } = useTheme();
  
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(60, 1200, 16, 128); 
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, 0, -450);
    
    // We want the river to follow the exact same pathX as the terrain
    const positions = geo.attributes.position.array;
    for(let i=0; i<positions.length; i+=3) {
      const x = positions[i];
      const z = positions[i+2];
      
      const pathX = Math.sin(z * 0.01) * 20.0 + Math.sin(z * 0.02) * 10.0;
      positions[i] = x + pathX;
      positions[i+1] = -7.5; // Water level just below the banks
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const customUniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((state) => {
    customUniforms.uTime.value = state.clock.elapsedTime;
  });

  const onBeforeCompile = useMemo(() => (shader) => {
    shader.uniforms.uTime = customUniforms.uTime;
    
    shader.vertexShader = shader.vertexShader.replace(
      `#include <common>`,
      `#include <common>
       uniform float uTime;
       varying vec2 vWorldXZ;
       ${fbmGLSL}
      `
    );
    shader.vertexShader = shader.vertexShader.replace(
      `#include <begin_vertex>`,
      `
       vWorldXZ = (modelMatrix * vec4(position, 1.0)).xz;
       vec3 transformed = vec3(position);
       
       // Physical waves driven by noise and time
       float time = uTime * 2.0;
       float waveHeight = snoise(vWorldXZ * 0.08 + vec2(0.0, time)) * 0.6;
       waveHeight += snoise(vWorldXZ * 0.2 - vec2(time * 0.5, time * 0.2)) * 0.2;
       transformed.y += waveHeight;
      `
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      `#include <common>`,
      `#include <common>
       uniform float uTime;
       varying vec2 vWorldXZ;
       ${fbmGLSL}
      `
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      `#include <normal_fragment_begin>`,
      `
       #include <normal_fragment_begin>
       vec2 flowUV = vWorldXZ * 0.15;
       float time = uTime * 2.5;
       
       // Two moving layers of noise for ripples
       float n1 = snoise(flowUV + vec2(time * 0.2, time * 1.5));
       float n2 = snoise(flowUV * 2.5 + vec2(-time * 0.1, time * 1.8));
       
       // Combine into a wavy pattern
       float wave = (n1 + n2) * 0.3;
       
       // Perturb the normal
       normal = normalize(normal + vec3(n1 * 0.15, wave, n2 * 0.15));
      `
    );
  }, [customUniforms]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial 
        key={activeTheme.name + '-river'}
        color={activeTheme.river.color}
        emissive={activeTheme.river.emissive}
        emissiveIntensity={0.6}
        roughness={0.05}
        metalness={0.85}
        transparent={true}
        opacity={0.9}
        onBeforeCompile={onBeforeCompile}
      />
    </mesh>
  );
};

export default function Landscape3D({ scrollProgress }) {
  const { activeTheme } = useTheme();

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none" style={{ background: '#000' }}>
      <Canvas 
        dpr={[1, 1]} 
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <PerspectiveCamera makeDefault fov={55} near={0.1} far={1000} />
        
        <AtmosphericEffects scrollProgress={scrollProgress} />
        
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[100, 150, 50]} 
          intensity={1.5} 
          color={activeTheme.sky.lightPrimary}
        />
        <directionalLight position={[-50, 50, -50]} intensity={0.8} color={activeTheme.sky.lightSecondary} />
        
        <CameraRig scrollProgress={scrollProgress} />
        <Terrain />
        <River />
        <WindParticles count={500} />
        
        <Stars radius={150} depth={50} count={800} factor={4} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
}
