"use client"

import { useActionState, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Eye, Info, Trash2 } from "lucide-react"
import { updateProfile, updatePassword, deleteAccount } from "@/app/actions/profile"

export function PersonalInformationForm({ user }: { user: { name?: string | null, email?: string | null, phone?: string | null } }) {
  const [state, formAction, isPending] = useActionState(updateProfile, undefined)

  return (
    <form className="space-y-5" action={formAction}>
      {state?.error && (
        <div className="p-3 text-sm bg-red-50 text-red-600 rounded-lg border border-red-100 text-center font-medium">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="p-3 text-sm bg-green-50 text-green-700 rounded-lg border border-green-100 text-center font-medium">
          {state.message}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">Full Name</Label>
        <Input 
          id="fullName" 
          name="fullName"
          defaultValue={user.name || ""} 
          className="h-12 border-gray-200 focus-visible:ring-[#1434CB]/20 rounded-lg" 
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</Label>
        <Input 
          id="email" 
          name="email"
          type="email" 
          defaultValue={user.email || ""} 
          className="h-12 border-gray-200 focus-visible:ring-[#1434CB]/20 rounded-lg" 
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone Number</Label>
        <Input 
          id="phone" 
          name="phone"
          defaultValue={user.phone || ""} 
          placeholder="+254 712 345 678"
          className="h-12 border-gray-200 focus-visible:ring-[#1434CB]/20 rounded-lg placeholder:text-gray-400" 
        />
      </div>

      <Button disabled={isPending} className="w-full bg-[#1434CB] hover:bg-[#0f2d5c] text-white font-semibold h-12 rounded-lg mt-2 disabled:opacity-50">
        {isPending ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  )
}

export function ChangePasswordForm() {
  const [state, formAction, isPending] = useActionState(updatePassword, undefined)
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <form className="space-y-5" action={formAction}>
      {state?.error && (
        <div className="p-3 text-sm bg-red-50 text-red-600 rounded-lg border border-red-100 text-center font-medium">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="p-3 text-sm bg-green-50 text-green-700 rounded-lg border border-green-100 text-center font-medium">
          {state.message}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="currentPassword" className="text-sm font-semibold text-gray-700">Current Password</Label>
        <div className="relative">
          <Input 
            id="currentPassword" 
            name="currentPassword"
            type={showCurrent ? "text" : "password"} 
            placeholder="Enter current password" 
            className="h-12 border-gray-200 focus-visible:ring-[#1434CB]/20 rounded-lg pr-10" 
            required
          />
          <button 
            type="button" 
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="newPassword" className="text-sm font-semibold text-gray-700">New Password</Label>
        <div className="relative">
          <Input 
            id="newPassword" 
            name="newPassword"
            type={showNew ? "text" : "password"} 
            placeholder="Enter new password" 
            className="h-12 border-gray-200 focus-visible:ring-[#1434CB]/20 rounded-lg pr-10" 
            required
            minLength={8}
          />
          <button 
            type="button" 
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">Confirm New Password</Label>
        <div className="relative">
          <Input 
            id="confirmPassword" 
            name="confirmPassword"
            type={showConfirm ? "text" : "password"} 
            placeholder="Confirm new password" 
            className="h-12 border-gray-200 focus-visible:ring-[#1434CB]/20 rounded-lg pr-10" 
            required
            minLength={8}
          />
          <button 
            type="button" 
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-[#f4f7fb] border border-[#e5eef7] rounded-lg p-4 flex gap-3 text-sm text-[#0f2d5c]">
        <Info className="w-4 h-4 shrink-0 text-[#1434CB] mt-0.5" />
        <p>Password must be at least 8 characters long and include a number and a special character.</p>
      </div>

      <Button disabled={isPending} className="w-full bg-[#1434CB] hover:bg-[#0f2d5c] text-white font-semibold h-12 rounded-lg disabled:opacity-50">
        {isPending ? "Updating..." : "Update Password"}
      </Button>
    </form>
  )
}

export function DeleteAccountCard() {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (confirm("Are you absolutely sure? This action cannot be undone. All your orders, addresses, and data will be permanently deleted.")) {
      setIsDeleting(true)
      await deleteAccount()
      // If it fails, we turn off the loading state. 
      // If it succeeds, the server action redirects to logout.
      setIsDeleting(false) 
    }
  }

  return (
    <Card className="lg:col-span-3 p-6 md:p-8 border border-red-100 shadow-sm rounded-xl bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="bg-red-50 p-3 rounded-full text-red-600 shrink-0">
          <Trash2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-[#0f2d5c] text-base mb-1">Delete Account</h3>
          <p className="text-sm text-gray-500">Once you delete your account, there is no going back. Please be certain.</p>
        </div>
      </div>
      <Button 
        variant="outline" 
        onClick={handleDelete}
        disabled={isDeleting}
        className="shrink-0 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold h-10 px-6 rounded-lg w-full md:w-auto"
      >
        {isDeleting ? "Deleting..." : "Delete Account"}
      </Button>
    </Card>
  )
}
