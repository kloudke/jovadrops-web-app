import Image from "next/image"
import {
  ShieldCheck,
  Cpu,
  ThumbsUp,
  BadgeCheck,
  ArrowRight
} from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col items-center w-full bg-white">

      {/* Header Section */}
      <section className="w-full pt-16 pb-12 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-4">
            How We Purify Every Drop
          </h1>
          <p className="text-brand-dark/70 text-lg max-w-2xl mx-auto">
            Our advanced multi-stage purification process ensures 100% safe, healthy, and great tasting water.
          </p>
        </div>
      </section>

      {/* 6-Step Timeline Section */}
      <section className="w-full pb-20">
        <div className="container mx-auto px-4 lg:px-8">

          <div className="flex flex-col lg:flex-row items-start justify-between relative">
            {/* Desktop connecting line */}
            <div className="hidden lg:block absolute top-[90px] left-0 w-full h-[2px] bg-brand-light/50 -z-10"></div>

            {/* <ProcessStep
              number={1}
              imageUrl="/raw-water-source.png"
              title="Raw Water Source"
              description="Carefully sourced from trusted underground sources."
              hasNext={true}
            /> */}
            <ProcessStep
              number={1}
              imageUrl="/pre-filtration.png"
              imageBg="#d6e0f7"
              title="Pre-Filtration"
              description="Removes dust, dirt, sand and large impurities."
              hasNext={true}
            />
            <ProcessStep
              number={2}
              imageUrl="/carbon-filtration.png"
              imageBg="#f4f4f9"
              title="Carbon Filtration"
              description="Reduces chlorine, odors and organic compounds."
              hasNext={true}
            />
            <ProcessStep
              number={3}
              imageUrl="/ro-filtration.png"
              imageBg="#e8e8ea"
              title="RO Filtration"
              description="Removes dissolved salts, heavy metals and contaminants."
              hasNext={true}
            />
            <ProcessStep
              number={4}
              imageUrl="/uv-sterilization.png"
              imageBg="#a0c1e5"
              title="UV Sterilization"
              description="Kills bacteria and viruses for 100% microbial safety."
              hasNext={true}
            />
            <ProcessStep
              number={5}
              imageUrl="/mineralization.png"
              imageBg="#d6e8fb"
              title="Mineralization"
              description="Enhances taste, balances pH and ensures purity."
              hasNext={false}
            />
          </div>

        </div>
      </section>

      {/* Quality Features Grid */}
      <section className="w-full py-16 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <QualityFeature
              icon={<ShieldCheck className="w-6 h-6 text-brand-primary" />}
              title="100% Safe"
              description="Tested for purity at every stage"
            />
            <QualityFeature
              icon={<Cpu className="w-6 h-6 text-brand-primary" />}
              title="Advanced Technology"
              description="Modern purification with care"
            />
            <QualityFeature
              icon={<ThumbsUp className="w-6 h-6 text-brand-primary" />}
              title="Great Taste"
              description="Crisp, clean and refreshing"
            />
            <QualityFeature
              icon={<BadgeCheck className="w-6 h-6 text-brand-primary" />}
              title="Quality Assured"
              description="Strict quality checks every time"
            />
          </div>
        </div>
      </section>

      {/* The Promise Section */}
      <section className="w-full py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight leading-[1.2] mb-6">
                Pure, Safe, Refreshing.<br />
                <span className="text-brand-primary">That&apos;s the JovaDrops Promise.</span>
              </h2>
              <p className="text-lg text-brand-dark/80 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                We follow a strict multi-stage purification process to deliver water that is safe, healthy and refreshing for you and your family.
              </p>
            </div>

            <div className="lg:w-1/2 flex justify-center relative">
              {/* Background circular glow */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-light rounded-full blur-3xl -z-10"></div>

              {/* Product Image placeholder for the big bottle */}
              <div className="relative flex justify-center items-center overflow-hidden rounded-[2rem] shadow-2xl lg:shadow-none">
                <Image
                  src="/hero-image-how-it-works.png"
                  alt="JovaDrops Promise"
                  width={800}
                  height={800}
                  className="w-full h-auto max-w-[650px] lg:max-w-none object-contain z-10"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}

function ProcessStep({ number, icon, imageUrl, imageBg, title, description, hasNext }: { number: number, icon?: React.ReactNode, imageUrl?: string, imageBg?: string, title: string, description: string, hasNext: boolean }) {
  return (
    <div className="flex flex-col items-center text-center w-full lg:w-1/5 px-2 mb-12 lg:mb-0 relative group">

      {/* Icon Circle */}
      <div
        className={`w-40 h-40 rounded-full flex items-center justify-center mb-6 relative z-10 group-hover:scale-105 transition-transform duration-300 shadow-sm border border-white overflow-hidden ${!imageBg && !imageUrl ? 'bg-brand-light' : ''}`}
        style={imageBg ? { backgroundColor: imageBg } : {}}
      >
        {imageUrl ? (
          <Image src={imageUrl} alt={title} fill className="object-contain" sizes="(max-width: 768px) 160px, 160px" />
        ) : (
          icon
        )}
      </div>

      {/* Number Badge */}
      <div className="w-8 h-8 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold text-sm mb-6 shadow-md z-10">
        {number}
      </div>

      {/* Content */}
      <h3 className="font-bold text-brand-dark text-lg mb-3">{title}</h3>
      <p className="text-sm text-brand-dark/70 leading-snug max-w-[200px]">{description}</p>

      {/* Mobile-only connecting line (downward) */}
      {hasNext && (
        <div className="block lg:hidden w-[2px] h-12 bg-brand-light/50 my-6"></div>
      )}

      {/* Desktop Arrow (pointing to next) */}
      {hasNext && (
        <div className="hidden lg:flex absolute top-[80px] -right-[12px] transform -translate-y-1/2 z-20 text-brand-primary/50">
          <ArrowRight className="w-6 h-6" />
        </div>
      )}
    </div>
  )
}

function QualityFeature({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex items-center gap-4 p-6 rounded-2xl border border-slate-100 hover:border-brand-primary/20 hover:shadow-sm transition-all duration-300 bg-white">
      <div className="shrink-0 relative">
        {/* Hexagon/Badge shape placeholder via CSS */}
        <div className="w-12 h-12 rounded-xl bg-brand-light transform rotate-3 flex items-center justify-center">
          <div className="transform -rotate-3">
            {icon}
          </div>
        </div>
      </div>
      <div>
        <h4 className="font-bold text-brand-dark text-base mb-1">{title}</h4>
        <p className="text-xs text-brand-dark/70">{description}</p>
      </div>
    </div>
  )
}
