import Image from "next/image"

export function Logo({ className = "", lightText = false }: { className?: string, lightText?: boolean }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center">
        <Image 
          src="/logo-update.png" 
          alt="JovaDrops Logo" 
          width={220} 
          height={66} 
          className={`w-auto h-12 md:h-14 object-contain ${lightText ? 'brightness-0 invert' : ''}`}
          priority
        />
      </div>
    </div>
  )
}
