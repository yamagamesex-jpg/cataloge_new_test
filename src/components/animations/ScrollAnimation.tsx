import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, ScrollOffset } from 'framer-motion'

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  type?: 'fade' | 'slide' | 'scale' | 'rotate' | 'parallax'
  direction?: 'up' | 'down' | 'left' | 'right'
  speed?: number
  offset?: ScrollOffset
  spring?: boolean
  springConfig?: {
    stiffness: number
    damping: number
    mass: number
  }
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  className = '',
  type = 'fade',
  direction = 'up',
  speed = 1,
  offset = ['start end', 'end start'],
  spring = false,
  springConfig = { stiffness: 100, damping: 30, mass: 1 }
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset
  })

  // Create transforms based on type
  const getTransform = () => {
    const progress = spring ? useSpring(scrollYProgress, springConfig) : scrollYProgress

    switch (type) {
      case 'fade':
        return {
          opacity: useTransform(progress, [0, 1], [0, 1])
        }
      case 'slide':
        const slideValue = speed * 100
        switch (direction) {
          case 'up':
            return {
              y: useTransform(progress, [0, 1], [slideValue, 0]),
              opacity: useTransform(progress, [0, 1], [0, 1])
            }
          case 'down':
            return {
              y: useTransform(progress, [0, 1], [-slideValue, 0]),
              opacity: useTransform(progress, [0, 1], [0, 1])
            }
          case 'left':
            return {
              x: useTransform(progress, [0, 1], [slideValue, 0]),
              opacity: useTransform(progress, [0, 1], [0, 1])
            }
          case 'right':
            return {
              x: useTransform(progress, [0, 1], [-slideValue, 0]),
              opacity: useTransform(progress, [0, 1], [0, 1])
            }
          default:
            return {
              y: useTransform(progress, [0, 1], [slideValue, 0]),
              opacity: useTransform(progress, [0, 1], [0, 1])
            }
        }
      case 'scale':
        return {
          scale: useTransform(progress, [0, 1], [0.8, 1]),
          opacity: useTransform(progress, [0, 1], [0, 1])
        }
      case 'rotate':
        return {
          rotate: useTransform(progress, [0, 1], [speed * 10, 0]),
          opacity: useTransform(progress, [0, 1], [0, 1])
        }
      case 'parallax':
        return {
          y: useTransform(progress, [0, 1], [speed * 50, 0])
        }
      default:
        return {
          opacity: useTransform(progress, [0, 1], [0, 1])
        }
    }
  }

  const transform = getTransform()

  return (
    <motion.div
      ref={ref}
      className={className}
      style={transform}
    >
      {children}
    </motion.div>
  )
}

export default ScrollAnimation