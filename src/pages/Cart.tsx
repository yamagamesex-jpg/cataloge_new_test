import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  CreditCard,
  Truck,
  Shield
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Input } from '../components/ui/Input'
import { useCart } from '../context/CartContext'
import { useUI } from '../context/UIContext'
import { products } from '../data'

const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal, getCartItemCount } = useCart()
  const { addToast } = useUI()

  const cartTotal = getCartTotal()
  const itemCount = getCartItemCount()
  const shipping = cartTotal > 50 ? 0 : 9.99
  const tax = cartTotal * 0.08 // 8% tax
  const finalTotal = cartTotal + shipping + tax

  const handleQuantityChange = (productId: string, variantId: string | undefined, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, variantId)
      addToast({
        title: 'Item removed',
        description: 'Item has been removed from your cart.',
        type: 'info'
      })
    } else {
      updateQuantity(productId, variantId, newQuantity)
    }
  }

  const handleRemoveItem = (productId: string, variantId: string | undefined) => {
    removeFromCart(productId, variantId)
    addToast({
      title: 'Item removed',
      description: 'Item has been removed from your cart.',
      type: 'info'
    })
  }

  const handleClearCart = () => {
    clearCart()
    addToast({
      title: 'Cart cleared',
      description: 'All items have been removed from your cart.',
      type: 'info'
    })
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto px-4">
          <ShoppingCart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any items to your cart yet.
            Start shopping to fill it up!
          </p>
          <Link to="/catalog">
            <Button size="lg" className="w-full">
              Start Shopping
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
              <h1 className="text-3xl font-bold">Shopping Cart</h1>
              <p className="text-muted-foreground">
                {itemCount} item{itemCount !== 1 ? 's' : ''} in your cart
              </p>
            </div>
          </div>

          {cartItems.length > 0 && (
            <Button variant="outline" onClick={handleClearCart} className="text-red-500 hover:text-red-600">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const product = products.find(p => p.id === item.productId)
              if (!product) return null

              const variant = item.variantId ? product.variants?.find(v => v.id === item.variantId) : null
              const itemName = variant ? `${product.name} - ${variant.name}` : product.name
              const itemPrice = variant?.price || product.price
              const itemImage = product.images[0]

              return (
                <motion.div
                  key={`${item.productId}-${item.variantId}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <div className="flex space-x-4">
                    {/* Product Image */}
                    <Link to={`/product/${product.id}`} className="flex-shrink-0">
                      <img
                        src={itemImage}
                        alt={itemName}
                        className="w-24 h-24 object-cover rounded-lg hover:opacity-80 transition-opacity"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="text-lg font-semibold hover:text-primary transition-colors line-clamp-2">
                          {itemName}
                        </h3>
                      </Link>

                      <div className="flex items-center space-x-2 mt-1">
                        {product.brand && (
                          <Badge variant="outline" className="text-xs">
                            {product.brand}
                          </Badge>
                        )}
                        {product.isOnSale && (
                          <Badge variant="destructive" className="text-xs">
                            Sale
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-border rounded-lg">
                            <button
                              onClick={() => handleQuantityChange(item.productId, item.variantId, item.quantity - 1)}
                              className="p-2 hover:bg-muted transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-3 py-2 font-medium min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.productId, item.variantId, item.quantity + 1)}
                              className="p-2 hover:bg-muted transition-colors"
                              disabled={item.quantity >= (variant?.stock || product.stock)}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-lg font-semibold">
                            ${(itemPrice * item.quantity).toFixed(2)}
                          </div>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.productId, item.variantId)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Order Summary Card */}
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {cartTotal < 50 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-blue-800">
                    Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}

              <Button className="w-full mb-4" size="lg">
                <CreditCard className="h-5 w-5 mr-2" />
                Proceed to Checkout
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                <p>Secure checkout powered by Stripe</p>
              </div>
            </Card>

            {/* Shipping Info */}
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Truck className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Free Shipping</h3>
                    <p className="text-sm text-muted-foreground">
                      On orders over $50. Standard delivery in 3-5 business days.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Secure Payment</h3>
                    <p className="text-sm text-muted-foreground">
                      Your payment information is encrypted and secure.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Promo Code */}
            <Card className="p-6">
              <h3 className="font-medium mb-3">Promo Code</h3>
              <div className="flex space-x-2">
                <Input placeholder="Enter promo code" className="flex-1" />
                <Button variant="outline">Apply</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart