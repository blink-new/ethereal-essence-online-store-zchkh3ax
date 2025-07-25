import React, { useState } from 'react'
import { ShoppingCart, Menu, X, Search, Star, Heart } from 'lucide-react'
import { Button } from './components/ui/button'
import { Card, CardContent } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './components/ui/sheet'

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: 'mushroom-lights' | 'moths' | 'candles'
  description: string
  rating: number
  inStock: boolean
}

const products: Product[] = [
  {
    id: 1,
    name: "Enchanted Forest Mushroom Light",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    category: 'mushroom-lights',
    description: "Handcrafted clay mushroom with ethereal LED glow, nestled in a crystal-clear glass dome",
    rating: 4.9,
    inStock: true
  },
  {
    id: 2,
    name: "Mystical Moth Canvas",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop",
    category: 'moths',
    description: "Hand-painted moth artwork with intricate wing details and metallic accents",
    rating: 4.8,
    inStock: true
  },
  {
    id: 3,
    name: "Moonlit Garden Candle",
    price: 32.50,
    image: "https://images.unsplash.com/photo-1602874801006-e26c4c9d9b35?w=400&h=400&fit=crop",
    category: 'candles',
    description: "Artisanal soy candle with lavender and sage essence, 40-hour burn time",
    rating: 4.7,
    inStock: true
  },
  {
    id: 4,
    name: "Twilight Mushroom Sanctuary",
    price: 124.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    category: 'mushroom-lights',
    description: "Large glass dome featuring three illuminated clay mushrooms with moss base",
    rating: 5.0,
    inStock: true
  },
  {
    id: 5,
    name: "Luna Moth Portrait",
    price: 78.00,
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop",
    category: 'moths',
    description: "Detailed hand-painted Luna moth with iridescent wing patterns",
    rating: 4.9,
    inStock: false
  },
  {
    id: 6,
    name: "Forest Whisper Candle Set",
    price: 85.00,
    image: "https://images.unsplash.com/photo-1602874801006-e26c4c9d9b35?w=400&h=400&fit=crop",
    category: 'candles',
    description: "Set of three artisanal candles: Pine, Cedar, and Eucalyptus scents",
    rating: 4.6,
    inStock: true
  }
]

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product])
  }

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId))
  }

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <div className="ethereal-bg"></div>
      
      {/* Navigation */}
      <nav className="relative z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-serif font-bold text-glow">
                Ethereal Essence
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-white/80 hover:text-accent transition-colors">Home</a>
              <a href="#products" className="text-white/80 hover:text-accent transition-colors">Products</a>
              <a href="#about" className="text-white/80 hover:text-accent transition-colors">About</a>
              <a href="#contact" className="text-white/80 hover:text-accent transition-colors">Contact</a>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-accent">
                <Search className="h-5 w-5" />
              </Button>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white/80 hover:text-accent relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItems.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-accent text-black text-xs">
                        {cartItems.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-black/90 backdrop-blur-md border-white/10">
                  <SheetHeader>
                    <SheetTitle className="text-white">Shopping Cart</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {cartItems.length === 0 ? (
                      <p className="text-white/60">Your cart is empty</p>
                    ) : (
                      <>
                        {cartItems.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                            <div>
                              <h4 className="text-white text-sm font-medium">{item.name}</h4>
                              <p className="text-accent">${item.price}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <div className="border-t border-white/10 pt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-white font-medium">Total:</span>
                            <span className="text-accent font-bold text-lg">${cartTotal.toFixed(2)}</span>
                          </div>
                          <Button className="w-full bg-accent hover:bg-accent/90 text-black font-medium">
                            Checkout
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white/80"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10">
            <div className="px-4 py-4 space-y-2">
              <a href="#home" className="block text-white/80 hover:text-accent py-2">Home</a>
              <a href="#products" className="block text-white/80 hover:text-accent py-2">Products</a>
              <a href="#about" className="block text-white/80 hover:text-accent py-2">About</a>
              <a href="#contact" className="block text-white/80 hover:text-accent py-2">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="organic-shape absolute top-10 left-10 w-32 h-32 bg-accent/10 -z-10"></div>
          <div className="organic-shape absolute bottom-10 right-10 w-24 h-24 bg-primary/10 -z-10"></div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-glow float">
            Ethereal Essence
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
            Handcrafted artisanal decor that brings mystical beauty to your sacred spaces
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-black font-medium glow-green-hover"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Collection
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-accent text-accent hover:bg-accent hover:text-black"
            >
              Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-center mb-12 text-glow">
            Mystical Collection
          </h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className={selectedCategory === 'all' 
                ? 'bg-accent text-black hover:bg-accent/90' 
                : 'border-accent text-accent hover:bg-accent hover:text-black'
              }
            >
              All Products
            </Button>
            <Button
              variant={selectedCategory === 'mushroom-lights' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('mushroom-lights')}
              className={selectedCategory === 'mushroom-lights' 
                ? 'bg-accent text-black hover:bg-accent/90' 
                : 'border-accent text-accent hover:bg-accent hover:text-black'
              }
            >
              Mushroom Lights
            </Button>
            <Button
              variant={selectedCategory === 'moths' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('moths')}
              className={selectedCategory === 'moths' 
                ? 'bg-accent text-black hover:bg-accent/90' 
                : 'border-accent text-accent hover:bg-accent hover:text-black'
              }
            >
              Hand-Painted Moths
            </Button>
            <Button
              variant={selectedCategory === 'candles' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('candles')}
              className={selectedCategory === 'candles' 
                ? 'bg-accent text-black hover:bg-accent/90' 
                : 'border-accent text-accent hover:bg-accent hover:text-black'
              }
            >
              Artisanal Candles
            </Button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="bg-black/30 backdrop-blur-md border-white/10 hover:border-accent/50 transition-all duration-300 glow-green-hover group"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-black/50 backdrop-blur-sm text-white hover:text-accent"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="secondary" className="bg-red-500/80 text-white">
                          Out of Stock
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-serif font-semibold text-white group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-white/60 ml-1">{product.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-white/70 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-accent">
                        ${product.price}
                      </span>
                      <Button
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        className="bg-accent hover:bg-accent/90 text-black font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold mb-8 text-glow">
            Our Ethereal Story
          </h2>
          <p className="text-lg text-white/80 mb-8 leading-relaxed">
            Born from a passion for mystical beauty and handcrafted artistry, Ethereal Essence creates 
            unique pieces that transform ordinary spaces into enchanted sanctuaries. Each mushroom light, 
            hand-painted moth, and artisanal candle is lovingly crafted to bring magic into your world.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 glow-green">
                <span className="text-2xl">🍄</span>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2 text-accent">Handcrafted</h3>
              <p className="text-white/70">Every piece is uniquely made by skilled artisans</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 glow-green">
                <span className="text-2xl">🦋</span>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2 text-accent">Mystical</h3>
              <p className="text-white/70">Inspired by nature's ethereal beauty</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 glow-green">
                <span className="text-2xl">🕯️</span>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2 text-accent">Sustainable</h3>
              <p className="text-white/70">Eco-friendly materials and practices</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-md border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-serif font-bold mb-4 text-glow">Ethereal Essence</h3>
              <p className="text-white/70 text-sm">
                Bringing mystical beauty to your sacred spaces through handcrafted artisanal decor.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-accent">Shop</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-accent transition-colors">Mushroom Lights</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Hand-Painted Moths</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Artisanal Candles</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Gift Sets</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-accent">Support</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-accent transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Care Guide</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-accent">Connect</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-accent transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Pinterest</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Newsletter</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/60">
            <p>&copy; 2024 Ethereal Essence. All rights reserved. Crafted with mystical love.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App