import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Logo } from '@/components/ui/logo'

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F4F9FF] p-4 sm:p-6">
      {/* Main Card */}
      <div className="flex w-full max-w-[760px] bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh]">

        {/* Left side: Image */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#E6F0FF] to-[#D1E4FF] relative items-center justify-center overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute inset-0 bg-blue-400/5 blur-3xl rounded-full"></div>
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <Image
              src="/login.png"
              alt="JovaDrops Water"
              fill
              sizes="40vw"
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
        {/* Right side: Form */}
        <div className="w-full lg:w-1/2 flex flex-col p-6 overflow-y-auto">
          <div className="w-full max-w-[300px] mx-auto flex flex-col h-full justify-center">

            <div className="mb-4 flex justify-center transform scale-90">
              <Logo />
            </div>

            <div className="text-center mb-4">
              <h1 className="text-[20px] font-bold text-brand-dark mb-1 tracking-tight">Create Account</h1>
              <p className="text-slate-500 text-[11px]">Create an account to continue.</p>
            </div>

            <form className="space-y-2.5" action="#">
              <div className="space-y-1">
                <Label htmlFor="name" className="text-slate-700 font-semibold text-[10px] ml-1">Full Name</Label>
                <Input id="name" type="text" placeholder="Enter your full name" className="rounded-xl h-[38px] border-slate-200 bg-slate-50/50 focus-visible:bg-white focus-visible:ring-brand-primary/20 transition-all px-3 text-[12px]" required />
              </div>

              <div className="space-y-1">
                <Label htmlFor="email" className="text-slate-700 font-semibold text-[10px] ml-1">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" className="rounded-xl h-[38px] border-slate-200 bg-slate-50/50 focus-visible:bg-white focus-visible:ring-brand-primary/20 transition-all px-3 text-[12px]" required />
              </div>

              <div className="space-y-1">
                <Label htmlFor="phone" className="text-slate-700 font-semibold text-[10px] ml-1">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="Enter your phone number" className="rounded-xl h-[38px] border-slate-200 bg-slate-50/50 focus-visible:bg-white focus-visible:ring-brand-primary/20 transition-all px-3 text-[12px]" required />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password" className="text-slate-700 font-semibold text-[10px] ml-1">Password</Label>
                <Input id="password" type="password" placeholder="Create a password" className="rounded-xl h-[38px] border-slate-200 bg-slate-50/50 focus-visible:bg-white focus-visible:ring-brand-primary/20 transition-all px-3 text-[12px]" required />
              </div>

              <div className="space-y-1">
                <Label htmlFor="confirm-password" className="text-slate-700 font-semibold text-[10px] ml-1">Confirm Password</Label>
                <Input id="confirm-password" type="password" placeholder="Confirm your password" className="rounded-xl h-[38px] border-slate-200 bg-slate-50/50 focus-visible:bg-white focus-visible:ring-brand-primary/20 transition-all px-3 text-[12px]" required />
              </div>

              <div className="flex items-start space-x-2 pt-1 pb-1">
                <Checkbox id="terms" className="rounded mt-0.5 border-slate-300 text-brand-primary data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary scale-90" required />
                <Label htmlFor="terms" className="text-[11px] font-medium leading-tight text-slate-600 cursor-pointer select-none">
                  I agree to the <Link href="#" className="text-brand-primary hover:text-brand-primary/80 hover:underline font-semibold transition-all">Terms & Conditions</Link>
                </Label>
              </div>

              <Button type="submit" className="w-full h-[38px] rounded-xl text-[12px] font-semibold bg-brand-primary hover:bg-brand-primary/90 text-white shadow-md shadow-brand-primary/25 transition-all active:scale-[0.98]">
                Sign Up
              </Button>
            </form>

            <div className="mt-4 mb-3 flex items-center gap-3">
              <div className="h-[1px] flex-1 bg-slate-100"></div>
              <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">or continue with</span>
              <div className="h-[1px] flex-1 bg-slate-100"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-[38px] rounded-xl border-slate-200 hover:bg-slate-50 hover:border-slate-300 font-semibold text-slate-600 flex items-center justify-center gap-2 transition-all text-[12px]">
                <Image src="/google.svg" alt="Google" width={14} height={14} />
                Google
              </Button>
              <Button variant="outline" className="h-[38px] rounded-xl border-slate-200 hover:bg-slate-50 hover:border-slate-300 font-semibold text-slate-600 flex items-center justify-center gap-2 transition-all text-[12px]">
                <Image src="/apple-dark.svg" alt="Apple" width={14} height={14} />
                Apple
              </Button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-[11px] text-slate-500 font-medium">
                Already have an account? <Link href="/login" className="text-brand-primary font-bold hover:underline transition-all ml-1">Sign In</Link>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
