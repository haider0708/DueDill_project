import { CryptoHero } from "@/components/crypto-hero"
import { CryptoTable } from "@/components/crypto-table"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <CryptoHero />
      <CryptoTable />
    </div>
  )
}
