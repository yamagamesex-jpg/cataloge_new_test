import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'

interface RotatingProductProps {
  imageUrl?: string
  title?: string
  className?: string
  autoRotate?: boolean
  rotationSpeed?: number
  enableControls?: boolean
}

function ProductModel({
  imageUrl,
  title,
  autoRotate = true,
  rotationSpeed = 0.5
}: Omit<RotatingProductProps, 'className'>) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // Load texture if imageUrl is provided
  const texture = imageUrl ? useLoader(THREE.TextureLoader, imageUrl) : null

  useFrame((state) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <group>
      {/* Main Product Cube */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <boxGeometry args={[3, 3, 3]} />
        {texture ? (
          <meshStandardMaterial map={texture} />
        ) : (
          <meshStandardMaterial
            color={hovered ? '#60a5fa' : '#3b82f6'}
            metalness={0.7}
            roughness={0.3}
          />
        )}
      </mesh>

      {/* Product Title */}
      {title && (
        <Text
          position={[0, -2.5, 0]}
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter.woff"
        >
          {title}
        </Text>
      )}

      {/* Ambient Light */}
      <ambientLight intensity={0.5} />

      {/* Directional Light */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
      />

      {/* Point Light for dramatic effect */}
      <pointLight
        position={[-10, -10, -10]}
        intensity={0.5}
        color="#ff6b6b"
      />
    </group>
  )
}

export const RotatingProduct: React.FC<RotatingProductProps> = ({
  imageUrl,
  title,
  className = '',
  autoRotate = true,
  rotationSpeed = 0.5,
  enableControls = true
}) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Suspense fallback={
        <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-2"></div>
            <p className="text-blue-400 text-sm">Loading 3D Model...</p>
          </div>
        </div>
      }>
        <Canvas
          camera={{ position: [5, 5, 5], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <ProductModel
            imageUrl={imageUrl}
            title={title}
            autoRotate={autoRotate}
            rotationSpeed={rotationSpeed}
          />
          {enableControls && (
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              enableRotate={true}
              minDistance={3}
              maxDistance={10}
            />
          )}
        </Canvas>
      </Suspense>
    </div>
  )
}

export default RotatingProduct