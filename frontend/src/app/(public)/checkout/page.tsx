import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { CheckoutClient } from "./checkout-client"

export default async function CheckoutPage() {
  const session = await auth()
  
  if (!session?.user?.email) {
    redirect("/login?callbackUrl=/checkout")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      addresses: {
        orderBy: [
          { isDefault: 'desc' },
          { createdAt: 'desc' }
        ]
      }
    }
  })

  if (!user) {
    redirect("/login")
  }

  // Pass user details and addresses to the client component
  return (
    <div className="bg-gray-50/30 min-h-screen pb-12">
      <div className="container mx-auto px-4 pt-12 lg:pt-16 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-[#0f2d5c] mb-2">Checkout</h1>
          <p className="text-muted-foreground">Select your delivery address and pay securely with M-Pesa.</p>
        </div>
        
        <CheckoutClient 
          addresses={user.addresses} 
          defaultPhone={(user.phone as string) || ""} 
        />
      </div>
    </div>
  )
}
