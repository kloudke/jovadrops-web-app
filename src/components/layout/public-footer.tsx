import Link from 'next/link'

export function PublicFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} JovaDrops Water Refill Station. All rights reserved.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:underline">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}
