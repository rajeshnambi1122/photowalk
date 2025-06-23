"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()
  if (pathname.startsWith("/admin")) return null
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center space-x-8 md:space-x-32">
          <Link href="/">
            <Image src="/Agency Logo.png" alt="Agency Logo" width={180} height={180} />
          </Link>
          <Link href="/">
            <Image src="/SL logo.png" alt="SL Logo" width={100} height={100} />
          </Link>
          <Link href="/">
            <Image src="/Tvl logo.png" alt="Tvl Logo" width={100} height={100} />
          </Link>
        </div>
      </div>
    </header>
  )
} 