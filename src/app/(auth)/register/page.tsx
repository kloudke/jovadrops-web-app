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
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#E6F0FF] to-[#D1E4FF] relative items-center justify-center p-6">
          {/* Decorative background glow */}
          <div className="absolute inset-0 bg-blue-400/5 blur-3xl rounded-full"></div>
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <Image
              src="/form.png"
              alt="JovaDrops Water"
              fill
              sizes="40vw"
              className="object-contain p-4 drop-shadow-2xl hover:scale-105 transition-transform duration-700"
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
              <p className="text-slate-500 text-[11px]">If you don't have an account, create one to proceed.</p>
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="h-[38px] rounded-xl border-slate-200 hover:bg-slate-50 hover:border-slate-300 font-semibold text-slate-600 flex items-center justify-center gap-2 transition-all text-[12px]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.05 20.28c-.98.68-2.05 1.34-3.21 1.34-1.18 0-1.57-.75-3.11-.75-1.53 0-1.95.73-3.1.75-1.19.02-2.38-.72-3.41-2.22-2.09-3.03-3.71-8.58-1.58-12.28 1.06-1.84 2.94-3.01 4.98-3.03 1.13-.02 2.22.75 2.95.75.74 0 2.05-.9 3.42-.77 1.45.05 2.78.6 3.54 1.7-2.95 1.77-2.47 5.92.42 7.02-.67 1.71-1.42 3.32-2.37 4.71a17.26 17.26 0 01-1.53 2.78zM14.92 4.19c.6-.74 1.01-1.78.9-2.82-1.01.04-2.1.66-2.73 1.42-.55.65-.99 1.71-.87 2.74 1.13.09 2.1-.56 2.7-1.34z" />
                </svg>
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
