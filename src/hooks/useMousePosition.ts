import { useEffect, useState, useRef } from 'react'

interface MousePosition {
  mouseX: number
  mouseY: number
}

export const useMousePosition = <T extends HTMLElement = HTMLElement>() => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ mouseX: 0, mouseY: 0 })
  const ref = useRef<T>(null)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        setMousePosition({
          mouseX: e.clientX - rect.left,
          mouseY: e.clientY - rect.top
        })
      }
    }

    const element = ref.current
    if (element) {
      element.addEventListener('mousemove', updateMousePosition)
      return () => {
        element.removeEventListener('mousemove', updateMousePosition)
      }
    }
  }, [])

  return { mouseX: mousePosition.mouseX, mouseY: mousePosition.mouseY, ref }
}

export const useMousePositionNormalized = () => {
  const [normalizedPosition, setNormalizedPosition] = useState<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const updateNormalizedPosition = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setNormalizedPosition({ x, y })
    }

    window.addEventListener('mousemove', updateNormalizedPosition)

    return () => {
      window.removeEventListener('mousemove', updateNormalizedPosition)
    }
  }, [])

  return normalizedPosition
}

export const useMouseVelocity = () => {
  const [velocity, setVelocity] = useState<MousePosition>({ x: 0, y: 0 })
  const [lastPosition, setLastPosition] = useState<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    let animationFrame: number

    const updateVelocity = (e: MouseEvent) => {
      const currentPosition = { x: e.clientX, y: e.clientY }
      const deltaX = currentPosition.x - lastPosition.x
      const deltaY = currentPosition.y - lastPosition.y

      // Smooth velocity calculation
      setVelocity(prev => ({
        x: prev.x * 0.8 + deltaX * 0.2,
        y: prev.y * 0.8 + deltaY * 0.2
      }))

      setLastPosition(currentPosition)
    }

    const animate = () => {
      // Gradually reduce velocity when mouse stops moving
      setVelocity(prev => ({
        x: prev.x * 0.95,
        y: prev.y * 0.95
      }))
      animationFrame = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', updateVelocity)
    animate()

    return () => {
      window.removeEventListener('mousemove', updateVelocity)
      cancelAnimationFrame(animationFrame)
    }
  }, [lastPosition.x, lastPosition.y])

  return velocity
}

export const useHoverState = () => {
  const [isHovered, setIsHovered] = useState(false)

  const hoverProps = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false)
  }

  return { isHovered, hoverProps }
}

export const useMouseTrail = (trailLength: number = 10) => {
  const [trail, setTrail] = useState<MousePosition[]>([])

  useEffect(() => {
    const updateTrail = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY }
      setTrail(prev => {
        const newTrail = [newPosition, ...prev.slice(0, trailLength - 1)]
        return newTrail
      })
    }

    window.addEventListener('mousemove', updateTrail)

    return () => {
      window.removeEventListener('mousemove', updateTrail)
    }
  }, [trailLength])

  return trail
}