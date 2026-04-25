import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ShoppingCart,
  MapPin,
  ShieldCheck,
  Tag,
  Leaf,
  Clock,
  CheckCircle,
  PiggyBank,
  HeartPulse,
  Map,
  Droplet
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full bg-brand-light pt-16 pb-24 lg:pt-12 lg:pb-30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="max-w-2xl">
              <h1 className="text-5xl lg:text-7xl font-extrabold text-brand-dark tracking-tight leading-[1.1] mb-6">
                Pure Water.<br />
                Every Drop.<br />
                <span className="text-brand-primary">Every Time.</span>
              </h1>
              <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
                Clean, safe and affordable water refill solutions for a healthier you and a better tomorrow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-brand-dark hover:bg-brand-dark/90 text-white rounded-md px-8 py-6 text-base font-semibold">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Order Now
                </Button>
                <Button size="lg" variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-light rounded-md px-8 py-6 text-base font-semibold">
                  <MapPin className="mr-2 h-5 w-5" />
                  Find Station
                </Button>
              </div>
            </div>

            {/* Right Content (Image) */}
            <div className="relative flex justify-center items-center overflow-hidden rounded-[2rem] shadow-2xl lg:shadow-none">
              <Image
                src="/hero-image.png"
                alt="JovaDrops Water Bottles"
                width={800}
                height={800}
                className="w-full h-auto max-w-[650px] lg:max-w-none object-contain z-10"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid 1 */}
      <section className="w-full py-12 bg-white -mt-12 z-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-white rounded-2xl shadow-xl p-8 border border-slate-50">
            <FeatureItem
              icon={<ShieldCheck className="w-6 h-6 text-brand-primary" />}
              title="Pure & Safe"
              description="Multi-stage purification for 100% safe water"
            />
            <FeatureItem
              icon={<Tag className="w-6 h-6 text-brand-primary" />}
              title="Affordable Prices"
              description="High quality water at low prices"
            />
            <FeatureItem
              icon={<Leaf className="w-6 h-6 text-brand-primary" />}
              title="Eco-Friendly"
              description="Reusable bottles for a green future"
            />
            <FeatureItem
              icon={<Clock className="w-6 h-6 text-brand-primary" />}
              title="Convenient Service"
              description="Easy pickup or delivery options"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-12">Why Choose JovaDrops?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <WhyChooseItem
              icon={<CheckCircle className="w-8 h-8 text-brand-primary" />}
              title="Trusted Quality"
              description="Advanced purification for pure water"
            />
            <WhyChooseItem
              icon={<PiggyBank className="w-8 h-8 text-brand-primary" />}
              title="Save Money"
              description="Premium quality at affordable prices"
            />
            <WhyChooseItem
              icon={<HeartPulse className="w-8 h-8 text-brand-primary" />}
              title="Healthy Life"
              description="Stay hydrated, stay healthy"
            />
            <WhyChooseItem
              icon={<Map className="w-8 h-8 text-brand-primary" />}
              title="Local & Reliable"
              description="Your trusted water partner nearby"
            />
          </div>
        </div>
      </section>

      {/* App Download Banner (Separated/Floating Design) */}
      <section className="w-full py-12 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-brand-light rounded-[2.5rem] overflow-hidden relative border border-blue-100/50 shadow-xl">
            <div className="px-8 py-12 lg:py-16 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-12">

              <div className="lg:w-1/2 text-center lg:text-left z-10">
                <h2 className="text-3xl lg:text-4xl font-extrabold text-brand-dark mb-4">
                  Get water delivered to your doorstep!
                </h2>
                <p className="text-slate-600 text-lg mb-8 max-w-md">
                  Download our app for a faster, seamless ordering experience.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="bg-black hover:bg-black/80 text-white rounded-xl px-6 py-6 border border-white/10 flex items-center gap-3 h-auto shadow-lg">
                    <Image src="/google-play.svg" alt="Google Play" width={24} height={24} className="w-6 h-6" />
                    <div className="flex flex-col items-start leading-none">
                      <span className="text-[10px] text-white/70 uppercase">Get it on</span>
                      <span className="text-base font-bold">Google Play</span>
                    </div>
                  </Button>
                  <Button size="lg" className="bg-black hover:bg-black/80 text-white rounded-xl px-6 py-6 border border-white/10 flex items-center gap-3 h-auto shadow-lg">
                    <Image src="/apple.svg" alt="App Store" width={24} height={24} className="w-6 h-6" />
                    <div className="flex flex-col items-start leading-none">
                      <span className="text-[10px] text-white/70 uppercase">Download on the</span>
                      <span className="text-base font-bold">App Store</span>
                    </div>
                  </Button>
                </div>
              </div>

              <div className="lg:w-1/2 flex justify-center lg:justify-end relative">
                {/* Decorative glow behind phone */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl"></div>

                {/* Phone Mockup Image */}
                <div className="relative z-10 w-[240px] lg:w-[280px]">
                  <Image
                    src="/phone-design.png"
                    alt="JovaDrops App Mockup"
                    width={640}
                    height={1280}
                    className="w-full h-auto object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="bg-brand-light p-3 rounded-full shrink-0 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-brand-dark text-base mb-1">{title}</h3>
        <p className="text-sm text-slate-500 leading-snug">{description}</p>
      </div>
    </div>
  )
}

function WhyChooseItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="text-center shadow-lg border-slate-100 hover:shadow-xl transition-shadow duration-300">
      <CardContent className="pt-8 pb-6 flex flex-col items-center">
        <div className="mb-6">
          <div className="w-16 h-16 relative flex items-center justify-center">
            <div className="absolute inset-0 border-2 border-brand-light rounded-xl transform rotate-45 transition-transform group-hover:rotate-90 duration-500"></div>
            <div className="relative z-10">
              {icon}
            </div>
          </div>
        </div>
        <h3 className="font-bold text-brand-dark text-lg mb-3">{title}</h3>
        <p className="text-sm text-slate-500">{description}</p>
      </CardContent>
    </Card>
  )
}
