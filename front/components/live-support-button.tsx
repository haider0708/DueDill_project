"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Headphones } from "lucide-react"
import { EducationChatbot } from "@/components/education-chatbot"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"

export function LiveSupportButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gray-800 hover:bg-gray-700 text-white rounded-full p-3 shadow-lg"
      >
        <Headphones className="h-5 w-5 mr-2" />
        <span>Live Support</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] p-0">
          <DialogHeader className="p-4 border-b">
            <DialogTitle className="flex items-center">
              <Headphones className="h-5 w-5 mr-2 text-primary" />
              Helper BOT
            </DialogTitle>
            <DialogDescription>The team can also help</DialogDescription>
          </DialogHeader>
          <div className="h-[500px]">
            <EducationChatbot />
          </div>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  )
}
