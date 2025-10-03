
'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion-3d';

const DNASegment = ({ position, color1, color2 }: { position: [number, number, number], color1: string, color2: string }) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.rotation.y = t * 0.5;
    }
  });

  const spheres = useMemo(() => {
    const temp = [];
    const count = 10;
    const radius = 0.5;
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      const y = (i - count / 2) * 0.2;
      temp.push({ id: `s1_${i}`, pos: [Math.cos(t) * radius, y, Math.sin(t) * radius], color: color1 });
      temp.push({ id: `s2_${i}`, pos: [Math.cos(t + Math.PI) * radius, y, Math.sin(t + Math.PI) * radius], color: color2 });
    }
    return temp;
  }, [color1, color2]);

  const connectors = useMemo(() => {
    const temp = [];
    const count = 10;
    for (let i = 0; i < count; i++) {
        const start = new THREE.Vector3(spheres[i * 2].pos[0], spheres[i * 2].pos[1], spheres[i * 2].pos[2]);
        const end = new THREE.Vector3(spheres[i * 2 + 1].pos[0], spheres[i * 2 + 1].pos[1], spheres[i * 2 + 1].pos[2]);
        const mid = new THREE.Vector3().lerpVectors(start, end, 0.5);
        const distance = start.distanceTo(end);
        
        const direction = new THREE.Vector3().subVectors(end, start).normalize();
        const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

        temp.push({
            id: `c_${i}`,
            position: mid.toArray(),
            scale: [0.02, distance, 0.02],
            quaternion: quaternion,
        });
    }
    return temp;
  }, [spheres]);


  return (
    <motion.group ref={ref} position={position} whileHover={{ scale: 1.2, z: 2 }} transition={{ duration: 0.3 }}>
      {spheres.map(s => (
        <mesh key={s.id} position={s.pos as [number, number, number]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={s.color} emissive={s.color} emissiveIntensity={3} toneMapped={false} />
        </mesh>
      ))}
      {connectors.map(c => (
         <mesh key={c.id} position={c.position as [number,number,number]} quaternion={c.quaternion as any} scale={c.scale as [number, number, number]}>
            <cylinderGeometry args={[1, 1, 1, 8]} />
            <meshStandardMaterial color="#888" emissive="#555" emissiveIntensity={1} toneMapped={false} />
        </mesh>
      ))}
    </motion.group>
  );
};

export const DnaVisualization = ({ onClick, color1, color2 }: { onClick: () => void; color1: string; color2: string; }) => {
  return (
    <div onClick={onClick} className="w-24 h-48 cursor-pointer">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Suspense fallback={null}>
          <DNASegment position={[0, 0, 0]} color1={color1} color2={color2} />
        </Suspense>
      </Canvas>
    </div>
  );
};
