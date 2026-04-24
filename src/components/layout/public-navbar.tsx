import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-blue-600">JovaDrops</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/#products" className="text-sm font-medium hover:text-blue-600 transition-colors">Products</Link>
          <Link href="/#how-it-works" className="text-sm font-medium hover:text-blue-600 transition-colors">How It Works</Link>
          <Link href="/#about" className="text-sm font-medium hover:text-blue-600 transition-colors">About</Link>
          <Link href="/contact" className="text-sm font-medium hover:text-blue-600 transition-colors">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-blue-600 transition-colors hidden sm:block">Log in</Link>
          <Link href="/#download" className={buttonVariants()}>
            Download App
          </Link>
        </div>
      </div>
    </header>
  )
}
