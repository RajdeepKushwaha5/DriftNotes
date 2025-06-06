import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface OceanPlaneProps {
  position: [number, number, number];
}

export const OceanPlane: React.FC<OceanPlaneProps> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Ocean animation
  useFrame((state) => {
    if (meshRef.current && meshRef.current.material instanceof THREE.ShaderMaterial) {
      meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  const waterVertex = `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;

    // Simplex 3D noise
    vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    
    float snoise(vec3 v) { 
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
      
      // First corner
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 =   v - i + dot(i, C.xxx) ;
      
      // Other corners
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      
      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
      
      // Permutations
      i = mod(i, 289.0 ); 
      vec4 p = permute( permute( permute( 
                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
              + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
              
      // Gradients
      float n_ = 1.0/7.0; // N=7
      vec3  ns = n_ * D.wyz - D.xzx;
      
      vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
      
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );
      
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
      
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      
      // Normalise gradients
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      
      // Mix final noise value
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                    dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      vUv = uv;
      
      // Create wave pattern
      vec3 pos = position;
      float noiseScale = 0.2;
      float noiseFreq = 0.8;
      float noiseAmp = 0.15;
      
      vec3 noisePos = vec3(pos.x * noiseFreq, pos.z * noiseFreq, uTime * 0.2);
      float noise = snoise(noisePos) * noiseAmp;
      
      // Apply elevation
      pos.y += noise;
      vElevation = noise;
      
      // Final position
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const waterFragment = `
    uniform vec3 uColorDeep;
    uniform vec3 uColorShallow;
    uniform float uColorOffset;
    uniform float uColorMultiplier;
    
    varying vec2 vUv;
    varying float vElevation;
    
    void main() {
      float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
      vec3 color = mix(uColorDeep, uColorShallow, mixStrength);
      
      gl_FragColor = vec4(color, 0.8);
    }
  `;

  // Shader uniforms
  const uniforms = {
    uTime: { value: 0 },
    uColorDeep: { value: new THREE.Color('#0369a1') },
    uColorShallow: { value: new THREE.Color('#38bdf8') },
    uColorOffset: { value: 0.1 },
    uColorMultiplier: { value: 5.0 }
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[60, 60, 128, 128]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={waterVertex}
        fragmentShader={waterFragment}
        transparent={true}
      />
    </mesh>
  );
};