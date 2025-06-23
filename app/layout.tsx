import type { Metadata } from 'next'
import './globals.css'
import { Mail, Instagram } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: 'PhotoWalk ~ SL Studio',
  description: 'PhotoWalk ~ SL Studio',
  generator: 'PhotoWalk ~ SL Studio',
  icons: {
    icon: '/Tvl logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
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
        <main className="flex-grow">{children}</main>
        <footer className="bg-white shadow-sm mt-auto py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-4">
              <a href="mailto:prawinvenkat2424@gmail.com" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <Mail className="h-5 w-5" />
                <span>prawinvenkat2424@gmail.com</span>
              </a>
              <a href="https://www.instagram.com/sightlayers?igsh=YmN2Mm8xMWlhZTl0" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-600 hover:text-pink-600">
                <Instagram className="h-5 w-5" />
                <span>sightlayers</span>
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
