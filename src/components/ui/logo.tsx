import Image from "next/image"

export function Logo({ className = "", lightText = false }: { className?: string, lightText?: boolean }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center">
        <Image 
          src="/logo.png" 
          alt="JovaDrops Logo" 
          width={200} 
          height={60} 
          className={`w-auto h-10 md:h-12 object-contain ${lightText ? 'brightness-0 invert' : ''}`}
          priority
        />
      </div>
    </div>
  )
}
