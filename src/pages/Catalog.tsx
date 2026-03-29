import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { Filter, Grid, List, SortAsc, Search } from 'lucide-react'
import { ProductGrid } from '../components/catalog/ProductGrid'
import { ProductFilters } from '../components/catalog/ProductFilters'
import { SearchBar } from '../components/catalog/SearchBar'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { products, categories } from '../data'
import { useCart } from '../context/CartContext'
import { useUI } from '../context/UIContext'
import type { Product, Category } from '../types'

const Catalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { addToCart } = useCart()
  const { isMobile } = useUI()

  // State
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || ''
  )
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'rating' | 'newest'>('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(!isMobile)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [inStockOnly, setInStockOnly] = useState(false)

  // Get unique brands from products
  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(products.map(p => p.brand).filter(Boolean))]
    return uniqueBrands
  }, [])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.brand?.toLowerCase().includes(query) ||
          product.tags?.some(tag => tag.toLowerCase().includes(query))

        if (!matchesSearch) return false
      }

      // Category filter
      if (selectedCategory) {
        if (!product.categoryIds.includes(selectedCategory)) return false
      }

      // Price range filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false
      }

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand || '')) {
        return false
      }

      // Rating filter
      if (selectedRatings.length > 0 && !selectedRatings.includes(Math.floor(product.rating))) {
        return false
      }

      // Stock filter
      if (inStockOnly && product.stock <= 0) {
        return false
      }

      return true
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [products, searchQuery, selectedCategory, priceRange, selectedBrands, selectedRatings, inStockOnly, sortBy])

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    if (selectedCategory) params.set('category', selectedCategory)
    setSearchParams(params)
  }, [searchQuery, selectedCategory, setSearchParams])

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  // Handle filter changes
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? '' : categoryId)
  }

  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range)
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    setSelectedBrands(prev =>
      checked
        ? [...prev, brand]
        : prev.filter(b => b !== brand)
    )
  }

  const handleRatingChange = (rating: number, checked: boolean) => {
    setSelectedRatings(prev =>
      checked
        ? [...prev, rating]
        : prev.filter(r => r !== rating)
    )
  }

  const handleInStockChange = (checked: boolean) => {
    setInStockOnly(checked)
  }

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setPriceRange([0, 10000])
    setSelectedBrands([])
    setSelectedRatings([])
    setInStockOnly(false)
    setSortBy('name')
  }

  const activeFiltersCount =
    (selectedCategory ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 10000 ? 1 : 0) +
    selectedBrands.length +
    selectedRatings.length +
    (inStockOnly ? 1 : 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">Catalog</h1>
              <p className="text-muted-foreground">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onSearch={handleSearch}
                placeholder="Search products..."
                showFilters={true}
                onFilterToggle={() => setShowFilters(!showFilters)}
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <SortAsc className="h-4 w-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center space-x-2 mt-4">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedCategory && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCategory('')}>
                  {categories.find(c => c.id === selectedCategory)?.name} ×
                </Badge>
              )}
              {(priceRange[0] > 0 || priceRange[1] < 10000) && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setPriceRange([0, 10000])}>
                  ${priceRange[0]} - ${priceRange[1]} ×
                </Badge>
              )}
              {selectedBrands.map(brand => (
                <Badge key={brand} variant="secondary" className="cursor-pointer" onClick={() => handleBrandChange(brand, false)}>
                  {brand} ×
                </Badge>
              ))}
              {selectedRatings.map(rating => (
                <Badge key={rating} variant="secondary" className="cursor-pointer" onClick={() => handleRatingChange(rating, false)}>
                  {rating}+ stars ×
                </Badge>
              ))}
              {inStockOnly && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setInStockOnly(false)}>
                  In Stock ×
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear all
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 300, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="flex-shrink-0"
              >
                <ProductFilters
                  categories={categories}
                  brands={brands}
                  selectedCategory={selectedCategory}
                  priceRange={priceRange}
                  selectedBrands={selectedBrands}
                  selectedRatings={selectedRatings}
                  inStockOnly={inStockOnly}
                  onCategoryChange={handleCategoryChange}
                  onPriceRangeChange={handlePriceRangeChange}
                  onBrandChange={handleBrandChange}
                  onRatingChange={handleRatingChange}
                  onInStockChange={handleInStockChange}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <ProductGrid
                products={filteredProducts}
                onAddToCart={addToCart}
                viewMode={viewMode}
              />
            ) : (
              <div className="text-center py-16">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search criteria or filters
                </p>
                <Button onClick={clearAllFilters}>Clear all filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Catalog