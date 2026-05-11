"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Package,
  User,
  MapPin,
  Headphones,
  LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"

export function AccountSidebar() {
  const pathname = usePathname()

  const mainLinks = [
    { href: "/account", label: "Dashboard", icon: Home },
    { href: "/account/orders", label: "Orders", icon: Package },
    { href: "/account/profile", label: "Profile", icon: User },
    { href: "/account/addresses", label: "Addresses", icon: MapPin },
  ]

  const bottomLinks = [
    { href: "/account/help", label: "Help & Support", icon: Headphones },
  ]

  return (
    <aside className="w-64 hidden md:flex flex-col gap-2 shrink-0 border-r border-gray-100 pr-6 mr-6">
      <nav className="flex flex-col gap-1 w-full">
        {mainLinks.map((link) => {
          const Icon = link.icon
          const isActive = link.href === '/account' 
            ? pathname === '/account'
            : pathname.startsWith(link.href)
          
          return (
            <Link 
              key={link.href}
              href={link.href} 
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive 
                  ? "bg-[#eef4fb] text-[#1434CB] font-semibold" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
              )}
            >
              <Icon className="w-5 h-5" />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-1 w-full">
        {bottomLinks.map((link) => {
          const Icon = link.icon
          const isActive = link.href === '/account' 
            ? pathname === '/account'
            : pathname.startsWith(link.href)
          
          return (
            <Link 
              key={link.href}
              href={link.href} 
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive 
                  ? "bg-[#eef4fb] text-[#1434CB] font-semibold" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
              )}
            >
              <Icon className="w-5 h-5" />
              {link.label}
            </Link>
          )
        })}
        <Link href="/api/auth/signout" className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 font-medium transition-colors">
          <LogOut className="w-5 h-5" />
          Logout
        </Link>
      </div>
    </aside>
  )
}
