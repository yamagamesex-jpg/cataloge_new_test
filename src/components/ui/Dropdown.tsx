import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '../../utils'
import { Button } from './Button'

interface DropdownItem {
  label: string
  value: string
  icon?: React.ReactNode
  disabled?: boolean
}

interface DropdownProps {
  items: DropdownItem[]
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  className?: string
  disabled?: boolean
  animate?: boolean
}

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  value,
  placeholder = 'Select an option',
  onChange,
  className,
  disabled = false,
  animate = true
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectedItem = items.find(item => item.value === value)

  const handleSelect = (item: DropdownItem) => {
    if (!item.disabled) {
      onChange?.(item.value)
      setIsOpen(false)
    }
  }

  return (
    <div className={cn('relative', className)}>
      <Button
        variant="outline"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="w-full justify-between"
        animate={animate}
      >
        <span className="flex items-center gap-2">
          {selectedItem?.icon}
          {selectedItem?.label || placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-1 w-full rounded-md border border-border bg-background shadow-lg"
          >
            <div className="max-h-60 overflow-auto py-1">
              {items.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleSelect(item)}
                  disabled={item.disabled}
                  className={cn(
                    'flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground',
                    item.disabled && 'cursor-not-allowed opacity-50',
                    value === item.value && 'bg-accent text-accent-foreground'
                  )}
                >
                  {item.icon}
                  <span className="flex-1">{item.label}</span>
                  {value === item.value && <Check className="h-4 w-4" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

export default Dropdown