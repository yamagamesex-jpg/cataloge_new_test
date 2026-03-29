import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  ChevronUp,
  SlidersHorizontal
} from 'lucide-react'
import { cn } from '../../utils'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'

interface FilterOption {
  id: string
  label: string
  count?: number
}

interface PriceRange {
  min: number
  max: number
}

interface ProductFiltersProps {
  categories: FilterOption[]
  brands: FilterOption[]
  priceRange: PriceRange
  selectedCategories: string[]
  selectedBrands: string[]
  selectedPriceRange: PriceRange
  sortBy: string
  onCategoryChange: (categories: string[]) => void
  onBrandChange: (brands: string[]) => void
  onPriceRangeChange: (range: PriceRange) => void
  onSortChange: (sort: string) => void
  onClearFilters: () => void
  className?: string
  isMobile?: boolean
}

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
  { value: 'name', label: 'Name A-Z' }
]

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  brands,
  priceRange,
  selectedCategories,
  selectedBrands,
  selectedPriceRange,
  sortBy,
  onCategoryChange,
  onBrandChange,
  onPriceRangeChange,
  onSortChange,
  onClearFilters,
  className,
  isMobile = false
}) => {
  const [isExpanded, setIsExpanded] = useState(!isMobile)
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    brands: true,
    price: true
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId]
    onCategoryChange(newCategories)
  }

  const handleBrandToggle = (brandId: string) => {
    const newBrands = selectedBrands.includes(brandId)
      ? selectedBrands.filter(id => id !== brandId)
      : [...selectedBrands, brandId]
    onBrandChange(newBrands)
  }

  const activeFiltersCount =
    selectedCategories.length +
    selectedBrands.length +
    (selectedPriceRange.min !== priceRange.min || selectedPriceRange.max !== priceRange.max ? 1 : 0)

  return (
    <Card className={cn('p-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="h-5 w-5" />
          <h3 className="font-semibold text-lg">Filters</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount}
            </Badge>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          )}

          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Categories */}
            <div>
              <button
                onClick={() => toggleSection('categories')}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-sm font-medium text-foreground">Categories</span>
                {expandedSections.categories ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>

              <AnimatePresence>
                {expandedSections.categories && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-3 space-y-2"
                  >
                    {categories.map(category => (
                      <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => handleCategoryToggle(category.id)}
                          className="rounded border-border text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">{category.label}</span>
                        {category.count && (
                          <span className="text-xs text-muted-foreground">({category.count})</span>
                        )}
                      </label>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Brands */}
            <div>
              <button
                onClick={() => toggleSection('brands')}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-sm font-medium text-foreground">Brands</span>
                {expandedSections.brands ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>

              <AnimatePresence>
                {expandedSections.brands && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-3 space-y-2"
                  >
                    {brands.map(brand => (
                      <label key={brand.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand.id)}
                          onChange={() => handleBrandToggle(brand.id)}
                          className="rounded border-border text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">{brand.label}</span>
                        {brand.count && (
                          <span className="text-xs text-muted-foreground">({brand.count})</span>
                        )}
                      </label>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Price Range */}
            <div>
              <button
                onClick={() => toggleSection('price')}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-sm font-medium text-foreground">Price Range</span>
                {expandedSections.price ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>

              <AnimatePresence>
                {expandedSections.price && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-3 space-y-3"
                  >
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={selectedPriceRange.min || ''}
                        onChange={(e) => onPriceRangeChange({
                          ...selectedPriceRange,
                          min: Number(e.target.value) || 0
                        })}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={selectedPriceRange.max || ''}
                        onChange={(e) => onPriceRangeChange({
                          ...selectedPriceRange,
                          max: Number(e.target.value) || priceRange.max
                        })}
                        className="flex-1"
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ${priceRange.min} - ${priceRange.max}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

export default ProductFilters