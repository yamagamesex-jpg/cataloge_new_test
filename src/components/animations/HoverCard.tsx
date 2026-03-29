import React from 'react'
import { motion } from 'framer-motion'
import { useMousePosition } from '../../hooks/useMousePosition'

interface HoverCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  intensity?: 'low' | 'medium' | 'high'
  tilt?: boolean
  glow?: boolean
}

export const HoverCard: React.FC<HoverCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(59, 130, 246, 0.5)', // blue-500
  intensity = 'medium',
  tilt = true,
  glow = true
}) => {
  const { mouseX, mouseY, ref } = useMousePosition<HTMLDivElement>()

  const intensityValues = {
    low: 0.02,
    medium: 0.05,
    high: 0.08
  }

  const rotateX = tilt ? (mouseY - 0.5) * intensityValues[intensity] * 180 : 0
  const rotateY = tilt ? -(mouseX - 0.5) * intensityValues[intensity] * 180 : 0

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Glow Effect */}
      {glow && (
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0"
          style={{
            background: `radial-gradient(circle at ${mouseX * 100}% ${mouseY * 100}%, ${glowColor}, transparent 70%)`,
            filter: 'blur(20px)'
          }}
          whileHover={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Card Content */}
      <motion.div
        className="relative bg-background/80 backdrop-blur-sm border border-border rounded-lg p-6 h-full"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d'
        }}
        whileHover={{
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          borderColor: 'rgba(59, 130, 246, 0.3)'
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {/* Inner Glow */}
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0"
          style={{
            background: `linear-gradient(135deg, ${glowColor}10, transparent)`,
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default HoverCard