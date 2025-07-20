"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { Accessibility, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

interface HeaderProps {
  accessibilityMode: {
    highContrast: boolean;
    dyslexiaFriendly: boolean;
    largeText: boolean;
    reducedMotion: boolean;
  };
  setAccessibilityMode: (mode: any) => void;
}

export default function Header({
  accessibilityMode,
  setAccessibilityMode,
}: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showAccessibilitySheet, setShowAccessibilitySheet] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="/logo.png"
              alt="YoaAbx logo"
              className="w-10 h-10 rounded-lg"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              YoAbx
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-slate-300 hover:text-white transition-colors relative"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.name}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-slate-300 hover:text-white"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            {/* Accessibility Toggle - icon only on mobile */}
            <div className="block md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAccessibilitySheet(true)}
                className="text-slate-300 hover:text-white"
              >
                <Accessibility className="w-5 h-5" />
              </Button>
              <Sheet
                open={showAccessibilitySheet}
                onOpenChange={setShowAccessibilitySheet}
              >
                <SheetContent side="bottom" className="p-0 max-w-full w-full">
                  <div className="p-4">
                    <h3 className="text-sm font-semibold mb-3 text-white">
                      Accessibility Options
                    </h3>
                    <div className="space-y-2">
                      {[
                        { key: "highContrast", label: "High Contrast" },
                        { key: "dyslexiaFriendly", label: "Dyslexia Friendly" },
                        { key: "largeText", label: "Large Text" },
                        { key: "reducedMotion", label: "Reduced Motion" },
                      ].map((option) => (
                        <label
                          key={option.key}
                          className="flex items-center space-x-2 text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={
                              accessibilityMode[
                                option.key as keyof typeof accessibilityMode
                              ]
                            }
                            onChange={(e) =>
                              setAccessibilityMode({
                                ...accessibilityMode,
                                [option.key]: e.target.checked,
                              })
                            }
                            className="rounded"
                          />
                          <span className="text-slate-300">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <div className="hidden md:block">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAccessibility(!showAccessibility)}
                className="text-slate-300 hover:text-white"
              >
                <Accessibility className="w-5 h-5" />
              </Button>
            </div>
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-slate-300 hover:text-white"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.nav
            className="md:hidden mt-4 pb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="block py-2 text-slate-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
                whileHover={{ x: 10 }}
              >
                {item.name}
              </motion.a>
            ))}
          </motion.nav>
        )}

        {/* Accessibility Panel for desktop only */}
        {showAccessibility && (
          <motion.div
            className="absolute top-full right-4 mt-2 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg p-4 w-64 hidden md:block"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-sm font-semibold mb-3 text-white">
              Accessibility Options
            </h3>
            <div className="space-y-2">
              {[
                { key: "highContrast", label: "High Contrast" },
                { key: "dyslexiaFriendly", label: "Dyslexia Friendly" },
                { key: "largeText", label: "Large Text" },
                { key: "reducedMotion", label: "Reduced Motion" },
              ].map((option) => (
                <label
                  key={option.key}
                  className="flex items-center space-x-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={
                      accessibilityMode[
                        option.key as keyof typeof accessibilityMode
                      ]
                    }
                    onChange={(e) =>
                      setAccessibilityMode({
                        ...accessibilityMode,
                        [option.key]: e.target.checked,
                      })
                    }
                    className="rounded"
                  />
                  <span className="text-slate-300">{option.label}</span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
