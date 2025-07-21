"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";
import { useState } from "react";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  // { code: "es", name: "Español", flag: "🇪🇸" },
  // { code: "fr", name: "Français", flag: "🇫🇷" },
  // { code: "de", name: "Deutsch", flag: "🇩🇪" },
  // { code: "zh", name: "中文", flag: "🇨🇳" },
  // { code: "ja", name: "日本語", flag: "🇯🇵" },
  // { code: "ko", name: "한국어", flag: "🇰🇷" },
  // { code: "pt", name: "Português", flag: "🇵🇹" },
];

const translations = {
  en: {
    title: "Frontend & Flutter Developer",
    subtitle:
      "Crafting immersive digital experiences with cutting-edge technology",
    projects: "Interactive Project Explorer",
    skills: "Skills & Expertise",
    blog: "Technical Blog & Tutorials",
    contact: "Let's Work Together",
  },
  es: {
    title: "Desarrollador Frontend y Flutter",
    subtitle:
      "Creando experiencias digitales inmersivas con tecnología de vanguardia",
    projects: "Explorador Interactivo de Proyectos",
    skills: "Habilidades y Experiencia",
    blog: "Blog Técnico y Tutoriales",
    contact: "Trabajemos Juntos",
  },
  fr: {
    title: "Développeur Frontend et Flutter",
    subtitle:
      "Créer des expériences numériques immersives avec une technologie de pointe",
    projects: "Explorateur de Projets Interactif",
    skills: "Compétences et Expertise",
    blog: "Blog Technique et Tutoriels",
    contact: "Travaillons Ensemble",
  },
  de: {
    title: "Frontend & Flutter Entwickler",
    subtitle:
      "Immersive digitale Erlebnisse mit modernster Technologie schaffen",
    projects: "Interaktiver Projekt-Explorer",
    skills: "Fähigkeiten & Expertise",
    blog: "Technischer Blog & Tutorials",
    contact: "Lass uns zusammenarbeiten",
  },
  zh: {
    title: "前端和Flutter开发者",
    subtitle: "用尖端技术打造沉浸式数字体验",
    projects: "交互式项目浏览器",
    skills: "技能与专长",
    blog: "技术博客与教程",
    contact: "让我们合作",
  },
};

export default function MultiLanguageToggle() {
  const [currentLang, setCurrentLang] = useState("en");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const translateContent = async (targetLang: string) => {
    if (targetLang === currentLang) return;

    setIsTranslating(true);

    // Simulate translation API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Apply translations to the page
    const elements = document.querySelectorAll("[data-translate]");
    elements.forEach((element) => {
      const key = element.getAttribute("data-translate");
      if (key && translations[targetLang as keyof typeof translations]) {
        const translation =
          translations[targetLang as keyof typeof translations][
            key as keyof typeof translations.en
          ];
        if (translation) {
          element.textContent = translation;
        }
      }
    });

    setCurrentLang(targetLang);
    setIsTranslating(false);
    setShowDropdown(false);
  };

  const currentLanguage =
    languages.find((lang) => lang.code === currentLang) || languages[0];

  return (
    <>
      {/* Language Toggle Button */}
      <motion.div
        className="fixed top-24 left-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <Button
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-4 py-2 rounded-full"
        >
          <Globe className="w-4 h-4 mr-2" />
          <span className="mr-1">{currentLanguage.flag}</span>
          <span className="mr-2">{currentLanguage.name}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              showDropdown ? "rotate-180" : ""
            }`}
          />
        </Button>

        {/* Translation Status */}
        <AnimatePresence>
          {isTranslating && (
            <motion.div
              className="absolute top-full left-0 mt-2 bg-black/90 backdrop-blur-md border border-blue-500/30 rounded-lg px-3 py-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  className="w-3 h-3 border-2 border-blue-400/30 border-t-blue-400 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
                <span className="text-blue-300 text-sm">Translating...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Language Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            className="fixed top-40 left-6 z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card className="bg-black/90 backdrop-blur-md border border-white/20 w-48">
              <CardContent className="p-2">
                <div className="space-y-1">
                  {languages.map((language) => (
                    <motion.button
                      key={language.code}
                      onClick={() => translateContent(language.code)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        currentLang === language.code
                          ? "bg-purple-500/20 text-purple-300"
                          : "text-slate-300 hover:bg-white/10 hover:text-white"
                      }`}
                      whileHover={{ x: 4 }}
                      disabled={isTranslating}
                    >
                      <span className="text-lg">{language.flag}</span>
                      <span className="text-sm">{language.name}</span>
                      {currentLang === language.code && (
                        <motion.div
                          className="ml-auto w-2 h-2 bg-purple-400 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
