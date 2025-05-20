"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { fetchTopCryptos } from "@/lib/api"

type CryptoData = {
  id: string
  name: string
  symbol: string
  image: string
  current_price: number
  price_change_percentage_24h: number
}

export function CryptoTicker() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(true)

  useEffect(() => {
    async function loadCryptoData() {
      try {
        setIsLoading(true)
        const data = await fetchTopCryptos(15)

        if (data) {
          setCryptoData(data)
        } else {
          setError("Unable to load cryptocurrency data")
        }
      } catch (err) {
        setError("Error loading cryptocurrency data")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadCryptoData()

    // Refresh data every 60 seconds
    const intervalId = setInterval(loadCryptoData, 60000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer || !isScrolling || isLoading || cryptoData.length === 0) return

    let animationId: number
    let scrollPosition = 0
    const scrollSpeed = 0.5
    const containerWidth = scrollContainer.scrollWidth
    const viewportWidth = scrollContainer.clientWidth

    const scroll = () => {
      if (!scrollContainer) return

      scrollPosition += scrollSpeed
      if (scrollPosition >= containerWidth / 2) {
        scrollPosition = 0
      }

      scrollContainer.scrollLeft = scrollPosition
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId)
    }

    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(scroll)
    }

    scrollContainer.addEventListener("mouseenter", handleMouseEnter)
    scrollContainer.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      if (scrollContainer) {
        scrollContainer.removeEventListener("mouseenter", handleMouseEnter)
        scrollContainer.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [isScrolling, isLoading, cryptoData])

  // Render loading skeletons
  if (isLoading) {
    return (
      <div className="flex overflow-x-auto scrollbar-hide py-6 px-4 space-x-12 whitespace-nowrap bg-white border border-gray-200 rounded-lg shadow-sm">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-12 h-12 mb-2 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-1"></div>
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    )
  }

  // Render error state
  if (error) {
    return (
      <div className="flex justify-center items-center py-6 px-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  // If no data, show a message
  if (cryptoData.length === 0) {
    return (
      <div className="flex justify-center items-center py-6 px-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <p className="text-gray-500">No cryptocurrency data available</p>
      </div>
    )
  }

  return (
    <div
      ref={scrollRef}
      className="flex overflow-x-auto scrollbar-hide py-6 px-4 space-x-12 whitespace-nowrap bg-white border border-gray-200 rounded-lg shadow-sm"
    >
      {[...cryptoData, ...cryptoData].map((crypto, index) => (
        <div key={`${crypto.id}-${index}`} className="flex flex-col items-center">
          <div className="w-12 h-12 mb-2">
            <Image
              src={crypto.image || "/placeholder.svg"}
              alt={crypto.name}
              width={48}
              height={48}
              className="rounded-full"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=48&width=48"
              }}
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium text-gray-800">{crypto.symbol.toUpperCase()}</span>
            <span
              className={cn("text-xs", crypto.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500")}
            >
              {crypto.price_change_percentage_24h >= 0 ? "+" : ""}
              {crypto.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>
          <div className="font-bold text-gray-800">${crypto.current_price.toLocaleString()}</div>
        </div>
      ))}
    </div>
  )
}
