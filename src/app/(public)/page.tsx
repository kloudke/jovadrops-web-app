import Link from "next/link"
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
      <section className="w-full bg-brand-light pt-8 pb-16 lg:pt-8 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="max-w-2xl">
              <h1 className="text-5xl lg:text-7xl font-extrabold text-brand-dark tracking-tight leading-[1.1] mb-6">
                Pure water<br />
                Healthy life<br />
                <span className="text-brand-primary">All the time</span>
              </h1>
              <p className="text-lg text-brand-dark/80 mb-10 max-w-lg leading-relaxed">
                Clean, safe and affordable water refill solutions for a healthier you and a better tomorrow.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
                {/* Safe & Purified Card */}
                <div className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-slate-100 w-full sm:w-auto pr-8">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 border border-blue-100/50">
                    <ShieldCheck className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div className="flex flex-col text-left">
                    <h4 className="text-sm font-bold text-brand-dark">100% Safe & Purified</h4>
                    <p className="text-xs text-slate-500 leading-tight mt-0.5">Multi-stage purification<br />for your health</p>
                  </div>
                </div>

                {/* Refreshing & Healthy Card */}
                <div className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-slate-100 w-full sm:w-auto pr-8">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 border border-blue-100/50">
                    <Droplet className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div className="flex flex-col text-left">
                    <h4 className="text-sm font-bold text-brand-dark">Refreshing & Healthy</h4>
                    <p className="text-xs text-slate-500 leading-tight mt-0.5">Better water for a<br />better tomorrow</p>
                  </div>
                </div>
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
      <section className="w-full py-6 bg-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-14">Why Choose JovaDrops?</h2>
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

      {/* App Download Banner (Floating/Sticking Out Design) */}
      <section className="w-full py-10 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-brand-light rounded-[2.5rem] relative border border-blue-100/50 shadow-xl">
            <div className="px-8 py-10 lg:py-12 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-12">

              <div className="lg:w-1/2 text-center lg:text-left z-10">
                <h2 className="text-3xl lg:text-4xl font-extrabold text-brand-dark mb-4 leading-tight">
                  Get water delivered to your doorstep!
                </h2>
                <p className="text-brand-dark/80 text-lg mb-8 max-w-md">
                  Download our app for a faster, seamless ordering experience.
                </p>
                <div className="flex flex-row gap-3 justify-center lg:justify-start w-full mx-auto lg:mx-0">
                  <Link href="#" className="inline-block hover:opacity-90 transition-opacity">
                    <div className="bg-black border border-white/20 shadow-lg rounded-lg px-4 py-2 flex items-center gap-3 w-[160px] h-[52px]">
                      <Image src="/google-play.svg" alt="Google Play" width={24} height={24} className="shrink-0" />
                      <div className="flex flex-col text-left">
                        <span className="text-[9px] text-white/80 leading-none mb-0.5 uppercase tracking-wide">GET IT ON</span>
                        <span className="text-[13px] font-semibold text-white leading-none tracking-wide font-sans">Google Play</span>
                      </div>
                    </div>
                  </Link>
                  <Link href="#" className="inline-block hover:opacity-90 transition-opacity">
                    <div className="bg-black border border-white/20 shadow-lg rounded-lg px-4 py-2 flex items-center gap-3 w-[160px] h-[52px]">
                      <Image src="/apple-light.svg" alt="App Store" width={24} height={24} className="shrink-0" />
                      <div className="flex flex-col text-left">
                        <span className="text-[9px] text-white/80 leading-none mb-0.5">Download on the</span>
                        <span className="text-[13px] font-semibold text-white leading-none tracking-wide font-sans">App Store</span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="lg:w-1/2 flex justify-center lg:justify-end relative lg:-my-24">
                {/* Decorative glow behind phone */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl"></div>

                {/* Phone Mockup Image sticking out */}
                <div className="relative z-10 w-[220px] lg:w-[260px] transform hover:scale-105 transition-transform duration-500">
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
        <h3 className="font-bold text-base mb-1">{title}</h3>
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
        <h3 className="font-bold text-lg mb-3">{title}</h3>
        <p className="text-sm text-brand-dark/70">{description}</p>
      </CardContent>
    </Card>
  )
}
