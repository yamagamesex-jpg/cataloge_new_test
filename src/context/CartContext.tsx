import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { CartState, CartItem, Product } from '../types'

interface CartContextType extends CartState {
  addItem: (product: Product, quantity?: number, variantId?: string) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  isInCart: (productId: string) => boolean
  getItemQuantity: (productId: string) => number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number; variantId?: string } }
  | { type: 'REMOVE_ITEM'; payload: { itemId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }

const CartContext = createContext<CartContextType | undefined>(undefined)

const calculateTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((total, item) => {
    const price = item.product.price
    return total + (price * item.quantity)
  }, 0)

  const discount = items.reduce((total, item) => {
    if (item.product.discount) {
      const discountAmount = (item.product.price * item.product.discount / 100) * item.quantity
      return total + discountAmount
    }
    return total
  }, 0)

  const tax = (subtotal - discount) * 0.08 // 8% tax
  const shipping = subtotal > 100 ? 0 : 9.99 // Free shipping over $100

  return {
    total: subtotal - discount + tax + shipping,
    itemCount: items.reduce((count, item) => count + item.quantity, 0),
    discount,
    tax,
    shipping
  }
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity, variantId } = action.payload
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === product.id &&
        (!variantId || item.variant?.id === variantId)
      )

      let newItems: CartItem[]

      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${variantId || 'default'}-${Date.now()}`,
          product,
          quantity,
          variant: variantId ? product.variants?.find(v => v.id === variantId) : undefined,
          addedAt: new Date()
        }
        newItems = [...state.items, newItem]
      }

      const totals = calculateTotals(newItems)
      return {
        ...state,
        items: newItems,
        ...totals
      }
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload.itemId)
      const totals = calculateTotals(newItems)
      return {
        ...state,
        items: newItems,
        ...totals
      }
    }

    case 'UPDATE_QUANTITY': {
      const { itemId, quantity } = action.payload
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { itemId } })
      }

      const newItems = state.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
      const totals = calculateTotals(newItems)
      return {
        ...state,
        items: newItems,
        ...totals
      }
    }

    case 'CLEAR_CART': {
      return {
        items: [],
        total: 0,
        itemCount: 0,
        discount: 0,
        tax: 0,
        shipping: 0
      }
    }

    case 'LOAD_CART': {
      const totals = calculateTotals(action.payload)
      return {
        ...state,
        items: action.payload,
        ...totals
      }
    }

    default:
      return state
  }
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  discount: 0,
  tax: 0,
  shipping: 0
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

interface CartProviderProps {
  children: React.ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart-items')
    if (savedCart) {
      try {
        const items: CartItem[] = JSON.parse(savedCart).map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }))
        dispatch({ type: 'LOAD_CART', payload: items })
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart-items', JSON.stringify(state.items))
  }, [state.items])

  const addItem = (product: Product, quantity: number = 1, variantId?: string) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity, variantId } })
  }

  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { itemId } })
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const isInCart = (productId: string) => {
    return state.items.some(item => item.product.id === productId)
  }

  const getItemQuantity = (productId: string) => {
    return state.items
      .filter(item => item.product.id === productId)
      .reduce((total, item) => total + item.quantity, 0)
  }

  const value: CartContextType = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}