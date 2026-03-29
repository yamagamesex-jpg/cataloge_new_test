import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Clock, TrendingUp, Filter } from 'lucide-react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'

interface SearchSuggestion {
  id: string
  text: string
  type: 'recent' | 'trending' | 'category'
  count?: number
}

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: (query: string) => void
  placeholder?: string
  suggestions?: SearchSuggestion[]
  recentSearches?: string[]
  trendingSearches?: string[]
  showFilters?: boolean
  onFilterToggle?: () => void
  className?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search products...',
  suggestions = [],
  recentSearches = [],
  trendingSearches = [],
  showFilters = false,
  onFilterToggle,
  className = ''
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Combine suggestions
  const allSuggestions: SearchSuggestion[] = [
    ...recentSearches.map(search => ({
      id: `recent-${search}`,
      text: search,
      type: 'recent' as const
    })),
    ...trendingSearches.map(search => ({
      id: `trending-${search}`,
      text: search,
      type: 'trending' as const,
      count: Math.floor(Math.random() * 1000) + 100 // Mock count
    })),
    ...suggestions
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange(newValue)
    setShowSuggestions(newValue.length > 0)
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    onChange(suggestion.text)
    onSearch(suggestion.text)
    setShowSuggestions(false)
    inputRef.current?.blur()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(value)
      setShowSuggestions(false)
      inputRef.current?.blur()
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
      inputRef.current?.blur()
    }
  }

  const clearSearch = () => {
    onChange('')
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  const getSuggestionIcon = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'recent':
        return <Clock className="h-4 w-4 text-muted-foreground" />
      case 'trending':
        return <TrendingUp className="h-4 w-4 text-orange-500" />
      case 'category':
        return <Filter className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleInputChange}
            onFocus={() => {
              setShowSuggestions(value.length > 0)
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="pl-10 pr-20 h-12 text-lg bg-background/80 backdrop-blur-sm border-2 focus:border-primary transition-all duration-300"
          />

          {/* Clear Button */}
          {value && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-12 h-8 w-8 p-0 hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </Button>
          )}

          {/* Filter Toggle */}
          {showFilters && onFilterToggle && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onFilterToggle}
              className="absolute right-2 h-8 w-8 p-0 hover:bg-muted"
            >
              <Filter className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && allSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-md border border-border rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto"
          >
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="p-2">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-2 py-1">
                  Recent Searches
                </div>
                {recentSearches.slice(0, 3).map((search) => (
                  <button
                    key={`recent-${search}`}
                    onClick={() => handleSuggestionClick({
                      id: `recent-${search}`,
                      text: search,
                      type: 'recent'
                    })}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-muted/50 rounded-md transition-colors"
                  >
                    <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="truncate">{search}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Trending Searches */}
            {trendingSearches.length > 0 && (
              <div className="p-2 border-t border-border">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-2 py-1">
                  Trending
                </div>
                {trendingSearches.slice(0, 3).map((search) => (
                  <button
                    key={`trending-${search}`}
                    onClick={() => handleSuggestionClick({
                      id: `trending-${search}`,
                      text: search,
                      type: 'trending'
                    })}
                    className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-muted/50 rounded-md transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="h-4 w-4 text-orange-500 flex-shrink-0" />
                      <span className="truncate">{search}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {Math.floor(Math.random() * 1000) + 100}
                    </Badge>
                  </button>
                ))}
              </div>
            )}

            {/* Other Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-2 border-t border-border">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-2 py-1">
                  Suggestions
                </div>
                {suggestions.slice(0, 5).map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-muted/50 rounded-md transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      {getSuggestionIcon(suggestion.type)}
                      <span className="truncate">{suggestion.text}</span>
                    </div>
                    {suggestion.count && (
                      <Badge variant="outline" className="text-xs">
                        {suggestion.count}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchBar