"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Logo } from '@/components/ui/logo'
import { useActionState } from 'react'
import { loginUser } from '@/app/actions/auth'

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginUser, undefined)

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F4F9FF] p-4 sm:p-6">
      {/* Main Card */}
      <div className="flex w-full max-w-[760px] bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[85vh]">

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

            <div className="mb-5 flex justify-center transform scale-90">
              <Logo />
            </div>

            <div className="text-center mb-5">
              <h1 className="text-[20px] font-bold text-brand-dark mb-1 tracking-tight">Welcome Back!</h1>
              <p className="text-slate-500 text-[11px]">Sign in to your account to continue.</p>
            </div>

            <form className="space-y-3" action={formAction}>
              {state?.error && (
                <div className="p-3 text-[12px] bg-red-50 text-red-600 rounded-xl border border-red-100 text-center">
                  {state.error}
                </div>
              )}
              
              <div className="space-y-1">
                <Label htmlFor="email" className="text-slate-700 font-semibold text-[11px] ml-1">Email</Label>
                <Input id="email" name="email" type="email" placeholder="Enter your email" className="rounded-xl h-[38px] border-slate-200 bg-slate-50/50 focus-visible:bg-white focus-visible:ring-brand-primary/20 transition-all px-3 text-[13px]" required />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password" className="text-slate-700 font-semibold text-[11px] ml-1">Password</Label>
                <div className="relative">
                  <Input id="password" name="password" type="password" placeholder="Enter your password" className="rounded-xl h-[38px] border-slate-200 bg-slate-50/50 focus-visible:bg-white focus-visible:ring-brand-primary/20 transition-all px-3 pr-9 text-[13px]" required />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 pb-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" name="remember" className="rounded border-slate-300 text-brand-primary data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary scale-90" />
                  <Label htmlFor="remember" className="text-[11px] font-medium leading-none text-slate-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none">
                    Remember me
                  </Label>
                </div>
                <Link href="#" className="text-[11px] font-semibold text-brand-primary hover:text-brand-primary/80 hover:underline transition-all">
                  Forgot Password?
                </Link>
              </div>

              <Button type="submit" disabled={isPending} className="w-full h-[38px] rounded-xl text-[12px] font-semibold bg-brand-primary hover:bg-brand-primary/90 text-white shadow-md shadow-brand-primary/25 transition-all active:scale-[0.98] disabled:opacity-70">
                {isPending ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-5 mb-4 flex items-center gap-3">
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

            <div className="mt-5 text-center">
              <p className="text-[11px] text-slate-500 font-medium">
                Don&apos;t have an account? <Link href="/register" className="text-brand-primary font-bold hover:underline transition-all ml-1">Sign Up</Link>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
