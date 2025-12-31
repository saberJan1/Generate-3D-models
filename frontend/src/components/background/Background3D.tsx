import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const ParticleField = () => {
    const points = useRef<THREE.Points>(null!);
    useFrame((state) => {
        if (points.current) {
            points.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <group ref={points}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </group>
    );
};

const FloatingShapes = () => {
    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <mesh position={[3, 2, -2]}>
                <icosahedronGeometry args={[1.5, 0]} />
                <meshStandardMaterial color="#00f0ff" wireframe transparent opacity={0.2} />
            </mesh>
            <mesh position={[-4, -2, -5]}>
                <torusGeometry args={[2, 0.2, 16, 100]} />
                <meshStandardMaterial color="#7000ff" wireframe transparent opacity={0.15} />
            </mesh>
        </Float>
    );
};

export const Background3D = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: 'linear-gradient(to bottom, #050505, #121212)' }}>
            <Canvas camera={{ position: [0, 0, 10] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#7000ff" />
                <ParticleField />
                <FloatingShapes />
            </Canvas>
        </div>
    );
};
