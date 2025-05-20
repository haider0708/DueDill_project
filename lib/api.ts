// API functions for fetching cryptocurrency data

/**
 * Fetches top cryptocurrencies with market data
 * @param limit Number of cryptocurrencies to fetch
 * @returns Promise with cryptocurrency data
 */
export async function fetchTopCryptos(limit = 10) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&locale=en`,
      { next: { revalidate: 60 } }, // Revalidate every 60 seconds
    )

    if (!response.ok) {
      throw new Error("Failed to fetch cryptocurrency data")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching cryptocurrency data:", error)
    return null
  }
}

/**
 * Fetches detailed data for a specific cryptocurrency
 * @param id Cryptocurrency ID (e.g., 'bitcoin')
 * @returns Promise with detailed cryptocurrency data
 */
export async function fetchCryptoDetails(id: string) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
      { next: { revalidate: 60 } }, // Revalidate every 60 seconds
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch details for ${id}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching details for ${id}:`, error)
    return null
  }
}

/**
 * Fetches global cryptocurrency market data
 * @returns Promise with global market data
 */
export async function fetchGlobalData() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/global",
      { next: { revalidate: 300 } }, // Revalidate every 5 minutes
    )

    if (!response.ok) {
      throw new Error("Failed to fetch global market data")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching global market data:", error)
    return null
  }
}
