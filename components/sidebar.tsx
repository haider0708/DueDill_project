"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  Home,
  LineChart,
  BotMessageSquare,
  FileText,
  User,
  Menu,
  BarChart2,
  Info,
  Shield,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/use-auth"

// Public routes that are always visible
const publicRoutes = [
  {
    name: "Dashboard",
    path: "/",
    icon: Home,
  },
  {
    name: "About",
    path: "/about",
    icon: Info,
  },
]

// Protected routes that require authentication
const protectedRoutes = [
  {
    name: "Crypto Bot",
    path: "/crypto-bot",
    icon: BotMessageSquare,
  },
  {
    name: "Coin Analysis",
    path: "/coin-analysis",
    icon: BarChart2,
  },
  {
    name: "Education",
    path: "/page-two",
    icon: FileText,
  },
  {
    name: "Security Check",
    path: "/security-check",
    icon: Shield,
  },
]

export function Sidebar() {
  const [expanded, setExpanded] = useState(true)
  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { user, signOut } = useAuth()

  // Determine which routes to show based on authentication status
  const visibleRoutes = user ? [...publicRoutes, ...protectedRoutes] : publicRoutes

  const toggleSidebar = () => {
    setExpanded(!expanded)
  }

  const SidebarContent = () => (
    <div className={cn("h-full flex flex-col bg-white text-gray-800 shadow-sm", expanded ? "w-64" : "w-16")}>
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        {expanded && (
          <div className="flex items-center gap-2">
            <LineChart className="h-6 w-6 text-primary" />
            <span className="font-semibold">CRYPTO WATCH</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn(!expanded && "mx-auto", "text-gray-700 hover:bg-gray-100")}
        >
          {expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {visibleRoutes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                pathname === route.path ? "bg-gray-100 text-primary" : "text-gray-700",
                !expanded && "justify-center px-0",
              )}
            >
              <route.icon className={cn("h-5 w-5", !expanded && "h-6 w-6")} />
              {expanded && <span>{route.name}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t border-gray-100 p-4">
        {user ? (
          <div className={cn("flex items-center", expanded ? "justify-between" : "justify-center")}>
            <div className={cn("flex items-center gap-2", !expanded && "hidden")}>
              <Avatar className="h-8 w-8 border border-gray-200">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-gray-100">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              {expanded && <div className="text-sm font-medium">{user.name || "User"}</div>}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className={cn(!expanded && "hidden", "text-gray-700 hover:bg-gray-100 hover:text-primary")}
            >
              Sign out
            </Button>
            {!expanded && (
              <Avatar className="h-8 w-8 border border-gray-200">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-gray-100">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ) : (
          <div className={cn("flex gap-2", !expanded && "flex-col")}>
            <Button asChild size="sm" className="w-full bg-primary hover:bg-primary/90">
              <Link href="/login">Sign in</Link>
            </Button>
            {expanded && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-primary"
              >
                <Link href="/signup">Sign up</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed left-4 top-4 z-40 md:hidden bg-white border-gray-200 text-gray-700"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-white border-r border-gray-100">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </>
    )
  }

  return <SidebarContent />
}
