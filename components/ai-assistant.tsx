"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Send, User, X } from "lucide-react";
import { useState } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Helper function to render clickable links in bot messages
function renderMessageWithLinks(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-400 hover:text-blue-600"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text:
        "Hello! I'm YoAbx, Yohannis Abay Belihun's AI portfolio assistant.\n" +
        "• 🧑‍💻 Flutter & Frontend Developer\n" +
        "• 📧 Email: abayyohannis267@gmail.com\n" +
        "• 🏆 Projects: EchoMart, Physician Connector, Betting App, Bakery App\n" +
        "• 💡 Ask about skills, experience, or projects!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  async function handleSendMessage() {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Call Gemini API directly from frontend
    const apiKey = "AIzaSyCi4Oyq9MGRtQUV2714bErdUy8zG1HkJ-w"; // Gemini API key should be provided at runtime or securely
    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const payload = {
      contents: [
        {
          parts: [
            {
              text:
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
                "Use bullet points, lists, and emojis (like 🚀, 💡, 📱, 🌟, 👨‍💻, etc.) for clarity and a friendly, engaging style. Add emojis to highlight skills, projects, greetings, and important points.\n" +
                "IMPORTANT: Do NOT repeat the assistant introduction, contact info, or start every response with a greeting like 'Hey there!' or similar. Respond in a conversational, friendly, and engaging style—like a real chat. Use natural language, and ALWAYS offer actionable next steps, options, or clarifying questions if the user's request can't be fulfilled directly. For example, if asked about social media, and only GitHub and LinkedIn are available, say: 'Yohannis has GitHub and LinkedIn profiles. Would you like to see his GitHub projects, check out his LinkedIn, or learn more about his skills?'—and prompt the user to choose. If you do not have a specific detail, do NOT say 'I don't have access'; instead, respond helpfully and offer alternatives or next steps (e.g., 'I don't have that detail right now, but I can share other info or help with something else!'). Only answer the user's question, focusing on what was asked, and always use the full profile above for reference.\n" +
                inputValue,
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
      console.log("Gemini API response:", data);
      let responseText = "Sorry, I couldn't find an answer.";
      if (
        data.candidates &&
        data.candidates[0]?.content?.parts &&
        data.candidates[0].content.parts[0]?.text
      ) {
        // Show Gemini's summary response as-is (no line limit)
        responseText = data.candidates[0].content.parts[0].text;
      } else if (data.error) {
        responseText = `Gemini API error: ${
          data.error.message || JSON.stringify(data.error)
        }`;
      }
      const botMessage: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const botMessage: Message = {
        id: messages.length + 2,
        text: "Error connecting to Gemini API.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }
    setInputValue("");
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-[480px] max-w-[90vw] h-[520px] z-50"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="h-full bg-black/90 backdrop-blur-md border border-white/20 flex flex-col">
              {/* Header */}
              <div className="pt-8 p-4 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      AI Assistant
                    </h3>
                    <p className="text-xs text-slate-400">Ask me anything!</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div
                      className={`flex items-start space-x-2 max-w-[90%] ${
                        message.sender === "user"
                          ? "flex-row-reverse space-x-reverse"
                          : ""
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center ${
                          message.sender === "user"
                            ? "bg-purple-500"
                            : "bg-gradient-to-r from-purple-500 to-pink-500"
                        }`}
                      >
                        {message.sender === "user" ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div
                        className={`p-4 rounded-xl text-base leading-relaxed whitespace-pre-line ${
                          message.sender === "user"
                            ? "bg-purple-500 text-white"
                            : "bg-white/20 text-slate-100 border border-white/10 shadow-md"
                        }`}
                        style={{ minWidth: "120px" }}
                      >
                        {/* Only show intro for first bot message, others are answers only */}
                        {message.sender === "bot"
                          ? renderMessageWithLinks(message.text)
                          : message.text}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="p-6 border-t border-white/10">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask about skills, projects..."
                    className="bg-white/10 border-white/20 text-white placeholder-slate-400 text-base px-4 py-3 rounded-lg"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
