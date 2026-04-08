'use client';
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Float, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import type { StudioConfig } from "@/types/studio";

// Import preview images
import leadGenPreview from "@/assets/studio-previews/lead-gen.jpg";
import authorityPreview from "@/assets/studio-previews/authority.jpg";
import saasPreview from "@/assets/studio-previews/saas.jpg";
import platformPreview from "@/assets/studio-previews/platform.jpg";

const previewImages: Record<string, string> = {
  "lead-generation": leadGenPreview,
  "content-hub": authorityPreview,
  "product-saas": saasPreview,
  "service-portal": platformPreview,
};

interface PreviewScreenProps {
  config: StudioConfig;
  texture: THREE.Texture | null;
}

function PreviewScreen({ config, texture }: PreviewScreenProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const frameRef = useRef<THREE.Mesh>(null);

  // Gentle rotation animation
  useFrame((state) => {
    if (meshRef.current && frameRef.current) {
      const t = state.clock.getElapsedTime();
      
      // Subtle floating rotation
      meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.05;
      
      frameRef.current.rotation.y = meshRef.current.rotation.y;
      frameRef.current.rotation.x = meshRef.current.rotation.x;
    }
  });

  // Get colors based on palette
  const { frameColor, screenGlow } = useMemo(() => {
    switch (config.palette) {
      case "light":
        return { frameColor: "#e2e8f0", screenGlow: "#ffffff" };
      case "dark":
        return { frameColor: "#1e293b", screenGlow: "#3b82f6" };
      case "monochrome":
        return { frameColor: "#262626", screenGlow: "#a3a3a3" };
      case "gradient":
        return { frameColor: "#312e81", screenGlow: "#8b5cf6" };
      default:
        return { frameColor: "#1e293b", screenGlow: "#3b82f6" };
    }
  }, [config.palette]);

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group>
        {/* MacBook-style frame */}
        <RoundedBox
          ref={frameRef}
          args={[4.2, 2.8, 0.15]}
          radius={0.1}
          smoothness={4}
          position={[0, 0, -0.1]}
        >
          <meshStandardMaterial color={frameColor} metalness={0.8} roughness={0.2} />
        </RoundedBox>

        {/* Screen bezel */}
        <RoundedBox
          args={[4, 2.6, 0.08]}
          radius={0.05}
          smoothness={4}
          position={[0, 0, 0]}
        >
          <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.3} />
        </RoundedBox>

        {/* Screen with texture */}
        <mesh ref={meshRef} position={[0, 0, 0.05]}>
          <planeGeometry args={[3.6, 2.2]} />
          {texture ? (
            <meshBasicMaterial map={texture} />
          ) : (
            <meshBasicMaterial color="#111827" />
          )}
        </mesh>

        {/* Screen glow effect */}
        <pointLight
          position={[0, 0, 1]}
          color={screenGlow}
          intensity={0.5}
          distance={3}
        />

        {/* Camera notch */}
        <mesh position={[0, 1.2, 0.08]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Stand base */}
        <mesh position={[0, -1.6, -0.3]} rotation={[-0.3, 0, 0]}>
          <boxGeometry args={[1.5, 0.05, 0.8]} />
          <meshStandardMaterial color={frameColor} metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Stand neck */}
        <mesh position={[0, -1.35, -0.2]}>
          <boxGeometry args={[0.3, 0.5, 0.1]} />
          <meshStandardMaterial color={frameColor} metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

interface Preview3DCanvasProps {
  config: StudioConfig;
}

export function Preview3DCanvas({ config }: Preview3DCanvasProps) {
  // Load texture based on purpose
  const texture = useMemo(() => {
    const imagePath = previewImages[config.purpose];
    if (!imagePath) return null;
    
    const loader = new THREE.TextureLoader();
    const tex = loader.load(imagePath);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [config.purpose]);

  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, 3, 2]} intensity={0.3} color="#8b5cf6" />

        {/* Environment for reflections */}
        <Environment preset="city" />

        {/* Main preview */}
        <PreviewScreen config={config} texture={texture} />

        {/* Floor shadow */}
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={4}
        />
      </Canvas>
    </div>
  );
}

export default Preview3DCanvas;


