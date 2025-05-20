"use client"

import type React from "react"
import { createContext, useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

type User = {
  id: string
  email: string
  name?: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name?: string) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))

      // Also set a cookie for the middleware
      document.cookie = `user=${storedUser}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    // In a real app, you would call your authentication API here
    // For demo purposes, we're just setting a fake user
    const user = { id: "123", email }
    const userString = JSON.stringify(user)

    // Store in localStorage
    localStorage.setItem("user", userString)

    // Also set a cookie for the middleware
    document.cookie = `user=${userString}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`

    setUser(user)

    // Check if there's a redirect URL in the search params
    const redirect = searchParams.get("redirect") || "/"
    router.push(redirect)
  }

  const signUp = async (email: string, password: string, name?: string) => {
    // In a real app, you would call your registration API here
    // For demo purposes, we're just setting a fake user
    const user = { id: "123", email, name }
    const userString = JSON.stringify(user)

    // Store in localStorage
    localStorage.setItem("user", userString)

    // Also set a cookie for the middleware
    document.cookie = `user=${userString}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`

    setUser(user)

    // Redirect to dashboard after signup
    router.push("/")
  }

  const signOut = () => {
    localStorage.removeItem("user")

    // Also remove the cookie
    document.cookie = "user=; path=/; max-age=0; SameSite=Lax"

    setUser(null)

    // Redirect to dashboard after signout
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
}
