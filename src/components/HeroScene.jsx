'use client';

import { useRef, useMemo, useCallback, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';

/* ─────────────────────────────────────────────
   SCENE CONTROLLER - Smooth cursor parallax
   Drives the entire scene group to follow cursor
   ───────────────────────────────────────────── */
function SceneController({ groupRef, mousePos, cursorLightRef }) {
    const smoothMouse = useRef({ x: 0, y: 0 });

    useFrame(() => {
        // Smooth lerp toward target mouse position
        const lerpFactor = 0.04;
        smoothMouse.current.x += (mousePos.x - smoothMouse.current.x) * lerpFactor;
        smoothMouse.current.y += (mousePos.y - smoothMouse.current.y) * lerpFactor;

        if (groupRef.current) {
            // Translate the entire scene group based on cursor (subtle parallax)
            groupRef.current.position.x = smoothMouse.current.x * 0.25;
            groupRef.current.position.y = -smoothMouse.current.y * 0.15;

            // Subtle tilt for 3D depth feel
            groupRef.current.rotation.y = smoothMouse.current.x * 0.04;
            groupRef.current.rotation.x = smoothMouse.current.y * 0.03;
        }

        // Cursor-tracking light follows mouse for dynamic illumination
        if (cursorLightRef.current) {
            cursorLightRef.current.position.x = smoothMouse.current.x * 2.5;
            cursorLightRef.current.position.y = -smoothMouse.current.y * 2;
            cursorLightRef.current.position.z = 3;
        }
    });

    return null;
}

/* ─────────────────────────────────────────────
   INTERACTIVE WIREFRAME SPHERE
   ───────────────────────────────────────────── */
function InteractiveSphere() {
    const meshRef = useRef();
    const materialRef = useRef();
    const geoRef = useRef();
    const originalPositions = useRef(null);
    const hoverPoint = useRef(new THREE.Vector3());
    const isHovered = useRef(false);
    const hoverStrength = useRef({ value: 0 });
    const scaleTarget = useRef({ value: 1 });
    const rotationSpeed = useRef({ value: 0.12 });
    const colorTarget = useRef({ r: 0.0, g: 0.85, b: 1.0 }); // neon blue
    const emissiveTarget = useRef({ r: 0.0, g: 0.6, b: 1.0 });
    const opacityTarget = useRef({ value: 0.6 });
    const linewidthTarget = useRef({ value: 1 });
    const breathPhase = useRef(0);

    const { raycaster, pointer, camera } = useThree();

    useFrame(({ clock }) => {
        if (!meshRef.current || !geoRef.current) return;

        const geo = geoRef.current;
        const positions = geo.attributes.position;

        // Save original positions once
        if (!originalPositions.current) {
            originalPositions.current = new Float32Array(positions.array.length);
            originalPositions.current.set(positions.array);
        }

        const time = clock.getElapsedTime();

        // ─── Breathing scale animation ───
        breathPhase.current = Math.sin(time * 0.8) * 0.015;
        const baseScale = scaleTarget.current.value + breathPhase.current;
        meshRef.current.scale.lerp(
            new THREE.Vector3(baseScale, baseScale, baseScale),
            0.08
        );

        // ─── Rotation ───
        meshRef.current.rotation.y += rotationSpeed.current.value * 0.016;
        meshRef.current.rotation.x += rotationSpeed.current.value * 0.004;

        // ─── Material transitions ───
        if (materialRef.current) {
            const c = materialRef.current.color;
            c.r += (colorTarget.current.r - c.r) * 0.05;
            c.g += (colorTarget.current.g - c.g) * 0.05;
            c.b += (colorTarget.current.b - c.b) * 0.05;

            const e = materialRef.current.emissive;
            e.r += (emissiveTarget.current.r - e.r) * 0.05;
            e.g += (emissiveTarget.current.g - e.g) * 0.05;
            e.b += (emissiveTarget.current.b - e.b) * 0.05;

            materialRef.current.emissiveIntensity +=
                ((isHovered.current ? 0.55 : 0.12) - materialRef.current.emissiveIntensity) * 0.06;

            materialRef.current.opacity +=
                (opacityTarget.current.value - materialRef.current.opacity) * 0.06;
        }

        // ─── Vertex displacement ───
        const str = hoverStrength.current.value;
        const orig = originalPositions.current;

        for (let i = 0; i < positions.count; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            let ox = orig[ix], oy = orig[iy], oz = orig[iz];

            // Global wave distortion (enhanced when hovered)
            const waveIntensity = 1 + str * 1.5;
            const wave = (Math.sin(time * 2 + ox * 3) * 0.008 +
                Math.cos(time * 1.5 + oy * 4) * 0.006) * waveIntensity;
            ox += wave;
            oy += wave;
            oz += wave;

            // Localized hover displacement (ripple at hover point)
            if (str > 0.01) {
                const dx = ox - hoverPoint.current.x;
                const dy = oy - hoverPoint.current.y;
                const dz = oz - hoverPoint.current.z;
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                const ripple = Math.exp(-dist * 2.5) * str * 0.2;
                const rippleWave = Math.sin(dist * 8 - time * 5) * ripple;

                // Push vertices outward along normal direction
                const len = Math.sqrt(ox * ox + oy * oy + oz * oz) || 1;
                ox += (ox / len) * rippleWave;
                oy += (oy / len) * rippleWave;
                oz += (oz / len) * rippleWave;
            }

            positions.array[ix] = ox;
            positions.array[iy] = oy;
            positions.array[iz] = oz;
        }
        positions.needsUpdate = true;

        // ─── Raycasting for hover ───
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObject(meshRef.current);
        if (intersects.length > 0) {
            if (!isHovered.current) onHoverEnter();
            hoverPoint.current.copy(intersects[0].point);
            meshRef.current.worldToLocal(hoverPoint.current);
        } else {
            if (isHovered.current) onHoverExit();
        }
    });

    const onHoverEnter = useCallback(() => {
        isHovered.current = true;
        gsap.to(hoverStrength.current, { value: 1, duration: 0.6, ease: 'power2.out' });
        gsap.to(scaleTarget.current, { value: 1.1, duration: 0.9, ease: 'elastic.out(1, 0.5)' });
        gsap.to(rotationSpeed.current, { value: 0.28, duration: 0.5, ease: 'power2.out' });
        gsap.to(colorTarget.current, { r: 0.45, g: 0.25, b: 1.0, duration: 0.6, ease: 'power2.out' });
        gsap.to(emissiveTarget.current, { r: 0.3, g: 0.15, b: 0.9, duration: 0.6, ease: 'power2.out' });
        gsap.to(opacityTarget.current, { value: 0.85, duration: 0.5, ease: 'power2.out' });
    }, []);

    const onHoverExit = useCallback(() => {
        isHovered.current = false;
        gsap.to(hoverStrength.current, { value: 0, duration: 1.2, ease: 'power3.out' });
        gsap.to(scaleTarget.current, { value: 1, duration: 1.4, ease: 'elastic.out(1, 0.4)' });
        gsap.to(rotationSpeed.current, { value: 0.12, duration: 0.8, ease: 'power2.inOut' });
        gsap.to(colorTarget.current, { r: 0.0, g: 0.85, b: 1.0, duration: 1.0, ease: 'power2.inOut' });
        gsap.to(emissiveTarget.current, { r: 0.0, g: 0.6, b: 1.0, duration: 1.0, ease: 'power2.inOut' });
        gsap.to(opacityTarget.current, { value: 0.6, duration: 0.8, ease: 'power2.inOut' });
    }, []);

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <icosahedronGeometry ref={geoRef} args={[1.9, 5]} />
            <meshStandardMaterial
                ref={materialRef}
                color={new THREE.Color(0.0, 0.85, 1.0)}
                emissive={new THREE.Color(0.0, 0.6, 1.0)}
                emissiveIntensity={0.12}
                wireframe
                transparent
                opacity={0.6}
                roughness={0.3}
                metalness={0.7}
            />
        </mesh>
    );
}

