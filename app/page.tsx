"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Camera, Users, Clock, Award } from "lucide-react"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function HomePage() {
  // GSAP refs
  const heroRef = useRef<HTMLDivElement>(null)
  const eventCardsRef = useRef<(HTMLDivElement | null)[]>([])
  const expectRef = useRef<(HTMLDivElement | null)[]>([])
  const ctaRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const cameraRef = useRef<HTMLDivElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    // Helper: camera shot animation
    const cameraShot = () => {
      if (cameraRef.current && flashRef.current) {
        // Camera pop and vibration
        gsap.fromTo(
          cameraRef.current,
          { scale: 1, boxShadow: "0 0 0px 0px #fff" },
          {
            scale: 1.25,
            boxShadow: "0 0 32px 8px #fff",
            duration: 0.12,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
            onComplete: () => {
              gsap.fromTo(
                cameraRef.current,
                { x: -4 },
                { x: 4, duration: 0.04, yoyo: true, repeat: 5, ease: "power1.inOut", clearProps: "x" }
              )
            },
            clearProps: "boxShadow"
          }
        )
        // Flash
        gsap.fromTo(
          flashRef.current,
          { opacity: 0 },
          {
            opacity: 0.95,
            duration: 0.09,
            ease: "power1.in",
            yoyo: true,
            repeat: 1,
            repeatDelay: 0.05,
            onComplete: () => {
              gsap.to(flashRef.current, { opacity: 0, duration: 0.25, ease: "power1.out" })
            }
          }
        )
      }
    }
    // Hero scroll animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
            onEnter: cameraShot,
          },
        }
      )
    }
    // Event cards scroll stagger
    if (eventCardsRef.current.length) {
      gsap.fromTo(
        eventCardsRef.current,
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: eventCardsRef.current[0],
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
            onEnter: cameraShot,
          },
        }
      )
    }
    // What to expect cards scroll
    if (expectRef.current.length) {
      gsap.fromTo(
        expectRef.current,
        { opacity: 0, y: 40, rotate: -8 },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 1,
          stagger: 0.18,
          ease: "power2.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: expectRef.current[0],
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
            onEnter: cameraShot,
          },
        }
      )
    }
    // CTA scroll
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.7)",
          delay: 0.1,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
            onEnter: cameraShot,
          },
        }
      )
    }
    // Footer scroll
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            end: "bottom 100%",
            toggleActions: "play none none reverse",
            onEnter: cameraShot,
          },
        }
      )
    }
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Camera overlay */}
      <div ref={flashRef} style={{ pointerEvents: 'none', borderRadius: '32px', mixBlendMode: 'screen' }} className="fixed inset-0 z-50 bg-white opacity-0 transition-opacity duration-150" />
      <div ref={cameraRef} className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-black/80 rounded-full p-4 shadow-lg flex items-center justify-center transition-all duration-150">
        <Camera className="h-10 w-10 text-white" />
      </div>

      {/* Hero Section */}
      <section className="py-20" ref={heroRef}>
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Tirunelveli Through Your Lens</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join us for an exciting photography walk through the historic streets of Tirunelveli. Capture the essence
              of our beautiful city, its culture, architecture, and vibrant life.
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Event Details</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[0,1,2,3].map((i) => (
              <div key={i} ref={el => { eventCardsRef.current[i] = el }}>
                {/* Card content */}
                {[
                  <Card className="text-center"><CardContent className="p-6"><Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" /><h3 className="font-semibold text-lg mb-2">Date</h3><p className="text-gray-600">Saturday, January 25, 2025</p></CardContent></Card>,
                  <Card className="text-center"><CardContent className="p-6"><Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" /><h3 className="font-semibold text-lg mb-2">Time</h3><p className="text-gray-600">6:00 AM - 10:00 AM</p></CardContent></Card>,
                  <Card className="text-center"><CardContent className="p-6"><MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" /><h3 className="font-semibold text-lg mb-2">Meeting Point</h3><p className="text-gray-600">Tirunelveli Junction</p></CardContent></Card>,
                  <Card className="text-center"><CardContent className="p-6"><Users className="h-12 w-12 text-blue-600 mx-auto mb-4" /><h3 className="font-semibold text-lg mb-2">Participants</h3><p className="text-gray-600">Limited to 50 people</p></CardContent></Card>
                ][i]}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What to Expect</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[0,1,2].map(i => (
              <div className="text-center" key={i} ref={el => { expectRef.current[i] = el }}>
                {/* Card content */}
                {[
                  <><div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"><Camera className="h-8 w-8 text-blue-600" /></div><h3 className="font-semibold text-lg mb-2">Historic Architecture</h3><p className="text-gray-600">Capture the beautiful temples, colonial buildings, and traditional architecture of Tirunelveli.</p></>,
                  <><div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"><Users className="h-8 w-8 text-blue-600" /></div><h3 className="font-semibold text-lg mb-2">Street Life</h3><p className="text-gray-600">Document the vibrant street scenes, local vendors, and daily life of the city.</p></>,
                  <><div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"><Award className="h-8 w-8 text-blue-600" /></div><h3 className="font-semibold text-lg mb-2">Photo Contest</h3><p className="text-gray-600">Best photos will be featured in our social media and local exhibitions.</p></>
                ][i]}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white" ref={ctaRef}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Capture Tirunelveli?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join fellow photography enthusiasts and explore our city through your unique perspective.
          </p>
          <Link href="/register">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
            >
              Register for Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8" ref={footerRef}>
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Camera className="h-6 w-6" />
            <span className="text-lg font-semibold">PhotoWalk Tirunelveli</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
