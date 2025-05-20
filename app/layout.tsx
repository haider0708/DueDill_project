import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { MainHeader } from "@/components/main-header"
import { LiveSupportButton } from "@/components/live-support-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CRYPTO WATCH",
  description: "Riding The Waves Of Cryptocurrency: The Latest Price Updates",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <AuthProvider>
            <div className="flex flex-col min-h-screen bg-gray-50">
              <MainHeader />
              <main className="flex-1">{children}</main>
              <LiveSupportButton />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
