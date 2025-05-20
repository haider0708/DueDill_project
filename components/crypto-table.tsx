"use client"

import { useEffect, useState } from "react"
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
  market_cap: number
  total_volume: number
}

export function CryptoTable() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCryptoData() {
      try {
        setIsLoading(true)
        const data = await fetchTopCryptos(10)

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

  // Render loading skeletons
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 bg-white">
        <div className="mb-4">
          <h2 className="text-xl text-gray-700">Filter</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="py-4 px-6 text-left">Coin</th>
                <th className="py-4 px-6 text-left">Price</th>
                <th className="py-4 px-6 text-left">24h Change</th>
                <th className="py-4 px-6 text-left">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                      <div>
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1"></div>
                        <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  // Render error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 bg-white">
        <div className="flex justify-center items-center p-8 border border-gray-200 rounded-lg">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="mb-4">
        <h2 className="text-xl text-gray-700">Filter</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-primary text-white">
              <th className="py-4 px-6 text-left">Coin</th>
              <th className="py-4 px-6 text-left">Price</th>
              <th className="py-4 px-6 text-left">24h Change</th>
              <th className="py-4 px-6 text-left">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((crypto) => (
              <tr key={crypto.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8">
                      <Image
                        src={crypto.image || "/placeholder.svg"}
                        alt={crypto.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=32&width=32"
                        }}
                      />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{crypto.name}</div>
                      <div className="text-sm text-gray-500">{crypto.symbol.toUpperCase()}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-800">${crypto.current_price.toLocaleString()}</td>
                <td className="py-4 px-6">
                  <span className={cn(crypto.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500")}>
                    {crypto.price_change_percentage_24h >= 0 ? "+" : ""}
                    {crypto.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-800">${(crypto.market_cap / 1000000000).toFixed(2)}B</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
