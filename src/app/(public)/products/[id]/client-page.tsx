"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store/cart"
import {
  ChevronRight,
  Star,
  Check,
  Minus,
  Plus,
  ShoppingCart,
  Store,
  Truck,
  ShieldCheck,
  Award
} from "lucide-react"

type Product = {
  id: string
  slug: string
  name: string
  description: string | null
  image: string | null
  features: string[]
  variants: Variant[]
}

type Variant = {
  id: string
  type: string
  name: string
  price: number
  description: string | null
  features: string[]
}

export function ProductDetailsClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const { data: session } = useSession()
  const router = useRouter()

  // Find available types from the database
  const availableTypes = product.variants.map(v => v.type)
  const defaultTab = availableTypes.includes('bottle') ? 'bottle' : availableTypes[0]

  const [activeTab, setActiveTab] = useState<string>(defaultTab)

  const currentVariant = product.variants.find(v => v.type === activeTab)

  const tabs = product.variants.map(variant => ({
    id: variant.type,
    label: variant.type.charAt(0).toUpperCase() + variant.type.slice(1)
  }))

  const addItem = useCartStore(state => state.addItem)

  const handleAddToCart = () => {
    if (currentVariant) {
      addItem({
        id: currentVariant.id,
        name: currentVariant.name,
        description: currentVariant.description || '',
        price: currentVariant.price,
        quantity: quantity,
        image: product.image || "/hero-image.png",
        isPack: currentVariant.type.includes('pack'), // basic heuristic
      });
      alert(`Successfully added ${quantity}x ${currentVariant.name} to your cart!`)
    }
  }

  const handleOrderNow = () => {
    if (currentVariant) {
      addItem({
        id: currentVariant.id,
        name: currentVariant.name,
        description: currentVariant.description || '',
        price: currentVariant.price,
        quantity: quantity,
        image: product.image || "/hero-image.png",
        isPack: currentVariant.type.includes('pack'), // basic heuristic
      });
      router.push("/cart")
    }
  }

  // Format price as KSH
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 0 }).format(price).replace('KES', 'KSH')
  }

  return (
    <div className="flex flex-col items-center w-full bg-white pb-24">

      {/* Breadcrumbs */}
      <div className="w-full border-b border-slate-100 bg-white py-4">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center text-sm font-medium text-slate-500">
            <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/products" className="hover:text-brand-primary transition-colors">Products</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-brand-dark">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Left Column: Images */}
          <div className="lg:w-1/2 flex flex-col sm:flex-row gap-4 lg:gap-6">
            {/* Thumbnails (Vertical on desktop) */}
            <div className="flex sm:flex-col gap-4 order-2 sm:order-1 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-20 h-24 shrink-0 rounded-xl border-2 flex flex-col items-center justify-center p-2 transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "border-brand-primary bg-brand-light/30"
                      : "border-slate-200 bg-white hover:border-brand-primary/50"
                  }`}
                >
                  <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">{tab.label}</div>
                  {/* Thumbnail Placeholder */}
                  <div className="w-8 h-12 bg-brand-primary/10 rounded-t-xl rounded-b border-2 border-brand-primary/20 relative flex flex-col items-center justify-start pt-1">
                    <div className="w-3 h-1.5 bg-brand-primary/30 rounded-t-[2px] absolute -top-1.5"></div>
                  </div>
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 aspect-square bg-brand-light/30 rounded-3xl border border-slate-100 flex items-center justify-center p-8 order-1 sm:order-2 relative group overflow-hidden">
              {/* Decorative background glow */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl opacity-50 group-hover:scale-110 transition-transform duration-700"></div>

              {/* Product Image */}
              <Image
                src={product.image || "/hero-image.png"}
                alt={currentVariant?.name || product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-8 drop-shadow-2xl hover:scale-105 transition-transform duration-500 relative z-10"
                priority
              />
            </div>
          </div>

          {/* Right Column: Product Info */}
          <div className="lg:w-1/2 flex flex-col">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-brand-dark mb-2">
              {currentVariant?.name}
            </h1>

            {/* Reviews (Mocked for now since DB doesn't have it yet) */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-[#FFC107]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-500">
                (45 reviews)
              </span>
            </div>

            {/* Price */}
            <div className="text-3xl font-extrabold text-brand-primary mb-6">
              {currentVariant ? formatPrice(currentVariant.price) : ""}
            </div>

            {/* Description */}
            <p className="text-brand-dark/80 leading-relaxed mb-8">
              {currentVariant?.description}
            </p>

            {/* Features List */}
            <ul className="space-y-3 mb-10">
              {currentVariant?.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="bg-green-100 p-1 rounded-full text-green-600 shrink-0">
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </div>
                  <span className="font-medium text-brand-dark/90">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Quantity Selector */}
            <div className="mb-8">
              <span className="block text-sm font-bold text-brand-dark mb-3">Quantity</span>
              <div className="flex items-center inline-flex bg-white border border-slate-200 rounded-lg p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-brand-primary hover:bg-brand-light rounded-md transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="w-12 text-center font-bold text-brand-dark">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-brand-primary hover:bg-brand-light rounded-md transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={handleAddToCart} className="flex-1 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl py-7 shadow-lg shadow-brand-primary/20 text-lg cursor-pointer">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add To Cart
              </Button>
              <Button size="lg" variant="outline" onClick={handleOrderNow} className="flex-1 border-slate-200 text-brand-dark hover:bg-brand-light hover:text-brand-primary rounded-xl py-7 text-lg cursor-pointer">
                Order Now
              </Button>
            </div>

          </div>
        </div>

        {/* Bottom Feature Blurbs */}
        <div className="mt-20 pt-10 border-t border-slate-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <BottomFeature
              icon={<Store className="w-6 h-6 text-brand-dark" />}
              title="Free Pickup"
              description="At our station"
            />
            <BottomFeature
              icon={<Truck className="w-6 h-6 text-brand-dark" />}
              title="Fast Delivery"
              description="To your doorstep"
            />
            <BottomFeature
              icon={<ShieldCheck className="w-6 h-6 text-brand-dark" />}
              title="Secure Payment"
              description="100% secure"
            />
            <BottomFeature
              icon={<Award className="w-6 h-6 text-brand-dark" />}
              title="Best Quality"
              description="Pure & safe water"
            />
          </div>
        </div>

      </div>
    </div>
  )
}

function BottomFeature({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="p-3 bg-brand-light rounded-xl text-brand-primary">
        {icon}
      </div>
      <div className="flex flex-col">
        <h4 className="font-bold text-sm text-brand-dark">{title}</h4>
        <span className="text-xs text-brand-dark/60">{description}</span>
      </div>
    </div>
  )
}