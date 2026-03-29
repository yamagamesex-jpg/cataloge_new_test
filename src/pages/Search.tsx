import React, { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Filter, X, TrendingUp, Clock } from 'lucide-react'
import { ProductGrid } from '../components/catalog/ProductGrid'
import { SearchBar } from '../components/catalog/SearchBar'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { products, categories } from '../data'
import { useCart } from '../context/CartContext'
import { useUI } from '../context/UIContext'
import type { Product } from '../types'

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { addToCart } = useCart()
  const { isMobile } = useUI()

  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [results, setResults] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [trendingSearches] = useState<string[]>([
    'wireless headphones',
    'smart watch',
    'laptop stand',
    'phone case',
    'bluetooth speaker'
  ])

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  // Save search to recent searches
  const saveRecentSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return

    const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem('recentSearches', JSON.stringify(updated))
  }

  // Perform search
  const performSearch = async (searchQuery: string) => {
    setIsLoading(true)
    setQuery(searchQuery)

    // Update URL
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    setSearchParams(params)

    if (!searchQuery.trim()) {
      setResults([])
      setIsLoading(false)
      return
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))

    const searchResults = products.filter(product => {
      const searchTerm = searchQuery.toLowerCase()
      return (
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.brand?.toLowerCase().includes(searchTerm) ||
        product.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        product.categoryIds.some(catId => {
          const category = categories.find(c => c.id === catId)
          return category?.name.toLowerCase().includes(searchTerm)
        })
      )
    })

    setResults(searchResults)
    setIsLoading(false)
    saveRecentSearch(searchQuery)
  }

  // Initial search on mount if query exists
  useEffect(() => {
    const initialQuery = searchParams.get('q')
    if (initialQuery) {
      performSearch(initialQuery)
    }
  }, [])

  // Get search suggestions
  const suggestions = useMemo(() => {
    if (!query) return []

    const queryLower = query.toLowerCase()
    const productSuggestions = products
      .filter(product =>
        product.name.toLowerCase().includes(queryLower) ||
        product.brand?.toLowerCase().includes(queryLower)
      )
      .slice(0, 3)
      .map(product => ({
        id: `product-${product.id}`,
        text: product.name,
        type: 'category' as const
      }))

    const categorySuggestions = categories
      .filter(category => category.name.toLowerCase().includes(queryLower))
      .slice(0, 2)
      .map(category => ({
        id: `category-${category.id}`,
        text: category.name,
        type: 'category' as const
      }))

    return [...productSuggestions, ...categorySuggestions]
  }, [query])

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setSearchParams({})
  }

  const removeRecentSearch = (searchTerm: string) => {
    const updated = recentSearches.filter(s => s !== searchTerm)
    setRecentSearches(updated)
    localStorage.setItem('recentSearches', JSON.stringify(updated))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Search Products</h1>
          <p className="text-xl text-muted-foreground">
            Find exactly what you're looking for in our catalog
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            value={query}
            onChange={setQuery}
            onSearch={performSearch}
            placeholder="Search for products, brands, or categories..."
            suggestions={suggestions}
            recentSearches={recentSearches}
            trendingSearches={trendingSearches}
          />
        </div>

        {/* Search Results */}
        {query && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold">
                  {isLoading ? 'Searching...' : `Search Results for "${query}"`}
                </h2>
                {!isLoading && (
                  <p className="text-muted-foreground">
                    Found {results.length} product{results.length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
              {query && (
                <Button variant="outline" onClick={clearSearch}>
                  <X className="h-4 w-4 mr-2" />
                  Clear Search
                </Button>
              )}
            </div>

            {isLoading ? (
              <div className="flex justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : results.length > 0 ? (
              <ProductGrid
                products={results}
                onAddToCart={addToCart}
                viewMode="grid"
              />
            ) : (
              <div className="text-center py-16">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search terms or browse our categories
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {trendingSearches.slice(0, 3).map((trending) => (
                    <Button
                      key={trending}
                      variant="outline"
                      onClick={() => performSearch(trending)}
                    >
                      {trending}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Recent Searches */}
        {!query && recentSearches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Recent Searches</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search) => (
                <Badge
                  key={search}
                  variant="secondary"
                  className="cursor-pointer hover:bg-muted px-3 py-1"
                  onClick={() => performSearch(search)}
                >
                  {search}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeRecentSearch(search)
                    }}
                    className="ml-2 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </motion.div>
        )}

        {/* Trending Searches */}
        {!query && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-semibold">Trending Searches</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trendingSearches.map((trending, index) => (
                <Card
                  key={trending}
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => performSearch(trending)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{trending}</span>
                    <Badge variant="outline" className="text-xs">
                      {(Math.floor(Math.random() * 1000) + 100).toLocaleString()} searches
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Popular Categories */}
        {!query && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.slice(0, 8).map((category) => (
                <Card
                  key={category.id}
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => performSearch(category.name)}
                >
                  <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-2xl">📦</span>
                  </div>
                  <h4 className="font-medium text-center">{category.name}</h4>
                  <p className="text-sm text-muted-foreground text-center mt-1">
                    {category.description}
                  </p>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default SearchPage