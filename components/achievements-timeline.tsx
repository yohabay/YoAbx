"use client"

import { motion } from "framer-motion"
import { Award, Trophy, Star, Zap, Calendar, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const achievements = [
  {
    year: "2024",
    title: "Senior Frontend Developer",
    company: "Tech Innovators Inc.",
    description: "Led a team of 5 developers in building a revolutionary e-commerce platform",
    type: "career",
    icon: Trophy,
    verified: true,
    link: "#",
  },
  {
    year: "2023",
    title: "Flutter Developer Certification",
    company: "Google",
    description: "Achieved Google Flutter Developer Certification with distinction",
    type: "certification",
    icon: Award,
    verified: true,
    link: "#",
  },
  {
    year: "2023",
    title: "Hackathon Winner",
    company: "TechCrunch Disrupt",
    description: "First place in mobile app category for innovative AR shopping experience",
    type: "achievement",
    icon: Star,
    verified: true,
    link: "#",
  },
  {
    year: "2022",
    title: "Open Source Contributor",
    company: "Flutter Community",
    description: "Major contributor to Flutter packages with 10k+ downloads",
    type: "contribution",
    icon: Zap,
    verified: true,
    link: "#",
  },
  {
    year: "2022",
    title: "React Advanced Certification",
    company: "Meta",
    description: "Completed advanced React development certification program",
    type: "certification",
    icon: Award,
    verified: true,
    link: "#",
  },
  {
    year: "2021",
    title: "Tech Conference Speaker",
    company: "DevCon 2021",
    description: 'Keynote speaker on "The Future of Cross-Platform Development"',
    type: "speaking",
    icon: Trophy,
    verified: true,
    link: "#",
  },
]

export default function AchievementsTimeline() {
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
              Achievements & Milestones
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A timeline of professional achievements, certifications, and contributions
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500" />

          <div className="space-y-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="relative flex items-start space-x-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Timeline Node */}
                <div className="relative z-10">
                  <motion.div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${
                      achievement.type === "career"
                        ? "from-blue-500 to-cyan-500"
                        : achievement.type === "certification"
                          ? "from-green-500 to-emerald-500"
                          : achievement.type === "achievement"
                            ? "from-yellow-500 to-orange-500"
                            : achievement.type === "contribution"
                              ? "from-purple-500 to-pink-500"
                              : "from-red-500 to-rose-500"
                    } flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <achievement.icon className="w-8 h-8 text-white" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <Badge variant="outline" className="border-purple-400 text-purple-300">
                              {achievement.year}
                            </Badge>
                            {achievement.verified && (
                              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Verified</Badge>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-white mb-1">{achievement.title}</h3>
                          <p className="text-purple-300 font-medium mb-2">{achievement.company}</p>
                          <p className="text-slate-300">{achievement.description}</p>
                        </div>
                        {achievement.link && (
                          <Button variant="ghost" size="icon" asChild>
                            <a href={achievement.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { label: "Certifications", value: "5+", icon: Award },
            { label: "Awards Won", value: "3", icon: Trophy },
            { label: "Speaking Events", value: "8", icon: Calendar },
            { label: "Years Experience", value: "6+", icon: Star },
          ].map((stat, index) => (
            <Card key={stat.label} className="bg-white/5 backdrop-blur-sm border border-white/10 text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
