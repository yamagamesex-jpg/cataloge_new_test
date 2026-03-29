import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

interface RevealSectionProps {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  delay?: number
  duration?: number
  distance?: number
  once?: boolean
  threshold?: number
}

export const RevealSection: React.FC<RevealSectionProps> = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 50,
  once = true
}) => {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once })
  const [hasAnimated, setHasAnimated] = useState(false)

  // Define animation variants based on direction
  const getVariants = () => {
    const baseVariants = {
      hidden: {
        opacity: 0,
        x: 0,
        y: 0,
        transition: { duration, delay }
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration, delay }
      }
    }

    switch (direction) {
      case 'up':
        baseVariants.hidden.y = distance
        baseVariants.visible.y = 0
        break
      case 'down':
        baseVariants.hidden.y = -distance
        baseVariants.visible.y = 0
        break
      case 'left':
        baseVariants.hidden.x = distance
        baseVariants.visible.x = 0
        break
      case 'right':
        baseVariants.hidden.x = -distance
        baseVariants.visible.x = 0
        break
      case 'fade':
      default:
        // Only opacity animation
        break
    }

    return baseVariants
  }

  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start('visible')
      setHasAnimated(true)
    } else if (!once && !isInView && hasAnimated) {
      controls.start('hidden')
      setHasAnimated(false)
    }
  }, [isInView, controls, hasAnimated, once])

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={getVariants()}
    >
      {children}
    </motion.div>
  )
}

export default RevealSection