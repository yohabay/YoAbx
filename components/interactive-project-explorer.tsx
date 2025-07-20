"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Code, File, Folder, FolderOpen } from "lucide-react";
import { useEffect, useState } from "react";

export default function InteractiveProjectExplorer() {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState<any | null>(null);
  const [fileTree, setFileTree] = useState<any[]>([]);
  const [treeLoading, setTreeLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [fileLoading, setFileLoading] = useState(false);
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set());
  const [showCodeFiles, setShowCodeFiles] = useState(false);

  useEffect(() => {
    async function fetchRepos() {
      setLoading(true);
      try {
        const res = await fetch(
          "https://api.github.com/users/yohabay/repos?sort=updated"
        );
        const data = await res.json();
        setRepos(data);
        setSelectedRepo(data[0] || null);
      } catch (e) {
        setRepos([]);
      }
      setLoading(false);
    }
    fetchRepos();
  }, []);

  // Fetch file tree when repo changes
  useEffect(() => {
    async function fetchTree() {
      if (!selectedRepo) return;
      setTreeLoading(true);
      setFileTree([]);
      setSelectedFile(null);
      setFileContent("");
      setOpenFolders(new Set()); // Collapse all folders by default
      try {
        // Get default branch
        const branch = selectedRepo.default_branch || "main";
        // Get tree SHA
        const resBranch = await fetch(
          `https://api.github.com/repos/${selectedRepo.owner.login}/${selectedRepo.name}/branches/${branch}`
        );
        const branchData = await resBranch.json();
        const treeSha = branchData.commit.commit.tree.sha;
        // Get tree
        const resTree = await fetch(
          `https://api.github.com/repos/${selectedRepo.owner.login}/${selectedRepo.name}/git/trees/${treeSha}?recursive=1`
        );
        const treeData = await resTree.json();
        setFileTree(treeData.tree || []);
      } catch (e) {
        setFileTree([]);
      }
      setTreeLoading(false);
    }
    fetchTree();
  }, [selectedRepo]);

  // Toggle folder open/close
  function toggleFolder(path: string) {
    setOpenFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  }

  // Fetch file content
  async function handleFileClick(file: any) {
    setSelectedFile(file);
    setFileLoading(true);
    setFileContent("");
    try {
      const res = await fetch(file.url);
      const data = await res.json();
      let content = data.content;
      if (data.encoding === "base64") {
        content = atob(content.replace(/\n/g, ""));
      }
      setFileContent(content);
    } catch (e) {
      setFileContent("Error loading file.");
    }
    setFileLoading(false);
  }

  // Helper to filter code files by extension
  function isCodeFile(file: any) {
    const codeExtensions = [
      ".js",
      ".ts",
      ".tsx",
      ".jsx",
      ".py",
      ".java",
      ".dart",
      ".go",
      ".rb",
      ".php",
      ".c",
      ".cpp",
      ".cs",
      ".html",
      ".css",
      ".scss",
      ".json",
      ".md",
      ".sh",
      ".yml",
      ".yaml",
      ".xml",
      ".pl",
      ".rs",
      ".swift",
      ".kt",
      ".m",
      ".h",
      ".vue",
      ".svelte",
      ".sql",
      ".bat",
      ".ini",
      ".conf",
      ".env",
      ".lock",
      ".toml",
      ".gradle",
      ".make",
      ".mk",
      ".dockerfile",
      ".gitignore",
      ".txt",
    ];
    return (
      file.type === "blob" &&
      codeExtensions.some((ext) => file.path.toLowerCase().endsWith(ext))
    );
  }

  // Render file tree with expand/collapse
  function renderFileTree(tree: any[], path = "") {
    const folders = tree.filter(
      (item) =>
        item.type === "tree" &&
        (!path ||
          (item.path.startsWith(path + "/") &&
            item.path.split("/").length === path.split("/").length + 1))
    );
    const files = tree.filter(
      (item) =>
        item.type === "blob" &&
        (!path ||
          (item.path.startsWith(path + "/") &&
            item.path.split("/").length === path.split("/").length + 1))
    );
    return (
      <div className="ml-2">
        {folders.map((folder) => {
          const folderName = folder.path.split("/").pop();
          const isOpen = openFolders.has(folder.path);
          return (
            <div key={folder.sha} className="mb-1">
              <div
                className="flex items-center space-x-2 text-blue-400 cursor-pointer select-none"
                onClick={() => toggleFolder(folder.path)}
              >
                {isOpen ? (
                  <FolderOpen className="w-4 h-4" />
                ) : (
                  <Folder className="w-4 h-4" />
                )}
                <span className="text-sm">{folderName}</span>
              </div>
              {isOpen && renderFileTree(tree, folder.path)}
            </div>
          );
        })}
        {files.map((file) => (
          <div
            key={file.sha}
            className="flex items-center space-x-2 py-1 cursor-pointer hover:bg-white/5 rounded px-2"
            onClick={() => handleFileClick(file)}
          >
            <File className="w-4 h-4 text-green-400" />
            <span className="text-sm text-slate-300">
              {file.path.split("/").pop()}
            </span>
          </div>
        ))}
      </div>
    );
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
            Browse my latest GitHub projects. Click a project to see its files
            and code.
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
            {loading ? (
              <div className="text-slate-400">Loading projects...</div>
            ) : repos.length === 0 ? (
              <div className="text-slate-400">No projects found.</div>
            ) : (
              repos.map((repo) => (
                <Card
                  key={repo.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedRepo && selectedRepo.id === repo.id
                      ? "bg-purple-500/20 border-purple-500"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                  onClick={() => {
                    setSelectedRepo(repo);
                    setShowCodeFiles(false);
                  }}
                >
                  <CardHeader>
                    <CardTitle className="text-white">{repo.name}</CardTitle>
                    <CardDescription className="text-slate-400">
                      {repo.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {repo.language && (
                        <Badge
                          variant="secondary"
                          className="bg-purple-500/20 text-purple-300"
                        >
                          {repo.language}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </motion.div>
          {/* File Explorer and Details */}
          <motion.div
            className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-4 lg:col-span-2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {selectedRepo ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    {selectedRepo.name}
                  </h3>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost" asChild>
                      <a
                        href={selectedRepo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Code className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
                <div className="mb-4 text-slate-300">
                  {selectedRepo.description}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedRepo.language && (
                    <Badge
                      variant="secondary"
                      className="bg-purple-500/20 text-purple-300"
                    >
                      {selectedRepo.language}
                    </Badge>
                  )}
                  {selectedRepo.topics &&
                    selectedRepo.topics.map((topic: string) => (
                      <Badge
                        key={topic}
                        className="bg-pink-500/20 text-pink-300"
                      >
                        {topic}
                      </Badge>
                    ))}
                </div>
                <div className="text-slate-400 text-sm mb-2">
                  Last updated:{" "}
                  {new Date(selectedRepo.updated_at).toLocaleDateString()}
                </div>
                {/* File Tree or Code Files */}
                <div className="mb-4">
                  <h4 className="text-white font-semibold mb-2">Files</h4>
                  {treeLoading ? (
                    <div className="text-slate-400">Loading file tree...</div>
                  ) : fileTree.length === 0 ? (
                    <div className="text-slate-400">No files found.</div>
                  ) : (
                    (() => {
                      const hasFolders = fileTree.some(
                        (item) => item.type === "tree"
                      );
                      if (hasFolders) {
                        return renderFileTree(fileTree);
                      } else {
                        // Only code files, show button to reveal
                        const codeFiles = fileTree.filter(isCodeFile);
                        if (!showCodeFiles) {
                          return (
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                              onClick={() => setShowCodeFiles(true)}
                            >
                              Show Code Files
                            </Button>
                          );
                        }
                        return codeFiles.length === 0 ? (
                          <div className="text-slate-400">
                            No code files found.
                          </div>
                        ) : (
                          <div>
                            {codeFiles.map((file) => (
                              <div
                                key={file.sha}
                                className="flex items-center space-x-2 py-1 cursor-pointer hover:bg-white/5 rounded px-2"
                                onClick={() => handleFileClick(file)}
                              >
                                <File className="w-4 h-4 text-green-400" />
                                <span className="text-sm text-slate-300">
                                  {file.path.split("/").pop()}
                                </span>
                              </div>
                            ))}
                          </div>
                        );
                      }
                    })()
                  )}
                </div>
                {/* File Content */}
                {selectedFile && (
                  <div className="bg-slate-900 rounded-lg p-4 max-h-96 overflow-y-auto mb-4">
                    {fileLoading ? (
                      <div className="text-slate-400">Loading file...</div>
                    ) : (
                      <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                        {fileContent}
                      </pre>
                    )}
                  </div>
                )}
                {/* Live Demo */}
                {selectedRepo.homepage &&
                  selectedRepo.homepage.includes("vercel.app") && (
                    <div className="mt-4">
                      <Button
                        asChild
                        size="sm"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      >
                        <a
                          href={selectedRepo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live Demo
                        </a>
                      </Button>
                      {/* Optionally embed the live demo */}
                      <div className="mt-4">
                        <iframe
                          src={selectedRepo.homepage}
                          title="Live Demo"
                          className="w-full h-96 rounded-lg border border-pink-500"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          sandbox="allow-scripts allow-same-origin allow-forms"
                        />
                      </div>
                    </div>
                  )}
              </>
            ) : (
              <div className="text-slate-400">
                Select a project to see details.
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
