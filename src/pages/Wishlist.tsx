import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Trash2, ArrowLeft, Grid, List } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { useCart } from '../context/CartContext'
import { useUI } from '../context/UIContext'
import { products } from '../data'
import type { Product } from '../types'

const Wishlist: React.FC = () => {
  const { addToCart } = useCart()
  const { addToast } = useUI()
  const [wishlistItems, setWishlistItems] = useState<Product[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Load wishlist from localStorage (in a real app, this would come from an API)
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      const wishlistIds = JSON.parse(savedWishlist)
      const wishlistProducts = products.filter(product => wishlistIds.includes(product.id))
      setWishlistItems(wishlistProducts)
    }
  }, [])

  const toggleWishlist = (productId: string) => {
    const savedWishlist = localStorage.getItem('wishlist') || '[]'
    const wishlistIds = JSON.parse(savedWishlist)

    const isInWishlist = wishlistIds.includes(productId)
    const newWishlistIds = isInWishlist
      ? wishlistIds.filter((id: string) => id !== productId)
      : [...wishlistIds, productId]

    localStorage.setItem('wishlist', JSON.stringify(newWishlistIds))

    setWishlistItems(prev =>
      isInWishlist
        ? prev.filter(item => item.id !== productId)
        : [...prev, products.find(p => p.id === productId)!].filter(Boolean)
    )

    addToast({
      title: isInWishlist ? 'Removed from wishlist' : 'Added to wishlist',
      description: `Item has been ${isInWishlist ? 'removed from' : 'added to'} your wishlist.`,
      type: isInWishlist ? 'info' : 'success'
    })
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1)
    addToast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
      type: 'success'
    })
  }

  const clearWishlist = () => {
    localStorage.removeItem('wishlist')
    setWishlistItems([])
    addToast({
      title: 'Wishlist cleared',
      description: 'All items have been removed from your wishlist.',
      type: 'info'
    })
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto px-4">
          <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-8">
            Save items you love for later. Start browsing our catalog to add some favorites!
          </p>
          <Link to="/catalog">
            <Button size="lg" className="w-full">
              Browse Catalog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/catalog">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <Heart className="h-8 w-8 mr-3 text-red-500" />
                My Wishlist
              </h1>
              <p className="text-muted-foreground">
                {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 border border-border rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-8 w-8 p-0"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <Button variant="outline" onClick={clearWishlist} className="text-red-500 hover:text-red-600">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Wishlist
            </Button>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className={
          viewMode === 'grid'
            ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }>
          {wishlistItems.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {viewMode === 'grid' ? (
                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    <Link to={`/product/${product.id}`}>
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                    >
                      <Heart className="h-5 w-5 text-red-500 fill-current" />
                    </button>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col space-y-1">
                      {product.isNew && <Badge variant="secondary" className="text-xs">New</Badge>}
                      {product.isOnSale && <Badge variant="destructive" className="text-xs">Sale</Badge>}
                      {product.isBestseller && <Badge variant="secondary" className="text-xs">Bestseller</Badge>}
                    </div>
                  </div>

                  <div className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-primary">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 h-4 ${
                                i < Math.floor(product.rating)
                                  ? 'bg-yellow-400'
                                  : 'bg-muted'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {product.rating}
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full"
                      size="sm"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex space-x-4">
                    <Link to={`/product/${product.id}`} className="flex-shrink-0">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-lg hover:opacity-80 transition-opacity"
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <Link to={`/product/${product.id}`}>
                            <h3 className="font-semibold mb-1 line-clamp-2 hover:text-primary transition-colors">
                              {product.name}
                            </h3>
                          </Link>

                          <div className="flex items-center space-x-4 mb-2">
                            <span className="text-lg font-bold text-primary">
                              ${product.price.toFixed(2)}
                            </span>
                            <div className="flex items-center space-x-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-1 h-3 ${
                                      i < Math.floor(product.rating)
                                        ? 'bg-yellow-400'
                                        : 'bg-muted'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {product.rating}
                              </span>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {product.description}
                          </p>
                        </div>

                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="p-2 rounded-full hover:bg-muted transition-colors ml-4"
                        >
                          <Heart className="h-5 w-5 text-red-500 fill-current" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {product.isNew && <Badge variant="secondary" className="text-xs">New</Badge>}
                          {product.isOnSale && <Badge variant="destructive" className="text-xs">Sale</Badge>}
                          {product.isBestseller && <Badge variant="secondary" className="text-xs">Bestseller</Badge>}
                        </div>

                        <Button
                          onClick={() => handleAddToCart(product)}
                          size="sm"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </motion.div>
          ))}
        </div>

        {/* Add to Cart All Button */}
        {wishlistItems.length > 0 && (
          <div className="mt-12 text-center">
            <Button
              size="lg"
              onClick={() => {
                wishlistItems.forEach(product => handleAddToCart(product))
                addToast({
                  title: 'All items added to cart',
                  description: `Added ${wishlistItems.length} items to your cart.`,
                  type: 'success'
                })
              }}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add All to Cart
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishlist