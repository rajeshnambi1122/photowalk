import type { Metadata } from 'next'
import './globals.css'
import Header from "@/components/Header"
import { Analytics } from "@vercel/analytics/react"
import Footer from '@/components/Footer'

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
        <Header />
        <main className="flex-grow">{children}</main>
        <Analytics />
        <Footer />
      </body>
    </html>
  )
}
