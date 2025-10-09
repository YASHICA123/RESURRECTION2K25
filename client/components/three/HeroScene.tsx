import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Rings() {
  const g1 = useRef<THREE.Mesh>(null!);
  const g2 = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const p = state.pointer;
    if (g1.current) {
      g1.current.rotation.x = 0.4 + t * 0.15 + p.y * 0.4;
      g1.current.rotation.y = t * 0.25 + p.x * 0.6;
    }
    if (g2.current) {
      g2.current.rotation.x = -0.2 - t * 0.12 + p.y * 0.3;
      g2.current.rotation.y = -t * 0.2 + p.x * 0.5;
    }
  });
  return (
    <group position={[1.2, 0.1, -3]}>
      <mesh ref={g1}>
        <torusGeometry args={[0.9, 0.16, 64, 180]} />
        <meshPhysicalMaterial color={new THREE.Color("#ff3b30")} metalness={0.85} roughness={0.15} clearcoat={1} clearcoatRoughness={0.1} emissive={new THREE.Color("#ffd60a")} emissiveIntensity={0.4} />
      </mesh>
      <mesh ref={g2}>
        <torusGeometry args={[0.65, 0.08, 64, 180]} />
        <meshStandardMaterial color={new THREE.Color("#ffd60a")} metalness={0.8} roughness={0.25} emissive={new THREE.Color("#ff3b30")} emissiveIntensity={0.25} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 55 }} dpr={[1, 2]}>
        <color attach="background" args={["transparent"]} />
        <fog attach="fog" args={["#000000", 6, 14]} />
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 2, 3]} intensity={1.1} color={new THREE.Color("#ff3b30")} />
        <pointLight position={[-2, -1, -2]} intensity={0.9} color={new THREE.Color("#ffd60a")} />
        <Stars radius={70} depth={30} count={900} factor={2.2} fade speed={0.8} saturation={0} />
        <Rings />
      </Canvas>
    </div>
  );
}
