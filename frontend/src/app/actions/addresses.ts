"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function addAddress(prevState: unknown, formData: FormData) {
  const session = await auth()
  
  if (!session?.user?.email) {
    return { error: "You must be logged in to add an address." }
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) {
    return { error: "User not found." }
  }

  const type = formData.get("type") as string || "Home"
  const street = formData.get("street") as string
  const city = formData.get("city") as string
  const state = formData.get("state") as string
  const zip = formData.get("zip") as string
  const phone = formData.get("phone") as string
  const instructions = formData.get("instructions") as string || null

  if (!street || !city) {
    return { error: "Street and City are required fields." }
  }

  try {
    // Check if it's the first address, if so make it default
    const addressCount = await prisma.address.count({
      where: { userId: user.id }
    })
    
    const isDefault = addressCount === 0

    await prisma.address.create({
      data: {
        userId: user.id,
        type,
        street,
        city,
        state,
        zip,
        phone,
        instructions,
        isDefault
      }
    })

    revalidatePath("/account/addresses")
    revalidatePath("/account")
    
    return { success: true }
  } catch (error) {
    console.error("Error adding address:", error)
    return { error: "Failed to save address. Please try again." }
  }
}

export async function deleteAddress(addressId: string) {
  const session = await auth()
  
  if (!session?.user?.email) {
    return { error: "Unauthorized" }
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    // Verify ownership
    const address = await prisma.address.findUnique({
      where: { id: addressId }
    })

    if (!address || address.userId !== user.id) {
      return { error: "Address not found or unauthorized." }
    }

    await prisma.address.delete({
      where: { id: addressId }
    })

    // If we deleted the default, make another one default if it exists
    if (address.isDefault) {
      const remainingAddress = await prisma.address.findFirst({
        where: { userId: user.id }
      })
      if (remainingAddress) {
        await prisma.address.update({
          where: { id: remainingAddress.id },
          data: { isDefault: true }
        })
      }
    }

    revalidatePath("/account/addresses")
    revalidatePath("/account")
    
    return { success: true }
  } catch (error) {
    console.error("Error deleting address:", error)
    return { error: "Failed to delete address." }
  }
}

export async function setDefaultAddress(addressId: string) {
  const session = await auth()
  
  if (!session?.user?.email) {
    return { error: "Unauthorized" }
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    // Unset all defaults for user
    await prisma.address.updateMany({
      where: { userId: user.id },
      data: { isDefault: false }
    })

    // Set new default
    await prisma.address.update({
      where: { id: addressId, userId: user.id },
      data: { isDefault: true }
    })

    revalidatePath("/account/addresses")
    revalidatePath("/account")
    
    return { success: true }
  } catch (error) {
    console.error("Error setting default address:", error)
    return { error: "Failed to set default address." }
  }
}
