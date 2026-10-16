import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Ripple {
  x: number;
  y: number;
  time: number;
}

const SurfaceMesh: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const ripplesRef = useRef<Ripple[]>([]);

  // Dimensions of grid
  const width = 24;
  const height = 18;
  const segmentsX = 48;
  const segmentsY = 36;

  // Build PlaneGeometry with custom vertex colors
  const { geometry, originalPositions } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(width, height, segmentsX, segmentsY);
    const count = geo.attributes.position.count;
    const colors = new Float32Array(count * 3);
    const pos = geo.attributes.position.array as Float32Array;

    const violet = new THREE.Color('#8B5CF6');
    const cyan = new THREE.Color('#22D3EE');

    for (let i = 0; i < count; i++) {
      const u = (pos[i * 3] + width / 2) / width;
      const v = (pos[i * 3 + 1] + height / 2) / height;
      const mixedColor = violet.clone().lerp(cyan, (u + v) * 0.5);

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return { geometry: geo, originalPositions: pos.slice() };
  }, [width, height, segmentsX, segmentsY]);

  // Track window mouse position for interactive tilting
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleClick = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * width;
      const normY = -(e.clientY / window.innerHeight - 0.5) * height;
      ripplesRef.current.push({ x: normX, y: normY, time: 0 });
      if (ripplesRef.current.length > 5) ripplesRef.current.shift();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [width, height]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Smooth lerp mouse tilt
    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

    meshRef.current.rotation.x = -Math.PI / 3 + mouseRef.current.y * 0.15;
    meshRef.current.rotation.z = mouseRef.current.x * 0.15;

    const time = state.clock.getElapsedTime();
    const pos = geometry.attributes.position;
    const count = pos.count;

    // Update ripples
    for (let r = ripplesRef.current.length - 1; r >= 0; r--) {
      ripplesRef.current[r].time += delta * 3;
      if (ripplesRef.current[r].time > 6) {
        ripplesRef.current.splice(r, 1);
      }
    }

    for (let i = 0; i < count; i++) {
      const ox = originalPositions[i * 3];
      const oy = originalPositions[i * 3 + 1];

      // Volatility smile + undulating wave simulation
      const smile = Math.pow(ox / (width * 0.4), 2) * 0.7;
      let z =
        Math.sin(ox * 0.5 + time * 0.8) * 0.4 +
        Math.cos(oy * 0.6 - time * 0.6) * 0.35 +
        smile;

      // Add ripple effects on click
      for (let r = 0; r < ripplesRef.current.length; r++) {
        const rip = ripplesRef.current[r];
        const dist = Math.hypot(ox - rip.x, oy - rip.y);
        const wave = Math.sin(dist * 2.5 - rip.time * 4) * Math.exp(-dist * 0.3) * Math.max(0, 1 - rip.time / 6);
        z += wave * 0.6;
      }

      pos.setZ(i, z);
    }

    pos.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, -1.5, -4]}>
      <meshBasicMaterial
        wireframe
        vertexColors
        transparent
        opacity={0.35}
      />
    </mesh>
  );
};

export const VolatilitySurface3D: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-auto">
      <Canvas
        camera={{ position: [0, 4, 10], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ scene }) => {
          scene.fog = new THREE.Fog('#05060A', 10, 24);
        }}
      >
        <SurfaceMesh />
      </Canvas>
    </div>
  );
};

export default VolatilitySurface3D;
