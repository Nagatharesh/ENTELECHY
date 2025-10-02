
"use client";

import * as THREE from 'three';
import { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

// Constants for DNA structure
const HELIX_RADIUS = 1;
const HELIX_HEIGHT = 10;
const HELIX_TURNS = 5;
const NUM_PAIRS = 50;
const STRAND_PARTICLES = 200;
const CONNECTOR_WIDTH = 0.08;

// Reusable component for a single strand
const DNAStrand = ({ curve, color, isReversed=false }) => {
    const strandRef = useRef<THREE.Points>(null);

    useFrame(({ clock }) => {
        if (strandRef.current) {
            const time = clock.getElapsedTime();
            const positions = strandRef.current.geometry.attributes.position;
            for (let i = 0; i < positions.count; i++) {
                const y = (i / (positions.count - 1)) * HELIX_HEIGHT;
                const phase = (y / HELIX_HEIGHT) * HELIX_TURNS * 2 * Math.PI + time * 0.5;
                const x = Math.sin(phase) * HELIX_RADIUS;
                const z = Math.cos(phase) * HELIX_RADIUS;
                positions.setXYZ(i, x, y, z);
            }
            positions.needsUpdate = true;
        }
    });

    const points = useMemo(() => {
        const p = new Array(STRAND_PARTICLES).fill(0).map((_, i) => (
            (i / (STRAND_PARTICLES - 1)) * HELIX_HEIGHT
        ));
        return p.map(y => curve.getPointAt(y / HELIX_HEIGHT));
    }, [curve]);

    return (
        <points ref={strandRef}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach="attributes-position"
                    count={points.length}
                    array={new Float32Array(points.flatMap(p => p.toArray()))}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial attach="material" size={0.1} color={color} sizeAttenuation fog={false} />
        </points>
    );
};

// Reusable component for the connectors
const Connectors = ({ curve1, curve2 }) => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    useEffect(() => {
        if (!meshRef.current) return;
        
        const positions = [];
        for (let i = 0; i < NUM_PAIRS; i++) {
            const t = i / (NUM_PAIRS - 1);
            const p1 = curve1.getPointAt(t);
            const p2 = curve2.getPointAt(t);
            positions.push(p1, p2);
        }

        const updateConnectors = () => {
            if (!meshRef.current) return;
            for (let i = 0; i < NUM_PAIRS; i++) {
                const p1 = curve1.getPointAt(i / (NUM_PAIRS - 1));
                const p2 = curve2.getPointAt(i / (NUM_PAIRS - 1));
                const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
                dummy.position.copy(midPoint);
                dummy.lookAt(p2);
                dummy.scale.set(CONNECTOR_WIDTH, CONNECTOR_WIDTH, p1.distanceTo(p2));
                dummy.updateMatrix();
                meshRef.current.setMatrixAt(i, dummy.matrix);
            }
            meshRef.current.instanceMatrix.needsUpdate = true;
        };

        updateConnectors();

    }, [curve1, curve2, dummy]);

     useFrame(({ clock }) => {
        if (!meshRef.current) return;

        const time = clock.getElapsedTime();
        for (let i = 0; i < NUM_PAIRS; i++) {
            const t = i / (NUM_PAIRS - 1);
            
            const p1_y = t * HELIX_HEIGHT;
            const p1_phase = (p1_y / HELIX_HEIGHT) * HELIX_TURNS * 2 * Math.PI + time * 0.5;
            const p1 = new THREE.Vector3(Math.sin(p1_phase) * HELIX_RADIUS, p1_y, Math.cos(p1_phase) * HELIX_RADIUS);

            const p2_y = t * HELIX_HEIGHT;
            const p2_phase = p1_phase + Math.PI; // Opposite side of the helix
            const p2 = new THREE.Vector3(Math.sin(p2_phase) * HELIX_RADIUS, p2_y, Math.cos(p2_phase) * HELIX_RADIUS);

            const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
            dummy.position.copy(midPoint);
            dummy.lookAt(p2);
            dummy.scale.set(CONNECTOR_WIDTH, CONNECTOR_WIDTH, p1.distanceTo(p2));
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, NUM_PAIRS]}>
            <cylinderGeometry args={[1, 1, 1, 8]} />
            <meshStandardMaterial color="#2a9d8f" emissive="#2a9d8f" emissiveIntensity={0.5} />
        </instancedMesh>
    );
};

export const DNA = ({interactive}) => {
    const groupRef = useRef<THREE.Group>(null);

    const [curve1, curve2] = useMemo(() => {
        const c1 = new THREE.CatmullRomCurve3(
            new Array(STRAND_PARTICLES).fill(0).map((_, i) => {
                const t = i / (STRAND_PARTICLES - 1);
                return new THREE.Vector3(
                    Math.sin(t * HELIX_TURNS * 2 * Math.PI) * HELIX_RADIUS,
                    t * HELIX_HEIGHT,
                    Math.cos(t * HELIX_TURNS * 2 * Math.PI) * HELIX_RADIUS
                );
            })
        );
        const c2 = new THREE.CatmullRomCurve3(
            new Array(STRAND_PARTICLES).fill(0).map((_, i) => {
                const t = i / (STRAND_PARTICLES - 1);
                return new THREE.Vector3(
                    Math.sin(t * HELIX_TURNS * 2 * Math.PI + Math.PI) * HELIX_RADIUS,
                    t * HELIX_HEIGHT,
                    Math.cos(t * HELIX_TURNS * 2 * Math.PI + Math.PI) * HELIX_RADIUS
                );
            })
        );
        return [c1, c2];
    }, []);

    useFrame((state, delta) => {
      if (groupRef.current) {
        if(interactive) {
            groupRef.current.rotation.y += delta * 0.2; // Slow rotation
        } else {
             groupRef.current.rotation.y = 0;
        }
      }
    });

    const handleClick = () => {
        if (groupRef.current && interactive) {
            // "Swing" animation
            groupRef.current.rotation.z += (Math.random() - 0.5) * 0.2;
            setTimeout(() => {
                if(groupRef.current) groupRef.current.rotation.z = 0;
            }, 300);
        }
    };

    return (
        <group ref={groupRef} position={[0, -HELIX_HEIGHT / 2, 0]} onClick={handleClick} dispose={null}>
            <DNAStrand curve={curve1} color="hsl(var(--primary))" />
            <DNAStrand curve={curve2} color="hsl(var(--secondary))" isReversed />
            <Connectors curve1={curve1} curve2={curve2} />
        </group>
    );
};
