import { PublicNavbar } from "@/components/layout/public-navbar"
import { PublicFooter } from "@/components/layout/public-footer"
import { auth } from "@/auth"
import Link from "next/link"
import Image from "next/image"
import {
  Home,
  Package,
  User,
  MapPin,
  CreditCard,
  Settings,
  Headphones,
  LogOut
} from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/30">
      <PublicNavbar session={session} />

      <div className="flex-1 flex container mx-auto px-4 lg:px-8 py-8 max-w-7xl">
        {/* Sidebar */}
        <aside className="w-64 hidden md:flex flex-col gap-2 shrink-0 border-r border-gray-100 pr-6 mr-6">
          <nav className="flex flex-col gap-1 w-full">
            <Link href="/account" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#eef4fb] text-[#1434CB] font-semibold transition-colors">
              <Home className="w-5 h-5" />
              Dashboard
            </Link>
            <Link href="/account/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium transition-colors">
              <Package className="w-5 h-5" />
              Orders
            </Link>
            <Link href="/account/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium transition-colors">
              <User className="w-5 h-5" />
              Profile
            </Link>
            <Link href="/account/addresses" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium transition-colors">
              <MapPin className="w-5 h-5" />
              Addresses
            </Link>
            <Link href="/account/payment-methods" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium transition-colors">
              <CreditCard className="w-5 h-5" />
              Payment Methods
            </Link>
            <Link href="/account/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium transition-colors">
              <Settings className="w-5 h-5" />
              Settings
            </Link>
          </nav>

          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-1 w-full">
            <Link href="/account/help" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium transition-colors">
              <Headphones className="w-5 h-5" />
              Help & Support
            </Link>
            <Link href="/api/auth/signout" className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 font-medium transition-colors">
              <LogOut className="w-5 h-5" />
              Logout
            </Link>
          </div>

        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>

      <PublicFooter />
    </div>
  )
}
