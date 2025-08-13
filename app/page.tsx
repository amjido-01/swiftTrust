"use client"

import { useState, useEffect } from "react"
import { SplashScreen } from "@/components/splash-screen"
import { OnboardingFlow } from "@/components/onboarding-flow"

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
      setShowOnboarding(true)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return <SplashScreen />
  }

  if (showOnboarding) {
    return <OnboardingFlow onComplete={() => setShowOnboarding(false)} />
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-serif font-bold text-foreground">Welcome to FinFlow!</h1>
        <p className="text-muted-foreground font-sans">Your financial journey begins here.</p>
      </div>
    </div>
  )
}
