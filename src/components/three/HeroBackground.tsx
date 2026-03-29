import React, { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface HeroBackgroundProps {
  className?: string
  particleCount?: number
  speed?: number
  size?: number
  color?: string
}

function Particles({ particleCount = 2000, speed = 0.5, size = 2, color = '#60a5fa' }: Omit<HeroBackgroundProps, 'className'>) {
  const ref = useRef<THREE.Points>(null)

  const [positions] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      // Create a sphere of particles
      const radius = Math.random() * 50 + 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }

    return [positions]
  }, [particleCount])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.1) * 0.1
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.05
      ref.current.rotation.z = Math.cos(state.clock.elapsedTime * speed * 0.1) * 0.1
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors
      />
    </Points>
  )
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  className = '',
  particleCount = 2000,
  speed = 0.5,
  size = 2,
  color = '#60a5fa'
}) => {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Suspense fallback={
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      }>
        <Canvas
          camera={{ position: [0, 0, 30], fov: 75 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Particles
            particleCount={particleCount}
            speed={speed}
            size={size}
            color={color}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}

export default HeroBackground