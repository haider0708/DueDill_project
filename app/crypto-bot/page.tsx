"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { BotIcon as Robot, Send, Upload, FileText, X, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  files?: UploadedFile[]
}

type UploadedFile = {
  id: string
  name: string
  size: number
  type: string
  url: string
  file: File // Store the actual File object
}

type AnalysisResponse = {
  analysis: string
  recommendations: string[]
}

export default function CryptoBotPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your crypto assistant. Please upload your crypto files for analysis first, then ask your questions. When you're ready, click 'Generate Analysis'.",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [userMessages, setUserMessages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Save user message to the list
    setUserMessages((prev) => [...prev, input.trim()])

    setInput("")
  }

  const handleGenerate = async () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "No files uploaded",
        description: "Please upload files first to generate analysis",
        variant: "destructive",
      })
      return
    }

    if (userMessages.length === 0) {
      toast({
        title: "No questions asked",
        description: "Please ask at least one question before generating analysis",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)
    setAnalysisResult(null)

    try {
      // Create form data
      const formData = new FormData()

      // Add all user messages as questions
      //userMessages.forEach((message) => {
      //  formData.append("questions", message)
      //})
      formData.append("questions", JSON.stringify(userMessages));
      // Add the file
      if (uploadedFiles.length > 0) {
        //formData.append("files", uploadedFiles[0].file)
        uploadedFiles.forEach(fileObj => {
        formData.append("files", fileObj.file);
        });
      }

      // For debugging
      console.log("Sending questions:", userMessages)
      console.log("Sending file:", uploadedFiles[0].name)

      // Send to the API
      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`API request failed with status ${response.status}: ${errorText}`)
      }

      const data = await response.json()

      // Process the response
      setAnalysisResult({
        analysis: data.analysis || "Analysis completed successfully.",
        recommendations: data.recommendations || ["No specific recommendations provided."],
      })

      // Add bot message with analysis result
      const botMessage: Message = {
        id: Date.now().toString(),
        content:
          data.analysis ||
          "Analysis completed successfully. Here are the results based on your questions and uploaded files.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error generating analysis:", error)
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)
    setUploadError("")

    // Simulate file upload with progress
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Process files
    const newFiles: UploadedFile[] = []

    Array.from(files).forEach((file) => {
      // Check file type
      const validTypes = [
        "text/csv",
        "application/json",
        "application/pdf",
        "text/plain",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "image/jpeg",
        "image/png",
      ]

      if (!validTypes.includes(file.type)) {
        setUploadError("Invalid file type. Please upload CSV, JSON, PDF, Excel, or text files.")
        clearInterval(uploadInterval)
        setIsUploading(false)
        return
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setUploadError("File too large. Maximum size is 5MB.")
        clearInterval(uploadInterval)
        setIsUploading(false)
        return
      }

      // Create a URL for the file (in a real app, this would be a server upload)
      const fileUrl = URL.createObjectURL(file)

      newFiles.push({
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        url: fileUrl,
        file: file, // Store the actual File object
      })
    })

    // Simulate completion after 2 seconds
    setTimeout(() => {
      setUploadedFiles((prev) => [...prev, ...newFiles])
      setIsUploading(false)
      setUploadProgress(100)

      // Add a bot message acknowledging the file upload
      if (newFiles.length > 0) {
        const botMessage: Message = {
          id: Date.now().toString(),
          content: `I've received your ${newFiles.length} file(s). You can now ask questions about your data or click the "Generate Analysis" button for a comprehensive overview.`,
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
      }

      toast({
        title: "Files uploaded",
        description: `Successfully uploaded ${newFiles.length} file(s)`,
      })

      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }, 2000)
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Crypto Bot</h1>

      <div className="w-full max-w-4xl mx-auto">
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="bg-white mb-4">
            <TabsTrigger value="chat" className="data-[state=active]:bg-gray-100 text-gray-700">
              Chat
            </TabsTrigger>
            <TabsTrigger value="files" className="data-[state=active]:bg-gray-100 text-gray-700">
              Files
            </TabsTrigger>
            {analysisResult && (
              <TabsTrigger value="analysis" className="data-[state=active]:bg-gray-100 text-gray-700">
                Analysis Results
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="chat">
            <Card className="h-[600px] flex flex-col bg-white border-gray-200 text-gray-800">
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback className="bg-primary">
                      <Robot className="h-5 w-5 text-white" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Crypto Assistant</CardTitle>
                    <CardDescription className="text-gray-500">
                      Upload files for analysis and ask questions
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto px-4 py-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex flex-col max-w-[80%] ${
                          message.sender === "user"
                            ? "bg-primary text-white rounded-t-lg rounded-bl-lg"
                            : "bg-gray-100 text-gray-800 rounded-t-lg rounded-br-lg"
                        } p-3`}
                      >
                        <p className="whitespace-pre-line">{message.content}</p>

                        {message.files && message.files.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {message.files.map((file) => (
                              <div key={file.id} className="flex items-center gap-2 bg-white p-2 rounded">
                                <FileText className="h-4 w-4 text-gray-400" />
                                <div className="text-sm overflow-hidden">
                                  <p className="truncate">{file.name}</p>
                                  <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-75"></div>
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-100 p-3">
                {uploadedFiles.length > 0 && (
                  <div className="mb-3 w-full">
                    <div className="flex flex-wrap gap-2">
                      {uploadedFiles.map((file) => (
                        <Badge
                          key={file.id}
                          variant="outline"
                          className="flex items-center gap-1 bg-gray-100 text-gray-800 py-1.5"
                        >
                          <FileText className="h-3 w-3" />
                          <span className="max-w-[150px] truncate">{file.name}</span>
                          <button
                            onClick={() => removeFile(file.id)}
                            className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove</span>
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {isUploading && (
                  <div className="mb-3 w-full">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-gray-500">Uploading...</span>
                      <span className="text-sm text-gray-500">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-1 bg-gray-200" indicatorClassName="bg-primary" />
                  </div>
                )}

                {uploadError && (
                  <Alert variant="destructive" className="mb-3 bg-red-50 border-red-500 text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{uploadError}</AlertDescription>
                  </Alert>
                )}

                <div className="flex w-full items-center gap-2">
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={triggerFileUpload}
                    disabled={isLoading || isUploading}
                    className="border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-primary"
                  >
                    <Upload className="h-4 w-4" />
                    <span className="sr-only">Upload file</span>
                  </Button>
                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" multiple />

                  <form onSubmit={handleSubmit} className="flex-1 flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={isLoading || isUploading}
                      className="bg-white border-gray-200 text-gray-800 flex-1"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={isLoading || isUploading || !input.trim()}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send message</span>
                    </Button>
                  </form>

                  <Button
                    onClick={handleGenerate}
                    disabled={isAnalyzing || isUploading || uploadedFiles.length === 0 || userMessages.length === 0}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isAnalyzing ? "Analyzing..." : "Generate Analysis"}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="files">
            <Card className="h-[600px] bg-white border-gray-200 text-gray-800">
              <CardHeader>
                <CardTitle>File Management</CardTitle>
                <CardDescription className="text-gray-500">Upload and manage files for analysis</CardDescription>
              </CardHeader>
              <CardContent>
                {uploadedFiles.length > 0 ? (
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">Uploaded Files</h3>
                    <div className="border rounded-lg divide-y">
                      {uploadedFiles.map((file) => (
                        <div key={file.id} className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="h-8 w-8 text-gray-400" />
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(file.id)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center mt-4">
                      <Button onClick={triggerFileUpload} variant="outline" className="border-gray-200 text-gray-700">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload More Files
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[400px] border-2 border-dashed border-gray-200 rounded-lg p-6">
                    <Upload className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Upload Files</h3>
                    <p className="text-gray-500 text-center mb-6">Drag and drop files here or click to browse</p>
                    <Button onClick={triggerFileUpload} className="bg-primary hover:bg-primary/90">
                      Select Files
                    </Button>
                    <p className="text-xs text-gray-500 mt-4">
                      Supported formats: CSV, JSON, PDF, Excel, Text (Max 5MB)
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {analysisResult && (
            <TabsContent value="analysis">
              <Card className="h-[600px] bg-white border-gray-200 text-gray-800">
                <CardHeader>
                  <CardTitle>Analysis Results</CardTitle>
                  <CardDescription className="text-gray-500">
                    Results based on your questions and uploaded files
                  </CardDescription>
                </CardHeader>
                <CardContent className="overflow-y-auto">
                  <div className="space-y-6">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h3 className="text-lg font-medium mb-3 text-gray-800">Analysis Summary</h3>
                      <p className="text-gray-700 whitespace-pre-line">{analysisResult.analysis}</p>
                    </div>

                    {analysisResult.recommendations && analysisResult.recommendations.length > 0 && (
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-medium mb-3 text-gray-800">Recommendations</h3>
                        <ul className="space-y-2 list-disc pl-5">
                          {analysisResult.recommendations.map((recommendation, index) => (
                            <li key={index} className="text-gray-700">
                              {recommendation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h3 className="text-lg font-medium mb-3 text-blue-800">Your Questions</h3>
                      <ul className="space-y-2 list-disc pl-5">
                        {userMessages.map((message, index) => (
                          <li key={index} className="text-gray-700">
                            {message}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h3 className="text-lg font-medium mb-3 text-gray-800">Files Analyzed</h3>
                      <div className="space-y-2">
                        {uploadedFiles.map((file) => (
                          <div key={file.id} className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-700">{file.name}</span>
                            <span className="text-xs text-gray-500">({formatFileSize(file.size)})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  )
}
