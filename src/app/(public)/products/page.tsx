"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// Temporary mock data until we connect to the Prisma database
const products = [
  { id: 1, name: "10L Water Bottle", volume: "10 Litres", price: "KSH 220", category: "10L Bottles" },
  { id: 2, name: "20L Water Bottle", volume: "20 Litres", price: "KSH 400", category: "20L Bottles" },
  { id: 3, name: "Dispenser Bottle", volume: "18.9 Litres", price: "KSH 400", category: "Dispenser Bottles" },
  { id: 4, name: "5L Water Bottle", volume: "5 Litres", price: "KSH 100", category: "5L Bottles" },
  { id: 5, name: "10L (Pack of 2)", volume: "10 Litres x 2", price: "KSH 440", category: "10L Bottles" },
  { id: 6, name: "20L (Pack of 2)", volume: "20 Litres x 2", price: "KSH 800", category: "20L Bottles" },
  { id: 7, name: "Dispenser Bottle", volume: "18.9 Litres", price: "KSH 400", category: "Dispenser Bottles" },
  { id: 8, name: "Alkaline Water 10L", volume: "10 Litres", price: "KSH 250", category: "10L Bottles" },
]

const categories = [
  "All Products",
  "10L Bottles",
  "20L Bottles",
  "Dispenser Bottles",
  "5L Bottles"
]

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All Products")

  const filteredProducts = activeCategory === "All Products"
    ? products
    : products.filter(product => product.category === activeCategory)

  return (
    <div className="flex flex-col items-center w-full bg-white pb-24">

      {/* Header Section */}
      <section className="w-full pt-16 pb-10 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-4">
            Our Water Products
          </h1>
          <p className="text-brand-dark/70 text-lg max-w-2xl mx-auto">
            High quality, purified & affordable water for everyone.
          </p>
        </div>
      </section>

      {/* Filter Pills */}
      <section className="w-full mb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`cursor-pointer rounded-md px-6 py-3 font-semibold transition-all duration-200 border ${activeCategory === category
                  ? "bg-brand-dark border-brand-dark text-white shadow-md transform scale-105"
                  : "bg-white border-slate-200 text-brand-dark hover:bg-blue-50 hover:text-brand-primary hover:border-brand-primary shadow-sm"
                  }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="w-full">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 transition-all duration-500">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-slate-500">
                No products found in this category.
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  )
}

import Link from "next/link"

function ProductCard({ product }: { product: { id: number | string; name: string; volume: string; price: string; category: string } }) {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-2xl border border-slate-100 hover:shadow-xl hover:border-brand-primary/20 transition-all duration-300 group">

      {/* Product Image Placeholder (Clickable to details) */}
      <Link href={`/products/${product.id}`} className="w-full aspect-[4/5] bg-brand-light/30 rounded-xl mb-6 relative flex items-center justify-center p-4 cursor-pointer block">
        {/* Placeholder: Replace with actual product images later */}
        <div className="w-24 h-40 bg-brand-primary/10 rounded-t-3xl rounded-b-lg border-4 border-brand-primary/20 relative flex flex-col items-center justify-start pt-4 group-hover:scale-105 transition-transform duration-500">
          <div className="w-16 h-8 bg-brand-primary/20 rounded-md absolute top-1/2 -translate-y-1/2 flex items-center justify-center">
            <span className="text-[10px] font-bold text-brand-primary/50">JovaDrops</span>
          </div>
          <div className="w-8 h-4 bg-brand-primary/30 rounded-t-sm absolute -top-4"></div>
        </div>
      </Link>

      {/* Product Details */}
      <div className="text-center w-full">
        <Link href={`/products/${product.id}`} className="hover:text-brand-primary transition-colors block">
          <h3 className="font-bold text-brand-dark text-lg leading-tight mb-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-brand-dark/60 mb-3">
          {product.volume}
        </p>
        <p className="text-2xl font-extrabold text-brand-dark mb-5">
          {product.price}
        </p>
        <Link href={`/products/${product.id}`}>
          <Button className="w-full bg-brand-dark hover:bg-brand-primary text-white transition-colors rounded-md py-6 cursor-pointer">
            Order Now
          </Button>
        </Link>
      </div>

    </div>
  )
}
