"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Sparkles, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function PersonalizedVideoIntro() {
  const [showPersonalization, setShowPersonalization] = useState(false)
  const [visitorInfo, setVisitorInfo] = useState({
    name: "",
    company: "",
    role: "",
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [personalizedVideo, setPersonalizedVideo] = useState<string | null>(null)

  const generatePersonalizedVideo = async () => {
    setIsGenerating(true)

    // Simulate AI video generation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // In a real implementation, this would call an AI video generation API
    setPersonalizedVideo("generated-video-url")
    setIsGenerating(false)
  }

  const getPersonalizedScript = () => {
    const { name, company, role } = visitorInfo

    if (name && company) {
      return `Hi ${name}! I see you're from ${company}${role ? ` working as a ${role}` : ""}. I'm excited to show you how my expertise in Frontend and Flutter development can help ${company} build amazing digital experiences. Let me walk you through some projects that might be particularly relevant to your needs.`
    } else if (name) {
      return `Hello ${name}! Welcome to my portfolio. I'm a Frontend and Flutter developer passionate about creating immersive digital experiences. I'd love to show you some of my work and discuss how we might collaborate on your next project.`
    } else {
      return `Welcome to my portfolio! I'm a Frontend and Flutter developer with 6+ years of experience building scalable applications. Let me give you a personalized tour of my work and show you why we'd be a great fit for your next project.`
    }
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
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 overflow-hidden">
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Video Preview */}
                  <div className="relative">
                    <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                      {personalizedVideo ? (
                        <div className="w-full h-full bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center">
                          <div className="text-center">
                            <Video className="w-16 h-16 text-white mx-auto mb-4" />
                            <p className="text-white">Your personalized video is ready!</p>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                          <div className="text-center">
                            <motion.div
                              className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Play className="w-8 h-8 text-white ml-1" />
                            </motion.div>
                            <p className="text-slate-300">Click to generate your personalized intro</p>
                          </div>
                        </div>
                      )}

                      {/* Loading Overlay */}
                      <AnimatePresence>
                        {isGenerating && (
                          <motion.div
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <div className="text-center">
                              <motion.div
                                className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full mx-auto mb-4"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              />
                              <p className="text-white">Generating your personalized video...</p>
                              <p className="text-slate-400 text-sm mt-2">This may take a few moments</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Personalization Form */}
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-4">Get Your Personalized Video Introduction</h2>
                      <p className="text-slate-300 mb-6">
                        Tell me a bit about yourself and I'll create a custom video introduction tailored just for you!
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Your Name</label>
                        <Input
                          value={visitorInfo.name}
                          onChange={(e) => setVisitorInfo({ ...visitorInfo, name: e.target.value })}
                          placeholder="e.g., Sarah Johnson"
                          className="bg-white/10 border-white/20 text-white placeholder-slate-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Company (Optional)</label>
                        <Input
                          value={visitorInfo.company}
                          onChange={(e) => setVisitorInfo({ ...visitorInfo, company: e.target.value })}
                          placeholder="e.g., Google, Meta, Startup Inc."
                          className="bg-white/10 border-white/20 text-white placeholder-slate-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Your Role (Optional)</label>
                        <Input
                          value={visitorInfo.role}
                          onChange={(e) => setVisitorInfo({ ...visitorInfo, role: e.target.value })}
                          placeholder="e.g., CTO, Product Manager, Recruiter"
                          className="bg-white/10 border-white/20 text-white placeholder-slate-400"
                        />
                      </div>
                    </div>

                    {/* Preview Script */}
                    {(visitorInfo.name || visitorInfo.company) && (
                      <motion.div
                        className="bg-white/5 rounded-lg p-4 border border-white/10"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                      >
                        <h4 className="text-white font-semibold mb-2 flex items-center space-x-2">
                          <Sparkles className="w-4 h-4 text-yellow-400" />
                          <span>Video Preview</span>
                        </h4>
                        <p className="text-slate-300 text-sm italic">"{getPersonalizedScript()}"</p>
                      </motion.div>
                    )}

                    <Button
                      onClick={generatePersonalizedVideo}
                      disabled={isGenerating || !visitorInfo.name}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3"
                    >
                      {isGenerating ? (
                        <>
                          <motion.div
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          />
                          Generating Video...
                        </>
                      ) : (
                        <>
                          <Video className="w-4 h-4 mr-2" />
                          Generate My Personal Video
                        </>
                      )}
                    </Button>

                    {personalizedVideo && (
                      <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Button
                          variant="outline"
                          className="border-green-500 text-green-300 hover:bg-green-500 hover:text-white bg-transparent"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Play Personalized Video
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
