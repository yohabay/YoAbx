import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome to my portfolio!",
      developer: "Frontend & Flutter Developer",
      projects: "Projects",
      skills: "Skills & Expertise",
      blog: "Technical Blog & Tutorials",
      contact: "Let's Work Together",
      // ...add more keys as needed
    },
  },
  es: {
    translation: {
      welcome: "¡Bienvenido a mi portafolio!",
      developer: "Desarrollador Frontend y Flutter",
      projects: "Proyectos",
      skills: "Habilidades y Experiencia",
      blog: "Blog Técnico y Tutoriales",
      contact: "Trabajemos Juntos",
      // ...add more keys as needed
    },
  },
  am: {
    translation: {
      welcome: "እንኳን ወደ ፖርትፎሊዮዬ በደህና መጡ!",
      developer: "ፊት አና ፍላተር ዲቨሎፐር",
      projects: "ፕሮጀክቶች",
      skills: "ክህሎቶች እና ችሎታ",
      blog: "ቴክኒካል ብሎግ እና ትምህርቶች",
      contact: "እንደ ቡድን እንሰራ",
      // ...add more keys as needed
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
