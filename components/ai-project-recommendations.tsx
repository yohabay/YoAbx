"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Brain, Clock, Code, Star } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    id: "ecommerce-flutter",
    title: "E-Commerce Flutter App",
    description:
      "Full-featured mobile shopping app with payment integration and real-time inventory",
    tech: ["Flutter", "Dart", "Firebase", "Stripe"],
    category: "mobile",
    complexity: "advanced",
    duration: "3 months",
    impact: "35% increase in mobile conversions",
    relevantFor: ["mobile", "ecommerce", "payments", "realtime"],
  },
  {
    id: "react-dashboard",
    title: "Analytics Dashboard",
    description:
      "Real-time data visualization platform with interactive charts and reporting",
    tech: ["React", "TypeScript", "D3.js", "Node.js"],
    category: "web",
    complexity: "intermediate",
    duration: "2 months",
    impact: "60% faster data insights",
    relevantFor: ["web", "analytics", "dashboard", "data"],
  },
  {
    id: "saas-platform",
    title: "SaaS Management Platform",
    description:
      "Multi-tenant platform with user management, billing, and API integrations",
    tech: ["Next.js", "PostgreSQL", "Stripe", "AWS"],
    category: "fullstack",
    complexity: "advanced",
    duration: "4 months",
    impact: "Scaled to 10k+ users",
    relevantFor: ["saas", "fullstack", "scaling", "enterprise"],
  },
  {
    id: "mobile-banking",
    title: "Mobile Banking App",
    description:
      "Secure financial app with biometric auth and real-time transactions",
    tech: ["Flutter", "Firebase", "Plaid", "Biometrics"],
    category: "mobile",
    complexity: "advanced",
    duration: "5 months",
    impact: "4.8/5 app store rating",
    relevantFor: ["mobile", "fintech", "security", "banking"],
  },
  {
    id: "ai-chatbot",
    title: "AI Customer Support Bot",
    description:
      "Intelligent chatbot with natural language processing and learning capabilities",
    tech: ["React", "Python", "OpenAI", "WebSocket"],
    category: "ai",
    complexity: "advanced",
    duration: "3 months",
    impact: "70% reduction in support tickets",
    relevantFor: ["ai", "chatbot", "automation", "support"],
  },
];

const questions = [
  {
    id: "industry",
    question: "What industry are you in?",
    options: [
      { value: "ecommerce", label: "E-commerce & Retail", icon: "🛒" },
      { value: "fintech", label: "Finance & Banking", icon: "💰" },
      { value: "healthcare", label: "Healthcare", icon: "🏥" },
      { value: "education", label: "Education", icon: "📚" },
      { value: "saas", label: "SaaS & Enterprise", icon: "💼" },
      { value: "startup", label: "Startup", icon: "🚀" },
    ],
  },
  {
    id: "platform",
    question: "What platform do you need?",
    options: [
      { value: "mobile", label: "Mobile App", icon: "📱" },
      { value: "web", label: "Web Application", icon: "🌐" },
      { value: "fullstack", label: "Full-Stack Solution", icon: "⚡" },
      { value: "ai", label: "AI/ML Integration", icon: "🤖" },
    ],
  },
  {
    id: "priority",
    question: "What's most important to you?",
    options: [
      { value: "speed", label: "Fast Development", icon: "⚡" },
      { value: "scalability", label: "Scalability", icon: "📈" },
      { value: "security", label: "Security", icon: "🔒" },
      { value: "ux", label: "User Experience", icon: "✨" },
    ],
  },
];

