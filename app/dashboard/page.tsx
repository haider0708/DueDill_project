"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, PieChart, ArrowUp, ArrowDown, DollarSign, Bitcoin, Wallet } from "lucide-react"
import { fetchTopCryptos, fetchGlobalData } from "@/lib/api"

type CryptoData = {
  id: string
  name: string
  symbol: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  image: string
}

type GlobalData = {
  total_market_cap: number
  total_volume: number
  market_cap_percentage: {
    btc: number
  }
  market_cap_change_percentage_24h_usd: number
}

export default function DashboardPage() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [globalData, setGlobalData] = useState<GlobalData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true)

        // Fetch top cryptocurrencies
        const cryptos = await fetchTopCryptos(20)

        // Fetch global market data
        const global = await fetchGlobalData()

        if (cryptos) {
          setCryptoData(cryptos)
        }

        if (global && global.data) {
          setGlobalData({
            total_market_cap: global.data.total_market_cap.usd,
            total_volume: global.data.total_volume.usd,
            market_cap_percentage: global.data.market_cap_percentage,
            market_cap_change_percentage_24h_usd: global.data.market_cap_change_percentage_24h_usd,
          })
        }

        if (!cryptos && !global) {
          setError("Unable to load cryptocurrency data")
        }
      } catch (err) {
        setError("Error loading cryptocurrency data")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()

    // Refresh data every 60 seconds
    const intervalId = setInterval(loadData, 60000)

    return () => clearInterval(intervalId)
  }, [])

  // Calculate metrics from data
  const totalMarketCap = globalData?.total_market_cap || 0
  const totalVolume = globalData?.total_volume || 0
  const bitcoinDominance = globalData?.market_cap_percentage?.btc || 0
  const averageChange = globalData?.market_cap_change_percentage_24h_usd || 0

  // Render loading skeletons
  if (isLoading) {
    return (
      <div className="container py-8 bg-gray-50">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Crypto Dashboard</h1>
          <p className="text-gray-600">Track cryptocurrency prices and market trends</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="bg-white border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Market Overview</h2>
            <div className="h-10 w-48 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <Card className="bg-white border-gray-200">
            <CardContent className="p-0">
              <div className="p-4">
                <div className="space-y-4">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="flex items-center justify-between border-b border-gray-200 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                        <div>
                          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1"></div>
                          <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Render error state
  if (error) {
    return (
      <div className="container py-8 bg-gray-50">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Crypto Dashboard</h1>
          <p className="text-gray-600">Track cryptocurrency prices and market trends</p>
        </div>

        <div className="flex justify-center items-center p-8 border border-gray-200 rounded-lg bg-white">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Crypto Dashboard</h1>
        <p className="text-gray-600">Track cryptocurrency prices and market trends</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Total Market Cap</p>
                <p className="text-2xl font-bold text-gray-800">${(totalMarketCap / 1000000000000).toFixed(2)}T</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">24h Trading Volume</p>
                <p className="text-2xl font-bold text-gray-800">${(totalVolume / 1000000000).toFixed(2)}B</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Bitcoin Dominance</p>
                <p className="text-2xl font-bold text-gray-800">{bitcoinDominance.toFixed(1)}%</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Bitcoin className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Average 24h Change</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-gray-800">{averageChange.toFixed(2)}%</p>
                  {averageChange > 0 ? (
                    <ArrowUp className="ml-1 h-5 w-5 text-green-500" />
                  ) : (
                    <ArrowDown className="ml-1 h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <LineChart className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Market Overview</h2>
          <TabsList className="bg-white">
            <TabsTrigger value="all" className="data-[state=active]:bg-gray-100 text-gray-700">
              All Assets
            </TabsTrigger>
            <TabsTrigger value="gainers" className="data-[state=active]:bg-gray-100 text-gray-700">
              Top Gainers
            </TabsTrigger>
            <TabsTrigger value="losers" className="data-[state=active]:bg-gray-100 text-gray-700">
              Top Losers
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all">
          <Card className="bg-white border-gray-200">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-4 text-gray-600 font-medium">#</th>
                      <th className="text-left p-4 text-gray-600 font-medium">Name</th>
                      <th className="text-right p-4 text-gray-600 font-medium">Price</th>
                      <th className="text-right p-4 text-gray-600 font-medium">24h %</th>
                      <th className="text-right p-4 text-gray-600 font-medium">Market Cap</th>
                      <th className="text-right p-4 text-gray-600 font-medium">Volume (24h)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cryptoData.map((crypto, index) => (
                      <tr key={crypto.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="p-4 text-gray-800">{index + 1}</td>
                        <td className="p-4">
                          <div className="flex items-center">
                            <div className="w-6 h-6 mr-2 relative">
                              <Image
                                src={crypto.image || "/placeholder.svg"}
                                alt={crypto.name}
                                width={24}
                                height={24}
                                className="rounded-full"
                                onError={(e) => {
                                  e.currentTarget.src = "/placeholder.svg?height=24&width=24"
                                }}
                              />
                            </div>
                            <div>
                              <div className="font-medium text-gray-800">{crypto.name}</div>
                              <div className="text-gray-500 text-sm">{crypto.symbol.toUpperCase()}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-right text-gray-800">${crypto.current_price.toLocaleString()}</td>
                        <td className="p-4 text-right">
                          <span className={crypto.price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-600"}>
                            {crypto.price_change_percentage_24h >= 0 ? "+" : ""}
                            {crypto.price_change_percentage_24h.toFixed(2)}%
                          </span>
                        </td>
                        <td className="p-4 text-right text-gray-800">
                          ${(crypto.market_cap / 1000000000).toFixed(2)}B
                        </td>
                        <td className="p-4 text-right text-gray-800">
                          ${(crypto.total_volume / 1000000000).toFixed(2)}B
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gainers">
          <Card className="bg-white border-gray-200">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-4 text-gray-600 font-medium">#</th>
                      <th className="text-left p-4 text-gray-600 font-medium">Name</th>
                      <th className="text-right p-4 text-gray-600 font-medium">Price</th>
                      <th className="text-right p-4 text-gray-600 font-medium">24h %</th>
                      <th className="text-right p-4 text-gray-600 font-medium">Market Cap</th>
                      <th className="text-right p-4 text-gray-600 font-medium">Volume (24h)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cryptoData
                      .filter((crypto) => crypto.price_change_percentage_24h > 0)
                      .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
                      .map((crypto, index) => (
                        <tr key={crypto.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="p-4 text-gray-800">{index + 1}</td>
                          <td className="p-4">
                            <div className="flex items-center">
                              <div className="w-6 h-6 mr-2 relative">
                                <Image
                                  src={crypto.image || "/placeholder.svg"}
                                  alt={crypto.name}
                                  width={24}
                                  height={24}
                                  className="rounded-full"
                                  onError={(e) => {
                                    e.currentTarget.src = "/placeholder.svg?height=24&width=24"
                                  }}
                                />
                              </div>
                              <div>
                                <div className="font-medium text-gray-800">{crypto.name}</div>
                                <div className="text-gray-500 text-sm">{crypto.symbol.toUpperCase()}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-right text-gray-800">${crypto.current_price.toLocaleString()}</td>
                          <td className="p-4 text-right">
                            <span className="text-green-600">+{crypto.price_change_percentage_24h.toFixed(2)}%</span>
                          </td>
                          <td className="p-4 text-right text-gray-800">
                            ${(crypto.market_cap / 1000000000).toFixed(2)}B
                          </td>
                          <td className="p-4 text-right text-gray-800">
                            ${(crypto.total_volume / 1000000000).toFixed(2)}B
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="losers">
          <Card className="bg-white border-gray-200">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-4 text-gray-600 font-medium">#</th>
                      <th className="text-left p-4 text-gray-600 font-medium">Name</th>
                      <th className="text-right p-4 text-gray-600 font-medium">Price</th>
                      <th className="text-right p-4 text-gray-600 font-medium">24h %</th>
                      <th className="text-right p-4 text-gray-600 font-medium">Market Cap</th>
                      <th className="text-right p-4 text-gray-600 font-medium">Volume (24h)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cryptoData
                      .filter((crypto) => crypto.price_change_percentage_24h < 0)
                      .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
                      .map((crypto, index) => (
                        <tr key={crypto.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="p-4 text-gray-800">{index + 1}</td>
                          <td className="p-4">
                            <div className="flex items-center">
                              <div className="w-6 h-6 mr-2 relative">
                                <Image
                                  src={crypto.image || "/placeholder.svg"}
                                  alt={crypto.name}
                                  width={24}
                                  height={24}
                                  className="rounded-full"
                                  onError={(e) => {
                                    e.currentTarget.src = "/placeholder.svg?height=24&width=24"
                                  }}
                                />
                              </div>
                              <div>
                                <div className="font-medium text-gray-800">{crypto.name}</div>
                                <div className="text-gray-500 text-sm">{crypto.symbol.toUpperCase()}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-right text-gray-800">${crypto.current_price.toLocaleString()}</td>
                          <td className="p-4 text-right">
                            <span className="text-red-600">{crypto.price_change_percentage_24h.toFixed(2)}%</span>
                          </td>
                          <td className="p-4 text-right text-gray-800">
                            ${(crypto.market_cap / 1000000000).toFixed(2)}B
                          </td>
                          <td className="p-4 text-right text-gray-800">
                            ${(crypto.total_volume / 1000000000).toFixed(2)}B
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-800">Market Trends</CardTitle>
            <CardDescription className="text-gray-500">7-day price movement</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] flex items-center justify-center">
              <LineChart className="h-16 w-16 text-gray-400" />
              <p className="ml-4 text-gray-500">Chart visualization would appear here</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-800">Market Distribution</CardTitle>
            <CardDescription className="text-gray-500">By market capitalization</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] flex items-center justify-center">
              <PieChart className="h-16 w-16 text-gray-400" />
              <p className="ml-4 text-gray-500">Chart visualization would appear here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
