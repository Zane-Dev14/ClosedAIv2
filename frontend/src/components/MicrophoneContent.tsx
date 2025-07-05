import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

export const MicrophoneContent = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(hovered ? 1.2 : 1);
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} />
      <Environment preset="night" />
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <group>
          <Sphere 
            ref={meshRef}
            args={[1, 64, 64]} 
            position={[0, 0, 0]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <MeshDistortMaterial
              color="#3b82f6"
              attach="material"
              distort={0.4}
              speed={3}
              roughness={0.1}
              metalness={0.8}
            />
          </Sphere>
          {[...Array(3)].map((_, i) => (
            <mesh key={i} position={[0, 0, 0]} rotation={[0, 0, i * Math.PI / 3]}>
              <torusGeometry args={[1.5 + i * 0.3, 0.02, 16, 100]} />
              <meshBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
            </mesh>
          ))}
        </group>
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
}; 