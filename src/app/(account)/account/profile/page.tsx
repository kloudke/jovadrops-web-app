import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import { 
  ChevronRight, 
  User, 
  Lock, 
  Settings, 
  Upload, 
  Calendar, 
  ShieldCheck, 
  MonitorSmartphone,
} from "lucide-react"
import { PersonalInformationForm, ChangePasswordForm, DeleteAccountCard } from "./profile-components"

export default async function ProfilePage() {
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

  return (
    <div className="pb-12">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href="/account" className="hover:text-brand-primary transition-colors">Account</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-[#0f2d5c] font-medium">Profile</span>
      </div>

      {/* Header Area */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#0f2d5c] mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and account settings.</p>
      </div>

      {/* Top Grid - 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Column 1: Personal Information */}
        <Card className="p-6 md:p-8 border-none shadow-sm rounded-xl bg-white">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-[#1434CB]" />
            <h2 className="font-bold text-[#0f2d5c] text-lg">Personal Information</h2>
          </div>
          <PersonalInformationForm user={{ name: user.name, email: user.email, phone: user.phone }} />
        </Card>

        {/* Column 2: Change Password */}
        <Card className="p-6 md:p-8 border-none shadow-sm rounded-xl bg-white">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-5 h-5 text-[#1434CB]" />
            <h2 className="font-bold text-[#0f2d5c] text-lg">Change Password</h2>
          </div>
          <ChangePasswordForm />
        </Card>

        {/* Column 3: Profile Picture & Activity */}
        <div className="space-y-8">
          <Card className="p-6 md:p-8 border-none shadow-sm rounded-xl bg-white">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="w-5 h-5 text-[#1434CB]" />
              <h2 className="font-bold text-[#0f2d5c] text-lg">Profile Picture</h2>
            </div>
            
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-[#f4f7fb] border-2 border-[#e5eef7] flex items-center justify-center text-[#1434CB]">
                <User className="w-10 h-10 stroke-[1.5]" />
              </div>
              <div className="space-y-3 w-full">
                <p className="text-xs text-gray-500">JPG, PNG or GIF. Max size 2MB.</p>
                <Button variant="outline" className="w-full h-10 border-[#1434CB] text-[#1434CB] hover:bg-[#eef4fb] font-semibold rounded-lg">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New Photo
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 md:p-8 border-none shadow-sm rounded-xl bg-white">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="w-5 h-5 text-[#1434CB]" />
              <h2 className="font-bold text-[#0f2d5c] text-lg">Account Activity</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#f4f7fb] p-2 rounded-lg text-[#1434CB] shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#0f2d5c] mb-0.5">Account Created</h4>
                  <p className="text-xs text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#f4f7fb] p-2 rounded-lg text-[#1434CB] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#0f2d5c] mb-0.5">Last Login</h4>
                  <p className="text-xs text-gray-500">May 20, 2024 at 09:15 AM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#f4f7fb] p-2 rounded-lg text-[#1434CB] shrink-0">
                  <MonitorSmartphone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#0f2d5c] mb-0.5">Logged in From</h4>
                  <p className="text-xs text-gray-500">Hydration City, HC 12345</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Delete Account (Spans all columns) */}
        <DeleteAccountCard />

      </div>

    </div>
  )
}
