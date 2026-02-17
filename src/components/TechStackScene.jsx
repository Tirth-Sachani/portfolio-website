'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── Subtle Floating Particles Only ─── */
function Particles() {
    const count = 80;
    const pointsRef = useRef();

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 24;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
        }
        return pos;
    }, []);

    useFrame(({ clock }) => {
        if (!pointsRef.current) return;
        const t = clock.getElapsedTime();
        pointsRef.current.rotation.y = t * 0.01;
        pointsRef.current.rotation.x = Math.sin(t * 0.02) * 0.05;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#38bdf8"
                transparent
                opacity={0.35}
                sizeAttenuation
            />
        </points>
    );
}

export default function TechStackScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 8], fov: 50 }}
            style={{ position: 'absolute', inset: 0 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            onCreated={({ gl }) => {
                gl.setClearColor(0x000000, 0);
            }}
        >
            <Particles />
        </Canvas>
    );
}
