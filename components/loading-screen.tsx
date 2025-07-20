"use client"

import { motion } from "framer-motion"
import { Code, Zap, Sparkles } from "lucide-react"

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          className="relative mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div className="w-24 h-24 border-4 border-purple-500/30 rounded-full" />
          <div className="absolute inset-0 w-24 h-24 border-4 border-t-purple-500 rounded-full animate-spin" />
          <motion.div
            className="absolute inset-4 bg-purple-500/20 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          >
            <Code className="w-8 h-8 text-purple-400" />
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          Loading Portfolio
        </motion.h1>

        <div className="flex items-center justify-center space-x-2 text-purple-300">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
          >
            <Zap className="w-4 h-4" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
          >
            <Code className="w-4 h-4" />
          </motion.div>
        </div>

        <motion.p
          className="mt-4 text-slate-400"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          Initializing immersive experience...
        </motion.p>
      </div>
    </div>
  )
}
