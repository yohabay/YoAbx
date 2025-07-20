"use client"
import { Accessibility } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AccessibilityPanelProps {
  accessibilityMode: {
    highContrast: boolean
    dyslexiaFriendly: boolean
    largeText: boolean
    reducedMotion: boolean
  }
  setAccessibilityMode: (mode: any) => void
}

export default function AccessibilityPanel({ accessibilityMode, setAccessibilityMode }: AccessibilityPanelProps) {
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Card className="bg-black/90 backdrop-blur-md border border-white/20 w-64">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-sm flex items-center space-x-2">
            <Accessibility className="w-4 h-4" />
            <span>Accessibility</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { key: "highContrast", label: "High Contrast" },
            { key: "dyslexiaFriendly", label: "Dyslexia Friendly" },
            { key: "largeText", label: "Large Text" },
            { key: "reducedMotion", label: "Reduced Motion" },
          ].map((option) => (
            <label key={option.key} className="flex items-center space-x-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={accessibilityMode[option.key as keyof typeof accessibilityMode]}
                onChange={(e) =>
                  setAccessibilityMode({
                    ...accessibilityMode,
                    [option.key]: e.target.checked,
                  })
                }
                className="rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500"
              />
              <span className="text-slate-300">{option.label}</span>
            </label>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
