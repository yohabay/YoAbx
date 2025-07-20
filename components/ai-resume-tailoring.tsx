"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Download, Wand2, FileText, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function AIResumeTailoring() {
  const [showTailoring, setShowTailoring] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    companySize: "",
    techStack: "",
    projectType: "",
    experience: "",
  })
  const [tailoredResume, setTailoredResume] = useState<any>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const generateTailoredResume = async () => {
    setIsGenerating(true)

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Generate tailored content based on input
    const tailoredContent = {
      summary: generateSummary(formData),
      skills: generateSkills(formData),
      projects: generateProjects(formData),
      experience: generateExperience(formData),
      matchScore: Math.floor(Math.random() * 20) + 80, // 80-100%
    }

    setTailoredResume(tailoredContent)
    setIsGenerating(false)
  }

  const generateSummary = (data: typeof formData) => {
    const summaries = {
      "Frontend Developer": `Passionate Frontend Developer with 6+ years of experience building scalable web applications. Expert in React, TypeScript, and modern JavaScript frameworks with a focus on performance optimization and user experience.`,
      "Flutter Developer": `Senior Flutter Developer specializing in cross-platform mobile applications. Proven track record of delivering high-quality apps with beautiful UIs and seamless user experiences across iOS and Android platforms.`,
      "Full Stack Developer": `Versatile Full Stack Developer with expertise in both frontend and backend technologies. Experienced in React, Flutter, Node.js, and cloud platforms, capable of delivering end-to-end solutions.`,
    }

    return summaries[data.role as keyof typeof summaries] || summaries["Frontend Developer"]
  }

  const generateSkills = (data: typeof formData) => {
    const baseSkills = ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"]
    const roleSpecificSkills = {
      "Frontend Developer": ["Next.js", "Vue.js", "Webpack", "Vite", "Jest"],
      "Flutter Developer": ["Dart", "Firebase", "SQLite", "Provider", "BLoC"],
      "Full Stack Developer": ["Node.js", "Express", "MongoDB", "PostgreSQL", "AWS"],
    }

    const techStackSkills = data.techStack
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)

    return [
      ...baseSkills,
      ...(roleSpecificSkills[data.role as keyof typeof roleSpecificSkills] || []),
      ...techStackSkills,
    ]
  }

  const generateProjects = (data: typeof formData) => {
    const projects = [
      {
        name: "E-Commerce Platform",
        description: `Built a scalable e-commerce platform using ${data.techStack || "React and Node.js"} for ${data.companySize || "medium-sized"} businesses`,
        impact: "Increased conversion rates by 35%",
      },
      {
        name: "Mobile Banking App",
        description: `Developed a secure mobile banking application with Flutter, serving ${data.companySize === "startup" ? "10,000+" : "100,000+"} users`,
        impact: "Achieved 4.8/5 app store rating",
      },
      {
        name: "Analytics Dashboard",
        description: `Created real-time analytics dashboard for ${data.projectType || "business intelligence"} using modern web technologies`,
        impact: "Reduced data processing time by 60%",
      },
    ]

    return projects.slice(0, data.companySize === "startup" ? 2 : 3)
  }

  const generateExperience = (data: typeof formData) => {
    return [
      {
        role: "Senior Frontend Developer",
        company: "Tech Innovators Inc.",
        period: "2022 - Present",
        achievements: [
          `Led development of ${data.projectType || "web applications"} using ${data.techStack || "React and TypeScript"}`,
          `Mentored team of ${data.companySize === "startup" ? "3" : "5"} junior developers`,
          "Improved application performance by 40% through optimization",
        ],
      },
      {
        role: "Flutter Developer",
        company: "Mobile Solutions Ltd.",
        period: "2020 - 2022",
        achievements: [
          "Developed 8+ cross-platform mobile applications",
          "Implemented CI/CD pipelines reducing deployment time by 50%",
          "Collaborated with UX team to improve user engagement by 25%",
        ],
      },
    ]
  }

  const downloadResume = () => {
    // In a real implementation, this would generate and download a PDF
    const resumeData = {
      ...tailoredResume,
      personalInfo: {
        name: "Your Name",
        email: "your.email@example.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
      },
      targetRole: formData.role,
      targetCompany: formData.company,
    }

    console.log("Downloading tailored resume:", resumeData)
    alert("Resume download started! (In real implementation, a PDF would be generated)")
  }

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
              AI-Powered Resume Tailoring
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Get a personalized resume tailored to your specific role and company needs using advanced AI
          </p>

          <Button
            onClick={() => setShowTailoring(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full"
          >
            <Brain className="w-5 h-5 mr-2" />
            Create Tailored Resume
          </Button>
        </motion.div>

        <AnimatePresence>
          {showTailoring && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
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
                <Card className="bg-black/90 backdrop-blur-md border border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Brain className="w-6 h-6 text-purple-400" />
                        <span>AI Resume Tailoring</span>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={() => setShowTailoring(false)}
                        className="text-white hover:bg-white/10"
                      >
                        ×
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!tailoredResume ? (
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Target Role</label>
                            <select
                              name="role"
                              value={formData.role}
                              onChange={handleInputChange}
                              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                            >
                              <option value="">Select Role</option>
                              <option value="Frontend Developer">Frontend Developer</option>
                              <option value="Flutter Developer">Flutter Developer</option>
                              <option value="Full Stack Developer">Full Stack Developer</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Company Name</label>
                            <Input
                              name="company"
                              value={formData.company}
                              onChange={handleInputChange}
                              placeholder="e.g., Google, Meta, Startup Inc."
                              className="bg-white/10 border-white/20 text-white placeholder-slate-400"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Company Size</label>
                            <select
                              name="companySize"
                              value={formData.companySize}
                              onChange={handleInputChange}
                              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                            >
                              <option value="">Select Size</option>
                              <option value="startup">Startup (1-50)</option>
                              <option value="medium">Medium (51-500)</option>
                              <option value="large">Large (500+)</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Required Tech Stack</label>
                            <Input
                              name="techStack"
                              value={formData.techStack}
                              onChange={handleInputChange}
                              placeholder="React, TypeScript, Node.js, AWS"
                              className="bg-white/10 border-white/20 text-white placeholder-slate-400"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Project Type</label>
                            <Input
                              name="projectType"
                              value={formData.projectType}
                              onChange={handleInputChange}
                              placeholder="e.g., E-commerce, SaaS, Mobile Apps"
                              className="bg-white/10 border-white/20 text-white placeholder-slate-400"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Experience Level</label>
                            <select
                              name="experience"
                              value={formData.experience}
                              onChange={handleInputChange}
                              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                            >
                              <option value="">Select Level</option>
                              <option value="junior">Junior (1-3 years)</option>
                              <option value="mid">Mid-level (3-6 years)</option>
                              <option value="senior">Senior (6+ years)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Match Score */}
                        <div className="text-center">
                          <div className="inline-flex items-center space-x-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2">
                            <Sparkles className="w-5 h-5 text-green-400" />
                            <span className="text-green-300 font-semibold">
                              {tailoredResume.matchScore}% Match Score
                            </span>
                          </div>
                        </div>

                        {/* Tailored Summary */}
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">Professional Summary</h3>
                          <p className="text-slate-300 bg-white/5 rounded-lg p-4">{tailoredResume.summary}</p>
                        </div>

                        {/* Skills */}
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">Key Skills</h3>
                          <div className="flex flex-wrap gap-2">
                            {tailoredResume.skills.map((skill: string, index: number) => (
                              <Badge key={index} className="bg-purple-500/20 text-purple-300">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Projects */}
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">Relevant Projects</h3>
                          <div className="space-y-3">
                            {tailoredResume.projects.map((project: any, index: number) => (
                              <div key={index} className="bg-white/5 rounded-lg p-4">
                                <h4 className="text-white font-medium">{project.name}</h4>
                                <p className="text-slate-300 text-sm mt-1">{project.description}</p>
                                <p className="text-green-400 text-sm mt-2">Impact: {project.impact}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-6 flex justify-center space-x-4">
                      {!tailoredResume ? (
                        <Button
                          onClick={generateTailoredResume}
                          disabled={isGenerating || !formData.role}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8"
                        >
                          {isGenerating ? (
                            <>
                              <motion.div
                                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Wand2 className="w-4 h-4 mr-2" />
                              Generate Resume
                            </>
                          )}
                        </Button>
                      ) : (
                        <div className="flex space-x-4">
                          <Button
                            onClick={downloadResume}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </Button>
                          <Button
                            onClick={() => setTailoredResume(null)}
                            variant="outline"
                            className="border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Create Another
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
