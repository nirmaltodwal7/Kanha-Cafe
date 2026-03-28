'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

function FloatingParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 80;

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const positions = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 20,
      y: (Math.random() - 0.5) * 20,
      z: (Math.random() - 0.5) * 10,
      speed: 0.2 + Math.random() * 0.6,
      offset: Math.random() * Math.PI * 2,
      scale: 0.03 + Math.random() * 0.08,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    positions.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * p.speed + p.offset) * 0.5,
        p.y + Math.cos(t * p.speed * 0.7 + p.offset) * 0.8,
        p.z
      );
      const s = p.scale * (1 + Math.sin(t + p.offset) * 0.2);
      dummy.scale.setScalar(s);
      dummy.rotation.z = t * p.speed;
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color="#e5a24a" roughness={0.3} metalness={0.1} transparent opacity={0.6} />
    </instancedMesh>
  );
}

function FloatingDonut({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
    ref.current.rotation.y += 0.008;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <Torus ref={ref} position={position} args={[0.5, 0.2, 16, 32]}>
        <meshStandardMaterial color="#c46e1f" roughness={0.4} metalness={0.15} />
      </Torus>
    </Float>
  );
}

function FloatingCake({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.4) * 0.4;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1}>
      <group ref={ref} position={position}>
        <Cylinder args={[0.4, 0.4, 0.5, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#8b5e3c" roughness={0.6} />
        </Cylinder>
        <Cylinder args={[0.45, 0.45, 0.1, 16]} position={[0, 0.3, 0]}>
          <meshStandardMaterial color="#f5ddb0" roughness={0.4} />
        </Cylinder>
        <Sphere args={[0.08, 8, 8]} position={[0, 0.42, 0]}>
          <meshStandardMaterial color="#dc8a2a" roughness={0.2} metalness={0.3} />
        </Sphere>
      </group>
    </Float>
  );
}

function FloatingStar({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z += 0.015;
    ref.current.rotation.y = clock.getElapsedTime() * 0.5;
  });
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.2}>
      <Box ref={ref} position={position} args={[0.25, 0.25, 0.1]}>
        <meshStandardMaterial color="#fdf6ec" roughness={0.3} metalness={0.4} transparent opacity={0.8} />
      </Box>
    </Float>
  );
}

export default function BakeryScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#faefd8" />
      <directionalLight position={[-5, -3, 0]} intensity={0.4} color="#c46e1f" />
      <pointLight position={[0, 0, 5]} intensity={0.8} color="#e5a24a" />

      <FloatingParticles />

      <FloatingDonut position={[-3, 1, -1]} />
      <FloatingDonut position={[3.5, -0.5, -2]} />
      <FloatingDonut position={[-1.5, -2, -1]} />

      <FloatingCake position={[2, 1.5, -1]} />
      <FloatingCake position={[-3.5, -1, -2]} />

      <FloatingStar position={[1, -1.5, 0]} />
      <FloatingStar position={[-2, 2, -1]} />
      <FloatingStar position={[3.5, 2, -2]} />
    </Canvas>
  );
}
