import Image from "next/image"
import { Droplet, Users, Leaf, Target, Eye, Star } from "lucide-react"

export const metadata = {
  title: "About Us - JovaDrops",
  description: "Learn more about JovaDrops, our story, mission, and vision.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Our Story Header */}
      <section className="pt-16 pb-12 px-4 text-center">
        <h3 className="text-brand-primary font-semibold text-lg mb-2 tracking-wide">About Us</h3>
        <h1 className="text-4xl md:text-5xl font-bold text-brand-dark tracking-tight">Our Story</h1>
      </section>

      {/* Our Story Content */}
      <section className="container mx-auto px-4 lg:px-8 max-w-7xl mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Storefront Image Placeholder */}
          <div className="w-full h-[320px] lg:h-[360px] relative rounded-3xl overflow-hidden bg-slate-100 shadow-md lg:col-span-5">
            <Image
              src="/hero-image-about.png" // Placeholder
              alt="JovaDrops Storefront"
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Text Content */}
          <div className="space-y-6 text-slate-600 leading-relaxed text-sm pt-4 lg:px-4 lg:col-span-4">
            <p>
              JovaDrops was born from a simple belief that everyone
              deserves access to clean and safe drinking water.
            </p>
            <p>
              We saw the need for a reliable and affordable water
              solution in our community. That&apos;s why we built a water
              refilling station using advanced purification technology
              to provide water you can trust, every single day.
            </p>
            <p>
              Today, JovaDrops is proud to serve families, offices, and
              businesses with purified water that is safe, great-tasting,
              and eco-friendly.
            </p>
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col items-center justify-between h-[320px] lg:h-[360px] lg:col-span-3">
            {/* Heart Image Placeholder */}
            <div className="relative w-full flex-grow min-h-[100px] lg:min-h-[120px] mb-2">
              <div className="absolute inset-0 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
              <Image
                src="/heart.png" // Placeholder
                alt="Water Heart Splash"
                fill
                className="object-contain relative z-10"
              />
            </div>

            <hr className="w-full border-slate-100 my-4" />

            <div className="w-full space-y-4 shrink-0">
              <div className="flex items-center gap-4">
                <Droplet className="w-8 h-8 text-blue-500 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h4 className="text-xl font-bold text-brand-dark mb-1">10,000+</h4>
                  <p className="text-slate-600 text-xs text-sm">Litres Delivered</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Users className="w-8 h-8 text-blue-500 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h4 className="text-xl font-bold text-brand-dark mb-1">500+</h4>
                  <p className="text-slate-600 text-xs text-sm">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="container mx-auto px-4 lg:px-8 max-w-7xl mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-brand-light-gray rounded-3xl p-8 lg:p-12 border border-slate-100 shadow-sm flex items-start gap-6 hover:shadow-md transition-shadow">
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-100/50 opacity-50 m-2 rounded-full"></div>
              <Target className="w-10 h-10 text-brand-primary relative z-10" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-brand-dark mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                To provide safe, high-quality, and affordable purified water while
                promoting a healthier lifestyle and a cleaner environment for everyone.
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-brand-light-gray rounded-3xl p-8 lg:p-12 border border-slate-100 shadow-sm flex items-start gap-6 hover:shadow-md transition-shadow">
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-100/50 opacity-50 m-2 rounded-full"></div>
              <Eye className="w-10 h-10 text-brand-primary relative z-10" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-brand-dark mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To be the leading water refilling station in our community, known for
                trust, innovation, and our commitment to a healthier future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community and Impact */}
      <section className="container mx-auto px-4 lg:px-8 max-w-7xl mb-12">
        <div className="bg-brand-light-gray rounded-[2rem] p-8 lg:px-16 lg:py-10 border border-slate-100 shadow-sm">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark mb-4 tracking-tight">Our Community & Impact</h2>
            <p className="text-slate-600 text-lg">We are more than just a water station — we are part of the community.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left Items */}
            <div className="space-y-6">
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0 text-white shadow-md shadow-brand-primary/30">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-dark mb-1">Local Service</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">Proudly serving our neighbors with clean and affordable water.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 text-white shadow-md shadow-green-500/30">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-dark mb-1">Sustainability</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">Helping reduce single-use plastic bottles and protect our planet.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 text-white shadow-md shadow-blue-500/30">
                  <Droplet className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-dark mb-1">Better Health</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">Promoting healthier lives through clean, pure drinking water.</p>
                </div>
              </div>
            </div>

            {/* Middle Image */}
            <div className="relative w-full aspect-square max-w-xs mx-auto flex justify-center items-center">
              <div className="absolute inset-0 bg-blue-100 rounded-sm blur-[60px] opacity-60"></div>
              <Image
                src="/heart.png" // Placeholder
                alt="Community Impact"
                fill
                className="object-contain relative z-10 p-4"
              />
            </div>

            {/* Right Cards */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border-2 border-blue-50 shadow-sm flex items-center gap-5">
                <Droplet className="w-10 h-10 text-brand-primary flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-bold text-brand-dark mb-1">10,000+ <span className="text-sm font-normal text-slate-500">Litres Delivered</span></h4>
                  <p className="text-slate-600 text-xs leading-relaxed">Clean water delivered to homes and businesses.</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border-2 border-blue-50 shadow-sm flex items-center gap-5">
                <Users className="w-10 h-10 text-brand-primary flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-bold text-brand-dark mb-1">500+ <span className="text-sm font-normal text-slate-500">Happy Customers</span></h4>
                  <p className="text-slate-600 text-xs leading-relaxed">Trusted by hundreds of satisfied customers in our community.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="pt-10 pb-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-brand-dark mb-10 tracking-tight">What Our Customers Say</h2>

          <div className="w-full max-w-5xl mx-auto min-h-[400px] flex items-center justify-center">
            <div className="w-full">
              {/* Elfsight Google Reviews | Untitled Google Reviews */}
              <script src="https://elfsightcdn.com/platform.js" async></script>
              <div className="elfsight-app-d31518ee-e523-47f9-8b37-90cdf603d05a" data-elfsight-app-lazy></div>
            </div>
          </div>        </div>
      </section>
    </div>
  )
}
