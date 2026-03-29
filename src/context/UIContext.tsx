import React, { createContext, useContext, useReducer } from 'react'
import { UIState, NotificationItem, ModalState } from '../types'

interface UIContextType extends UIState {
  openSidebar: () => void
  closeSidebar: () => void
  toggleSidebar: () => void
  openSearch: () => void
  closeSearch: () => void
  openCart: () => void
  closeCart: () => void
  openModal: (type: string, data?: any) => void
  closeModal: () => void
  setLoading: (loading: boolean) => void
  addNotification: (notification: Omit<NotificationItem, 'id'>) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

type UIAction =
  | { type: 'OPEN_SIDEBAR' }
  | { type: 'CLOSE_SIDEBAR' }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'OPEN_SEARCH' }
  | { type: 'CLOSE_SEARCH' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'OPEN_MODAL'; payload: { type: string; data?: any } }
  | { type: 'CLOSE_MODAL' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_NOTIFICATION'; payload: NotificationItem }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' }

const UIContext = createContext<UIContextType | undefined>(undefined)

const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case 'OPEN_SIDEBAR':
      return { ...state, sidebarOpen: true }
    case 'CLOSE_SIDEBAR':
      return { ...state, sidebarOpen: false }
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen }
    case 'OPEN_SEARCH':
      return { ...state, searchOpen: true }
    case 'CLOSE_SEARCH':
      return { ...state, searchOpen: false }
    case 'OPEN_CART':
      return { ...state, cartOpen: true }
    case 'CLOSE_CART':
      return { ...state, cartOpen: false }
    case 'OPEN_MODAL':
      return {
        ...state,
        modal: { isOpen: true, type: action.payload.type, data: action.payload.data }
      }
    case 'CLOSE_MODAL':
      return {
        ...state,
        modal: { isOpen: false, type: undefined, data: undefined }
      }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      }
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      }
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] }
    default:
      return state
  }
}

const initialState: UIState = {
  sidebarOpen: false,
  searchOpen: false,
  cartOpen: false,
  modal: { isOpen: false },
  loading: false,
  notifications: []
}

export const useUI = () => {
  const context = useContext(UIContext)
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider')
  }
  return context
}

interface UIProviderProps {
  children: React.ReactNode
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState)

  const openSidebar = () => dispatch({ type: 'OPEN_SIDEBAR' })
  const closeSidebar = () => dispatch({ type: 'CLOSE_SIDEBAR' })
  const toggleSidebar = () => dispatch({ type: 'TOGGLE_SIDEBAR' })

  const openSearch = () => dispatch({ type: 'OPEN_SEARCH' })
  const closeSearch = () => dispatch({ type: 'CLOSE_SEARCH' })

  const openCart = () => dispatch({ type: 'OPEN_CART' })
  const closeCart = () => dispatch({ type: 'CLOSE_CART' })

  const openModal = (type: string, data?: any) =>
    dispatch({ type: 'OPEN_MODAL', payload: { type, data } })
  const closeModal = () => dispatch({ type: 'CLOSE_MODAL' })

  const setLoading = (loading: boolean) =>
    dispatch({ type: 'SET_LOADING', payload: loading })

  const addNotification = (notification: Omit<NotificationItem, 'id'>) => {
    const newNotification: NotificationItem = {
      ...notification,
      id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }
    dispatch({ type: 'ADD_NOTIFICATION', payload: newNotification })

    // Auto-remove notification after duration
    if (newNotification.autoClose !== false) {
      setTimeout(() => {
        removeNotification(newNotification.id)
      }, newNotification.duration || 5000)
    }
  }

  const removeNotification = (id: string) =>
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id })

  const clearNotifications = () =>
    dispatch({ type: 'CLEAR_NOTIFICATIONS' })

  const value: UIContextType = {
    ...state,
    openSidebar,
    closeSidebar,
    toggleSidebar,
    openSearch,
    closeSearch,
    openCart,
    closeCart,
    openModal,
    closeModal,
    setLoading,
    addNotification,
    removeNotification,
    clearNotifications
  }

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  )
}