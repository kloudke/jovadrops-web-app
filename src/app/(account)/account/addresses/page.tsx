import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import { cn } from "@/lib/utils"
import { 
  ChevronRight, 
  Plus,
  Home, 
  Briefcase, 
  Users, 
  MapPin,
  User,
  Phone,
  FileText,
  ShieldCheck
} from "lucide-react"
import { AddressActions } from "./address-actions"

export default async function AddressesPage() {
  const session = await auth()
  
  if (!session?.user?.email) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    redirect("/login")
  }

  const dbAddresses = await prisma.address.findMany({
    where: { userId: user.id },
    orderBy: [
      { isDefault: 'desc' },
      { createdAt: 'desc' }
    ]
  })

  // Map db addresses to the UI format
  const addresses = dbAddresses.map(addr => {
    let icon = Home
    let iconColor = "text-blue-600"
    let iconBg = "bg-blue-50"
    let tagColor = "bg-blue-50 text-blue-700"

    if (addr.type === "Office") {
      icon = Briefcase
      iconColor = "text-purple-600"
      iconBg = "bg-purple-50"
      tagColor = "bg-purple-50 text-purple-700"
    } else if (addr.type === "Parents' Home" || addr.type === "Family") {
      icon = Users
      iconColor = "text-green-600"
      iconBg = "bg-green-50"
      tagColor = "bg-green-50 text-green-700"
    } else if (addr.type === "Other" || addr.type === "Gym") {
      icon = MapPin
      iconColor = "text-orange-600"
      iconBg = "bg-orange-50"
      tagColor = "bg-orange-50 text-orange-700"
    }

    return {
      id: addr.id,
      title: addr.type,
      icon,
      iconColor,
      iconBg,
      street: addr.street,
      city: addr.city,
      state: addr.state || "",
      zip: addr.zip || "",
      phone: addr.phone || "N/A",
      name: user.name || "User",
      instructions: addr.instructions || "No instructions",
      tag: addr.type,
      tagColor,
      isDefault: addr.isDefault
    }
  })

  return (
    <div className="pb-12">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href="/account" className="hover:text-brand-primary transition-colors">Account</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-[#0f2d5c] font-medium">Addresses</span>
      </div>

      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0f2d5c] mb-2">My Addresses</h1>
          <p className="text-muted-foreground">Manage your saved delivery addresses.</p>
        </div>
        <Link href="/account/addresses/new" className={cn(buttonVariants({ variant: "default" }), "bg-[#1434CB] hover:bg-[#0f2d5c] text-white font-semibold rounded-lg px-6 h-12 flex items-center justify-center")}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Address
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column (Address List) */}
        <div className="xl:col-span-2 space-y-4">
          {addresses.length === 0 ? (
            <Card className="p-12 text-center border-none shadow-sm rounded-xl bg-white flex flex-col items-center justify-center">
              <div className="bg-blue-50 p-4 rounded-full mb-4 text-[#1434CB]">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#0f2d5c] mb-2">No addresses saved</h3>
              <p className="text-gray-500 mb-6">You haven&apos;t saved any delivery addresses yet.</p>
              <Link href="/account/addresses/new" className={cn(buttonVariants({ variant: "default" }), "bg-[#1434CB] hover:bg-[#0f2d5c] text-white font-semibold rounded-lg px-6 h-10 flex items-center justify-center")}>
                <Plus className="w-4 h-4 mr-2" />
                Add New Address
              </Link>
            </Card>
          ) : (
            addresses.map((addr) => {
              const Icon = addr.icon
              return (
              <Card key={addr.id} className="p-6 border-none shadow-sm rounded-xl bg-white transition-all hover:shadow-md">
                <div className="flex flex-col md:flex-row gap-6 md:items-center">
                  
                  {/* Left: Icon & Address */}
                  <div className="flex-1 flex gap-5">
                    <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center shrink-0", addr.iconBg, addr.iconColor)}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-[#0f2d5c] text-lg">{addr.title}</h3>
                        {addr.isDefault && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-green-100 text-green-700">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 space-y-0.5">
                        <p>{addr.street}</p>
                        <p>{addr.city}, {addr.state} {addr.zip}</p>
                        <p className="md:hidden mt-1">{addr.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Details */}
                  <div className="flex-1 flex flex-col gap-2 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-gray-100 md:pl-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4 text-gray-400" />
                      <span>{addr.name}</span>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{addr.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span>{addr.instructions}</span>
                    </div>
                    <div className="mt-1">
                      <span className={cn("px-2 py-0.5 rounded text-xs font-semibold", addr.tagColor)}>
                        {addr.tag}
                      </span>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <AddressActions addressId={addr.id} isDefault={addr.isDefault} />

                </div>
              </Card>
              )
            })
          )}
        </div>

        {/* Right Column (Sidebars) */}
        <div className="xl:col-span-1 space-y-6">
          
          {/* Tips Card */}
          <Card className="p-6 md:p-8 border-none shadow-sm rounded-xl bg-white">
            <h2 className="font-bold text-[#0f2d5c] text-lg mb-6">Address Tips</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#f4f7fb] p-2 rounded-lg text-[#1434CB] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#0f2d5c] mb-0.5">Set a default address</h4>
                  <p className="text-xs text-gray-500">Select an address as default for quicker checkout.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#f4f7fb] p-2 rounded-lg text-[#1434CB] shrink-0 mt-0.5">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#0f2d5c] mb-0.5">Add delivery instructions</h4>
                  <p className="text-xs text-gray-500">Help our delivery partners find you easily.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#f4f7fb] p-2 rounded-lg text-[#1434CB] shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#0f2d5c] mb-0.5">Keep your contact updated</h4>
                  <p className="text-xs text-gray-500">Ensure your phone number is current for smooth delivery.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#f4f7fb] p-2 rounded-lg text-[#1434CB] shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#0f2d5c] mb-0.5">Your information is safe</h4>
                  <p className="text-xs text-gray-500">We use secure encryption to protect your data.</p>
                </div>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  )
}
