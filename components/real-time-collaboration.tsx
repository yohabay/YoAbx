"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Play, Users, Video, Terminal, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function RealTimeCollaboration() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)
  const [isLiveSession, setIsLiveSession] = useState(false)

  const demos = [
    {
      id: "react-debug",
      title: "React Bug Fix Challenge",
      description: "Watch me debug a React component in real-time",
      language: "javascript",
      difficulty: "Medium",
      estimatedTime: "5 min",
      code: `import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // BUG: Missing dependency in useEffect
  useEffect(() => {
    fetchUser(userId).then(userData => {
      setUser(userData);
      setLoading(false);
    });
  }, []); // Missing userId dependency
  
  const fetchUser = async (id) => {
    const response = await fetch(\`/api/users/\${id}\`);
    return response.json();
  };
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div className="user-profile">
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
    </div>
  );
}

export default UserProfile;`,
      solution: `// FIXED: Added userId to dependency array
useEffect(() => {
  fetchUser(userId).then(userData => {
    setUser(userData);
    setLoading(false);
  });
}, [userId]); // Fixed dependency`,
    },
    {
      id: "flutter-performance",
      title: "Flutter Performance Optimization",
      description: "Optimize a Flutter widget for better performance",
      language: "dart",
      difficulty: "Advanced",
      estimatedTime: "8 min",
      code: `class ProductList extends StatelessWidget {
  final List<Product> products;
  
  const ProductList({Key? key, required this.products}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: products.length,
      itemBuilder: (context, index) {
        final product = products[index];
        
        // PERFORMANCE ISSUE: Expensive operations in build method
        final formattedPrice = NumberFormat.currency(
          locale: 'en_US',
          symbol: '\$',
        ).format(product.price);
        
        final discountedPrice = product.price * 0.9;
        final savings = product.price - discountedPrice;
        
        return Card(
          child: ListTile(
            leading: Image.network(
              product.imageUrl,
              width: 50,
              height: 50,
              fit: BoxFit.cover,
            ),
            title: Text(product.name),
            subtitle: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(formattedPrice),
                Text('Save: \$\${savings.toStringAsFixed(2)}'),
              ],
            ),
          ),
        );
      },
    );
  }
}`,
      solution: `// OPTIMIZED: Move expensive operations outside build
class ProductList extends StatelessWidget {
  final List<Product> products;
  final NumberFormat _currencyFormatter = NumberFormat.currency(
    locale: 'en_US',
    symbol: '\$',
  );
  
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: products.length,
      itemBuilder: (context, index) {
        return ProductTile(
          product: products[index],
          formatter: _currencyFormatter,
        );
      },
    );
  }
}`,
    },
    {
      id: "typescript-refactor",
      title: "TypeScript Refactoring",
      description: "Refactor JavaScript to TypeScript with proper types",
      language: "typescript",
      difficulty: "Intermediate",
      estimatedTime: "6 min",
      code: `// Needs TypeScript conversion
function calculateOrderTotal(items, taxRate, discountCode) {
  let subtotal = 0;
  
  for (let item of items) {
    subtotal += item.price * item.quantity;
  }
  
  let discount = 0;
  if (discountCode === 'SAVE10') {
    discount = subtotal * 0.1;
  } else if (discountCode === 'SAVE20') {
    discount = subtotal * 0.2;
  }
  
  const discountedSubtotal = subtotal - discount;
  const tax = discountedSubtotal * taxRate;
  
  return {
    subtotal,
    discount,
    tax,
    total: discountedSubtotal + tax
  };
}`,
      solution: `// TypeScript version with proper types
interface OrderItem {
  price: number;
  quantity: number;
  name: string;
}

interface OrderTotal {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
}

type DiscountCode = 'SAVE10' | 'SAVE20' | null;

function calculateOrderTotal(
  items: OrderItem[], 
  taxRate: number, 
  discountCode: DiscountCode
): OrderTotal {
  // Implementation with type safety
}`,
    },
  ]

  const startLiveSession = () => {
    setIsLiveSession(true)
    // Simulate live coding session
    setTimeout(() => {
      setIsLiveSession(false)
    }, 10000)
  }

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
              Real-Time Collaboration Demo
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Watch me solve coding challenges live or join a pair programming session
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={startLiveSession}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3"
              disabled={isLiveSession}
            >
              <Video className="w-4 h-4 mr-2" />
              {isLiveSession ? "Live Session Active" : "Start Live Session"}
            </Button>
            <Button
              variant="outline"
              className="border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white px-6 py-3 bg-transparent"
            >
              <Users className="w-4 h-4 mr-2" />
              Join Pair Programming
            </Button>
          </div>
        </motion.div>

        {/* Live Session Indicator */}
        <AnimatePresence>
          {isLiveSession && (
            <motion.div
              className="fixed top-20 right-6 z-50"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <Card className="bg-red-500/20 border border-red-500/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <motion.div
                      className="w-3 h-3 bg-red-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    />
                    <span className="text-red-300 font-semibold">LIVE</span>
                    <span className="text-white text-sm">Coding Session</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Demo Challenges */}
        <div className="grid lg:grid-cols-3 gap-8">
          {demos.map((demo, index) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      className={`${
                        demo.difficulty === "Easy"
                          ? "bg-green-500/20 text-green-300"
                          : demo.difficulty === "Medium"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {demo.difficulty}
                    </Badge>
                    <Badge variant="outline" className="border-blue-400 text-blue-300">
                      {demo.estimatedTime}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-lg">{demo.title}</CardTitle>
                  <p className="text-slate-400 text-sm">{demo.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-slate-900 rounded-lg p-4 max-h-40 overflow-y-auto">
                      <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                        {demo.code.slice(0, 200)}...
                      </pre>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => setActiveDemo(activeDemo === demo.id ? null : demo.id)}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        {activeDemo === demo.id ? "Hide" : "View"} Challenge
                      </Button>
                      <Button
                        variant="outline"
                        className="border-green-500 text-green-300 hover:bg-green-500 hover:text-white bg-transparent"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Expanded Demo View */}
        <AnimatePresence>
          {activeDemo && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-full max-w-6xl max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <Card className="bg-black/90 backdrop-blur-md border border-purple-500/30">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center space-x-2">
                        <Terminal className="w-6 h-6 text-purple-400" />
                        <span>{demos.find((d) => d.id === activeDemo)?.title}</span>
                      </CardTitle>
                      <Button
                        variant="ghost"
                        onClick={() => setActiveDemo(null)}
                        className="text-white hover:bg-white/10"
                      >
                        ×
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid lg:grid-cols-2 gap-6">
                      {/* Original Code */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                          <Code className="w-5 h-5 text-red-400" />
                          <span>Problem Code</span>
                        </h3>
                        <div className="bg-slate-900 rounded-lg p-4 max-h-96 overflow-y-auto">
                          <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                            {demos.find((d) => d.id === activeDemo)?.code}
                          </pre>
                        </div>
                      </div>

                      {/* Solution */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                          <Code className="w-5 h-5 text-green-400" />
                          <span>Solution</span>
                        </h3>
                        <div className="bg-slate-900 rounded-lg p-4 max-h-96 overflow-y-auto">
                          <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                            {demos.find((d) => d.id === activeDemo)?.solution}
                          </pre>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-center space-x-4">
                      <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
                        <Play className="w-4 h-4 mr-2" />
                        Run Solution
                      </Button>
                      <Button
                        variant="outline"
                        className="border-blue-500 text-blue-300 hover:bg-blue-500 hover:text-white bg-transparent"
                      >
                        <Video className="w-4 h-4 mr-2" />
                        Watch Video Explanation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
