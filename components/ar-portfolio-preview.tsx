"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Camera, QrCode, X, Smartphone, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ARPortfolioPreview() {
  const [showARModal, setShowARModal] = useState(false)
  const [isARSupported, setIsARSupported] = useState(false)
  const [qrCode, setQrCode] = useState("")

  useEffect(() => {
    // Check for WebXR support with proper error handling
    const checkARSupport = async () => {
      try {
        if ("xr" in navigator && navigator.xr) {
          // Check if the feature is available and permissions allow it
          const supported = await navigator.xr.isSessionSupported("immersive-ar").catch(() => false)
          setIsARSupported(supported)
        } else {
          setIsARSupported(false)
        }
      } catch (error) {
        // Handle permission policy errors gracefully
        console.log("AR not available due to permissions policy or browser support")
        setIsARSupported(false)
      }
    }

    checkARSupport()

    // Generate QR code URL (in real implementation, use a QR code library)
    const portfolioURL = window.location.href + "?ar=true"
    setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(portfolioURL)}`)
  }, [])

  const startARSession = async () => {
    if (!isARSupported) {
      alert("AR is not supported on this device. Please scan the QR code with your mobile device.")
      return
    }

    try {
      // Check if XR is available before requesting session
      if (!navigator.xr) {
        throw new Error("WebXR not available")
      }

      const session = await navigator.xr
        .requestSession("immersive-ar", {
          requiredFeatures: ["local", "hit-test"],
        })
        .catch((error) => {
          throw new Error(`Failed to start AR session: ${error.message}`)
        })

      // AR session logic would go here
      console.log("AR session started", session)
    } catch (error) {
      console.error("Failed to start AR session:", error)
      alert("AR session could not be started. Please try scanning the QR code with your mobile device instead.")
    }
  }

  return (
    <>
      {/* AR Trigger Button */}
      <motion.div
        className="fixed top-1/2 right-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 3, duration: 0.5 }}
      >
        <Button
          onClick={() => setShowARModal(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg group"
        >
          <Camera className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </Button>
        <motion.div
          className="absolute -left-32 top-1/2 -translate-y-1/2 bg-black/90 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 4 }}
        >
          View in AR
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-black/90 rotate-45" />
        </motion.div>
      </motion.div>

      {/* AR Modal */}
      <AnimatePresence>
        {showARModal && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-md"
            >
              <Card className="bg-black/90 backdrop-blur-md border border-cyan-500/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Camera className="w-5 h-5 text-cyan-400" />
                      <span>AR Portfolio Preview</span>
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowARModal(false)}
                      className="text-white hover:bg-white/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto bg-white rounded-lg p-4 mb-4">
                      <img
                        src={qrCode || "/placeholder.svg"}
                        alt="AR Portfolio QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-slate-300 text-sm mb-4">
                      Scan this QR code with your mobile device to view my portfolio in Augmented Reality
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={startARSession}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                      disabled={!isARSupported}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {isARSupported ? "Start AR Experience" : "AR Not Supported"}
                    </Button>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <Badge variant="outline" className="border-cyan-400 text-cyan-300 justify-center">
                        <Smartphone className="w-3 h-3 mr-1" />
                        Mobile Optimized
                      </Badge>
                      <Badge variant="outline" className="border-blue-400 text-blue-300 justify-center">
                        <QrCode className="w-3 h-3 mr-1" />
                        QR Compatible
                      </Badge>
                    </div>
                  </div>

                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                    <h4 className="text-cyan-300 font-semibold mb-2">AR Features:</h4>
                    <ul className="text-slate-300 text-sm space-y-1">
                      <li>• 3D project previews floating in space</li>
                      <li>• Interactive Flutter app demos</li>
                      <li>• Gesture-controlled navigation</li>
                      <li>• Immersive skill visualization</li>
                    </ul>
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
