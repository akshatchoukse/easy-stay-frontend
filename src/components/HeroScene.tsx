import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function HotelBuilding() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const windowMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#d4a853", emissive: "#d4a853", emissiveIntensity: 0.8, transparent: true, opacity: 0.9 }),
    []
  );

  const buildingMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#1a1f2e", metalness: 0.3, roughness: 0.7 }),
    []
  );

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Main building */}
      <mesh position={[0, 1.5, 0]} material={buildingMaterial}>
        <boxGeometry args={[2, 3, 1.2]} />
      </mesh>
      {/* Left wing */}
      <mesh position={[-1.8, 1, 0]} material={buildingMaterial}>
        <boxGeometry args={[1.6, 2, 1]} />
      </mesh>
      {/* Right wing */}
      <mesh position={[1.8, 1, 0]} material={buildingMaterial}>
        <boxGeometry args={[1.6, 2, 1]} />
      </mesh>
      {/* Roof accent */}
      <mesh position={[0, 3.15, 0]}>
        <boxGeometry args={[2.2, 0.1, 1.4]} />
        <meshStandardMaterial color="#d4a853" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Windows - main */}
      {[-0.5, 0.5].map((x) =>
        [0.8, 1.5, 2.2].map((y) => (
          <mesh key={`${x}-${y}`} position={[x, y, 0.61]} material={windowMaterial}>
            <boxGeometry args={[0.3, 0.4, 0.02]} />
          </mesh>
        ))
      )}
      {/* Windows - wings */}
      {[-2.2, -1.5].map((x) =>
        [0.6, 1.3].map((y) => (
          <mesh key={`l-${x}-${y}`} position={[x, y, 0.51]} material={windowMaterial}>
            <boxGeometry args={[0.25, 0.35, 0.02]} />
          </mesh>
        ))
      )}
      {[1.5, 2.2].map((x) =>
        [0.6, 1.3].map((y) => (
          <mesh key={`r-${x}-${y}`} position={[x, y, 0.51]} material={windowMaterial}>
            <boxGeometry args={[0.25, 0.35, 0.02]} />
          </mesh>
        ))
      )}
      {/* Entrance */}
      <mesh position={[0, 0.3, 0.61]}>
        <boxGeometry args={[0.5, 0.6, 0.02]} />
        <meshStandardMaterial color="#d4a853" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial color="#0d1117" metalness={0.1} roughness={0.9} />
      </mesh>
    </group>
  );
}

function GoldenOrbs() {
  const orbsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (orbsRef.current) {
      orbsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={orbsRef}>
      {[...Array(5)].map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        const radius = 4;
        return (
          <Float key={i} speed={1 + i * 0.5} rotationIntensity={0.5} floatIntensity={1}>
            <mesh position={[Math.cos(angle) * radius, Math.sin(angle) * 1.5, Math.sin(angle) * radius]}>
              <sphereGeometry args={[0.08 + i * 0.02, 16, 16]} />
              <MeshDistortMaterial color="#d4a853" emissive="#d4a853" emissiveIntensity={0.5} distort={0.3} speed={2} />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 2, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <fog attach="fog" args={["#0a0e17", 5, 15]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <pointLight position={[0, 4, 2]} intensity={1} color="#d4a853" distance={10} />
        <pointLight position={[-3, 2, -2]} intensity={0.5} color="#4a6fa5" distance={8} />
        <Stars radius={50} depth={50} count={1000} factor={3} saturation={0} fade speed={1} />
        <HotelBuilding />
        <GoldenOrbs />
      </Canvas>
    </div>
  );
}
