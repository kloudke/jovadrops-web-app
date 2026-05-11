"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { ChevronRight, Trash2, Minus, Plus, Info, Lock, ArrowLeft, ShieldCheck, Truck, Award, ShoppingCart } from 'lucide-react';

// Define the CartItem type
type CartItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  originalPrice?: number; // Used for calculating savings
  image: string;
  isPack?: boolean;
};

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cart';

export default function CartPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { items, updateQuantity, removeItem, subtotal: getSubtotal } = useCartStore();

  const handleCheckout = () => {
    if (!session) {
      router.push(`/login?callbackUrl=${encodeURIComponent('/checkout')}`);
    } else {
      router.push('/checkout');
    }
  };

  // Derived state calculations
  const subtotal = getSubtotal();
  const deliveryFee = subtotal > 0 ? 2.00 : 0;
  const total = subtotal + deliveryFee;

  const savedAmount = items.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price) * item.quantity;
    }
    return sum;
  }, 0);

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
              {items.length > 0 ? (
                <div className="p-6 md:p-8">
                  {/* Header Row */}
                  <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-semibold text-gray-500 border-b pb-4 mb-6">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Subtotal</div>
                  </div>

                  {/* Item List */}
                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className={cn(
                        "grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-center",
                        index !== items.length - 1 ? "border-b pb-6 mb-6" : ""
                      )}
                    >
                      <div className="col-span-1 md:col-span-6 flex items-center space-x-4">
                        <div className={cn(
                          "w-24 h-24 relative flex-shrink-0 bg-white border border-gray-100 rounded-lg overflow-hidden flex items-center justify-center",
                          item.isPack ? "space-x-[-10px]" : ""
                        )}>
                          {item.isPack ? (
                            <>
                              <Image src={item.image} alt={item.name} width={30} height={60} className="object-contain" />
                              <Image src={item.image} alt={item.name} width={30} height={60} className="object-contain" />
                            </>
                          ) : (
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={item.id === '1' ? 60 : 40}
                              height={80}
                              className={cn("object-contain", item.id === '2' ? "opacity-80" : "")}
                            />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-[#0f2d5c] text-lg leading-tight">
                            {item.name}
                            {item.isPack && <><br /><span className="text-sm font-semibold">(Pack of 2)</span></>}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        </div>
                      </div>
                      <div className="col-span-1 md:col-span-2 md:text-center font-medium text-gray-900">
                        ${item.price.toFixed(2)}
                      </div>
                      <div className="col-span-1 md:col-span-2 flex items-center md:justify-center">
                        <div className="flex items-center border border-gray-200 rounded-md bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-2 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-10 text-center font-semibold text-gray-900 text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-gray-500 hover:bg-gray-50 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end space-x-4">
                        <span className="md:hidden font-semibold text-gray-500 text-sm">Subtotal:</span>
                        <span className="font-bold text-gray-900">KSH {(item.price * item.quantity).toFixed(2)}</span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center flex flex-col items-center justify-center">
                  <div className="bg-blue-50 p-4 rounded-full mb-4">
                    <ShoppingCart className="h-8 w-8 text-blue-300" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0f2d5c] mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-6">Looks like you haven't added any products yet.</p>
                </div>
              )}
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
                  <span className="font-semibold text-gray-900">KSH {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 items-center">
                  <span className="flex items-center">Delivery Fee <Info className="h-4 w-4 ml-1.5 text-gray-400 cursor-help" /></span>
                  <span className="font-semibold text-gray-900">KSH {deliveryFee.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t pt-5 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xl font-extrabold text-[#0f2d5c]">Total</span>
                  <span className="text-2xl font-extrabold text-[#0f2d5c]">KSH {total.toFixed(2)}</span>
                </div>
                {savedAmount > 0 && (
                  <div className="flex justify-between text-green-600 text-sm font-semibold">
                    <span>You saved</span>
                    <span>${savedAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <Button
                disabled={items.length === 0}
                onClick={handleCheckout}
                className="w-full bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-semibold h-14 text-base mb-8 rounded-lg shadow-sm disabled:opacity-50"
              >
                <Lock className="mr-2 h-4 w-4" /> Proceed to Checkout
              </Button>

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
