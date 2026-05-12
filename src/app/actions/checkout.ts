"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

type CheckoutItem = {
  id: string; // ProductVariant ID
  quantity: number;
}

export async function processCheckout(items: CheckoutItem[], addressId: string, mpesaPhone: string) {
  const session = await auth()
  
  if (!session?.user?.email) {
    return { error: "You must be logged in to checkout." }
  }

  if (!items || items.length === 0) {
    return { error: "Your cart is empty." }
  }

  if (!addressId) {
    return { error: "Please select a delivery address." }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) return { error: "User not found." }

    // 1. Fetch the exact address string to save to the order snapshot
    const address = await prisma.address.findUnique({
      where: { id: addressId }
    })

    if (!address || address.userId !== user.id) {
      return { error: "Invalid delivery address." }
    }

    const deliveryAddressSnapshot = `${address.street}, ${address.city}${address.state ? `, ${address.state}` : ''} ${address.zip || ''}`.trim()

    // 2. Fetch fresh prices from the database to prevent client-side tampering
    let calculatedSubtotal = 0
    const orderItemsData = []

    for (const item of items) {
      const variant = await prisma.productVariant.findUnique({
        where: { id: item.id }
      })

      if (!variant) {
        return { error: `Product variant not found: ${item.id}` }
      }

      calculatedSubtotal += variant.price * item.quantity
      
      orderItemsData.push({
        variantId: variant.id,
        quantity: item.quantity,
        price: variant.price // Record the price at the time of purchase
      })
    }

    // Add delivery fee logic (e.g. flat $2.00 / 200 KES fee)
    const deliveryFee = 2.00 
    const finalTotal = calculatedSubtotal + deliveryFee

    // 3. Create the Order and OrderItems in a transaction
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalPrice: finalTotal,
        deliveryAddress: deliveryAddressSnapshot,
        paymentMethod: "MPESA",
        paymentStatus: "PENDING",
        status: "PENDING",
        items: {
          create: orderItemsData
        }
      }
    })

    // 4. In a real app, you would initiate the M-Pesa STK Push API call here 
    // using the `mpesaPhone` and `finalTotal`.
    console.log(`Mocking M-Pesa STK Push to ${mpesaPhone} for KSH ${finalTotal}`)

    revalidatePath("/account")
    revalidatePath("/account/orders")

    return { success: true, orderId: order.id }
  } catch (error) {
    console.error("Checkout error:", error)
    return { error: "An unexpected error occurred during checkout." }
  }
}
