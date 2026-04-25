"use client"

import { useState } from 'react'
import Link from 'next/link'
import { UserCircle, Menu, X } from 'lucide-react'
import { Logo } from '@/components/ui/logo'

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
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden sm:flex text-brand-dark hover:text-brand-primary transition-colors"
          >
            <UserCircle className="w-8 h-8 stroke-[1.5]" />
            <span className="sr-only">Sign In / Sign Up</span>
          </Link>

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
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-brand-dark text-white font-medium p-3 rounded-xl hover:bg-brand-primary transition-colors cursor-pointer"
            >
              <UserCircle className="w-5 h-5" />
              <span></span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
