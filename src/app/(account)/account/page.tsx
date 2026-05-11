import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { 
  Droplet, 
  FileText, 
  Truck, 
  Calendar, 
  Wallet, 
  ShoppingCart, 
  RefreshCcw, 
  User as UserIcon, 
  Edit, 
  MapPin, 
  Home, 
  Briefcase, 
  Users, 
  Plus,
  MoreVertical
} from "lucide-react"

export default async function AdminDashboardPage() {
  const session = await auth()
  
  if (!session) {
    redirect("/login")
  }

  const firstName = session.user?.name?.split(' ')[0] || 'User'

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0f2d5c] mb-1">
            Welcome back, {firstName}! 👋
          </h1>
          <p className="text-muted-foreground text-sm">
            Here's what's happening with your account today.
          </p>
        </div>
        <Link href="/products" className={cn(buttonVariants({ variant: "default" }), "bg-[#1434CB] hover:bg-[#0f2d5c] text-white font-semibold rounded-lg px-6")}>
          <Droplet className="w-4 h-4 mr-2" />
          Order Water
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border-none shadow-sm rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Orders</p>
              <h3 className="text-3xl font-extrabold text-[#0f2d5c]">24</h3>
            </div>
            <div className="bg-[#1434CB] text-white p-3 rounded-full">
              <FileText className="w-6 h-6" />
            </div>
          </div>
          <p className="text-xs text-gray-500">All time orders</p>
        </Card>

        <Card className="p-6 border-none shadow-sm rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Active Orders</p>
              <h3 className="text-3xl font-extrabold text-[#0f2d5c]">2</h3>
            </div>
            <div className="bg-[#22c55e] text-white p-3 rounded-full">
              <Truck className="w-6 h-6" />
            </div>
          </div>
          <p className="text-xs text-gray-500">Currently in progress</p>
        </Card>

        <Card className="p-6 border-none shadow-sm rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Last Order</p>
              <h3 className="text-xl font-extrabold text-[#0f2d5c] mt-1 mb-2">May 10, 2024</h3>
            </div>
            <div className="bg-[#f97316] text-white p-3 rounded-full">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
          <p className="text-xs text-gray-500">Order #JD1256</p>
        </Card>

        <Card className="p-6 border-none shadow-sm rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Spent</p>
              <h3 className="text-3xl font-extrabold text-[#0f2d5c]">$126.50</h3>
            </div>
            <div className="bg-[#a855f7] text-white p-3 rounded-full">
              <Wallet className="w-6 h-6" />
            </div>
          </div>
          <p className="text-xs text-gray-500">Across all orders</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column (Quick Actions, Recent Orders, Addresses) */}
        <div className="xl:col-span-2 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="space-y-4">
              <h2 className="font-bold text-[#0f2d5c] text-lg">Quick Actions</h2>
              
              <Link href="/products" className="block group">
                <Card className="p-5 border border-[#e5eef7] shadow-none bg-[#f4f7fb] hover:bg-[#eef4fb] transition-colors rounded-xl flex items-center gap-4">
                  <div className="bg-white p-3 rounded-full text-[#1434CB] shadow-sm">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0f2d5c] text-sm mb-0.5">Order Water</h4>
                    <p className="text-xs text-gray-500">Place a new order</p>
                  </div>
                </Card>
              </Link>

              <Link href="/cart" className="block group">
                <Card className="p-5 border border-[#e5eef7] shadow-none bg-[#f4f7fb] hover:bg-[#eef4fb] transition-colors rounded-xl flex items-center gap-4">
                  <div className="bg-white p-3 rounded-full text-[#1434CB] shadow-sm">
                    <RefreshCcw className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0f2d5c] text-sm mb-0.5">Reorder Last Purchase</h4>
                    <p className="text-xs text-gray-500">Quickly order again</p>
                  </div>
                </Card>
              </Link>
            </div>

            {/* Recent Orders */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-[#0f2d5c] text-lg">Recent Orders</h2>
                <Link href="/account/orders" className="text-sm font-semibold text-[#1434CB] hover:underline">
                  View All Orders
                </Link>
              </div>

              <Card className="border-none shadow-sm rounded-xl overflow-hidden bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white text-gray-500 font-medium border-b border-gray-100">
                      <tr>
                        <th className="px-6 py-4 font-semibold">Order ID</th>
                        <th className="px-6 py-4 font-semibold">Date</th>
                        <th className="px-6 py-4 font-semibold">Items</th>
                        <th className="px-6 py-4 font-semibold">Total</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-[#0f2d5c]">#JD1256</td>
                        <td className="px-6 py-4 text-gray-600">May 10, 2024</td>
                        <td className="px-6 py-4 text-gray-600">2 items</td>
                        <td className="px-6 py-4 text-gray-600">$17.50</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-green-50 text-green-700">
                            Delivered
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-[#0f2d5c]">#JD1233</td>
                        <td className="px-6 py-4 text-gray-600">May 05, 2024</td>
                        <td className="px-6 py-4 text-gray-600">3 items</td>
                        <td className="px-6 py-4 text-gray-600">$24.00</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-green-50 text-green-700">
                            Delivered
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-[#0f2d5c]">#JD1201</td>
                        <td className="px-6 py-4 text-gray-600">Apr 28, 2024</td>
                        <td className="px-6 py-4 text-gray-600">2 items</td>
                        <td className="px-6 py-4 text-gray-600">$15.50</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700">
                            Processing
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-[#0f2d5c]">#JD1150</td>
                        <td className="px-6 py-4 text-gray-600">Apr 20, 2024</td>
                        <td className="px-6 py-4 text-gray-600">1 item</td>
                        <td className="px-6 py-4 text-gray-600">$7.50</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-red-50 text-red-700">
                            Cancelled
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>

          {/* Your Addresses */}
          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-[#0f2d5c] text-lg">Your Addresses</h2>
              <Link href="/account/addresses" className="text-sm font-semibold text-[#1434CB] hover:underline">
                Manage Addresses
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-5 border border-blue-100 shadow-sm rounded-xl bg-[#f8fbff]">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2 text-[#0f2d5c] font-bold text-sm">
                    <Home className="w-4 h-4" />
                    Home
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                    Default
                  </span>
                </div>
                <div className="text-xs text-gray-600 space-y-1 mb-4">
                  <p>123 Waterview Street</p>
                  <p>Hydration City, HC 12345</p>
                  <p>+1 234 567 8900</p>
                </div>
                <p className="text-xs font-semibold text-[#0f2d5c]">{session.user?.name || 'John Doe'}</p>
              </Card>

              <Card className="p-5 border-none shadow-sm rounded-xl bg-white relative group">
                <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 text-[#0f2d5c] font-bold text-sm mb-3">
                  <Briefcase className="w-4 h-4" />
                  Office
                </div>
                <div className="text-xs text-gray-600 space-y-1 mb-4">
                  <p>456 Business Avenue</p>
                  <p>Hydration City, HC 12345</p>
                  <p>+1 234 567 6540</p>
                </div>
                <p className="text-xs font-semibold text-[#0f2d5c]">{session.user?.name || 'John Doe'}</p>
              </Card>

              <Card className="p-5 border-none shadow-sm rounded-xl bg-white relative group">
                <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 text-[#0f2d5c] font-bold text-sm mb-3">
                  <Users className="w-4 h-4" />
                  Parents' Home
                </div>
                <div className="text-xs text-gray-600 space-y-1 mb-4">
                  <p>789 Green Lane</p>
                  <p>Hydration City, HC 12345</p>
                  <p>+1 234 567 1111</p>
                </div>
                <p className="text-xs font-semibold text-[#0f2d5c]">{session.user?.name || 'John Doe'}</p>
              </Card>

              <Card className="p-5 border-2 border-dashed border-gray-200 shadow-none rounded-xl bg-transparent flex flex-col items-center justify-center text-center hover:bg-white hover:border-blue-200 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#1434CB] mb-3 group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
                  <Plus className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-[#1434CB]">Add New Address</span>
              </Card>
            </div>
          </div>

        </div>

        {/* Right Column (Account Summary, Default Address, Payment Method) */}
        <div className="xl:col-span-1 space-y-6">
          
          <Card className="p-6 border-none shadow-sm rounded-xl bg-white">
            <h2 className="font-bold text-[#0f2d5c] text-lg mb-6">Account Summary</h2>
            
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-[#f4f7fb] border border-[#e5eef7] flex items-center justify-center text-[#1434CB] shrink-0">
                <UserIcon className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-[#0f2d5c] text-base truncate">{session.user?.name || 'John Doe'}</h3>
                <p className="text-sm text-gray-500 truncate mb-1">{session.user?.email || 'john.doe@email.com'}</p>
                <p className="text-sm text-gray-500">+1 234 567 8900</p>
              </div>
            </div>

            <Button variant="outline" className="w-full text-[#0f2d5c] border-gray-200 font-semibold rounded-lg h-10">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </Card>

          <Card className="p-6 border-none shadow-sm rounded-xl bg-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-[#0f2d5c] text-base">Default Address</h2>
              <Link href="/account/addresses" className="text-xs font-semibold text-[#1434CB] hover:underline">
                Manage
              </Link>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-[#1434CB] bg-blue-50 p-1.5 rounded-full shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>123 Waterview Street</p>
                <p>Hydration City, HC 12345</p>
                <p>+1 234 567 8900</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-none shadow-sm rounded-xl bg-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-[#0f2d5c] text-base">Payment Method</h2>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gray-50 px-3 py-1.5 rounded border border-gray-100 flex items-center justify-center">
                  <Image src="/m-pesa.png" alt="M-Pesa" width={40} height={20} className="object-contain" />
                </div>
                <span className="text-sm font-semibold text-[#0f2d5c]">+1 234 567 8900</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-green-100 text-green-700 rounded">
                Default
              </span>
            </div>
          </Card>

        </div>
      </div>
    </div>
  )
}