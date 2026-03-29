import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  ChevronRight,
  Minus,
  Plus,
  Check
} from 'lucide-react'
import { ProductGallery } from '../components/catalog/ProductGallery'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs'
import { products, categories } from '../data'
import { useCart } from '../context/CartContext'
import { useUI } from '../context/UIContext'
import type { Product } from '../types'

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { addToCart, cartItems } = useCart()
  const { addToast } = useUI()

  const [product, setProduct] = useState<Product | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p.id === id)
      setProduct(foundProduct || null)
      if (foundProduct?.variants && foundProduct.variants.length > 0) {
        setSelectedVariant(foundProduct.variants[0].id)
      }
    }
  }, [id])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/catalog">
            <Button>Back to Catalog</Button>
          </Link>
        </div>
      </div>
    )
  }

  const selectedVariantData = product.variants?.find(v => v.id === selectedVariant)
  const currentPrice = selectedVariantData?.price || product.price
  const originalPrice = selectedVariantData?.originalPrice || product.originalPrice
  const discount = originalPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0

  const isInCart = cartItems.some(item => item.productId === product.id && item.variantId === selectedVariant)
  const cartItem = cartItems.find(item => item.productId === product.id && item.variantId === selectedVariant)

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant)
    addToast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
      type: 'success'
    })
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (selectedVariantData?.stock || product.stock)) {
      setQuantity(newQuantity)
    }
  }

  const relatedProducts = products
    .filter(p => p.id !== product.id && p.categoryIds.some(catId => product.categoryIds.includes(catId)))
    .slice(0, 4)

  const category = categories.find(c => product.categoryIds.includes(c.id))

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/catalog" className="hover:text-foreground">Catalog</Link>
          {category && (
            <>
              <ChevronRight className="h-4 w-4" />
              <Link to={`/catalog?category=${category.id}`} className="hover:text-foreground">
                {category.name}
              </Link>
            </>
          )}
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Gallery */}
          <div>
            <ProductGallery
              images={product.images}
              alt={product.name}
              className="mb-4"
            />

            {/* Product Badges */}
            <div className="flex flex-wrap gap-2">
              {product.isNew && <Badge variant="secondary">New</Badge>}
              {product.isBestseller && <Badge variant="secondary">Bestseller</Badge>}
              {product.isOnSale && <Badge variant="destructive">On Sale</Badge>}
              {discount > 0 && <Badge variant="destructive">-{discount}%</Badge>}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
                {product.brand && (
                  <Badge variant="outline">{product.brand}</Badge>
                )}
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-primary">
                  ${currentPrice.toFixed(2)}
                </span>
                {originalPrice && originalPrice > currentPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Options</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant.id)}
                      className={`p-3 border rounded-lg text-left transition-all ${
                        selectedVariant === variant.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="font-medium">{variant.name}</div>
                      <div className="text-sm text-muted-foreground">
                        ${variant.price.toFixed(2)}
                        {variant.stock <= 5 && variant.stock > 0 && (
                          <span className="text-orange-500 ml-2">
                            Only {variant.stock} left
                          </span>
                        )}
                        {variant.stock === 0 && (
                          <span className="text-red-500 ml-2">Out of stock</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="p-3 hover:bg-muted transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-3 font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="p-3 hover:bg-muted transition-colors"
                    disabled={quantity >= (selectedVariantData?.stock || product.stock)}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <div className="text-sm text-muted-foreground">
                  {selectedVariantData?.stock || product.stock} in stock
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={(selectedVariantData?.stock || product.stock) === 0}
                  className="flex-1"
                  size="lg"
                >
                  {isInCart ? (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      Added to Cart ({cartItem?.quantity || 0})
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={isWishlisted ? 'text-red-500 border-red-500' : ''}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </Button>

                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-green-500" />
                <div>
                  <div className="font-medium">Free Shipping</div>
                  <div className="text-sm text-muted-foreground">On orders over $50</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="font-medium">2 Year Warranty</div>
                  <div className="text-sm text-muted-foreground">Full coverage</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-5 w-5 text-purple-500" />
                <div>
                  <div className="font-medium">30-Day Returns</div>
                  <div className="text-sm text-muted-foreground">Easy returns</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-16">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card className="p-6">
              <div className="prose max-w-none">
                <p className="text-lg leading-relaxed">{product.description}</p>
                {product.longDescription && (
                  <div className="mt-6 space-y-4">
                    {product.longDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card className="p-6">
              {product.specifications ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-border last:border-b-0">
                      <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No specifications available.</p>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card className="p-6">
              <div className="text-center py-8">
                <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Reviews Coming Soon</h3>
                <p className="text-muted-foreground">
                  We're working on adding detailed customer reviews to help you make informed decisions.
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="shipping" className="mt-6">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Shipping Information</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Free shipping on orders over $50</li>
                    <li>• Standard shipping: 3-5 business days</li>
                    <li>• Express shipping: 1-2 business days ($9.99)</li>
                    <li>• International shipping available</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Return Policy</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 30-day return window</li>
                    <li>• Items must be unused and in original packaging</li>
                    <li>• Free return shipping for defective items</li>
                    <li>• Refund processed within 5-7 business days</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`}>
                  <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <img
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{relatedProduct.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          ${relatedProduct.price.toFixed(2)}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-muted-foreground">
                            {relatedProduct.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductPage