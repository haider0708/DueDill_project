"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BotIcon, Send, ExternalLink } from "lucide-react"

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
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = (e?: React.FormEvent) => {
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

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(input.trim())
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("blockchain")) {
      return "Blockchain is a distributed ledger technology that enables secure, transparent, and immutable record-keeping without the need for a central authority. Would you like to learn more about how blockchain works?"
    }

    if (lowerInput.includes("wallet") || lowerInput.includes("store")) {
      return "Cryptocurrency wallets are tools that store your private keys, which allow you to access and manage your digital assets. There are hot wallets (online) and cold wallets (offline). For large amounts, hardware wallets like Ledger or Trezor are recommended for security."
    }

    if (lowerInput.includes("secure") || lowerInput.includes("security") || lowerInput.includes("protect")) {
      return "To secure your crypto assets: 1) Use hardware wallets for large amounts 2) Enable 2FA on all accounts 3) Use strong, unique passwords 4) Be cautious of phishing attempts 5) Keep your recovery phrase safe and never share it with anyone."
    }

    if (lowerInput.includes("scam") || lowerInput.includes("fraud")) {
      return "Common crypto scams include phishing attacks, fake ICOs, pump and dump schemes, and giveaway scams. Always research projects thoroughly, be skeptical of unrealistic promises, and never share your private keys or send crypto with the expectation of receiving more in return."
    }

    if (lowerInput.includes("trading") || lowerInput.includes("trade") || lowerInput.includes("strategy")) {
      return "Effective trading strategies include technical analysis, fundamental analysis, and proper risk management. It's important to only invest what you can afford to lose and to diversify your portfolio. Would you like specific information about technical indicators or risk management?"
    }

    if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
      return "Hello! I'm the Crypto Education Assistant. I can help answer your questions about cryptocurrency, blockchain technology, trading strategies, and security best practices. What would you like to learn about today?"
    }

    return "I'd be happy to help with your crypto education questions. You can ask about blockchain technology, wallets, security practices, trading strategies, or common scams. For more detailed information, check out our educational articles in the tabs above."
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
          <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
