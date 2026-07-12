import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication | JovaDrops",
  description: "Sign in or create an account at JovaDrops",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-white">
      {children}
    </main>
  )
}
