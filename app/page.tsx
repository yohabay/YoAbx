"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ThemeProvider } from "next-themes"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import InteractiveProjectExplorer from "@/components/interactive-project-explorer"
import AIAssistant from "@/components/ai-assistant"
import SkillsVisualization from "@/components/skills-visualization"
import DeveloperStats from "@/components/developer-stats"
import TechnicalBlog from "@/components/technical-blog"
import AchievementsTimeline from "@/components/achievements-timeline"
import ContactSection from "@/components/contact-section"
import AccessibilityPanel from "@/components/accessibility-panel"
import LoadingScreen from "@/components/loading-screen"

// Add the new advanced components to the imports
import ARPortfolioPreview from "@/components/ar-portfolio-preview"
import VoiceNavigation from "@/components/voice-navigation"
import AIResumeTailoring from "@/components/ai-resume-tailoring"
import MultiLanguageToggle from "@/components/multi-language-toggle"
import GamifiedExperience from "@/components/gamified-experience"
import PersonalityQuiz from "@/components/personality-quiz"
// Add these imports back
import RealTimeCollaboration from "@/components/real-time-collaboration"
import PersonalizedVideoIntro from "@/components/personalized-video-intro"
import AIProjectRecommendations from "@/components/ai-project-recommendations"
import InstantVideoCall from "@/components/instant-video-call"

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true)
  const [accessibilityMode, setAccessibilityMode] = useState({
    highContrast: false,
    dyslexiaFriendly: false,
    largeText: false,
    reducedMotion: false,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div
        className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden ${
          accessibilityMode.highContrast ? "contrast-150" : ""
        } ${accessibilityMode.dyslexiaFriendly ? "font-mono" : ""} ${accessibilityMode.largeText ? "text-lg" : ""}`}
      >
        {/* Animated Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                "radial-gradient(600px circle at 0% 0%, rgba(120, 119, 198, 0.3), transparent 50%)",
                "radial-gradient(600px circle at 100% 100%, rgba(120, 119, 198, 0.3), transparent 50%)",
                "radial-gradient(600px circle at 0% 100%, rgba(120, 119, 198, 0.3), transparent 50%)",
                "radial-gradient(600px circle at 100% 0%, rgba(120, 119, 198, 0.3), transparent 50%)",
              ],
            }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        <div className="relative z-10">
          <Header accessibilityMode={accessibilityMode} setAccessibilityMode={setAccessibilityMode} />

          <main className="space-y-32">
            <HeroSection />
            <PersonalizedVideoIntro />
            <AIProjectRecommendations />
            <InteractiveProjectExplorer />
            <RealTimeCollaboration />
            <SkillsVisualization />
            <DeveloperStats />
            <TechnicalBlog />
            <AchievementsTimeline />
            <PersonalityQuiz />
            <AIResumeTailoring />
            <ContactSection />
          </main>
        </div>

        <AIAssistant />
        <VoiceNavigation />
        <ARPortfolioPreview />
        <MultiLanguageToggle />
        <GamifiedExperience />
        <AccessibilityPanel accessibilityMode={accessibilityMode} setAccessibilityMode={setAccessibilityMode} />
        <InstantVideoCall />
      </div>
    </ThemeProvider>
  )
}
