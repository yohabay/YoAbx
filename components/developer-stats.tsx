"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { GitBranch, Code, Coffee, Award, Calendar, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    icon: GitBranch,
    label: "GitHub Commits",
    value: 1247,
    suffix: "+",
    color: "from-green-400 to-green-600",
  },
  {
    icon: Code,
    label: "Lines of Code",
    value: 50000,
    suffix: "+",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: Coffee,
    label: "Cups of Coffee",
    value: 892,
    suffix: "",
    color: "from-amber-400 to-amber-600",
  },
  {
    icon: Award,
    label: "Projects Completed",
    value: 24,
    suffix: "+",
    color: "from-purple-400 to-purple-600",
  },
  {
    icon: Calendar,
    label: "Coding Streak",
    value: 127,
    suffix: " days",
    color: "from-orange-400 to-orange-600",
  },
  {
    icon: Star,
    label: "GitHub Stars",
    value: 156,
    suffix: "",
    color: "from-yellow-400 to-yellow-600",
  },
]

const languages = [
  { name: "TypeScript", percentage: 35, color: "bg-blue-500" },
  { name: "Dart", percentage: 28, color: "bg-cyan-500" },
  { name: "JavaScript", percentage: 20, color: "bg-yellow-500" },
  { name: "Python", percentage: 10, color: "bg-green-500" },
  { name: "Other", percentage: 7, color: "bg-purple-500" },
]

export default function DeveloperStats() {
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0))

  useEffect(() => {
    const timers = stats.map((stat, index) => {
      return setTimeout(() => {
        let current = 0
        const increment = stat.value / 50
        const timer = setInterval(() => {
          current += increment
          if (current >= stat.value) {
            current = stat.value
            clearInterval(timer)
          }
          setAnimatedStats((prev) => {
            const newStats = [...prev]
            newStats[index] = Math.floor(current)
            return newStats
          })
        }, 30)
      }, index * 200)
    })

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Developer Statistics
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Real-time insights into my coding journey and achievements
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-4`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {animatedStats[index].toLocaleString()}
                    {stat.suffix}
                  </div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Language Usage */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Language Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <div key={lang.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-300">{lang.name}</span>
                      <span className="text-slate-400">{lang.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${lang.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Pushed to flutter-ecommerce", time: "2 hours ago", type: "commit" },
                  { action: "Created new branch: feature/auth", time: "5 hours ago", type: "branch" },
                  { action: "Merged PR #42", time: "1 day ago", type: "merge" },
                  { action: "Released v2.1.0", time: "3 days ago", type: "release" },
                  { action: "Fixed critical bug in dashboard", time: "1 week ago", type: "fix" },
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.type === "commit"
                          ? "bg-green-500"
                          : activity.type === "branch"
                            ? "bg-blue-500"
                            : activity.type === "merge"
                              ? "bg-purple-500"
                              : activity.type === "release"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="text-slate-300 text-sm">{activity.action}</div>
                      <div className="text-slate-500 text-xs">{activity.time}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
