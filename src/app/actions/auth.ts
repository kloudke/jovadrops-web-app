"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import { signIn } from "@/auth"

export async function registerUser(prevState: any, formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirm-password") as string

    if (!name || !email || !password) {
      return { error: "Missing required fields." }
    }

    if (password !== confirmPassword) {
      return { error: "Passwords do not match." }
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { error: "An account with this email already exists." }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        // By default, role is CUSTOMER as defined in schema
      },
    })

    // Immediately log them in after successful registration
    // We must return a redirect or execute signIn which throws a redirect.
    // However, signIn with "credentials" provider usually needs to be done via the client or it might throw
    // To handle this cleanly in a server action, NextAuth `signIn` handles redirect automatically.
  } catch (error) {
    if ((error as Error).message?.includes("NEXT_REDIRECT")) {
      throw error // Re-throw Next.js redirects
    }
    return { error: "Failed to create account. Please try again." }
  }

  // NextAuth v5 signIn will redirect to the default URL (like /) or callbackUrl.
  // We place it outside the try-catch or ensure we re-throw the redirect error.
  await signIn("credentials", {
    email: formData.get("email"),
    password: formData.get("password"),
    redirectTo: "/products",
  })
}

export async function loginUser(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Missing required fields." }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/products",
    })
  } catch (error: any) {
    if (error.type === "CredentialsSignin") {
      return { error: "Invalid email or password." }
    }
    // `signIn` throws a redirect on success, which we must not catch and swallow.
    throw error
  }
}
