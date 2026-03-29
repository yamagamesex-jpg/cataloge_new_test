import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useMousePosition } from '../../hooks/useMousePosition'

interface GlowButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  glowColor?: string
  disabled?: boolean
  loading?: boolean
}

export const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  glowColor = 'rgba(59, 130, 246, 0.5)', // blue-500
  disabled = false,
  loading = false
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const { mouseX, mouseY, ref } = useMousePosition<HTMLButtonElement>()

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-border bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground'
  }

  const baseClasses = `
    relative overflow-hidden rounded-lg font-medium transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `

  return (
    <motion.button
      ref={ref}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled || loading}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          background: `radial-gradient(circle at ${mouseX * 100}% ${mouseY * 100}%, ${glowColor}, transparent 70%)`,
          filter: 'blur(15px)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.4 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Ripple Effect */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          background: `radial-gradient(circle at ${mouseX * 100}% ${mouseY * 100}%, rgba(255, 255, 255, 0.1), transparent 50%)`
        }}
        initial={{ opacity: 0, scale: 0 }}
        whileHover={{ opacity: 1, scale: 2 }}
        transition={{ duration: 0.3 }}
      />

      {/* Border Glow */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          boxShadow: `inset 0 0 0 1px ${glowColor}40`
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        )}
        <span>{children}</span>
      </span>
    </motion.button>
  )
}

export default GlowButton