/* ─────────────────────────────────────────────
   FLOATING ACCENT SHAPES
   ───────────────────────────────────────────── */
function AccentTorus() {
    const ref = useRef();
    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.rotation.x = clock.getElapsedTime() * 0.2;
            ref.current.rotation.y = clock.getElapsedTime() * 0.12;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.2}>
            <mesh ref={ref} position={[3.5, 2.2, -2.5]} scale={0.45}>
                <torusGeometry args={[1, 0.3, 16, 48]} />
                <meshStandardMaterial
                    color="#a855f7"
                    emissive="#7c3aed"
                    emissiveIntensity={0.2}
                    wireframe
                    transparent
                    opacity={0.35}
                />
            </mesh>
        </Float>
    );
}

function AccentOctahedron() {
    const ref = useRef();
    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.rotation.y = clock.getElapsedTime() * 0.25;
            ref.current.rotation.z = clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.6} floatIntensity={1.5}>
            <mesh ref={ref} position={[-2.5, -2, -1.5]} scale={0.4}>
                <octahedronGeometry args={[1, 0]} />
                <meshStandardMaterial
                    color="#06b6d4"
                    emissive="#0891b2"
                    emissiveIntensity={0.15}
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </mesh>
        </Float>
    );
}

/* ─────────────────────────────────────────────
   AMBIENT PARTICLES
   ───────────────────────────────────────────── */