export default function AIProjectRecommendations() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      generateRecommendations(newAnswers);
    }
  };

  const generateRecommendations = async (
    userAnswers: Record<string, string>
  ) => {
    setIsAnalyzing(true);

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // AI recommendation algorithm
    const scoredProjects = projects.map((project) => {
      let score = 0;

      // Industry matching
      if (project.relevantFor.includes(userAnswers.industry)) score += 30;

      // Platform matching
      if (project.category === userAnswers.platform) score += 25;

      // Priority matching
      if (
        userAnswers.priority === "speed" &&
        project.duration.includes("2 months")
      )
        score += 20;
      if (
        userAnswers.priority === "scalability" &&
        project.relevantFor.includes("scaling")
      )
        score += 20;
      if (
        userAnswers.priority === "security" &&
        project.relevantFor.includes("security")
      )
        score += 20;
      if (userAnswers.priority === "ux" && project.impact.includes("rating"))
        score += 20;

      // Complexity bonus for advanced users
      if (project.complexity === "advanced") score += 10;

      return {
        ...project,
        score,
        matchReason: getMatchReason(project, userAnswers),
      };
    });

    // Sort by score and take top 3
    const topRecommendations = scoredProjects
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    setRecommendations(topRecommendations);
    setIsAnalyzing(false);
  };

  const getMatchReason = (project: any, answers: Record<string, string>) => {
    const reasons = [];

    if (project.relevantFor.includes(answers.industry)) {
      reasons.push(`Perfect for ${answers.industry} industry`);
    }

    if (project.category === answers.platform) {
      reasons.push(`Matches your ${answers.platform} needs`);
    }

    if (answers.priority === "speed" && project.duration.includes("2 months")) {
      reasons.push("Fast development timeline");
    }

    return reasons.join(" • ");
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setRecommendations([]);
    setShowQuiz(true);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI-Powered Project Recommendations
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Let AI analyze your needs and recommend the most relevant projects
            from my portfolio
          </p>

          {!showQuiz && recommendations.length === 0 && (
            <Button
              onClick={() => setShowQuiz(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full"
            >
              <Brain className="w-5 h-5 mr-2" />
              Get AI Recommendations
            </Button>
          )}
        </motion.div>

        {/* Quiz Interface */}
        <AnimatePresence>
          {showQuiz && recommendations.length === 0 && (
            <motion.div
              className="max-w-2xl mx-auto mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Brain className="w-6 h-6 text-purple-400" />
                      <span>
                        Question {currentQuestion + 1} of {questions.length}
                      </span>
                    </CardTitle>
                    <div className="text-slate-400 text-sm">
                      {Math.round(
                        ((currentQuestion + 1) / questions.length) * 100
                      )}
                      % Complete
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {!isAnalyzing ? (
                    <div>
                      <h3 className="text-xl text-white mb-6">
                        {questions[currentQuestion].question}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {questions[currentQuestion].options.map((option) => (
                          <motion.button
                            key={option.value}
                            onClick={() => handleAnswer(option.value)}
                            className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-purple-500/50 transition-all text-left"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{option.icon}</span>
                              <span className="text-white">{option.label}</span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <motion.div
                        className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full mx-auto mb-4"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      />
                      <h3 className="text-xl text-white mb-2">
                        Analyzing Your Needs
                      </h3>
                      <p className="text-slate-400">
                        AI is processing your answers to find the perfect
                        project matches...
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recommendations */}
        <AnimatePresence>
          {recommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  🎯 Perfect Matches Found!
                </h3>
                <p className="text-slate-300 mb-6">
                  Based on your answers, here are the most relevant projects
                  from my portfolio:
                </p>
                <Button
                  onClick={resetQuiz}
                  variant="outline"
                  className="border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white bg-transparent"
                >
                  Take Quiz Again
                </Button>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {recommendations.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 h-full">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                            {project.score}% Match
                          </Badge>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(project.score / 20)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-400"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <CardTitle className="text-white text-lg">
                          {project.title}
                        </CardTitle>
                        <p className="text-slate-300 text-sm">
                          {project.description}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech: string) => (
                              <Badge
                                key={tech}
                                variant="secondary"
                                className="bg-purple-500/20 text-purple-300"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-sm text-slate-400">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{project.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Code className="w-4 h-4" />
                              <span>{project.complexity}</span>
                            </div>
                          </div>

                          <div className="bg-white/5 rounded-lg p-3">
                            <p className="text-green-400 text-sm font-medium mb-1">
                              Why this matches:
                            </p>
                            <p className="text-slate-300 text-sm">
                              {project.matchReason}
                            </p>
                          </div>

                          <div className="bg-blue-500/10 rounded-lg p-3">
                            <p className="text-blue-400 text-sm font-medium mb-1">
                              Impact:
                            </p>
                            <p className="text-slate-300 text-sm">
                              {project.impact}
                            </p>
                          </div>

                          <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                            View Project Details
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
