"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Folder, File, Play, Code, ExternalLink, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    id: 1,
    name: "E-Commerce Flutter App",
    description: "Full-featured mobile shopping app with payment integration",
    tech: ["Flutter", "Dart", "Firebase", "Stripe"],
    files: [
      {
        name: "lib",
        type: "folder",
        children: [
          {
            name: "main.dart",
            type: "file",
            content: "import 'package:flutter/material.dart';\n\nvoid main() {\n  runApp(MyApp());\n}",
          },
          {
            name: "screens",
            type: "folder",
            children: [
              {
                name: "home_screen.dart",
                type: "file",
                content:
                  "class HomeScreen extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      appBar: AppBar(title: Text('Home')),\n      body: Center(child: Text('Welcome!')),\n    );\n  }\n}",
              },
            ],
          },
          {
            name: "widgets",
            type: "folder",
            children: [
              {
                name: "product_card.dart",
                type: "file",
                content:
                  "class ProductCard extends StatelessWidget {\n  final Product product;\n  \n  ProductCard({required this.product});\n  \n  @override\n  Widget build(BuildContext context) {\n    return Card(\n      child: Column(\n        children: [\n          Image.network(product.imageUrl),\n          Text(product.name),\n          Text('$${product.price}'),\n        ],\n      ),\n    );\n  }\n}",
              },
            ],
          },
        ],
      },
      {
        name: "pubspec.yaml",
        type: "file",
        content:
          "name: ecommerce_app\ndescription: A Flutter e-commerce application\n\ndependencies:\n  flutter:\n    sdk: flutter\n  firebase_core: ^2.4.1\n  cloud_firestore: ^4.3.1",
      },
    ],
    liveDemo: "https://flutter-ecommerce-demo.web.app",
    github: "https://github.com/username/flutter-ecommerce",
  },
  {
    id: 2,
    name: "React Dashboard",
    description: "Modern admin dashboard with real-time analytics",
    tech: ["React", "TypeScript", "Tailwind", "Chart.js"],
    files: [
      {
        name: "src",
        type: "folder",
        children: [
          {
            name: "App.tsx",
            type: "file",
            content:
              "import React from 'react';\nimport Dashboard from './components/Dashboard';\n\nfunction App() {\n  return (\n    <div className=\"App\">\n      <Dashboard />\n    </div>\n  );\n}\n\nexport default App;",
          },
          {
            name: "components",
            type: "folder",
            children: [
              {
                name: "Dashboard.tsx",
                type: "file",
                content:
                  'import React from \'react\';\nimport { Chart } from \'chart.js\';\n\nconst Dashboard: React.FC = () => {\n  return (\n    <div className="p-6">\n      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>\n      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">\n        {/* Dashboard content */}\n      </div>\n    </div>\n  );\n};\n\nexport default Dashboard;',
              },
            ],
          },
        ],
      },
      {
        name: "package.json",
        type: "file",
        content:
          '{\n  "name": "react-dashboard",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^18.2.0",\n    "typescript": "^4.9.4",\n    "tailwindcss": "^3.2.4",\n    "chart.js": "^4.2.1"\n  }\n}',
      },
    ],
    liveDemo: "https://react-dashboard-demo.vercel.app",
    github: "https://github.com/username/react-dashboard",
  },
]

export default function InteractiveProjectExplorer() {
  const [selectedProject, setSelectedProject] = useState(projects[0])
  const [openFolders, setOpenFolders] = useState<string[]>(["lib", "src"])
  const [selectedFile, setSelectedFile] = useState<any>(null)

  const toggleFolder = (path: string) => {
    setOpenFolders((prev) => (prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]))
  }

  const renderFileTree = (files: any[], path = "") => {
    return files.map((file, index) => {
      const currentPath = path ? `${path}/${file.name}` : file.name

      if (file.type === "folder") {
        const isOpen = openFolders.includes(currentPath)
        return (
          <div key={index} className="ml-4">
            <motion.div
              className="flex items-center space-x-2 py-1 cursor-pointer hover:bg-white/5 rounded px-2"
              onClick={() => toggleFolder(currentPath)}
              whileHover={{ x: 4 }}
            >
              {isOpen ? <FolderOpen className="w-4 h-4 text-blue-400" /> : <Folder className="w-4 h-4 text-blue-400" />}
              <span className="text-sm text-slate-300">{file.name}</span>
            </motion.div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {renderFileTree(file.children || [], currentPath)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      } else {
        return (
          <motion.div
            key={index}
            className="ml-4 flex items-center space-x-2 py-1 cursor-pointer hover:bg-white/5 rounded px-2"
            onClick={() => setSelectedFile(file)}
            whileHover={{ x: 4 }}
          >
            <File className="w-4 h-4 text-green-400" />
            <span className="text-sm text-slate-300">{file.name}</span>
          </motion.div>
        )
      }
    })
  }

  return (
    <section id="projects" className="py-20">
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
              Interactive Project Explorer
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Dive deep into my projects. Browse code, explore file structures, and see live demos.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Project List */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {projects.map((project) => (
              <Card
                key={project.id}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedProject.id === project.id
                    ? "bg-purple-500/20 border-purple-500"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
                onClick={() => setSelectedProject(project)}
              >
                <CardHeader>
                  <CardTitle className="text-white">{project.name}</CardTitle>
                  <CardDescription className="text-slate-400">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-purple-500/20 text-purple-300">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* File Explorer */}
          <motion.div
            className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">File Explorer</h3>
              <div className="flex space-x-2">
                <Button size="sm" variant="ghost" asChild>
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                    <Code className="w-4 h-4" />
                  </a>
                </Button>
                <Button size="sm" variant="ghost" asChild>
                  <a href={selectedProject.liveDemo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">{renderFileTree(selectedProject.files)}</div>
          </motion.div>

          {/* Code Viewer */}
          <motion.div
            className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">{selectedFile ? selectedFile.name : "Select a file"}</h3>
              {selectedFile && (
                <Button size="sm" variant="ghost">
                  <Play className="w-4 h-4" />
                </Button>
              )}
            </div>
            <div className="bg-slate-900 rounded-lg p-4 max-h-96 overflow-y-auto">
              {selectedFile ? (
                <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">{selectedFile.content}</pre>
              ) : (
                <div className="text-slate-500 text-center py-8">Select a file to view its contents</div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
