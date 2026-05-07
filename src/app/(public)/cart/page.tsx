import Link from 'next/link';
import Image from 'next/image';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronRight, Trash2, Minus, Plus, Info, Lock, ArrowLeft, ShieldCheck, Truck, Award, Shield } from 'lucide-react';

export default function CartPage() {
  return (
    <div className="bg-gray-50/30 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-blue-900 font-medium">Cart</span>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-[#0f2d5c] mb-2">Your Cart</h1>
          <p className="text-muted-foreground">Review your items and proceed to checkout.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-0 border-none shadow-sm rounded-xl overflow-hidden bg-white">
              <div className="p-6 md:p-8">
                {/* Header Row */}
                <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-semibold text-gray-500 border-b pb-4 mb-6">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Subtotal</div>
                </div>
                
                {/* Item 1 */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-center border-b pb-6 mb-6">
                  <div className="col-span-1 md:col-span-6 flex items-center space-x-4">
                    <div className="w-24 h-24 relative flex-shrink-0 bg-white border border-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                      <Image src="/20-liter-bottle.png" alt="20L Water Bottle" width={60} height={80} className="object-contain" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0f2d5c] text-lg">20L Water Bottle</h3>
                      <p className="text-sm text-muted-foreground">Pure, safe & refreshing</p>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-2 md:text-center font-medium text-gray-900">$3.50</div>
                  <div className="col-span-1 md:col-span-2 flex items-center md:justify-center">
                    <div className="flex items-center border border-gray-200 rounded-md bg-white">
                      <button className="p-2 text-gray-500 hover:bg-gray-50 transition-colors"><Minus className="h-4 w-4" /></button>
                      <span className="w-10 text-center font-semibold text-gray-900 text-sm">2</span>
                      <button className="p-2 text-gray-500 hover:bg-gray-50 transition-colors"><Plus className="h-4 w-4" /></button>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end space-x-4">
                    <span className="md:hidden font-semibold text-gray-500 text-sm">Subtotal:</span>
                    <span className="font-bold text-gray-900">$7.00</span>
                    <button className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Remove item"><Trash2 className="h-5 w-5" /></button>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-center border-b pb-6 mb-6">
                  <div className="col-span-1 md:col-span-6 flex items-center space-x-4">
                    <div className="w-24 h-24 relative flex-shrink-0 bg-white border border-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                      <Image src="/20-liter-bottle.png" alt="Dispenser Bottle" width={40} height={80} className="object-contain opacity-80" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0f2d5c] text-lg">Dispenser Bottle</h3>
                      <p className="text-sm text-muted-foreground">18.9 Liters</p>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-2 md:text-center font-medium text-gray-900">$4.00</div>
                  <div className="col-span-1 md:col-span-2 flex items-center md:justify-center">
                    <div className="flex items-center border border-gray-200 rounded-md bg-white">
                      <button className="p-2 text-gray-500 hover:bg-gray-50 transition-colors"><Minus className="h-4 w-4" /></button>
                      <span className="w-10 text-center font-semibold text-gray-900 text-sm">1</span>
                      <button className="p-2 text-gray-500 hover:bg-gray-50 transition-colors"><Plus className="h-4 w-4" /></button>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end space-x-4">
                    <span className="md:hidden font-semibold text-gray-500 text-sm">Subtotal:</span>
                    <span className="font-bold text-gray-900">$4.00</span>
                    <button className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Remove item"><Trash2 className="h-5 w-5" /></button>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-center">
                  <div className="col-span-1 md:col-span-6 flex items-center space-x-4">
                    <div className="w-24 h-24 relative flex-shrink-0 bg-white border border-gray-100 rounded-lg overflow-hidden flex items-center justify-center space-x-[-10px]">
                      <Image src="/20-liter-bottle.png" alt="10L Water Bottle" width={30} height={60} className="object-contain" />
                      <Image src="/20-liter-bottle.png" alt="10L Water Bottle" width={30} height={60} className="object-contain" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0f2d5c] text-lg leading-tight">10L Water Bottle<br/><span className="text-sm font-semibold">(Pack of 2)</span></h3>
                      <p className="text-sm text-muted-foreground mt-1">10 Liters x 2</p>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-2 md:text-center font-medium text-gray-900">$4.50</div>
                  <div className="col-span-1 md:col-span-2 flex items-center md:justify-center">
                    <div className="flex items-center border border-gray-200 rounded-md bg-white">
                      <button className="p-2 text-gray-500 hover:bg-gray-50 transition-colors"><Minus className="h-4 w-4" /></button>
                      <span className="w-10 text-center font-semibold text-gray-900 text-sm">1</span>
                      <button className="p-2 text-gray-500 hover:bg-gray-50 transition-colors"><Plus className="h-4 w-4" /></button>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end space-x-4">
                    <span className="md:hidden font-semibold text-gray-500 text-sm">Subtotal:</span>
                    <span className="font-bold text-gray-900">$4.50</span>
                    <button className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Remove item"><Trash2 className="h-5 w-5" /></button>
                  </div>
                </div>
              </div>
            </Card>

            <div className="pt-2">
              <Link href="/products" className={cn(buttonVariants({ variant: "outline" }), "text-[#0f2d5c] border-[#e5eef7] bg-[#f4f7fb] hover:bg-[#e5eef7] hover:text-[#0f2d5c] font-medium rounded-lg px-6 h-12 inline-flex shadow-sm")}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 bg-[#f4f7fb] p-8 rounded-xl mt-12 border border-[#e5eef7]">
              <div className="flex flex-col md:items-start items-center text-center md:text-left space-y-3">
                <div className="bg-white p-3 rounded-full text-blue-600 shadow-sm border border-blue-100"><ShieldCheck className="h-6 w-6 stroke-[1.5]" /></div>
                <div>
                  <h4 className="font-bold text-sm text-[#0f2d5c] mb-1">100% Safe</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">Multi-stage purification for your safety</p>
                </div>
              </div>
              <div className="flex flex-col md:items-start items-center text-center md:text-left space-y-3">
                <div className="bg-white p-3 rounded-full text-blue-600 shadow-sm border border-blue-100"><Lock className="h-6 w-6 stroke-[1.5]" /></div>
                <div>
                  <h4 className="font-bold text-sm text-[#0f2d5c] mb-1">Secure Checkout</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">Your data and payments are protected</p>
                </div>
              </div>
              <div className="flex flex-col md:items-start items-center text-center md:text-left space-y-3">
                <div className="bg-white p-3 rounded-full text-blue-600 shadow-sm border border-blue-100"><Truck className="h-6 w-6 stroke-[1.5]" /></div>
                <div>
                  <h4 className="font-bold text-sm text-[#0f2d5c] mb-1">On-Time Delivery</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">Fast and reliable delivery to your doorstep</p>
                </div>
              </div>
              <div className="flex flex-col md:items-start items-center text-center md:text-left space-y-3">
                <div className="bg-white p-3 rounded-full text-blue-600 shadow-sm border border-blue-100"><Award className="h-6 w-6 stroke-[1.5]" /></div>
                <div>
                  <h4 className="font-bold text-sm text-[#0f2d5c] mb-1">Satisfaction Guaranteed</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">We ensure quality in every drop</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 md:p-8 sticky top-24 border-none shadow-sm rounded-xl bg-white">
              <h2 className="text-xl font-extrabold text-[#0f2d5c] mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">$15.50</span>
                </div>
                <div className="flex justify-between text-gray-600 items-center">
                  <span className="flex items-center">Delivery Fee <Info className="h-4 w-4 ml-1.5 text-gray-400 cursor-help" /></span>
                  <span className="font-semibold text-gray-900">$2.00</span>
                </div>
              </div>

              <div className="border-t pt-5 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xl font-extrabold text-[#0f2d5c]">Total</span>
                  <span className="text-2xl font-extrabold text-[#0f2d5c]">$17.50</span>
                </div>
                <div className="flex justify-between text-green-600 text-sm font-semibold">
                  <span>You saved</span>
                  <span>$1.00</span>
                </div>
              </div>



              <Button className="w-full bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-semibold h-14 text-base mb-8 rounded-lg shadow-sm">
                <Lock className="mr-2 h-4 w-4" /> Proceed to Checkout
              </Button>

              <div className="text-center relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-muted-foreground font-medium">or checkout with</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <Button variant="outline" className="h-12 border-gray-200 hover:bg-gray-50 rounded-lg"><VisaIcon /></Button>
                <Button variant="outline" className="h-12 border-gray-200 hover:bg-gray-50 rounded-lg"><MastercardIcon /></Button>
                <Button variant="outline" className="h-12 border-gray-200 hover:bg-gray-50 rounded-lg"><ApplePayIcon /></Button>
              </div>

              <div className="flex items-center justify-center text-xs text-green-700 font-medium bg-green-50/50 p-3 rounded-lg border border-green-100">
                <Lock className="h-3.5 w-3.5 mr-1.5" /> All transactions are secure and encrypted.
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function VisaIcon() {
  return (
    <svg viewBox="0 0 38 12" className="h-[14px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5413 0.280273H10.1332L6.15582 11.7203H10.5639L11.4429 9.32027H16.851M12.4419 6.57027L14.1513 1.95027L15.6513 6.57027H12.4419Z" fill="#1434CB"/>
      <path d="M21.5739 0.280273L18.4552 11.7203H22.8633L25.982 0.280273H21.5739Z" fill="#1434CB"/>
      <path d="M37.382 0.280273H33.4047L29.026 11.7203H33.434L34.313 9.32027H39.7212M35.312 6.57027L37.0214 1.95027L38.5214 6.57027H35.312Z" fill="#1434CB"/>
      <path d="M6.35035 0.280273H1.72035L0 11.7203H4.40808L6.35035 0.280273Z" fill="#1434CB"/>
    </svg>
  );
}

function MastercardIcon() {
  return (
    <svg viewBox="0 0 24 15" className="h-[22px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7.5" cy="7.5" r="7.5" fill="#EB001B"/>
      <circle cx="16.5" cy="7.5" r="7.5" fill="#F79E1B"/>
      <path d="M.63851 14 7.5C14 5.36149 13.2505 3.41215 12 2.12012C10.7495 3.41215 10 5.36149 10 7.5C10 9.63851 10.7495 11.5878 12 12.8799Z" fill="#FF5F00"/>
    </svg>
  );
}

function ApplePayIcon() {
  return (
    <svg viewBox="0 0 41 17" className="h-[18px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.51 15.65C17.47 15.65 18.3 15.22 18.9 14.65C19.46 14.11 19.78 13.35 19.78 12.38C19.78 11.4 19.45 10.66 18.89 10.1C18.25 9.48 17.26 9.07 16.14 9.07H14.47V15.65H16.51ZM14.47 7.42H16.03C16.94 7.42 17.69 7.07 18.17 6.57C18.61 6.11 18.87 5.48 18.87 4.67C18.87 3.86 18.61 3.22 18.16 2.76C17.65 2.25 16.86 1.91 15.93 1.91H14.47V7.42ZM12.32 0.3H16.32C17.91 0.3 19.23 0.82 20.14 1.7C20.89 2.45 21.29 3.44 21.29 4.64C21.29 5.86 20.87 6.88 20.08 7.64C19.33 8.35 18.15 8.81 16.64 8.81C17.91 8.81 18.93 9.17 19.7 9.87C20.61 10.68 21.12 11.87 21.12 13.25C21.12 14.54 20.64 15.63 19.75 16.42C18.79 17.27 17.4 17.7 15.66 17.7H12.32V0.3Z" fill="black"/>
      <path d="M26.24 17.7C25.8 17.7 25.38 17.63 24.96 17.51V15.96C25.33 16.08 25.7 16.15 26.06 16.15C27.05 16.15 27.53 15.68 27.53 14.65V12.75L23.4 4.54H25.73L28.61 12.35L31.5 4.54H33.84L29.67 14.81C29.07 16.29 28.53 17.06 28 17.38C27.5 17.59 26.89 17.7 26.24 17.7Z" fill="black"/>
      <path d="M38.86 15.22C38.16 15.54 37.38 15.7 36.5 15.7C34.72 15.7 33.6 15.02 33.6 13.56C33.6 12 34.8 11.23 37.28 10.98C38.07 10.89 38.74 10.74 39.29 10.5V10.2C39.29 9.14 38.64 8.42 37.16 8.42C35.95 8.42 34.87 8.92 34.1 9.47L33.37 7.82C34.33 7.08 35.73 6.64 37.31 6.64C38.65 6.64 39.63 7 40.3 7.69C40.97 8.35 41.34 9.33 41.34 10.66V15.5H39.38V14.11C38.75 14.82 37.89 15.22 36.87 15.22M39.29 11.96C38.8 12.18 38.2 12.31 37.49 12.41C36.03 12.62 35.43 13 35.43 13.78C35.43 14.54 36.08 14.95 37.03 14.95C38 14.95 38.72 14.55 39.13 13.91C39.31 13.62 39.4 13.3 39.4 12.92V11.96Z" fill="black"/>
      <path d="M8.28 6.55001C8.28 6.55001 8.23 6.55001 8.16 6.56001C6.74 6.63001 5.21 7.42001 4.34 8.52001C3.54 9.53001 2.94 10.98 3.13 12.41C3.13 12.45 3.14 12.49 3.17 12.51C3.19 12.54 3.23 12.55 3.27 12.55C4.79 12.55 6.22 11.75 7.03 10.65C7.81 9.59001 8.44 8.16001 8.28 6.55001Z" fill="black"/>
      <path d="M8.7 13.49C8.7 13.49 8.7 13.49 8.71 13.49C10.15 13.49 11.53 12.78 12.48 11.71C13.43 10.64 14 9.17001 13.88 7.74001C13.87 7.70001 13.85 7.66001 13.82 7.64001C13.79 7.62001 13.75 7.61001 13.71 7.61001C12.33 7.61001 10.87 8.35001 9.94 9.40001C8.98 10.51 8.33 12.02 8.54 13.37C8.54 13.4 8.56 13.44 8.59 13.46C8.62 13.48 8.66 13.49 8.7 13.49Z" fill="black"/>
    </svg>
  );
}
