import { CryptoTicker } from "@/components/crypto-ticker"

export function CryptoHero() {
  return (
    <div
      className="relative py-16 bg-cover bg-center text-gray-800 text-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1920&auto=format&fit=crop')",
      }}
    >
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">CRYPTO WATCH</h1>
        <p className="text-xl text-gray-600 mb-12">Riding The Waves Of Cryptocurrency: The Latest Price Updates</p>

        <div className="bg-white bg-opacity-90 rounded-lg overflow-hidden shadow-md">
          <CryptoTicker />
        </div>
      </div>
    </div>
  )
}
