import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Star, ShoppingBag, Heart, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { HeroBackground, RotatingProduct } from '../components/three'
import { ScrollAnimation, GlowButton, HoverCard } from '../components/animations'
import { ProductCard } from '../components/catalog'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { products, categories } from '../data'

const Home: React.FC = () => {

  const featuredProducts = products.slice(0, 4)
  const trendingProducts = products.slice(2, 6)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroBackground particleCount={3000} speed={0.3} />

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.h1
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Future Catalog
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Discover the next generation of products with our immersive,
            AI-powered catalog experience. Where innovation meets elegance.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <GlowButton size="lg" className="group">
              <Link to="/catalog" className="flex items-center space-x-2">
                <span>Explore Catalog</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </GlowButton>

            <Button variant="outline" size="lg" className="backdrop-blur-sm">
              <Zap className="h-5 w-5 mr-2" />
              View Demo
            </Button>
          </motion.div>
        </div>

        {/* Floating 3D Product */}
        <motion.div
          className="absolute bottom-20 right-10 w-64 h-64 hidden lg:block"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <RotatingProduct
            imageUrl={products[0]?.images[0]}
            title={products[0]?.name}
            autoRotate={true}
            rotationSpeed={0.3}
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose Future Catalog?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience shopping like never before with cutting-edge technology
              and unparalleled user experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Star,
                title: 'Premium Quality',
                description: 'Curated selection of high-end products from trusted brands worldwide.'
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Advanced AI algorithms ensure instant search and personalized recommendations.'
              },
              {
                icon: ShoppingBag,
                title: 'Seamless Shopping',
                description: 'One-click checkout with multiple payment options and instant delivery.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <HoverCard className="h-full">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </HoverCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center justify-between mb-12"
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Featured Products
              </h2>
              <p className="text-xl text-muted-foreground">
                Discover our handpicked selection of premium products
              </p>
            </div>
            <Button variant="outline" size="lg" asChild>
              <Link to="/catalog">
                View All <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ScrollAnimation key={product.id} type="slide" direction="up">
                <ProductCard
                  product={product}
                  className="h-full"
                />
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Shop by Category
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore our diverse range of categories, each offering unique
                products for every lifestyle.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category) => (
              <ScrollAnimation key={category.id} type="scale">
                <Link to={`/catalog?category=${category.id}`}>
                  <HoverCard className="group cursor-pointer">
                    <div className="aspect-square relative overflow-hidden rounded-lg">
                      <img
                        src={category.image || '/placeholder-category.jpg'}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-semibold text-lg mb-1">
                          {category.name}
                        </h3>
                        <p className="text-white/80 text-sm">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </HoverCard>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4">
              <Star className="h-4 w-4 mr-1" />
              Trending Now
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What's Hot Right Now
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay ahead of the curve with our trending products that everyone's talking about.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <ScrollAnimation key={product.id} type="slide" direction="up">
                <ProductCard
                  product={product}
                  className="h-full"
                />
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <HoverCard className="p-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Experience the Future?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who have discovered their
                next favorite product through our innovative catalog platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GlowButton size="lg">
                  <Link to="/catalog" className="flex items-center space-x-2">
                    <ShoppingBag className="h-5 w-5" />
                    <span>Start Shopping</span>
                  </Link>
                </GlowButton>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5 mr-2" />
                  Create Wishlist
                </Button>
              </div>
            </HoverCard>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home