"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BotIcon, Send, ExternalLink, AlertCircle } from "lucide-react"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
}

export function EducationChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hey, how can we help? You may be able to find an answer via our help centre!",
      sender: "bot",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)
    setError(null)

    try {
      // Call the chat API endpoint
      const response = await fetch(`http://127.0.0.1:8000/chat?message=${encodeURIComponent(input.trim())}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()

      // Add bot response from API
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || "Sorry, I couldn't process your request.",
        sender: "bot",
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (err) {
      console.error("Error fetching chat response:", err)
      setError("Failed to get response. Please try again later.")

      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        sender: "bot",
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              {message.sender === "bot" && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-primary text-white">
                    <BotIcon className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user" ? "bg-primary text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                {message.sender === "bot" && message.content.includes("help centre") && (
                  <a href="#" className="text-sm flex items-center mt-2 text-primary underline">
                    Visit help centre
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-primary text-white">
                  <BotIcon className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-75"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center">
              <div className="bg-red-50 text-red-500 rounded-lg p-3 flex items-center text-sm">
                <AlertCircle className="h-4 w-4 mr-2" />
                {error}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-white border-gray-200"
          />
          <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90" disabled={isTyping}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
