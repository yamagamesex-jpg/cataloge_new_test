import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Heart,
  ShoppingCart,
  Eye,
  Star,
  Zap,
  TrendingUp
} from 'lucide-react'
import { cn, formatPrice } from '../../utils'
import { useCart } from '../../hooks'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'

import { Product } from '../../types'

interface ProductCardProps {
  product: Product
  className?: string
  animate?: boolean
  showQuickView?: boolean
  onQuickView?: (productId: string) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
  animate = true,
  showQuickView = true,
  onQuickView
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onQuickView?.(product.id)
  }

  const discountPercentage = product.discount ||
    (product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0)

  return (
    <motion.div
      className={cn('group', className)}
      initial={animate ? { opacity: 0, y: 20 } : {}}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      whileHover={animate ? { y: -8 } : {}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden cursor-pointer h-full">
        <Link to={`/product/${product.id}`} className="block">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            <motion.img
              src={product.images[currentImageIndex] || '/placeholder-product.jpg'}
              alt={product.name}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isNew && (
                <Badge variant="success" className="shadow-lg">
                  <Zap className="w-3 h-3 mr-1" />
                  New
                </Badge>
              )}
              {product.isSale && discountPercentage > 0 && (
                <Badge variant="destructive" className="shadow-lg">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  -{discountPercentage}%
                </Badge>
              )}
            </div>

            {/* Wishlist Button */}
            <motion.button
              className={cn(
                'absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all duration-200',
                isWishlisted
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              )}
              onClick={handleWishlist}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart
                className={cn('w-4 h-4', isWishlisted && 'fill-current')}
              />
            </motion.button>

            {/* Quick View Button */}
            {showQuickView && (
              <motion.button
                className="absolute bottom-3 right-3 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
                onClick={handleQuickView}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Eye className="w-4 h-4" />
              </motion.button>
            )}

            {/* Image Navigation Dots */}
            {product.images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setCurrentImageIndex(index)
                    }}
                    className={cn(
                      'w-2 h-2 rounded-full transition-all duration-200',
                      index === currentImageIndex
                        ? 'bg-white'
                        : 'bg-white/50 hover:bg-white/75'
                    )}
                  />
                ))}
              </div>
            )}

            {/* Hover Overlay */}
            <motion.div
              className="absolute inset-0 bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Brand */}
            <p className="text-sm text-muted-foreground font-medium mb-1">
              {product.brand}
            </p>

            {/* Name */}
            <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center space-x-1 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-4 h-4',
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-foreground">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <Button
                size="sm"
                onClick={handleAddToCart}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                animate={false}
              >
                <ShoppingCart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Link>
      </Card>
    </motion.div>
  )
}

export default ProductCard