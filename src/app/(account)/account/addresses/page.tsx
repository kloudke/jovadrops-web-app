import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
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
  Edit,
  Trash2,
  User,
  Phone,
  FileText,
  ShieldCheck
} from "lucide-react"

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

  // Mock addresses since they are not in the Prisma schema yet
  const addresses = [
    {
      id: "1",
      title: "Home",
      icon: Home,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      street: "123 Waterview Street",
      city: "Nairobi",
      state: "Nairobi County",
      zip: "00100",
      phone: "+254 712 345 678",
      name: user.name || "John Doe",
      instructions: "Leave at the door",
      tag: "Home",
      tagColor: "bg-blue-50 text-blue-700",
      isDefault: true
    },
    {
      id: "2",
      title: "Office",
      icon: Briefcase,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50",
      street: "456 Business Avenue",
      city: "Nairobi",
      state: "Nairobi County",
      zip: "00200",
      phone: "+254 722 987 654",
      name: user.name || "John Doe",
      instructions: "Call upon arrival",
      tag: "Work",
      tagColor: "bg-purple-50 text-purple-700",
      isDefault: false
    },
    {
      id: "3",
      title: "Parents' Home",
      icon: Users,
      iconColor: "text-green-600",
      iconBg: "bg-green-50",
      street: "789 Green Lane",
      city: "Kiambu",
      state: "Kiambu County",
      zip: "00900",
      phone: "+254 733 111 222",
      name: user.name || "John Doe",
      instructions: "Leave with security",
      tag: "Family",
      tagColor: "bg-green-50 text-green-700",
      isDefault: false
    },
    {
      id: "4",
      title: "Gym",
      icon: MapPin,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-50",
      street: "321 Fitness Blvd",
      city: "Nairobi",
      state: "Nairobi County",
      zip: "00100",
      phone: "+254 744 333 444",
      name: user.name || "John Doe",
      instructions: "Call before delivery",
      tag: "Other",
      tagColor: "bg-orange-50 text-orange-700",
      isDefault: false
    }
  ]

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
        <Button className="bg-[#1434CB] hover:bg-[#0f2d5c] text-white font-semibold rounded-lg px-6 h-12">
          <Plus className="w-4 h-4 mr-2" />
          Add New Address
        </Button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column (Address List) */}
        <div className="xl:col-span-2 space-y-4">
          {addresses.map((addr) => {
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
                  <div className="flex flex-row md:flex-col gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 md:w-28 shrink-0 justify-end md:justify-center md:items-end">
                    <Button variant="ghost" className="h-8 px-3 text-[#1434CB] hover:text-[#1434CB] hover:bg-blue-50 font-semibold justify-start">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="ghost" className="h-8 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 font-semibold justify-start">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>

                </div>
              </Card>
            )
          })}
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
