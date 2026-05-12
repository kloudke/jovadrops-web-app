"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { Edit, Trash2, CheckCircle } from "lucide-react"
import { deleteAddress, setDefaultAddress } from "@/app/actions/addresses"
import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function AddressActions({ addressId, isDefault }: { addressId: string, isDefault: boolean }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSettingDefault, setIsSettingDefault] = useState(false)

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this address?")) {
      setIsDeleting(true)
      await deleteAddress(addressId)
      setIsDeleting(false)
    }
  }

  const handleSetDefault = async () => {
    setIsSettingDefault(true)
    await setDefaultAddress(addressId)
    setIsSettingDefault(false)
  }

  return (
    <div className="flex flex-row md:flex-col gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 md:w-28 shrink-0 justify-end md:justify-center md:items-end">
      {!isDefault && (
        <Button 
          variant="ghost" 
          onClick={handleSetDefault}
          disabled={isSettingDefault}
          className="h-8 px-3 text-green-600 hover:text-green-700 hover:bg-green-50 font-semibold justify-start"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          {isSettingDefault ? "Setting..." : "Set Default"}
        </Button>
      )}
      <Link 
        href="/account/addresses" 
        className={cn(buttonVariants({ variant: "ghost" }), "h-8 px-3 text-[#1434CB] hover:text-[#1434CB] hover:bg-blue-50 font-semibold justify-start")}
      >
        <Edit className="w-4 h-4 mr-2" />
        Edit
      </Link>
      <Button 
        variant="ghost" 
        onClick={handleDelete}
        disabled={isDeleting}
        className="h-8 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 font-semibold justify-start"
      >
        <Trash2 className="w-4 h-4 mr-2" />
        {isDeleting ? "Deleting..." : "Delete"}
      </Button>
    </div>
  )
}
