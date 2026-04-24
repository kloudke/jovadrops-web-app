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
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative overflow-hidden bg-white pt-16 pb-24 lg:pt-32 lg:pb-40">
        {/* Background Decorative Shape (approximate design's right-side blob) */}
        <div className="absolute right-0 top-0 h-full w-full md:w-[60%] lg:w-[50%] bg-brand-light rounded-l-full opacity-60 pointer-events-none -z-10 transform translate-x-1/4"></div>

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

            {/* Right Content (Image Placeholder) */}
            <div className="relative flex justify-center items-center">
              {/* Replace this div with the actual client image: <img src="/jovadrops-hero.png" alt="JovaDrops Water Bottles" className="w-full h-auto object-contain" /> */}
              <div className="w-full max-w-md aspect-square bg-gradient-to-br from-brand-light to-white rounded-full flex flex-col items-center justify-center border-8 border-white shadow-2xl relative">
                <div className="absolute inset-0 border-[16px] border-white/50 rounded-full animate-pulse pointer-events-none"></div>
                <Droplet className="w-32 h-32 text-brand-primary mb-4" />
                <span className="text-brand-dark font-bold text-xl text-center px-4">Hero Image Placeholder</span>
                <span className="text-slate-500 text-sm text-center px-4 mt-2">(Drop client image in public folder)</span>
              </div>
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
          <h2 className="text-3xl font-bold text-brand-dark mb-12">Why Choose JovaDrops?</h2>
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

      {/* App Download Banner */}
      <section className="w-full mt-12 bg-brand-dark overflow-hidden relative">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 text-center lg:text-left z-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">
                Download Our App For Faster Ordering!
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-black hover:bg-black/80 text-white rounded-md px-6 py-6 border border-white/20">
                   Get it on Google Play
                </Button>
                <Button size="lg" className="bg-black hover:bg-black/80 text-white rounded-md px-6 py-6 border border-white/20">
                  Download on the App Store
                </Button>
              </div>
            </div>
            
            <div className="lg:w-1/2 flex justify-center lg:justify-end relative">
              {/* Decorative circle behind phone */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
              
              {/* Phone Mockup Placeholder */}
              <div className="w-64 h-96 bg-gradient-to-b from-brand-primary to-brand-dark rounded-3xl border-8 border-slate-800 shadow-2xl flex flex-col items-center justify-center p-6 relative z-10 overflow-hidden">
                 <div className="absolute top-0 w-32 h-6 bg-slate-800 rounded-b-2xl"></div>
                 <Droplet className="w-12 h-12 text-white/50 mb-2" />
                 <div className="text-white font-bold text-xl mb-1">JovaDrops App</div>
                 <div className="text-white/70 text-xs text-center">Your water partner in your pocket.</div>
                 <div className="mt-8 w-full space-y-3">
                   <div className="h-10 w-full bg-white/10 rounded-md"></div>
                   <div className="h-10 w-full bg-white/10 rounded-md"></div>
                   <div className="h-10 w-full bg-white/10 rounded-md"></div>
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
