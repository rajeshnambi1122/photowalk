"use client"

import { Mail, Instagram } from "lucide-react";
import { usePathname } from "next/navigation"

export default function Footer() {
  const pathname = usePathname()
  if (pathname.startsWith("/admin")) return null
  return (
    <footer className="bg-white shadow-sm mt-auto py-4">
    <div className="container mx-auto px-2">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 w-full">
        <a href="mailto:prawinvenkat2424@gmail.com" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 break-all text-sm">
          <Mail className="h-5 w-5" />
          <span className="break-all">prawinvenkat2424@gmail.com</span>
        </a>
        <a href="https://www.instagram.com/sightlayers?igsh=YmN2Mm8xMWlhZTl0" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 text-sm">
          <Instagram className="h-5 w-5" />
          <span className="break-all">sightlayers</span>
        </a>
      </div>
    </div>
  </footer>
  )
}