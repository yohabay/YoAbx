"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight, Code, BookOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable Flutter Apps: Architecture Patterns",
    excerpt:
      "Explore advanced architecture patterns for Flutter applications including BLoC, Provider, and Clean Architecture.",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["Flutter", "Architecture", "BLoC"],
    featured: true,
  },
  {
    id: 2,
    title: "React Performance Optimization: Beyond the Basics",
    excerpt:
      "Deep dive into advanced React optimization techniques including memoization, code splitting, and bundle analysis.",
    date: "2024-01-10",
    readTime: "12 min read",
    tags: ["React", "Performance", "Optimization"],
  },
  {
    id: 3,
    title: "TypeScript Tips for Better Developer Experience",
    excerpt:
      "Practical TypeScript patterns and utilities that will improve your development workflow and code quality.",
    date: "2024-01-05",
    readTime: "6 min read",
    tags: ["TypeScript", "DX", "Best Practices"],
  },
  {
    id: 4,
    title: "Modern CSS Techniques for Interactive UIs",
    excerpt: "Explore cutting-edge CSS features including container queries, cascade layers, and advanced animations.",
    date: "2023-12-28",
    readTime: "10 min read",
    tags: ["CSS", "UI", "Animation"],
  },
]

const tutorials = [
  {
    title: "Building a Real-time Chat App with Flutter",
    description: "Step-by-step tutorial with live code examples",
    duration: "45 min",
    level: "Intermediate",
  },
  {
    title: "React State Management Patterns",
    description: "Compare different state management solutions",
    duration: "30 min",
    level: "Advanced",
  },
  {
    title: "Responsive Design with Tailwind CSS",
    description: "Master responsive design principles",
    duration: "25 min",
    level: "Beginner",
  },
]

export default function TechnicalBlog() {
  return (
    <section id="blog" className="py-20">
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
              Technical Blog & Tutorials
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Sharing knowledge through in-depth articles and interactive tutorials
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Article */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 h-full">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className="bg-purple-500 text-white">Featured</Badge>
                  <Badge variant="outline" className="border-purple-400 text-purple-300">
                    {blogPosts[0].tags[0]}
                  </Badge>
                </div>
                <CardTitle className="text-2xl text-white mb-2">{blogPosts[0].title}</CardTitle>
                <CardDescription className="text-slate-300 text-base">{blogPosts[0].excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-slate-400 text-sm mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(blogPosts[0].date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Posts */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Recent Posts</h3>
            {blogPosts.slice(1).map((post, index) => (
              <Card
                key={post.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-white leading-tight">{post.title}</CardTitle>
                  <CardDescription className="text-slate-400 text-sm">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-purple-500/20 text-purple-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="text-purple-400 hover:text-white p-0">
                    Read More <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>

        {/* Interactive Tutorials */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Interactive Tutorials</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {tutorials.map((tutorial, index) => (
              <motion.div
                key={tutorial.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                      <Code className="w-5 h-5 text-purple-400" />
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          tutorial.level === "Beginner"
                            ? "border-green-400 text-green-300"
                            : tutorial.level === "Intermediate"
                              ? "border-yellow-400 text-yellow-300"
                              : "border-red-400 text-red-300"
                        }`}
                      >
                        {tutorial.level}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-white">{tutorial.title}</CardTitle>
                    <CardDescription className="text-slate-400">{tutorial.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{tutorial.duration}</span>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                      Start Tutorial
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
