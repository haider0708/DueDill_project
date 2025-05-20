"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Home, BarChart2, BotMessageSquare, FileText, User, LogIn, UserPlus, Info, Shield } from "lucide-react"

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

export function MainNav() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  // Determine which routes to show based on authentication status
  const visibleRoutes = user ? [...publicRoutes, ...protectedRoutes] : publicRoutes

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-6">
        {visibleRoutes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className={cn(
              "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
              pathname === route.path ? "text-primary" : "text-muted-foreground",
            )}
          >
            <route.icon className="h-4 w-4" />
            {route.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">{user.name || user.email}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={signOut}>
              Sign out
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">
                <LogIn className="h-4 w-4 mr-2" />
                Sign in
              </Link>
            </Button>
            <Button asChild variant="default" size="sm">
              <Link href="/signup">
                <UserPlus className="h-4 w-4 mr-2" />
                Sign up
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
