"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Video, Phone, Calendar, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function InstantVideoCall() {
  const [showCallInterface, setShowCallInterface] = useState(false)
  const [callType, setCallType] = useState<"instant" | "scheduled" | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [callStarted, setCallStarted] = useState(false)
  const [visitorInfo, setVisitorInfo] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const startInstantCall = async () => {
    setIsConnecting(true)

    // Simulate connection process
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setCallStarted(true)
    setIsConnecting(false)
  }

  const scheduleCall = () => {
    // In a real implementation, this would integrate with Calendly or similar
    alert("Redirecting to calendar booking...")
  }

  const availableSlots = [
    { time: "2:00 PM", available: true },
    { time: "3:30 PM", available: true },
    { time: "4:00 PM", available: false },
    { time: "5:00 PM", available: true },
  ]

  return (
    <>
      {/* Floating Call Button */}
      <motion.div
        className="fixed bottom-24 right-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 4, duration: 0.5 }}
      >
        <Button
          onClick={() => setShowCallInterface(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg group"
        >
          <Video className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </Button>
        <motion.div
          className="absolute -left-28 top-1/2 -translate-y-1/2 bg-black/90 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 5 }}
        >
          Quick Call
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-black/90 rotate-45" />
        </motion.div>
      </motion.div>

      {/* Call Interface Modal */}
      <AnimatePresence>
        {showCallInterface && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <Card className="bg-black/90 backdrop-blur-md border border-green-500/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Video className="w-6 h-6 text-green-400" />
                      <span>Connect Instantly</span>
                    </CardTitle>
                    <Button
                      variant="ghost"
                      onClick={() => setShowCallInterface(false)}
                      className="text-white hover:bg-white/10"
                    >
                      ×
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {!callType && (
                    <div className="space-y-6">
                      <p className="text-slate-300 text-center">
                        Ready to discuss your project? Choose how you'd like to connect:
                      </p>

                      <div className="grid md:grid-cols-2 gap-4">
                        <motion.button
                          onClick={() => setCallType("instant")}
                          className="p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-all text-left"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                              <Phone className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-white font-semibold">Instant Call</h3>
                              <p className="text-green-300 text-sm">Available now</p>
                            </div>
                          </div>
                          <p className="text-slate-300 text-sm">
                            Start a video call right now if I'm available. Perfect for quick questions or urgent
                            discussions.
                          </p>
                          <Badge className="mt-3 bg-green-500/20 text-green-300">Usually responds in 2 min</Badge>
                        </motion.button>

                        <motion.button
                          onClick={() => setCallType("scheduled")}
                          className="p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-all text-left"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                              <Calendar className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-white font-semibold">Schedule Call</h3>
                              <p className="text-blue-300 text-sm">Book a time</p>
                            </div>
                          </div>
                          <p className="text-slate-300 text-sm">
                            Schedule a dedicated time slot for a detailed discussion about your project requirements.
                          </p>
                          <Badge className="mt-3 bg-blue-500/20 text-blue-300">15, 30, or 60 min slots</Badge>
                        </motion.button>
                      </div>
                    </div>
                  )}

                  {callType === "instant" && !callStarted && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-xl font-semibold text-white mb-2">Quick Info</h3>
                        <p className="text-slate-300">Tell me a bit about yourself before we connect</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <Input
                          placeholder="Your Name"
                          value={visitorInfo.name}
                          onChange={(e) => setVisitorInfo({ ...visitorInfo, name: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder-slate-400"
                        />
                        <Input
                          placeholder="Company"
                          value={visitorInfo.company}
                          onChange={(e) => setVisitorInfo({ ...visitorInfo, company: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder-slate-400"
                        />
                      </div>

                      <Input
                        placeholder="Quick message about what you'd like to discuss"
                        value={visitorInfo.message}
                        onChange={(e) => setVisitorInfo({ ...visitorInfo, message: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder-slate-400"
                      />

                      {!isConnecting ? (
                        <div className="flex space-x-4">
                          <Button
                            onClick={startInstantCall}
                            disabled={!visitorInfo.name}
                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                          >
                            <Video className="w-4 h-4 mr-2" />
                            Start Video Call
                          </Button>
                          <Button
                            onClick={() => setCallType(null)}
                            variant="outline"
                            className="border-slate-500 text-slate-300 hover:bg-slate-500 hover:text-white"
                          >
                            Back
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <motion.div
                            className="w-16 h-16 border-4 border-green-500/30 border-t-green-500 rounded-full mx-auto mb-4"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          />
                          <h3 className="text-xl text-white mb-2">Connecting...</h3>
                          <p className="text-slate-400">Setting up your video call</p>
                        </div>
                      )}
                    </div>
                  )}

                  {callType === "scheduled" && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-xl font-semibold text-white mb-2">Schedule Your Call</h3>
                        <p className="text-slate-300">Choose a convenient time for our discussion</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Today's Availability</label>
                          <div className="space-y-2">
                            {availableSlots.map((slot, index) => (
                              <button
                                key={index}
                                disabled={!slot.available}
                                className={`w-full p-3 rounded-lg border text-left transition-all ${
                                  slot.available
                                    ? "border-green-500/30 bg-green-500/10 hover:bg-green-500/20 text-white"
                                    : "border-slate-600 bg-slate-800 text-slate-500 cursor-not-allowed"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{slot.time}</span>
                                  <Badge
                                    className={
                                      slot.available ? "bg-green-500/20 text-green-300" : "bg-slate-600 text-slate-400"
                                    }
                                  >
                                    {slot.available ? "Available" : "Booked"}
                                  </Badge>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Input
                            placeholder="Your Name"
                            className="bg-white/10 border-white/20 text-white placeholder-slate-400"
                          />
                          <Input
                            placeholder="Email"
                            type="email"
                            className="bg-white/10 border-white/20 text-white placeholder-slate-400"
                          />
                          <Input
                            placeholder="Company"
                            className="bg-white/10 border-white/20 text-white placeholder-slate-400"
                          />
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <Button
                          onClick={scheduleCall}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Book Call
                        </Button>
                        <Button
                          onClick={() => setCallType(null)}
                          variant="outline"
                          className="border-slate-500 text-slate-300 hover:bg-slate-500 hover:text-white"
                        >
                          Back
                        </Button>
                      </div>
                    </div>
                  )}

                  {callStarted && (
                    <div className="text-center py-8">
                      <motion.div
                        className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Video className="w-12 h-12 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-2">Call Connected!</h3>
                      <p className="text-slate-300 mb-6">
                        Great! In a real implementation, the video call would start here using WebRTC.
                      </p>
                      <div className="flex justify-center space-x-4">
                        <Button className="bg-red-500 hover:bg-red-600 text-white">
                          <Phone className="w-4 h-4 mr-2" />
                          End Call
                        </Button>
                        <Button variant="outline" className="border-slate-500 text-slate-300 bg-transparent">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Chat
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
