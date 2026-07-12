"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { writeFile } from "fs/promises"
import * as fs from "fs"
import path from "path"
import { randomUUID } from "crypto"

export async function uploadProfilePicture(formData: FormData) {
  const session = await auth()
  
  if (!session?.user?.email) {
    return { error: "Unauthorized" }
  }

  const file = formData.get("file") as File
  if (!file || file.size === 0) {
    return { error: "No file selected." }
  }

  // Basic validation (2MB limit)
  if (file.size > 2 * 1024 * 1024) {
    return { error: "File size exceeds 2MB limit." }
  }

  const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
  if (!validTypes.includes(file.type)) {
    return { error: "Invalid file type. Only JPG, PNG, GIF, and WEBP are allowed." }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) return { error: "User not found." }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create a unique filename
    const extension = file.name.split('.').pop()
    const fileName = `profile-${user.id}-${randomUUID()}.${extension}`
    
    // Save to public/uploads directory (ensure directory exists in production, but for this demo public/ is fine)
    const uploadDir = path.join(process.cwd(), "public", "uploads")
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName)
    await writeFile(filePath, buffer)

    // Public URL path
    const imageUrl = `/uploads/${fileName}`

    await prisma.user.update({
      where: { id: user.id },
      data: { image: imageUrl }
    })

    revalidatePath("/account")
    revalidatePath("/account/profile")
    
    return { success: true, message: "Profile picture updated successfully!", imageUrl }
  } catch (error) {
    console.error("Profile picture upload error:", error)
    return { error: "Failed to upload profile picture." }
  }
}
export async function updateProfile(prevState: unknown, formData: FormData) {
  const session = await auth()
  
  if (!session?.user?.email) {
    return { error: "Unauthorized" }
  }

  const name = formData.get("fullName") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string

  if (!name || !email) {
    return { error: "Name and email are required." }
  }

  try {
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!currentUser) return { error: "User not found." }

    // Check if email is being changed and if it's already taken
    if (email !== currentUser.email) {
      const existingUser = await prisma.user.findUnique({ where: { email } })
      if (existingUser) {
        return { error: "This email is already in use by another account." }
      }
    }

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { name, email, phone }
    })

    revalidatePath("/account")
    revalidatePath("/account/profile")
    
    return { success: true, message: "Profile updated successfully!" }
  } catch (error) {
    console.error("Profile update error:", error)
    return { error: "Failed to update profile." }
  }
}

export async function updatePassword(prevState: unknown, formData: FormData) {
  const session = await auth()
  
  if (!session?.user?.email) {
    return { error: "Unauthorized" }
  }

  const currentPassword = formData.get("currentPassword") as string
  const newPassword = formData.get("newPassword") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: "All fields are required." }
  }

  if (newPassword !== confirmPassword) {
    return { error: "New passwords do not match." }
  }

  if (newPassword.length < 8) {
    return { error: "Password must be at least 8 characters long." }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user || !user.password) {
      return { error: "Account does not have a password set. You may have signed in with a provider." }
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password)
    
    if (!isPasswordValid) {
      return { error: "Incorrect current password." }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    })

    return { success: true, message: "Password updated successfully!" }
  } catch (error) {
    console.error("Password update error:", error)
    return { error: "Failed to update password." }
  }
}

export async function deleteAccount() {
  const session = await auth()
  
  if (!session?.user?.email) {
    return { error: "Unauthorized" }
  }

  try {
    await prisma.user.delete({
      where: { email: session.user.email }
    })
    
    // Server-side redirect to trigger sign out flow or just go home
    redirect("/api/auth/signout?callbackUrl=/")
  } catch (error) {
    console.error("Account deletion error:", error)
    return { error: "Failed to delete account." }
  }
}
