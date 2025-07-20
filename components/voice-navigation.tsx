"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function VoiceNavigation() {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check for speech recognition support
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript.toLowerCase();
        setTranscript(transcript);

        if (event.results[current].isFinal) {
          handleVoiceCommand(transcript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleVoiceCommand = async (command: string) => {
    const commands = {
      "show projects": () => {
        const response = "Sure, let me show you my projects!";
        setFeedback(response);
        speak(response);
        document
          .getElementById("projects")
          ?.scrollIntoView({ behavior: "smooth" });
      },
      "show skills": () => {
        const response = "Absolutely! Here are my skills and expertise.";
        setFeedback(response);
        speak(response);
        document
          .getElementById("skills")
          ?.scrollIntoView({ behavior: "smooth" });
      },
      "show blog": () => {
        const response = "Opening my technical blog for you!";
        setFeedback(response);
        speak(response);
        document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" });
      },
      "contact me": () => {
        const response = "Taking you to the contact section!";
        setFeedback(response);
        speak(response);
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth" });
      },
      "go home": () => {
        const response = "Heading back to the home section.";
        setFeedback(response);
        speak(response);
        document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
      },
      "close the app": () => {
        const response = "Thank you for visiting! Closing voice assistant.";
        setFeedback(response);
        speak(response);
        setIsListening(false);
        recognitionRef.current?.stop();
      },
      "thank you": () => {
        const response = "You're welcome! If you need anything else, just ask.";
        setFeedback(response);
        speak(response);
        setIsListening(false);
        recognitionRef.current?.stop();
      },
    };

    // Find matching command
    const matchedCommand = Object.keys(commands).find(
      (cmd) =>
        command.includes(cmd) ||
        cmd.split(" ").every((word) => command.includes(word))
    );

    if (matchedCommand) {
      commands[matchedCommand as keyof typeof commands]();
      setTimeout(() => setFeedback(""), 3000);
    } else {
      // Use Gemini API for open-ended questions
      setFeedback("Thinking...");
      const apiKey = "AIzaSyCi4Oyq9MGRtQUV2714bErdUy8zG1HkJ-w"; // Use your Gemini API key
      const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const systemPrompt =
        "You are YoAbx, the AI assistant for Yohannis Abay Belihun. Always use the full profile below to answer any question about him, including social media, skills, experience, projects, and contact info.\n" +
        "Profile:\n" +
        "• Name: Yohannis Abay Belihun\n" +
        "• Email: abayyohannis267@gmail.com | abayyohannis2014@gmail.com\n" +
        "• GitHub: https://github.com/yohabay\n" +
        "• LinkedIn: https://www.linkedin.com/in/yohannis-abay-0907172b4/\n" +
        "• Specialization: Flutter & Frontend Developer (not a backend developer)\n" +
        "• Skills: Dart, JavaScript, React, Flutter, HTML, CSS, Firebase, Git, GitHub, Provider, BLoC, Riverpod, GoRouter, GraphQL, CI/CD, testing, performance optimization.\n" +
        "• Work Experience: Software Developer Intern & AI Research Assistant at Jimma AI Center, Flutter Developer at Debo Engineering, Ashara Technology, Shewaber Reward.\n" +
        "• Education: B.E. in Computer Science, Jimma University (CGPA: 3.5/4).\n" +
        "• Projects: EchoMart, Physician Connector App, Betting App, Bakery App, Guadaye App, Hospital Management System, Cross-Platform Mobile Apps, Used Product Shopping App, Intranet System, Investor Connector Website, and more.\n" +
        "• Certifications: Certified React Developer, Internship Certificate (Jimma University AI Center), Work Experience Certificate (Debo Engineering), GreatLearning: Spoken & Smart English Basics.\n" +
        "IMPORTANT: Do NOT use emojis or icons in your response. Focus on clear, natural, and friendly conversation.\n" +
        "Do NOT repeat the assistant introduction, contact info, or start every response with a greeting like 'Hey there!' or similar. Respond in a conversational, friendly, and engaging style—like a real chat. Use natural language, and ALWAYS offer actionable next steps, options, or clarifying questions if the user's request can't be fulfilled directly. For example, if asked about social media, and only GitHub and LinkedIn are available, say: 'Yohannis has GitHub and LinkedIn profiles. Would you like to see his GitHub projects, check out his LinkedIn, or learn more about his skills?'—and prompt the user to choose. If you do not have a specific detail, do NOT say 'I don't have access'; instead, respond helpfully and offer alternatives or next steps (e.g., 'I don't have that detail right now, but I can share other info or help with something else!'). Only answer the user's question, focusing on what was asked, and always use the full profile above for reference.\n" +
        command;
      const payload = {
        contents: [
          {
            parts: [
              {
                text: systemPrompt,
              },
            ],
          },
        ],
      };
      try {
        const res = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        let responseText = "Sorry, I couldn't find an answer.";
        if (
          data.candidates &&
          data.candidates[0]?.content?.parts &&
          data.candidates[0].content.parts[0]?.text
        ) {
          responseText = data.candidates[0].content.parts[0].text;
        } else if (data.error) {
          responseText = `Gemini API error: ${
            data.error.message || JSON.stringify(data.error)
          }`;
        }
        setFeedback(responseText);
        speak(responseText);
      } catch (error) {
        setFeedback("Error connecting to Gemini API.");
        speak("Error connecting to Gemini API.");
      }
      setTimeout(() => setFeedback(""), 5000);
    }
  };

  // Helper to get a high-quality, natural-sounding female voice
  function getPreferredVoice() {
    const voices = window.speechSynthesis.getVoices();
    return (
      voices.find(
        (v) =>
          v.name.includes("Google") &&
          v.lang === "en-US" &&
          v.name.toLowerCase().includes("female")
      ) ||
      voices.find(
        (v) =>
          v.name.includes("Microsoft") &&
          v.lang === "en-US" &&
          v.name.toLowerCase().includes("female")
      ) ||
      voices.find(
        (v) => v.lang === "en-US" && v.name.toLowerCase().includes("female")
      ) ||
      voices.find((v) => v.name.includes("Google") && v.lang === "en-US") ||
      voices.find((v) => v.name.includes("Microsoft") && v.lang === "en-US") ||
      voices.find((v) => v.lang === "en-US") ||
      voices[0]
    );
  }

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      setIsListening(false); // Stop listening before speaking
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      const preferredVoice = getPreferredVoice();
      if (preferredVoice) utterance.voice = preferredVoice;
      utterance.onend = () => {
        // Resume listening after speaking
        if (isSupported) {
          recognitionRef.current?.start();
          setIsListening(true);
        }
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (!isSupported) {
      alert("Voice recognition is not supported in your browser");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
      setTranscript("");
    }
  };

  if (!isSupported) return null;

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
          {isListening ? (
            <MicOff className="w-6 h-6" />
          ) : (
            <Mic className="w-6 h-6" />
          )}
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
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
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
                    {[
                      "Show projects",
                      "Show skills",
                      "Tell me about React",
                    ].map((cmd) => (
                      <span
                        key={cmd}
                        className="bg-white/10 px-2 py-1 rounded text-xs text-slate-300"
                      >
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
  );
}
