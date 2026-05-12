"use client"

import Link from "next/link"
import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ChevronRight, ChevronDown, MapPin } from "lucide-react"
import { addAddress } from "@/app/actions/addresses"
import { cn } from "@/lib/utils"

export default function NewAddressPage() {
  const [state, formAction, isPending] = useActionState(addAddress, undefined)
  const router = useRouter()

  useEffect(() => {
    if (state?.success) {
      router.push("/account/addresses")
    }
  }, [state, router])

  return (
    <div className="pb-12">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href="/account" className="hover:text-brand-primary transition-colors">Account</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href="/account/addresses" className="hover:text-brand-primary transition-colors">Addresses</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-[#0f2d5c] font-medium">New Address</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#0f2d5c] mb-2">Add New Address</h1>
        <p className="text-muted-foreground">Add a new delivery address to your account.</p>
      </div>

      <Card className="max-w-2xl p-6 md:p-8 border-none shadow-sm rounded-xl bg-white">
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="w-5 h-5 text-[#1434CB]" />
          <h2 className="font-bold text-[#0f2d5c] text-lg">Address Details</h2>
        </div>
        
        <form className="space-y-5" action={formAction}>
          {state?.error && (
            <div className="p-3 text-sm bg-red-50 text-red-600 rounded-lg border border-red-100 text-center font-medium">
              {state.error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-semibold text-gray-700">Address Type</Label>
            <div className="relative">
              <select name="type" id="type" className="w-full h-12 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1434CB]/20 appearance-none bg-white">
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Parents' Home">Parents' Home</option>
                <option value="Gym">Gym</option>
                <option value="Other">Other</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="street" className="text-sm font-semibold text-gray-700">Full Address *</Label>
            <Input 
              id="street" 
              name="street"
              placeholder="Street address, apartment, suite, etc." 
              className="h-12 border-gray-200 focus-visible:ring-[#1434CB]/20 rounded-lg" 
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-semibold text-gray-700">City / Town *</Label>
              <Input 
                id="city" 
                name="city"
                placeholder="Enter city" 
                className="h-12 border-gray-200 focus-visible:ring-[#1434CB]/20 rounded-lg" 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state" className="text-sm font-semibold text-gray-700">State / Province</Label>
              <Input 
                id="state" 
                name="state"
                placeholder="Enter state" 
                className="h-12 border-gray-200 focus-visible:ring-[#1434CB]/20 rounded-lg" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="zip" className="text-sm font-semibold text-gray-700">ZIP / Postal Code</Label>
              <Input 
                id="zip" 
                name="zip"
                placeholder="Enter ZIP code" 
                className="h-12 border-gray-200 focus-visible:ring-[#1434CB]/20 rounded-lg" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone Number (Optional)</Label>
            <Input 
              id="phone" 
              name="phone"
              placeholder="+254 712 345 678"
              className="h-12 border-gray-200 focus-visible:ring-[#1434CB]/20 rounded-lg placeholder:text-gray-400" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="instructions" className="text-sm font-semibold text-gray-700">Delivery Instructions (Optional)</Label>
            <Input 
              id="instructions" 
              name="instructions"
              placeholder="e.g. Leave at the door"
              className="h-12 border-gray-200 focus-visible:ring-[#1434CB]/20 rounded-lg" 
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link 
              href="/account/addresses" 
              className={cn(buttonVariants({ variant: "outline" }), "flex-1 h-12 border-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 flex items-center justify-center")}
            >
              Cancel
            </Link>
            <Button type="submit" disabled={isPending} className="flex-1 bg-[#1434CB] hover:bg-[#0f2d5c] text-white font-semibold h-12 rounded-lg disabled:opacity-50">
              {isPending ? "Saving..." : "Save Address"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
