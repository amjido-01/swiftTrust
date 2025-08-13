"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"

interface OnboardingFlowProps {
  onComplete: () => void
}

function CoinsIllustration() {
  return (
    <div className="relative">
      {/* Credit card */}
      <div className="w-32 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg transform rotate-12 shadow-lg">
        <div className="p-3">
          <div className="w-6 h-4 bg-yellow-400 rounded-sm mb-2"></div>
          <div className="space-y-1">
            <div className="w-16 h-1 bg-white/50 rounded"></div>
            <div className="w-12 h-1 bg-white/50 rounded"></div>
          </div>
        </div>
      </div>

      {/* Coins */}
      <div className="absolute -bottom-4 -left-4">
        <div className="flex">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-12 h-12 bg-yellow-500 rounded-full border-2 border-yellow-400 flex items-center justify-center text-yellow-900 font-bold text-xs ${
                i > 0 ? "-ml-3" : ""
              }`}
              style={{ zIndex: 3 - i }}
            >
              $
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TradingIllustration() {
  return (
    <div className="relative">
      {/* Phone */}
      <div className="w-24 h-40 bg-gray-800 rounded-2xl border-2 border-gray-700 p-1">
        <div className="w-full h-full bg-blue-600 rounded-xl p-2 relative overflow-hidden">
          {/* Chart bars */}
          <div className="flex items-end justify-center space-x-1 h-16 mt-4">
            {[12, 8, 16, 10, 14, 6].map((height, i) => (
              <div key={i} className="w-2 bg-yellow-400 rounded-t" style={{ height: `${height}px` }} />
            ))}
          </div>

          {/* Trend line */}
          <div className="absolute top-6 left-2 right-2">
            <svg className="w-full h-8" viewBox="0 0 80 32">
              <path d="M0,20 Q20,10 40,15 T80,8" stroke="#fbbf24" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>
      </div>

      {/* Floating coins */}
      <div className="absolute -top-2 -right-2">
        <div className="w-8 h-8 bg-yellow-500 rounded-full border border-yellow-400 flex items-center justify-center text-yellow-900 font-bold text-xs">
          $
        </div>
      </div>

      <div className="absolute -bottom-2 -left-2">
        <div className="w-6 h-6 bg-yellow-500 rounded-full border border-yellow-400 flex items-center justify-center text-yellow-900 font-bold text-xs">
          $
        </div>
      </div>

      <div className="absolute top-8 -right-4">
        <div className="w-6 h-6 bg-yellow-500 rounded-full border border-yellow-400 flex items-center justify-center text-yellow-900 font-bold text-xs">
          $
        </div>
      </div>
    </div>
  )
}

const onboardingSlides = [
  {
    id: 1,
       title: "Instant Transfers, Every Time",
    description:
      "No more waiting for funds to clear. See your money credited instantly with our secure shadow balance system.",
    illustration: <CoinsIllustration />,
  },
  {
    id: 2,
     title: "Trust You Can See",
    description:
      "Get real-time updates on every transaction — from provisional credit to final settlement — so you’re never left guessing.",
    illustration: <TradingIllustration />,
  },
]


function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin()
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600 text-sm">Sign in to your account</p>
        </div>

        {/* Login form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-3 px-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
            Sign In
          </Button>
        </form>

        {/* Additional options */}
        <div className="text-center mt-6">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Forgot your password?</button>
        </div>
      </div>
    </div>
  )
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<"splash" | "onboarding" | "login">("splash")
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (currentStep === "splash") {
      const timer = setTimeout(() => {
        setCurrentStep("onboarding")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [currentStep])

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      setCurrentStep("login")
    }
  }

  const handleLogin = () => {
    onComplete()
  }


  if (currentStep === "login") {
    return <LoginScreen onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-sm">
          {/* Illustration */}
          <div className="flex justify-center mb-8">
            <div className="w-64 h-64 flex items-center justify-center">
              {onboardingSlides[currentSlide].illustration}
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-4 text-gray-900">{onboardingSlides[currentSlide].title}</h1>
            <p className="text-gray-600 text-sm leading-relaxed">{onboardingSlides[currentSlide].description}</p>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mb-8">
            {onboardingSlides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Action button */}
          <Button
            onClick={handleNext}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
          >
            {currentSlide === onboardingSlides.length - 1 ? "Continue" : "Get Started"}
          </Button>

          {/* Skip option */}
          <div className="text-center mt-4">
            <button
              onClick={() => setCurrentStep("login")}
              className="text-gray-400 text-sm hover:text-gray-600 transition-colors"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
