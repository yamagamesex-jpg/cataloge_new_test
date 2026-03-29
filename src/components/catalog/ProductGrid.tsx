import React from 'react'
import { motion } from 'framer-motion'
import { Product } from '../../types'
import { ProductCard } from './ProductCard'
import { cn } from '../../utils'

interface ProductGridProps {
  products: Product[]
  loading?: boolean
  onQuickView?: (productId: string) => void
  className?: string
  columns?: 2 | 3 | 4 | 5 | 6
  animate?: boolean
}

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  onQuickView,
  className,
  columns = 4,
  animate = true
}) => {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6'
  }

  if (loading) {
    return (
      <div className={cn('grid gap-6', gridCols[columns], className)}>
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={index}
            className="animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="bg-muted rounded-xl aspect-square mb-4"></div>
            <div className="space-y-2">
              <div className="bg-muted h-4 rounded w-3/4"></div>
              <div className="bg-muted h-4 rounded w-1/2"></div>
              <div className="bg-muted h-6 rounded w-1/4"></div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No products found
        </h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search terms.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={cn('grid gap-6', gridCols[columns], className)}
      variants={animate ? gridVariants : {}}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          variants={animate ? itemVariants : {}}
          layout
        >
          <ProductCard
            product={product}
            onQuickView={onQuickView}
            animate={animate}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default ProductGrid