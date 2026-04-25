import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { UserCircle } from 'lucide-react'
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
        {/* <nav className="hidden md:flex gap-2 lg:gap-4 items-center">
          <Link href="/" className="relative text-sm text-brand-dark hover:text-brand-primary hover:bg-brand-primary/10 hover:shadow-md px-5 py-2.5 rounded-md transition-all group">
            Home
            <span className="absolute -bottom-3 left-1/2 w-6 h-[3px] -translate-x-1/2 bg-transparent group-hover:bg-brand-primary rounded-md transition-colors"></span>
          </Link>
          <Link href="/products" className="relative text-sm text-brand-dark hover:text-brand-primary hover:bg-brand-primary/10 hover:shadow-md px-5 py-2.5 rounded-md transition-all group">
            Products
            <span className="absolute -bottom-3 left-1/2 w-6 h-[3px] -translate-x-1/2 bg-transparent group-hover:bg-brand-primary rounded-md transition-colors"></span>
          </Link>
          <Link href="/#how-it-works" className="relative text-sm text-brand-dark hover:text-brand-primary hover:bg-brand-primary/10 hover:shadow-md px-5 py-2.5 rounded-md transition-all group">
            How It Works
            <span className="absolute -bottom-3 left-1/2 w-6 h-[3px] -translate-x-1/2 bg-transparent group-hover:bg-brand-primary rounded-md transition-colors"></span>
          </Link>
          <Link href="/about" className="relative text-sm text-brand-dark hover:text-brand-primary hover:bg-brand-primary/10 hover:shadow-md px-5 py-2.5 rounded-md transition-all group">
            About Us
            <span className="absolute -bottom-3 left-1/2 w-6 h-[3px] -translate-x-1/2 bg-transparent group-hover:bg-brand-primary rounded-md transition-colors"></span>
          </Link>
          <Link href="/contact" className="relative text-sm text-brand-dark hover:text-brand-primary hover:bg-brand-primary/10 hover:shadow-md px-5 py-2.5 rounded-md transition-all group">
            Contact Us
            <span className="absolute -bottom-3 left-1/2 w-6 h-[3px] -translate-x-1/2 bg-transparent group-hover:bg-brand-primary rounded-md transition-colors"></span>
          </Link>
        </nav> */}
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors">Home</Link>
          <Link href="/products" className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors">Products</Link>
          <Link href="/how-it-works" className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors">How It Works</Link>
          <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors">About Us</Link>
          <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors">Contact Us</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden sm:flex text-brand-dark hover:text-brand-primary transition-colors"
          >
            <UserCircle className="w-8 h-8 stroke-[1.5]" />
            <span className="sr-only">Sign In / Sign Up</span>
          </Link>
          {/* Mobile Menu Button could go here */}
        </div>      </div>
    </header>
  )
}
