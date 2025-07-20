"use client"

import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail, Download, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          className="mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative w-32 h-32 mx-auto mb-6">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <div className="absolute inset-1 rounded-full bg-slate-900 flex items-center justify-center">
              <img
                src="/placeholder.svg?height=120&width=120"
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Frontend & Flutter
          </span>
          <br />
          <span className="text-white">Developer</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Crafting immersive digital experiences with cutting-edge technology. Specializing in React, Flutter, and
          modern web development.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full">
            <Play className="w-4 h-4 mr-2" />
            View My Work
          </Button>
          <Button
            variant="outline"
            className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 rounded-full bg-transparent"
          >
            <Download className="w-4 h-4 mr-2" />
            Download CV
          </Button>
        </motion.div>

        <motion.div
          className="flex items-center justify-center space-x-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {[
            { icon: Github, href: "#", label: "GitHub" },
            { icon: Linkedin, href: "#", label: "LinkedIn" },
            { icon: Mail, href: "#", label: "Email" },
          ].map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-purple-500/20 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <ArrowDown className="w-6 h-6 mx-auto text-purple-400" />
        </motion.div>
      </div>
    </section>
  )
}
