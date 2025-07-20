"use client"

import { motion } from "framer-motion"
import { Code, Smartphone, Database, Palette, Zap, Globe } from "lucide-react"

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code,
    skills: [
      { name: "React", level: 95, color: "from-blue-400 to-blue-600" },
      { name: "TypeScript", level: 90, color: "from-blue-500 to-blue-700" },
      { name: "Next.js", level: 88, color: "from-gray-400 to-gray-600" },
      { name: "Tailwind CSS", level: 92, color: "from-cyan-400 to-cyan-600" },
    ],
  },
  {
    title: "Mobile Development",
    icon: Smartphone,
    skills: [
      { name: "Flutter", level: 93, color: "from-blue-400 to-blue-600" },
      { name: "Dart", level: 90, color: "from-blue-500 to-blue-700" },
      { name: "React Native", level: 85, color: "from-purple-400 to-purple-600" },
      { name: "Firebase", level: 87, color: "from-orange-400 to-orange-600" },
    ],
  },
  {
    title: "Backend & Database",
    icon: Database,
    skills: [
      { name: "Node.js", level: 85, color: "from-green-400 to-green-600" },
      { name: "PostgreSQL", level: 80, color: "from-blue-400 to-blue-600" },
      { name: "MongoDB", level: 82, color: "from-green-500 to-green-700" },
      { name: "GraphQL", level: 78, color: "from-pink-400 to-pink-600" },
    ],
  },
  {
    title: "Design & UX",
    icon: Palette,
    skills: [
      { name: "Figma", level: 88, color: "from-purple-400 to-purple-600" },
      { name: "Adobe XD", level: 85, color: "from-pink-400 to-pink-600" },
      { name: "UI/UX Design", level: 90, color: "from-indigo-400 to-indigo-600" },
      { name: "Prototyping", level: 87, color: "from-teal-400 to-teal-600" },
    ],
  },
]

export default function SkillsVisualization() {
  return (
    <section id="skills" className="py-20">
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
              Skills & Expertise
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-300 font-medium">{skill.name}</span>
                      <span className="text-slate-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Workflow Animation */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-8">Development Workflow</h3>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {[
              { icon: Palette, label: "Design", color: "from-pink-500 to-rose-500" },
              { icon: Code, label: "Code", color: "from-blue-500 to-cyan-500" },
              { icon: Zap, label: "Test", color: "from-yellow-500 to-orange-500" },
              { icon: Globe, label: "Deploy", color: "from-green-500 to-emerald-500" },
            ].map((step, index) => (
              <motion.div
                key={step.label}
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center`}
                >
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-white font-medium">{step.label}</span>
                {index < 3 && (
                  <motion.div
                    className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-2"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
