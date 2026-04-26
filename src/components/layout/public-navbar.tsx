"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'

export function PublicNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-light border-none">
      <div className="container mx-auto px-4 lg:px-8 flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors">Home</Link>
          <Link href="/products" className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors">Products</Link>
          <Link href="/how-it-works" className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors">How It Works</Link>
          <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors">About Us</Link>
          <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors">Contact Us</Link>
        </nav>

        {/* Actions & Mobile Toggle */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-6">
            <Link href="/cart" className="relative text-brand-dark hover:text-brand-primary transition-colors cursor-pointer">
              <ShoppingCart className="w-7 h-7 stroke-[1.5]" />
              <span className="absolute -top-1.5 -right-2 bg-brand-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">2</span>
            </Link>
            <Button className="bg-brand-dark hover:bg-brand-primary text-white rounded-lg px-6 py-5 text-sm font-semibold cursor-pointer">
              Order Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-brand-dark hover:text-brand-primary transition-colors cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 shadow-xl py-4 px-4 flex flex-col gap-2 z-40">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-brand-dark p-3 hover:bg-brand-light rounded-md">Home</Link>
          <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-brand-dark p-3 hover:bg-brand-light rounded-md">Products</Link>
          <Link href="/how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-brand-dark p-3 hover:bg-brand-light rounded-md">How It Works</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-brand-dark p-3 hover:bg-brand-light rounded-md">About Us</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-brand-dark p-3 hover:bg-brand-light rounded-md">Contact Us</Link>
          <div className="pt-4 mt-2 border-t border-slate-100 flex justify-center">
            <Link
              href="/cart"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-brand-dark text-white font-medium p-3 rounded-xl hover:bg-brand-primary transition-colors cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Order Now</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
