"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, Star, Zap, Target, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Achievement {
  id: string
  title: string
  description: string
  icon: any
  unlocked: boolean
  progress: number
  maxProgress: number
  rarity: "common" | "rare" | "epic" | "legendary"
}

const achievements: Achievement[] = [
  {
    id: "explorer",
    title: "Portfolio Explorer",
    description: "Visit 3 different sections",
    icon: Target,
    unlocked: false,
    progress: 0,
    maxProgress: 3,
    rarity: "common",
  },
  {
    id: "project_viewer",
    title: "Project Enthusiast",
    description: "View 5 project details",
    icon: Star,
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    rarity: "rare",
  },
  {
    id: "skill_master",
    title: "Skill Analyzer",
    description: "Explore all skill categories",
    icon: Zap,
    unlocked: false,
    progress: 0,
    maxProgress: 4,
    rarity: "epic",
  },
  {
    id: "voice_commander",
    title: "Voice Commander",
    description: "Use voice navigation 3 times",
    icon: Trophy,
    unlocked: false,
    progress: 0,
    maxProgress: 3,
    rarity: "legendary",
  },
  {
    id: "ar_pioneer",
    title: "AR Pioneer",
    description: "Try the AR portfolio preview",
    icon: Award,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rarity: "epic",
  },
]

