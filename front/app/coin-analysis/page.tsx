"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { fetchTopCryptos, fetchCryptoDetails } from "@/lib/api"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, TrendingUp, TrendingDown, Newspaper } from "lucide-react"

type Coin = {
  id: string
  name: string
  symbol: string
  image: string
  description?: string
  market_data?: {
    current_price: {
      usd: number
    }
    price_change_percentage_24h: number
    market_cap: {
      usd: number
    }
    total_volume: {
      usd: number
    }
  }
}

type ForecastData = {
  symbol: string
  trend: string
  volatility_analysis: string[]
}

type NewsItem = {
  title: string
  url: string
  source: string
  published_at: string
  summary: string
}

// API base URL - replace with your actual API URL in production
const API_BASE_URL = "http://localhost:8000"

export default function CoinAnalysisPage() {
  const [coins, setCoins] = useState<Coin[]>([])
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDetailLoading, setIsDetailLoading] = useState(false)
  const [isPlotLoading, setIsPlotLoading] = useState(false)
  const [isForecastLoading, setIsForecastLoading] = useState(false)
  const [isNewsLoading, setIsNewsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [plotUrl, setPlotUrl] = useState<string | null>(null)
  const [forecastData, setForecastData] = useState<ForecastData | null>(null)
  const [newsData, setNewsData] = useState<NewsItem[]>([])
  const [plotError, setPlotError] = useState<string | null>(null)
  const [forecastError, setForecastError] = useState<string | null>(null)
  const [newsError, setNewsError] = useState<string | null>(null)

  // Fetch list of coins
  useEffect(() => {
    async function loadCoins() {
      try {
        setIsLoading(true)
        const data = await fetchTopCryptos(20)

        if (data) {
          setCoins(data)
          // Set the first coin as selected by default
          if (data.length > 0) {
            await loadCoinDetails(data[0].id)
          }
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

    loadCoins()
  }, [])

  // Fetch details for a specific coin
  const loadCoinDetails = async (coinId: string) => {
    try {
      setIsDetailLoading(true)
      setIsPlotLoading(true)
      setIsForecastLoading(true)
      setIsNewsLoading(true)
      setPlotError(null)
      setForecastError(null)
      setNewsError(null)

      // Fetch coin details
      const coinDetails = await fetchCryptoDetails(coinId)

      if (coinDetails) {
        setSelectedCoin(coinDetails)

        // After getting coin details, fetch the plot, forecast, and news
        fetchPlot(coinDetails.symbol.toLowerCase())
        fetchForecast(coinDetails.symbol.toLowerCase())
        fetchNews(coinDetails.symbol.toLowerCase())
      } else {
        setError(`Unable to load details for ${coinId}`)
      }
    } catch (err) {
      setError(`Error loading details for ${coinId}`)
      console.error(err)
    } finally {
      setIsDetailLoading(false)
    }
  }

  // Fetch plot image from API
  const fetchPlot = async (symbol: string) => {
    try {
      setIsPlotLoading(true)
      setPlotError(null)

      const apiUrl = `${API_BASE_URL}/plot/${symbol}`

      // Make the actual API call
      const response = await fetch(apiUrl)

      if (!response.ok) {
        const errorData = await response.text()
        throw new Error(`Failed to fetch plot: ${errorData}`)
      }

      // Create a blob URL from the image response
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setPlotUrl(url)
    } catch (err) {
      console.error("Error fetching plot:", err)
      setPlotError(
        `Failed to load price chart for ${symbol.toUpperCase()}: ${err instanceof Error ? err.message : String(err)}`,
      )
    } finally {
      setIsPlotLoading(false)
    }
  }

  // Fetch forecast data from API
  const fetchForecast = async (symbol: string) => {
    try {
      setIsForecastLoading(true)
      setForecastError(null)

      const apiUrl = `${API_BASE_URL}/forecast/${symbol}`

      // Make the actual API call
      const response = await fetch(apiUrl)

      if (!response.ok) {
        const errorData = await response.text()
        throw new Error(`Failed to fetch forecast: ${errorData}`)
      }

      const data = await response.json()
      setForecastData(data)
    } catch (err) {
      console.error("Error fetching forecast:", err)
      setForecastError(
        `Failed to load forecast data for ${symbol.toUpperCase()}: ${err instanceof Error ? err.message : String(err)}`,
      )
    } finally {
      setIsForecastLoading(false)
    }
  }

  // Fetch news data from API
  const fetchNews = async (symbol: string) => {
    try {
      setIsNewsLoading(true)
      setNewsError(null)

      const apiUrl = `${API_BASE_URL}/news/${symbol}`

      // Make the actual API call
      const response = await fetch(apiUrl)

      if (!response.ok) {
        const errorData = await response.text()
        throw new Error(`Failed to fetch news: ${errorData}`)
      }

      const data = await response.json()
      const cleanMessage = Array.isArray(data) ? data[0] : data;

      console.log(cleanMessage);
      setNewsData(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Error fetching news:", err)
      setNewsError(
        `Failed to load news for ${symbol.toUpperCase()}: ${err instanceof Error ? err.message : String(err)}`,
      )
    } finally {
      setIsNewsLoading(false)
    }
  }

  const handleCoinChange = async (value: string) => {
    const coin = coins.find((c) => c.id === value)
    if (coin) {
      await loadCoinDetails(coin.id)
    }
  }

  // Format date for news items
  // const formatDate = (dateString: string) => {
  //   try {
  //     const date = new Date(dateString)
  //     return new Intl.DateTimeFormat("en-US", {
  //       year: "numeric",
  //       month: "short",
  //       day: "numeric",
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     }).format(date)
  //   } catch (e) {
  //     return dateString
  //   }
  // }

  // Render loading state
  if (isLoading) {
    return (
      <div className="container py-8 max-w-5xl bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Coin Analysis</h1>

        <div className="mb-6">
          <Label htmlFor="coin-select" className="text-gray-700 mb-2 block">
            Select Cryptocurrency
          </Label>
          <div className="h-10 w-[300px] bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-white border-gray-200 text-gray-800">
            <CardHeader>
              <CardTitle>Coin Image</CardTitle>
              <CardDescription className="text-gray-500">Visual representation</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-32 h-32 mb-4 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 text-gray-800">
            <CardHeader>
              <CardTitle>Coin Information</CardTitle>
              <CardDescription className="text-gray-500">Description and details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
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
      <div className="container py-8 max-w-5xl bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Coin Analysis</h1>

        <div className="flex justify-center items-center p-8 border border-gray-200 rounded-lg bg-white">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 max-w-5xl bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Coin Analysis</h1>

      <div className="mb-6">
        <Label htmlFor="coin-select" className="text-gray-700 mb-2 block">
          Select Cryptocurrency
        </Label>
        <Select onValueChange={handleCoinChange} defaultValue={selectedCoin?.id}>
          <SelectTrigger className="w-full md:w-[300px] bg-white border-gray-200 text-gray-800">
            <SelectValue placeholder="Select a cryptocurrency" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200 text-gray-800">
            {coins.map((coin) => (
              <SelectItem key={coin.id} value={coin.id} className="hover:bg-gray-100 focus:bg-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 relative">
                    <Image
                      src={coin.image || "/placeholder.svg"}
                      alt={coin.name}
                      width={20}
                      height={20}
                      className="rounded-full"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=20&width=20"
                      }}
                    />
                  </div>
                  <span>
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isDetailLoading ? (
        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-white border-gray-200 text-gray-800">
            <CardHeader>
              <CardTitle>Coin Image</CardTitle>
              <CardDescription className="text-gray-500">Visual representation</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-32 h-32 mb-4 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 text-gray-800">
            <CardHeader>
              <CardTitle>Coin Information</CardTitle>
              <CardDescription className="text-gray-500">Description and details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : selectedCoin ? (
        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-white border-gray-200 text-gray-800">
            <CardHeader>
              <CardTitle>Coin Overview</CardTitle>
              <CardDescription className="text-gray-500">Basic information</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-32 h-32 mb-4 relative">
                <Image
                  src={selectedCoin.image?.large || selectedCoin.image || "/placeholder.svg"}
                  alt={selectedCoin.name}
                  width={128}
                  height={128}
                  className="rounded-full"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=128&width=128"
                  }}
                />
              </div>
              <h2 className="text-xl font-bold text-gray-800">{selectedCoin.name}</h2>
              <p className="text-gray-500">{selectedCoin.symbol?.toUpperCase()}</p>

              {selectedCoin.market_data && (
                <div className="mt-4 grid grid-cols-2 gap-4 w-full max-w-md">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Current Price</p>
                    <p className="font-bold">${selectedCoin.market_data.current_price.usd.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">24h Change</p>
                    <p
                      className={
                        selectedCoin.market_data.price_change_percentage_24h >= 0
                          ? "text-green-600 font-bold"
                          : "text-red-600 font-bold"
                      }
                    >
                      {selectedCoin.market_data.price_change_percentage_24h >= 0 ? "+" : ""}
                      {selectedCoin.market_data.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Market Cap</p>
                    <p className="font-bold">${(selectedCoin.market_data.market_cap.usd / 1000000000).toFixed(2)}B</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">24h Volume</p>
                    <p className="font-bold">${(selectedCoin.market_data.total_volume.usd / 1000000000).toFixed(2)}B</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Historical Price Chart Section */}
          <Card className="bg-white border-gray-200 text-gray-800">
            <CardHeader>
              <CardTitle>Historical Price Chart</CardTitle>
              <CardDescription className="text-gray-500">Price history visualization</CardDescription>
            </CardHeader>
            <CardContent>
              {isPlotLoading ? (
                <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                    <p className="mt-2 text-gray-500">Loading price chart...</p>
                  </div>
                </div>
              ) : plotError ? (
                <Alert variant="destructive" className="bg-red-50 border-red-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{plotError}</AlertDescription>
                </Alert>
              ) : plotUrl ? (
                <div className="w-full overflow-hidden rounded-lg">
                  <Image
                    src={plotUrl || "/placeholder.svg"}
                    alt={`${selectedCoin.name} price chart`}
                    width={800}
                    height={400}
                    className="w-full h-auto"
                    unoptimized={true} // Important for blob URLs
                  />
                </div>
              ) : (
                <div className="text-center p-8 text-gray-500">No chart data available</div>
              )}
            </CardContent>
          </Card>

          {/* Price Forecast Section */}
          <Card className="bg-white border-gray-200 text-gray-800">
            <CardHeader>
              <CardTitle>Price Forecast & Volatility Analysis</CardTitle>
              <CardDescription className="text-gray-500">AI-powered market prediction</CardDescription>
            </CardHeader>
            <CardContent>
              {isForecastLoading ? (
                <div className="w-full p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                    <p className="mt-2 text-gray-500">Analyzing market data...</p>
                  </div>
                </div>
              ) : forecastError ? (
                <Alert variant="destructive" className="bg-red-50 border-red-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{forecastError}</AlertDescription>
                </Alert>
              ) : forecastData ? (
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      Price Trend Prediction
                      {forecastData.trend.includes("Upward") ? (
                        <TrendingUp className="ml-2 h-5 w-5 text-green-500" />
                      ) : (
                        <TrendingDown className="ml-2 h-5 w-5 text-red-500" />
                      )}
                    </h3>
                    <p className="text-xl font-bold">{forecastData.trend}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Based on ARIMA time series forecasting model analyzing historical price patterns
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-medium mb-3">Volatility Analysis</h3>
                    <div className="space-y-2">
                      {forecastData.volatility_analysis.map((item, index) => (
                        <div
                          key={index}
                          className="text-gray-700"
                          dangerouslySetInnerHTML={{
                            __html: item.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-3">
                      Based on GARCH volatility modeling of price fluctuations
                    </p>
                  </div>

                  
                </div>
              ) : (
                <div className="text-center p-8 text-gray-500">No forecast data available</div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 text-gray-800">
            <CardHeader>
              <CardTitle>Coin Information</CardTitle>
              <CardDescription className="text-gray-500">Description and details</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedCoin.description?.en ? (
                <div
                  className="text-gray-700 prose max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: selectedCoin.description.en.replace(
                      /<a /g,
                      '<a target="_blank" rel="noopener noreferrer" ',
                    ),
                  }}
                />
              ) : (
                <p className="text-gray-700">No description available for this cryptocurrency.</p>
              )}
            </CardContent>
          </Card>

          {/* Raw News Data Section */}
          <Card className="bg-white border-gray-200 text-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Newspaper className="h-5 w-5" />
                Risk Analysis for {selectedCoin.symbol?.toUpperCase()}
              </CardTitle>
              <CardDescription className="text-gray-500">API response from /news endpoint</CardDescription>
            </CardHeader>
            <CardContent>
              {isNewsLoading ? (
                <div className="w-full p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                    <p className="mt-2 text-gray-500">Loading data...</p>
                  </div>
                </div>
              ) : newsError ? (
                <Alert variant="destructive" className="bg-red-50 border-red-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{newsError}</AlertDescription>
                </Alert>
              ) : (
                <div className="overflow-auto">
                  <pre className="text-xs bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                    {newsData[0]}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex justify-center items-center p-8 border border-gray-200 rounded-lg bg-white">
          <p className="text-gray-500">Select a cryptocurrency to view details</p>
        </div>
      )}
    </div>
  )
}
