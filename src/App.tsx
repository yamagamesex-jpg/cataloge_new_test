import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { CartProvider } from './context/CartContext'
import { UIProvider } from './context/UIContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductPage from './pages/ProductPage'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import Search from './pages/Search'
import { AnimatePresence } from 'framer-motion'

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <UIProvider>
          <Router>
            <AppContent />
          </Router>
        </UIProvider>
      </CartProvider>
    </ThemeProvider>
  )
}

function AppContent() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-foreground">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default App