export default function GamifiedExperience() {
  const [userAchievements, setUserAchievements] = useState<Achievement[]>(achievements)
  const [showAchievements, setShowAchievements] = useState(false)
  const [newUnlock, setNewUnlock] = useState<Achievement | null>(null)
  const [totalScore, setTotalScore] = useState(0)
  const [level, setLevel] = useState(1)

  useEffect(() => {
    // Track section visits
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            if (sectionId) {
              updateProgress("explorer", 1)
            }
          }
        })
      },
      { threshold: 0.5 },
    )

    // Observe all sections
    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    // Listen for custom events
    const handleProjectView = () => updateProgress("project_viewer", 1)
    const handleSkillView = () => updateProgress("skill_master", 1)
    const handleVoiceCommand = () => updateProgress("voice_commander", 1)
    const handleARView = () => updateProgress("ar_pioneer", 1)

    window.addEventListener("project-viewed", handleProjectView)
    window.addEventListener("skill-viewed", handleSkillView)
    window.addEventListener("voice-command-used", handleVoiceCommand)
    window.addEventListener("ar-viewed", handleARView)

    return () => {
      observer.disconnect()
      window.removeEventListener("project-viewed", handleProjectView)
      window.removeEventListener("skill-viewed", handleSkillView)
      window.removeEventListener("voice-command-used", handleVoiceCommand)
      window.removeEventListener("ar-viewed", handleARView)
    }
  }, [])

  const updateProgress = (achievementId: string, increment: number) => {
    setUserAchievements((prev) => {
      const updated = prev.map((achievement) => {
        if (achievement.id === achievementId && !achievement.unlocked) {
          const newProgress = Math.min(achievement.progress + increment, achievement.maxProgress)
          const isUnlocked = newProgress >= achievement.maxProgress

          if (isUnlocked && !achievement.unlocked) {
            const unlockedAchievement = { ...achievement, progress: newProgress, unlocked: true }
            setNewUnlock(unlockedAchievement)
            setTotalScore((prev) => prev + getRarityScore(achievement.rarity))

            // Hide unlock notification after 3 seconds
            setTimeout(() => setNewUnlock(null), 3000)
          }

          return { ...achievement, progress: newProgress, unlocked: isUnlocked }
        }
        return achievement
      })

      // Calculate level based on total score
      const newTotalScore = updated.reduce((sum, ach) => sum + (ach.unlocked ? getRarityScore(ach.rarity) : 0), 0)
      setLevel(Math.floor(newTotalScore / 100) + 1)

      return updated
    })
  }

  const getRarityScore = (rarity: Achievement["rarity"]) => {
    const scores = { common: 50, rare: 100, epic: 200, legendary: 500 }
    return scores[rarity]
  }

  const getRarityColor = (rarity: Achievement["rarity"]) => {
    const colors = {
      common: "from-gray-400 to-gray-600",
      rare: "from-blue-400 to-blue-600",
      epic: "from-purple-400 to-purple-600",
      legendary: "from-yellow-400 to-orange-500",
    }
    return colors[rarity]
  }

  const unlockedCount = userAchievements.filter((a) => a.unlocked).length
  const progressPercentage = (unlockedCount / userAchievements.length) * 100

  return (
    <>
      {/* Gamification Stats */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 3.5, duration: 0.5 }}
      >
        <Card
          className="bg-black/90 backdrop-blur-md border border-yellow-500/30 cursor-pointer hover:bg-black/95 transition-all"
          onClick={() => setShowAchievements(true)}
        >
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold">Level {level}</div>
                <div className="text-yellow-300 text-sm">
                  {unlockedCount}/{userAchievements.length} Achievements
                </div>
                <Progress value={progressPercentage} className="w-20 h-1 mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* New Achievement Unlock */}
      <AnimatePresence>
        {newUnlock && (
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 180, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <Card className={`bg-gradient-to-r ${getRarityColor(newUnlock.rarity)} p-1`}>
              <Card className="bg-black/90 backdrop-blur-md">
                <CardContent className="p-6 text-center">
                  <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5, repeat: 2 }}>
                    <newUnlock.icon className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Achievement Unlocked!</h3>
                  <h4 className="text-xl text-yellow-300 mb-2">{newUnlock.title}</h4>
                  <p className="text-slate-300 mb-4">{newUnlock.description}</p>
                  <Badge className={`bg-gradient-to-r ${getRarityColor(newUnlock.rarity)} text-white`}>
                    {newUnlock.rarity.toUpperCase()}
                  </Badge>
                  <div className="text-yellow-300 text-sm mt-2">+{getRarityScore(newUnlock.rarity)} XP</div>
                </CardContent>
              </Card>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievements Panel */}
      <AnimatePresence>
        {showAchievements && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <Card className="bg-black/90 backdrop-blur-md border border-yellow-500/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Trophy className="w-6 h-6 text-yellow-400" />
                      <span>Achievements</span>
                    </CardTitle>
                    <button
                      onClick={() => setShowAchievements(false)}
                      className="text-white hover:text-yellow-300 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-yellow-300">Level {level}</span>
                    <span className="text-slate-300">Score: {totalScore}</span>
                    <span className="text-slate-300">
                      {unlockedCount}/{userAchievements.length} Unlocked
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {userAchievements.map((achievement) => (
                      <motion.div
                        key={achievement.id}
                        className={`p-4 rounded-lg border transition-all ${
                          achievement.unlocked
                            ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)}/20 border-${achievement.rarity === "legendary" ? "yellow" : achievement.rarity === "epic" ? "purple" : achievement.rarity === "rare" ? "blue" : "gray"}-500/50`
                            : "bg-white/5 border-white/10"
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start space-x-3">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              achievement.unlocked
                                ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)}`
                                : "bg-gray-600"
                            }`}
                          >
                            <achievement.icon
                              className={`w-6 h-6 ${achievement.unlocked ? "text-white" : "text-gray-400"}`}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className={`font-semibold ${achievement.unlocked ? "text-white" : "text-gray-400"}`}>
                                {achievement.title}
                              </h4>
                              <Badge
                                variant="outline"
                                className={`text-xs ${
                                  achievement.unlocked
                                    ? `border-${achievement.rarity === "legendary" ? "yellow" : achievement.rarity === "epic" ? "purple" : achievement.rarity === "rare" ? "blue" : "gray"}-400 text-${achievement.rarity === "legendary" ? "yellow" : achievement.rarity === "epic" ? "purple" : achievement.rarity === "rare" ? "blue" : "gray"}-300`
                                    : "border-gray-500 text-gray-400"
                                }`}
                              >
                                {achievement.rarity}
                              </Badge>
                            </div>
                            <p className={`text-sm mb-2 ${achievement.unlocked ? "text-slate-300" : "text-gray-500"}`}>
                              {achievement.description}
                            </p>
                            <div className="flex items-center space-x-2">
                              <Progress
                                value={(achievement.progress / achievement.maxProgress) * 100}
                                className="flex-1 h-2"
                              />
                              <span className={`text-xs ${achievement.unlocked ? "text-white" : "text-gray-400"}`}>
                                {achievement.progress}/{achievement.maxProgress}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
