"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function VoiceNavigation() {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [feedback, setFeedback] = useState("")
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Check for speech recognition support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      setIsSupported(true)
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = "en-US"

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex
        const transcript = event.results[current][0].transcript.toLowerCase()
        setTranscript(transcript)

        if (event.results[current].isFinal) {
          handleVoiceCommand(transcript)
        }
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [])

  const handleVoiceCommand = (command: string) => {
    const commands = {
      "show projects": () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
        setFeedback("Navigating to projects section")
      },
      "show skills": () => {
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })
        setFeedback("Showing skills and expertise")
      },
      "show blog": () => {
        document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" })
        setFeedback("Opening technical blog")
      },
      "contact me": () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
        setFeedback("Opening contact section")
      },
      "go home": () => {
        document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })
        setFeedback("Going to home section")
      },
      "tell me about react": () => {
        setFeedback(
          "I specialize in React with 5+ years of experience, including Next.js, TypeScript, and modern state management.",
        )
        speak(
          "I specialize in React with over 5 years of experience, including Next.js, TypeScript, and modern state management.",
        )
      },
      "tell me about flutter": () => {
        setFeedback(
          "I'm expert in Flutter development with Dart, creating cross-platform mobile apps with beautiful UIs.",
        )
        speak(
          "I'm an expert in Flutter development with Dart, creating cross-platform mobile apps with beautiful user interfaces.",
        )
      },
      "latest project": () => {
        setFeedback("My latest project is a Flutter e-commerce app with payment integration and real-time features.")
        speak("My latest project is a Flutter e-commerce app with payment integration and real-time features.")
      },
    }

    // Find matching command
    const matchedCommand = Object.keys(commands).find(
      (cmd) => command.includes(cmd) || cmd.split(" ").every((word) => command.includes(word)),
    )

    if (matchedCommand) {
      commands[matchedCommand as keyof typeof commands]()
    } else {
      setFeedback("Command not recognized. Try 'show projects', 'show skills', or 'tell me about React'")
    }

    // Clear feedback after 3 seconds
    setTimeout(() => setFeedback(""), 3000)
  }

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }
  }

  const toggleListening = () => {
    if (!isSupported) {
      alert("Voice recognition is not supported in your browser")
      return
    }

    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      recognitionRef.current?.start()
      setIsListening(true)
      setTranscript("")
    }
  }

  if (!isSupported) return null

  return (
    <>
      {/* Voice Control Button */}
      <motion.div
        className="fixed top-32 right-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        <Button
          onClick={toggleListening}
          className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
            isListening
              ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 animate-pulse"
              : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
          }`}
        >
          {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </Button>
      </motion.div>

      {/* Voice Feedback */}
      <AnimatePresence>
        {(isListening || feedback || transcript) && (
          <motion.div
            className="fixed top-48 right-6 z-50 w-80"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <Card className="bg-black/90 backdrop-blur-md border border-green-500/30">
              <CardContent className="p-4">
                {isListening && (
                  <div className="flex items-center space-x-2 mb-2">
                    <motion.div
                      className="w-3 h-3 bg-red-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    />
                    <span className="text-white text-sm">Listening...</span>
                  </div>
                )}

                {transcript && (
                  <div className="mb-2">
                    <p className="text-slate-300 text-sm">You said:</p>
                    <p className="text-white font-medium">"{transcript}"</p>
                  </div>
                )}

                {feedback && (
                  <div className="flex items-start space-x-2">
                    <Volume2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-green-300 text-sm">{feedback}</p>
                  </div>
                )}

                <div className="mt-3 pt-3 border-t border-white/10">
                  <p className="text-slate-400 text-xs">Try commands like:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {["Show projects", "Show skills", "Tell me about React"].map((cmd) => (
                      <span key={cmd} className="bg-white/10 px-2 py-1 rounded text-xs text-slate-300">
                        "{cmd}"
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
