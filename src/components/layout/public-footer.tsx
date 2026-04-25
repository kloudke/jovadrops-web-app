import Link from 'next/link'
import { MapPin, Phone, Mail, Globe, MessageCircle, Camera } from 'lucide-react'
import { Logo } from '@/components/ui/logo'

export function PublicFooter() {
  return (
    <footer className="bg-brand-dark text-white pt-10 pb-6">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* Column 1: Logo & Slogan */}
          <div className="flex flex-col">
            <Link href="/" className="mb-4">
              <Logo lightText={true} />
            </Link>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-base mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-slate-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/products" className="text-sm text-slate-300 hover:text-white transition-colors">Products</Link></li>
              <li><Link href="/#how-it-works" className="text-sm text-slate-300 hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/about" className="text-sm text-slate-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-slate-300 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Products */}
          <div>
            <h4 className="font-bold text-base mb-4 text-white">Products</h4>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-sm text-slate-300 hover:text-white transition-colors">10L Bottle</Link></li>
              <li><Link href="/products" className="text-sm text-slate-300 hover:text-white transition-colors">20L Bottle</Link></li>
              <li><Link href="/products" className="text-sm text-slate-300 hover:text-white transition-colors">Dispenser Bottle</Link></li>
              <li><Link href="/products" className="text-sm text-slate-300 hover:text-white transition-colors">5L Bottle</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h4 className="font-bold text-base mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-1" />
                <span className="text-sm text-slate-300 leading-tight">
                  Kitengela, Kajiado<br />Nairobi-Namanga Road, Kenya
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-primary shrink-0" />
                <span className="text-sm text-slate-300">+254 748 928 369</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-primary shrink-0" />
                <span className="text-sm text-slate-300">info@jovadrops.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} JovaDrops Water Station. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-primary transition-colors">
              <Globe className="w-4 h-4 text-white" />
            </Link>
            <Link href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-primary transition-colors">
              <Camera className="w-4 h-4 text-white" />
            </Link>
            <Link href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-primary transition-colors">
              <MessageCircle className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
