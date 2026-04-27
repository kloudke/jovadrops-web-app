import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { Logo } from '@/components/ui/logo'

export function PublicFooter() {
  return (
    <footer className="bg-brand-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">

          {/* Column 1: Logo & Info */}
          <div className="flex flex-col lg:col-span-1">
            <Link href="/" className="mb-4 inline-block">
              <Logo lightText={true} />
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed mb-6 max-w-xs">
              Providing clean, safe, and affordable purified water for a healthier and better tomorrow.
            </p>
            <div className="flex items-center gap-3">
              <Link href="#" className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center hover:opacity-80 transition-opacity">
                <Image src="/facebook.svg" alt="Facebook" width={16} height={16} />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center hover:opacity-80 transition-opacity">
                <Image src="/instagram.svg" alt="Instagram" width={16} height={16} />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-black flex items-center justify-center hover:opacity-80 transition-opacity">
                <Image src="/x-light.svg" alt="X (Twitter)" width={16} height={16} />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-black border border-white/20 flex items-center justify-center hover:opacity-80 transition-opacity">
                <Image src="/tiktok-light.svg" alt="TikTok" width={16} height={16} />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:ml-auto">
            <h4 className="font-semibold text-[15px] mb-5 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-slate-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/products" className="text-sm text-slate-300 hover:text-white transition-colors">Products</Link></li>
              <li><Link href="/how-it-works" className="text-sm text-slate-300 hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/about" className="text-sm text-slate-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-slate-300 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Products */}
          <div className="lg:ml-auto">
            <h4 className="font-semibold text-[15px] mb-5 text-white">Products</h4>
            <ul className="space-y-3">
              <li><Link href="/products" className="text-sm text-slate-300 hover:text-white transition-colors">10L Bottles</Link></li>
              <li><Link href="/products" className="text-sm text-slate-300 hover:text-white transition-colors">20L Bottles</Link></li>
              <li><Link href="/products" className="text-sm text-slate-300 hover:text-white transition-colors">Dispenser Bottle</Link></li>
              <li><Link href="/products" className="text-sm text-slate-300 hover:text-white transition-colors">5L Bottles</Link></li>
              <li><Link href="/products" className="text-sm text-slate-300 hover:text-white transition-colors">Alkaline Water 10L</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="lg:ml-auto lg:col-span-1">
            <h4 className="font-semibold text-[15px] mb-5 text-white">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span className="text-sm text-slate-300 leading-tight">
                  Kajiado, Kitengela.<br />Nairobi - Namanga Rd.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <span className="text-sm text-slate-300">+254 748 928 369</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <span className="text-sm text-slate-300">info@jovadrops.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-white shrink-0" />
                <span className="text-sm text-slate-300">Open Mon - Sat Daily: 8:30 AM - 9:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Column 5: Download Our App */}
          <div className="lg:ml-auto lg:col-span-1">
            <h4 className="font-semibold text-[15px] mb-5 text-white">Download Our App</h4>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link href="#" className="inline-block hover:opacity-90 transition-opacity">
                <div className="bg-black border border-[#2A2A2A] rounded-lg px-4 py-2 flex items-center gap-3 w-[160px] h-[52px]">
                  <Image src="/google-play.svg" alt="Google Play" width={24} height={24} className="shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[9px] text-white/80 leading-none mb-0.5 uppercase tracking-wide">GET IT ON</span>
                    <span className="text-[13px] font-semibold text-white leading-none tracking-wide font-sans">Google Play</span>
                  </div>
                </div>
              </Link>
              <Link href="#" className="inline-block hover:opacity-90 transition-opacity">
                <div className="bg-black border border-[#2A2A2A] rounded-lg px-4 py-2 flex items-center gap-3 w-[160px] h-[52px]">
                  <Image src="/apple-light.svg" alt="App Store" width={24} height={24} className="shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[9px] text-white/80 leading-none mb-0.5">Download on the</span>
                    <span className="text-[13px] font-semibold text-white leading-none tracking-wide font-sans">App Store</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex justify-center items-center">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} JovaDrops Water Station. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
