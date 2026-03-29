export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  subcategory?: string
  brand: string
  rating: number
  reviewCount: number
  inStock: boolean
  stockQuantity: number
  tags: string[]
  specifications: Record<string, string>
  features: string[]
  variants?: ProductVariant[]
  isNew?: boolean
  isSale?: boolean
  discount?: number
  createdAt: Date
  updatedAt: Date
}

export interface ProductVariant {
  id: string
  name: string
  value: string
  priceModifier?: number
  image?: string
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
  subcategories: Subcategory[]
  productCount: number
}

export interface Subcategory {
  id: string
  name: string
  productCount: number
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
  variant?: ProductVariant
  addedAt: Date
}

export interface WishlistItem {
  id: string
  product: Product
  addedAt: Date
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  preferences: UserPreferences
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  currency: string
  language: string
  notifications: boolean
}

export interface FilterOptions {
  categories: string[]
  priceRange: [number, number]
  brands: string[]
  rating: number
  inStock: boolean
  tags: string[]
}

export interface SortOption {
  value: string
  label: string
}

export interface SearchResult {
  products: Product[]
  totalCount: number
  categories: Category[]
  suggestions: string[]
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  comment: string
  images?: string[]
  verified: boolean
  helpful: number
  createdAt: Date
}

export interface NotificationItem {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  action?: {
    label: string
    onClick: () => void
  }
  autoClose?: boolean
  duration?: number
}

export interface ModalState {
  isOpen: boolean
  type?: string
  data?: any
}

export interface UIState {
  sidebarOpen: boolean
  searchOpen: boolean
  cartOpen: boolean
  modal: ModalState
  loading: boolean
  notifications: NotificationItem[]
}

export interface ThemeState {
  mode: 'light' | 'dark' | 'system'
  resolvedMode: 'light' | 'dark'
}

export interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  discount: number
  tax: number
  shipping: number
}

export interface AnimationConfig {
  duration: number
  ease: string
  delay?: number
}

export interface ComponentProps {
  className?: string
  children?: React.ReactNode
  animate?: boolean
  delay?: number
}

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'
export type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url'
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'