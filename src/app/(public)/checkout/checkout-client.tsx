"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCartStore } from "@/lib/store/cart"
import { processCheckout } from "@/app/actions/checkout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { 
  MapPin, 
  Home, 
  Briefcase, 
  Users,
  CheckCircle2,
  Lock,
  Smartphone,
  Info,
  ChevronRight
} from "lucide-react"

export function CheckoutClient({ addresses, defaultPhone }: { addresses: any[], defaultPhone: string }) {
  const router = useRouter()
  const { items, clearCart, subtotal: getSubtotal } = useCartStore()
  
  const defaultAddressId = addresses.find(a => a.isDefault)?.id || addresses[0]?.id || ""
  const [selectedAddressId, setSelectedAddressId] = useState<string>(defaultAddressId)
  const [mpesaPhone, setMpesaPhone] = useState(defaultPhone)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const subtotal = getSubtotal()
  const deliveryFee = subtotal > 0 ? 2.00 : 0
  const total = subtotal + deliveryFee

  if (items.length === 0 && !isProcessing) {
    return (
      <Card className="p-12 text-center border-none shadow-sm rounded-xl bg-white max-w-2xl mx-auto">
        <h3 className="text-xl font-bold text-[#0f2d5c] mb-2">Your cart is empty</h3>
        <p className="text-gray-500 mb-6">You need to add items to your cart before checking out.</p>
        <Link href="/products" className={cn(buttonVariants({ variant: "default" }), "bg-[#1434CB] hover:bg-[#0f2d5c] text-white font-semibold rounded-lg px-6 h-10 flex items-center justify-center")}>
          Browse Products
        </Link>
      </Card>
    )
  }

  const handlePayment = async () => {
    setError(null)
    
    if (!selectedAddressId) {
      setError("Please select a delivery address.")
      return
    }

    if (!mpesaPhone || mpesaPhone.length < 9) {
      setError("Please enter a valid M-Pesa phone number.")
      return
    }

    setIsProcessing(true)

    // Map Zustand store items to the format expected by the Server Action
    const checkoutItems = items.map(item => ({
      id: item.id,
      quantity: item.quantity
    }))

    const result = await processCheckout(checkoutItems, selectedAddressId, mpesaPhone)

    if (result.error) {
      setError(result.error)
      setIsProcessing(false)
    } else if (result.success) {
      clearCart()
      alert("Order placed successfully! Please check your phone for the M-Pesa PIN prompt.")
      router.push("/account/orders")
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column (Address & Payment) */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Delivery Address Section */}
        <Card className="p-6 md:p-8 border-none shadow-sm rounded-xl bg-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-full text-[#1434CB]">
                <MapPin className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-[#0f2d5c] text-xl">1. Delivery Address</h2>
            </div>
            {addresses.length > 0 && (
              <Link href="/account/addresses/new" className={cn(buttonVariants({ variant: "ghost" }), "text-[#1434CB] hover:bg-blue-50 hover:text-[#1434CB] h-8 px-3 text-xs font-semibold rounded-md")}>
                Add New
              </Link>
            )}
          </div>

          {addresses.length === 0 ? (
            <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
              <p className="text-gray-500 mb-4">You haven't saved any addresses yet.</p>
              <Link href="/account/addresses/new" className={cn(buttonVariants({ variant: "default" }), "bg-[#1434CB] hover:bg-[#0f2d5c] text-white")}>
                Add an Address
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {addresses.map((addr) => {
                let Icon = Home
                if (addr.type === "Office") Icon = Briefcase
                else if (addr.type === "Parents' Home" || addr.type === "Family") Icon = Users
                else if (addr.type === "Other" || addr.type === "Gym") Icon = MapPin

                const isSelected = selectedAddressId === addr.id

                return (
                  <div 
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={cn(
                      "p-4 border-2 rounded-xl cursor-pointer transition-all relative overflow-hidden",
                      isSelected 
                        ? "border-[#1434CB] bg-[#f8fbff]" 
                        : "border-gray-200 bg-white hover:border-blue-200"
                    )}
                  >
                    {isSelected && (
                      <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-[#1434CB] border-l-[40px] border-l-transparent">
                        <CheckCircle2 className="absolute -top-[34px] right-[4px] w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-[#0f2d5c] font-bold text-sm mb-2">
                      <Icon className="w-4 h-4" />
                      {addr.type}
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p className="truncate">{addr.street}</p>
                      <p>{addr.city}{addr.state ? `, ${addr.state}` : ''}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </Card>

        {/* Payment Method Section */}
        <Card className="p-6 md:p-8 border-none shadow-sm rounded-xl bg-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-50 p-2 rounded-full text-[#1434CB]">
              <Smartphone className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-[#0f2d5c] text-xl">2. Payment Details</h2>
          </div>

          <div className="space-y-6">
            <div className="p-4 border-2 border-[#1434CB] bg-[#f8fbff] rounded-xl relative flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-[#1434CB] border-l-[40px] border-l-transparent hidden sm:block">
                <CheckCircle2 className="absolute -top-[34px] right-[4px] w-4 h-4 text-white" />
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200 shrink-0">
                <Image src="/m-pesa.png" alt="M-Pesa" width={60} height={30} className="object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-[#0f2d5c]">Pay with M-Pesa</h3>
                <p className="text-xs text-gray-500">We will send a payment prompt to your phone.</p>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="mpesaPhone" className="text-sm font-semibold text-gray-700">M-Pesa Phone Number</Label>
              <Input 
                id="mpesaPhone" 
                value={mpesaPhone}
                onChange={(e) => setMpesaPhone(e.target.value)}
                placeholder="+254 712 345 678"
                className="h-12 border-gray-200 focus-visible:ring-[#1434CB]/20 rounded-lg text-lg font-medium" 
              />
              <div className="flex items-start gap-2 text-xs text-gray-500">
                <Info className="w-4 h-4 shrink-0 text-blue-500" />
                <p>Ensure this phone is nearby and unlocked. You will need to enter your M-Pesa PIN.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Right Column (Order Summary) */}
      <div className="lg:col-span-1">
        <Card className="p-6 md:p-8 sticky top-24 border-none shadow-sm rounded-xl bg-white">
          <h2 className="text-xl font-extrabold text-[#0f2d5c] mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 bg-gray-50 rounded flex items-center justify-center shrink-0 border border-gray-100">
                    <Image src={item.image || "/20-liter-bottle.png"} alt={item.name} width={20} height={30} className="object-contain" />
                  </div>
                  <div className="truncate">
                    <p className="font-semibold text-[#0f2d5c] truncate">{item.name}</p>
                    <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-900 shrink-0">KSH {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-5 space-y-4 mb-6">
            <div className="flex justify-between text-gray-600 text-sm">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">KSH {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 text-sm items-center">
              <span>Delivery Fee</span>
              <span className="font-semibold text-gray-900">KSH {deliveryFee.toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-5 mb-8">
            <div className="flex justify-between items-center">
              <span className="text-xl font-extrabold text-[#0f2d5c]">Total</span>
              <span className="text-2xl font-extrabold text-[#1434CB]">KSH {total.toFixed(2)}</span>
            </div>
          </div>

          {error && (
            <div className="p-3 mb-4 text-sm bg-red-50 text-red-600 rounded-lg border border-red-100 text-center font-medium">
              {error}
            </div>
          )}

          <Button 
            onClick={handlePayment}
            disabled={isProcessing || !selectedAddressId || items.length === 0}
            className="w-full bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-semibold h-14 text-base rounded-lg shadow-sm disabled:opacity-50"
          >
            {isProcessing ? "Processing..." : "Confirm & Pay"}
            {!isProcessing && <ChevronRight className="w-5 h-5 ml-1" />}
          </Button>

          <div className="mt-6 flex items-center justify-center text-xs text-green-700 font-medium bg-green-50/50 p-3 rounded-lg border border-green-100">
            <Lock className="h-3.5 w-3.5 mr-1.5" /> All transactions are secure and encrypted.
          </div>
        </Card>
      </div>

    </div>
  )
}
