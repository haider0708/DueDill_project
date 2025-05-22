"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

export function CryptoHeader() {
  const [currency, setCurrency] = useState("USD")
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const selectCurrency = (curr: string) => {
    setCurrency(curr)
    setIsOpen(false)
  }

  return (
    <header className="bg-[#121212] text-white py-4 px-6 flex justify-between items-center border-b border-gray-800">
      <Link href="/" className="text-xl font-bold">
        CRYPTO WATCH
      </Link>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-1 bg-transparent hover:bg-gray-800 px-3 py-1 rounded transition-colors"
        >
          {currency}
          <ChevronDown className="h-4 w-4" />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-1 bg-[#1e1e2d] border border-gray-800 rounded shadow-lg z-10">
            <ul>
              {["USD", "EUR", "GBP", "JPY", "AUD"].map((curr) => (
                <li key={curr}>
                  <button
                    onClick={() => selectCurrency(curr)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-800 transition-colors"
                  >
                    {curr}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}
