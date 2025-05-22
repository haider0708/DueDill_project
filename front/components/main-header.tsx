import Link from "next/link"
import Image from "next/image"
import { MainNav } from "@/components/main-nav"

export function MainHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2 mr-8">
          <div className="relative h-8 w-8">
            <Image src="/logo.png" alt="Crypto Watch Logo" fill className="object-contain" />
          </div>
          <Link href="/" className="text-xl font-bold">
            Crypto Watch
          </Link>
        </div>
        <MainNav />
      </div>
    </header>
  )
}
