import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplet, Smartphone, Truck, ShieldCheck } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-blue-50 py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Pure, Refreshing Water.<br className="hidden md:block"/> Delivered to Your Door.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            JovaDrops is your premium water refill station. Enjoy crystal clear, purified water with our convenient delivery service and mobile app.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="text-lg px-8">Order Now</Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-white">Download the App</Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="w-full py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose JovaDrops?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We're committed to providing the best quality water with the most convenient service.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-none shadow-md">
              <CardHeader>
                <div className="mx-auto bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>Multi-Stage Purification</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Our advanced filtration system guarantees 99.9% pure, great-tasting water in every drop.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-md">
              <CardHeader>
                <div className="mx-auto bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Smartphone className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>Easy Mobile Ordering</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Manage subscriptions, track deliveries, and order refills in seconds with our custom app.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-md">
              <CardHeader>
                <div className="mx-auto bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Truck className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>Fast & Reliable Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We bring heavy water jugs right to your doorstep, saving you time and backache.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA / Download App */}
      <section id="download" className="w-full py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Droplet className="w-16 h-16 mx-auto mb-6 text-blue-200" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for better hydration?</h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">
            Get the JovaDrops app today. Manage your account, earn rewards, and never run out of pure water again.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" className="text-lg px-8 font-semibold text-blue-600 hover:text-blue-700">
              App Store
            </Button>
            <Button size="lg" variant="secondary" className="text-lg px-8 font-semibold text-blue-600 hover:text-blue-700">
              Google Play
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
