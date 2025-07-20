"use client";

import { useState } from "react";

const questions = [
  {
    id: 1,
    question: "What type of projects excite you most?",
    options: [
      { text: "Innovative mobile apps", value: "mobile", icon: "📱" },
      { text: "Complex web platforms", value: "web", icon: "🌐" },
      { text: "Data visualization tools", value: "data", icon: "📊" },
      { text: "E-commerce solutions", value: "ecommerce", icon: "🛒" },
    ],
  },
  {
    id: 2,
    question: "What's your company size?",
    options: [
      { text: "Startup (1-50)", value: "startup", icon: "🚀" },
      { text: "Medium (51-500)", value: "medium", icon: "🏢" },
      { text: "Large (500+)", value: "large", icon: "🏛️" },
      { text: "Enterprise (1000+)", value: "enterprise", icon: "🌆" },
    ],
  },
  {
    id: 3,
    question: "What's most important in a developer?",
    options: [
      { text: "Technical expertise", value: "technical", icon: "⚡" },
      { text: "Creative problem solving", value: "creative", icon: "💡" },
      { text: "Team collaboration", value: "team", icon: "👥" },
      { text: "Fast delivery", value: "speed", icon: "🏃" },
    ],
  },
  {
    id: 4,
    question: "What's your development approach?",
    options: [
      { text: "Agile/Scrum", value: "agile", icon: "🔄" },
      { text: "Lean startup", value: "lean", icon: "📈" },
      { text: "Waterfall", value: "waterfall", icon: "📋" },
      { text: "DevOps focused", value: "devops", icon: "⚙️" },
    ],
  },
  {
    id: 5,
    question: "What technology stack interests you?",
    options: [
      { text: "React/Next.js ecosystem", value: "react", icon: "⚛️" },
      { text: "Flutter/Dart mobile", value: "flutter", icon: "🎯" },
      { text: "Full-stack JavaScript", value: "fullstack", icon: "🔧" },
      { text: "Modern web standards", value: "modern", icon: "✨" },
    ],
  },
];

export default function PersonalityQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [compatibility, setCompatibility] = useState<{
    score: number;
    strengths: string[];
    recommendations: string[];
  } | null>(null);

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateCompatibility(newAnswers);
    }
  };

  const calculateCompatibility = (userAnswers: Record<number, string>) => {
    // Compatibility scoring algorithm
    let score = 0;
    const strengths: string[] = [];
    const recommendations: string[] = [];

    // Analyze answers and calculate compatibility
    const answerValues = Object.values(userAnswers);

    // Project type compatibility
    if (answerValues.includes("mobile") || answerValues.includes("web")) {
      score += 25;
      strengths.push("Perfect match for mobile/web development");
    }

    // Company size fit
    if (answerValues.includes("startup") || answerValues.includes("medium")) {
      score += 20;
      strengths.push("Great fit for dynamic environments");
    }

    // Development approach
    if (answerValues.includes("agile") || answerValues.includes("lean")) {
      score += 20;
      strengths.push("Agile methodology expertise");
    }

    // Technology stack
    if (answerValues.includes("react") || answerValues.includes("fullstack")) {
      score += 25;
      strengths.push("Modern tech stack proficiency");
    }

    // Team collaboration
    if (answerValues.includes("team")) {
      score += 10;
      strengths.push("Strong team player");
    }

    // Generate recommendations based on score
    if (score >= 80) {
      recommendations.push("Excellent match! Ready to start immediately");
    } else if (score >= 60) {
      recommendations.push("Strong compatibility, great potential");
    } else if (score >= 40) {
      recommendations.push("Good foundation, room for growth");
    } else {
      recommendations.push("Different approaches, but can adapt");
    }

    setCompatibility({
      score,
      strengths,
      recommendations,
    });
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setCompatibility(null);
  };

  if (showResults && compatibility) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Compatibility Results
        </h2>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Compatibility Score
            </span>
            <span className="text-sm font-medium text-gray-900">
              {compatibility.score}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${compatibility.score}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Your Strengths
          </h3>
          <ul className="space-y-2">
            {compatibility.strengths.map((strength: string, index: number) => (
              <li key={index} className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                {strength}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Recommendations
          </h3>
          <ul className="space-y-2">
            {compatibility.recommendations.map((rec: string, index: number) => (
              <li key={index} className="flex items-center text-gray-700">
                <span className="text-blue-500 mr-2">→</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={resetQuiz}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Take Quiz Again
        </button>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-black rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-deeporange-400">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <div className="w-32 bg-deeporange-100 rounded-full h-2">
            <div
              className="bg-deeporange-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-deeporange-500 mb-6">
          {currentQ.question}
        </h2>
      </div>

      <div className="space-y-3">
        {currentQ.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleAnswer(option.value)}
            className="w-full p-4 text-left border border-deeporange-200 rounded-lg hover:border-deeporange-400 hover:bg-deeporange-50 transition-all duration-200"
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">{option.icon}</span>
              <span className="text-black">{option.text}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
