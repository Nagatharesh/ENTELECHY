
'use client';

import React, { useRef, useMemo, useState, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import * as THREE from 'three';

const DNASegment = ({ position, color1, color2 }: { position: [number, number, number], color1: string, color2: string }) => {
  const ref = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.rotation.y = t * 0.2;
    }
  });

  const { spheres, connectors } = useMemo(() => {
    const tempSpheres = [];
    const tempConnectors = [];
    const count = 20;
    const radius = 0.5;
    const height = 3;

    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 4; 
      const y = (i - count / 2) * (height / count);

      const pos1: [number, number, number] = [Math.cos(t) * radius, y, Math.sin(t) * radius];
      const pos2: [number, number, number] = [Math.cos(t + Math.PI) * radius, y, Math.sin(t + Math.PI) * radius];

      tempSpheres.push({ id: `s1_${i}`, pos: pos1, color: color1 });
      tempSpheres.push({ id: `s2_${i}`, pos: pos2, color: color2 });
      
      const start = new THREE.Vector3(...pos1);
      const end = new THREE.Vector3(...pos2);
      const mid = new THREE.Vector3().lerpVectors(start, end, 0.5);
      const distance = start.distanceTo(end);
      
      const direction = new THREE.Vector3().subVectors(end, start).normalize();
      const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

      tempConnectors.push({
          id: `c_${i}`,
          position: mid.toArray(),
          scale: [0.02, distance, 0.02],
          quaternion: quaternion.toArray(),
      });
    }
    return { spheres: tempSpheres, connectors: tempConnectors };
  }, [color1, color2]);


  return (
    <motion.group
      ref={ref}
      position={position}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      animate={{ scale: isHovered ? 1.2 : 1 }}
      transition={{ duration: 0.3 }}
    >
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

export const DnaVisualization = ({ onClick, position, color1, color2 }: { onClick: () => void; position: [number, number, number]; color1: string; color2: string; }) => {
  return (
    <group position={position} onClick={onClick} >
       <DNASegment position={[0, 0, 0]} color1={color1} color2={color2} />
    </group>
  );
};
