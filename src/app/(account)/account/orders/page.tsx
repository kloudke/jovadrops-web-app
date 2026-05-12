import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { cn } from "@/lib/utils"
import { 
  ChevronRight, 
  Search, 
  Filter, 
  ChevronDown, 
  RefreshCcw,
  ShieldCheck,
  Truck,
  Droplet,
  HeadphonesIcon
} from "lucide-react"

export default async function OrdersPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
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

  const currentTab = typeof searchParams.tab === 'string' ? searchParams.tab : 'all'

  // Build the where clause based on the tab
  const whereClause: Prisma.OrderWhereInput = { userId: user.id }
  if (currentTab === 'delivered') {
    whereClause.status = 'DELIVERED'
  } else if (currentTab === 'processing') {
    whereClause.status = { in: ['PENDING', 'PROCESSING', 'OUT_FOR_DELIVERY'] }
  } else if (currentTab === 'cancelled') {
    whereClause.status = 'CANCELLED'
  }

  const orders = await prisma.order.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
    include: {
      items: {
        include: {
          variant: {
            include: {
              product: true
            }
          }
        }
      }
    }
  })

  const tabs = [
    { id: 'all', label: 'All Orders' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'processing', label: 'Processing' },
    { id: 'cancelled', label: 'Cancelled' },
  ]

  return (
    <div className="pb-12">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-brand-primary">Home</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href="/account" className="hover:text-brand-primary">Account</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-[#0f2d5c] font-medium">Orders</span>
      </div>

      {/* Header Area */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0f2d5c] mb-2">My Orders</h1>
          <p className="text-muted-foreground">Track and manage your water orders.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input 
              type="text" 
              placeholder="Search by Order ID" 
              className="pl-10 h-10 border-gray-200 rounded-lg bg-white"
            />
          </div>
          <Button variant="outline" className="h-10 border-gray-200 text-[#0f2d5c] font-semibold rounded-lg px-4 bg-white">
            <Filter className="h-4 w-4 mr-2 text-gray-500" />
            Filter
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={`/account/orders${tab.id === 'all' ? '' : `?tab=${tab.id}`}`}
              className={cn(
                "whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm transition-colors",
                currentTab === tab.id
                  ? "border-[#1434CB] text-[#1434CB]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Orders List */}
      <div className="space-y-4 mb-8">
        {orders.length === 0 ? (
          <Card className="p-12 text-center border-none shadow-sm rounded-xl bg-white">
            <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#0f2d5c] mb-2">No orders found</h3>
            <p className="text-gray-500">We couldn&apos;t find any orders matching your criteria.</p>
          </Card>
        ) : (
          orders.map((order) => {
            const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0)
            // Just grab the first item for the primary display logic
            const primaryItem = order.items[0]
            const remainingItemsCount = order.items.length - 1

            return (
              <Card key={order.id} className="p-0 border border-gray-100 shadow-sm rounded-xl bg-white overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center p-6 gap-6">
                  
                  {/* Left: Order Info */}
                  <div className="w-full md:w-1/4 shrink-0">
                    <h3 className="text-lg font-extrabold text-[#0f2d5c] mb-1">#{order.id.slice(-6).toUpperCase()}</h3>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <span>{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>{totalItems} items</span>
                    </div>
                  </div>

                  {/* Middle: Items Preview */}
                  <div className="flex-1 flex items-center gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                    <div className="flex items-center">
                      {order.items.slice(0, 3).map((item, idx) => (
                        <div 
                          key={item.id} 
                          className={cn(
                            "w-16 h-16 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center shrink-0 relative overflow-hidden",
                            idx > 0 && "-ml-4 border-l-white shadow-[-4px_0_10px_rgba(0,0,0,0.05)]"
                          )}
                          style={{ zIndex: 10 - idx }}
                        >
                          <Image 
                            src={item.variant.product.image || '/20-liter-bottle.png'} 
                            alt={item.variant.name} 
                            width={30} 
                            height={45} 
                            className="object-contain"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-[#0f2d5c] text-sm truncate">{primaryItem?.variant.name}</h4>
                      {remainingItemsCount > 0 ? (
                        <p className="text-xs text-gray-500 mt-0.5">+{remainingItemsCount} more</p>
                      ) : (
                        <p className="text-xs text-gray-500 mt-0.5">{primaryItem?.variant.description || 'Standard size'}</p>
                      )}
                    </div>
                  </div>

                  {/* Right: Status & Actions */}
                  <div className="w-full md:w-auto shrink-0 flex flex-row md:flex-col items-center justify-between md:items-end gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                    <div className="text-left md:text-right">
                      <div className="text-lg font-extrabold text-[#0f2d5c] mb-1">KSH {order.totalPrice.toFixed(2)}</div>
                      <div className="mb-1">
                        {order.status === 'DELIVERED' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-green-100 text-green-800">Delivered</span>
                        )}
                        {(order.status === 'PENDING' || order.status === 'PROCESSING') && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800">Processing</span>
                        )}
                        {order.status === 'OUT_FOR_DELIVERY' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-purple-100 text-purple-800">Out for Delivery</span>
                        )}
                        {order.status === 'CANCELLED' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-red-100 text-red-800">Cancelled</span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500">
                        {order.status === 'DELIVERED' ? `Delivered on ${new Date(order.updatedAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}` : ''}
                        {(order.status === 'PENDING' || order.status === 'PROCESSING') ? `Estimated delivery: Soon` : ''}
                        {order.status === 'CANCELLED' ? `Cancelled on ${new Date(order.updatedAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}` : ''}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 w-full md:w-32">
                      <Button variant="outline" className="w-full h-8 text-xs font-semibold text-[#1434CB] border-gray-200 hover:bg-[#f4f7fb] hover:border-[#1434CB]">
                        View Details <ChevronDown className="w-3 h-3 ml-1" />
                      </Button>
                      <Button variant="outline" className="w-full h-8 text-xs font-semibold text-[#1434CB] border-gray-200 hover:bg-[#f4f7fb] hover:border-[#1434CB]">
                        <RefreshCcw className="w-3 h-3 mr-1.5" /> Reorder
                      </Button>
                    </div>
                  </div>

                </div>
              </Card>
            )
          })
        )}
      </div>

      {/* Pagination */}
      {orders.length > 0 && (
        <div className="flex items-center justify-between border-t border-gray-200 pt-6 mb-12">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{orders.length}</span> of <span className="font-medium">{orders.length}</span> orders
          </p>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="w-8 h-8 rounded text-gray-400 border-gray-200" disabled>&laquo;</Button>
            <Button variant="outline" size="icon" className="w-8 h-8 rounded text-gray-400 border-gray-200" disabled>&lsaquo;</Button>
            <Button variant="default" size="icon" className="w-8 h-8 rounded bg-[#1434CB] text-white">1</Button>
            {/* Mocked remaining pagination for visual parity */}
            <Button variant="outline" size="icon" className="w-8 h-8 rounded text-gray-600 border-gray-200 hover:bg-gray-50">2</Button>
            <Button variant="outline" size="icon" className="w-8 h-8 rounded text-gray-600 border-gray-200 hover:bg-gray-50">3</Button>
            <span className="px-2 text-gray-400">...</span>
            <Button variant="outline" size="icon" className="w-8 h-8 rounded text-gray-600 border-gray-200 hover:bg-gray-50">6</Button>
            <Button variant="outline" size="icon" className="w-8 h-8 rounded text-gray-600 border-gray-200 hover:bg-gray-50">&rsaquo;</Button>
            <Button variant="outline" size="icon" className="w-8 h-8 rounded text-gray-600 border-gray-200 hover:bg-gray-50">&raquo;</Button>
          </div>
        </div>
      )}

      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-[#f4f7fb] p-6 rounded-xl border border-[#e5eef7]">
        <div className="flex items-center gap-4">
          <div className="bg-white p-2.5 rounded-full text-blue-600 shadow-sm border border-blue-100 shrink-0">
            <ShieldCheck className="h-6 w-6 stroke-[1.5]" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#0f2d5c]">Secure Payments</h4>
            <p className="text-xs text-muted-foreground mt-0.5">Your payments are safe and protected.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white p-2.5 rounded-full text-blue-600 shadow-sm border border-blue-100 shrink-0">
            <Truck className="h-6 w-6 stroke-[1.5]" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#0f2d5c]">On-Time Delivery</h4>
            <p className="text-xs text-muted-foreground mt-0.5">Fast and reliable delivery to your doorstep.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white p-2.5 rounded-full text-blue-600 shadow-sm border border-blue-100 shrink-0">
            <Droplet className="h-6 w-6 stroke-[1.5]" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#0f2d5c]">Pure & Safe Water</h4>
            <p className="text-xs text-muted-foreground mt-0.5">100% purified water for you and your family.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white p-2.5 rounded-full text-blue-600 shadow-sm border border-blue-100 shrink-0">
            <HeadphonesIcon className="h-6 w-6 stroke-[1.5]" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#0f2d5c]">Need Help?</h4>
            <p className="text-xs text-muted-foreground mt-0.5">Our support team is here for you 24/7.</p>
          </div>
        </div>
      </div>
      
    </div>
  )
}
