import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { Logo } from '@/components/ui/logo'

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-brand-light border-none">
      <div className="container mx-auto px-4 lg:px-8 flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors">Home</Link>
          <Link href="/products" className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors">Products</Link>
          <Link href="/#how-it-works" className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors">How It Works</Link>
          <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors">About Us</Link>
          <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors">Contact Us</Link>
        </nav>

        {/* Actions (Order Now button as per Home mockup) */}
        <div className="flex items-center gap-4">
          {/* For pages other than home, the design shows a Cart icon with a badge instead. We can render the Order Now button here for now. */}
          <Link 
            href="/products" 
            className={buttonVariants({ variant: "default" }) + " hidden sm:flex bg-brand-dark hover:bg-brand-dark/90 text-white rounded-md px-6"}
          >
            Order Now
          </Link>
          {/* Mobile Menu Button could go here */}
        </div>
      </div>
    </header>
  )
}
