import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Home, ShoppingBag, Heart, User, Settings, LogOut } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../utils'
import { Button } from '../ui/Button'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

const sidebarItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Catalog', path: '/catalog', icon: ShoppingBag },
  { name: 'Wishlist', path: '/wishlist', icon: Heart },
  { name: 'Profile', path: '/profile', icon: User },
  { name: 'Settings', path: '/settings', icon: Settings },
]

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  className
}) => {
  const location = useLocation()

  const sidebarVariants = {
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    }
  }

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className={cn(
              'fixed top-0 left-0 z-50 h-full w-80 glass-card border-r border-border',
              className
            )}
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  FutureStore
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-6">
              <ul className="space-y-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.path

                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={onClose}
                        className={cn(
                          'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-lg'
                            : 'hover:bg-accent hover:text-accent-foreground'
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.name}</span>
                        {isActive && (
                          <motion.div
                            className="ml-auto w-2 h-2 bg-primary-foreground rounded-full"
                            layoutId="sidebar-indicator"
                          />
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>

              {/* Quick Actions */}
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    View Cart
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Heart className="h-4 w-4 mr-2" />
                    My Wishlist
                  </Button>
                </div>
              </div>

              {/* User Section */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">John Doe</p>
                    <p className="text-sm text-muted-foreground">john@example.com</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                © 2024 FutureStore. All rights reserved.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Sidebar