function AmbientParticles() {
    const count = 100;
    const pointsRef = useRef();

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 16;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
        }
        return pos;
    }, []);

    useFrame(({ clock }) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = clock.getElapsedTime() * 0.015;
            pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.03) * 0.08;
        }
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
                size={0.025}
                color="#38bdf8"
                transparent
                opacity={0.45}
                sizeAttenuation
            />
        </points>
    );
}

/* ─────────────────────────────────────────────
   MAIN SCENE EXPORT
   ───────────────────────────────────────────── */
export default function HeroScene({ mousePos = { x: 0, y: 0 } }) {
    const sceneGroupRef = useRef();
    const cursorLightRef = useRef();

    return (
        <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            style={{ width: '100%', height: '100%', touchAction: 'none' }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
            raycaster={{ enabled: true }}
            onCreated={({ gl }) => {
                gl.setClearColor(0x000000, 0);
            }}
        >
            {/* Lighting */}
            <ambientLight intensity={0.25} />
            <directionalLight
                position={[5, 5, 5]}
                intensity={0.4}
                color="#e0f2fe"
            />
            <pointLight position={[-4, 3, 3]} intensity={0.5} color="#a78bfa" />
            <pointLight position={[4, -2, 2]} intensity={0.3} color="#22d3ee" />

            {/* Cursor-tracking dynamic light */}
            <pointLight
                ref={cursorLightRef}
                position={[0, 0, 3]}
                intensity={0.6}
                color="#67e8f9"
                distance={10}
                decay={2}
            />

            {/* Scene Controller - drives smooth parallax */}
            <SceneController
                groupRef={sceneGroupRef}
                mousePos={mousePos}
                cursorLightRef={cursorLightRef}
            />

            {/* All scene objects in a single group for parallax */}
            <group ref={sceneGroupRef}>
                {/* Interactive Sphere */}
                <InteractiveSphere />

                {/* Accent Shapes */}
                <AccentTorus />
                <AccentOctahedron />

                {/* Particles */}
                <AmbientParticles />
            </group>

            {/* Post-Processing: Bloom */}
            <EffectComposer>
                <Bloom
                    intensity={1.0}
                    luminanceThreshold={0.12}
                    luminanceSmoothing={0.85}
                    mipmapBlur
                    radius={0.7}
                />
            </EffectComposer>
        </Canvas>
    );
}
