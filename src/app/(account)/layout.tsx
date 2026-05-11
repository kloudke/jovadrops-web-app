import { PublicNavbar } from "@/components/layout/public-navbar"
import { PublicFooter } from "@/components/layout/public-footer"
import { AccountSidebar } from "@/components/layout/account-sidebar"
import { auth } from "@/auth"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/30">
      <PublicNavbar session={session} />

      <div className="flex-1 flex container mx-auto px-4 lg:px-8 py-8 max-w-7xl">
        <AccountSidebar />

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>

      <PublicFooter />
    </div>
  )
}
