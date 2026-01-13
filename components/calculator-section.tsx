"use client"

import { useState, useEffect, useRef } from "react"
import { Info } from "lucide-react"

export default function CalculatorSection() {
  const [assetValue, setAssetValue] = useState(1000000)
  const [tokenPercent, setTokenPercent] = useState(50)
  const [tokenSupply, setTokenSupply] = useState(10000)
  const sliderRef = useRef<HTMLInputElement>(null)

  const tokenizedValue = (assetValue * tokenPercent) / 100
  const tokenValue = tokenizedValue / tokenSupply
  const retainedOwnership = 100 - tokenPercent

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.setProperty('--value', `${tokenPercent}%`)
    }
  }, [tokenPercent])

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left - Calculator */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Calculate Your Token Value</h2>
              <p className="text-gray-600 mb-8">See how tokenization can unlock value from your assets</p>

              <div className="space-y-6">
                {/* Asset Value Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Asset Value ($)</label>
                  <input
                    type="number"
                    id="assetValue"
                    value={assetValue}
                    onChange={(e) => setAssetValue(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="1,000,000"
                  />
                </div>

                {/* Tokenization Percentage */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Percentage to Tokenize (%)</label>
                  <div className="flex items-center space-x-4">
                    <input
                      ref={sliderRef}
                      type="range"
                      id="tokenPercent"
                      min="10"
                      max="100"
                      value={tokenPercent}
                      onChange={(e) => {
                        const newValue = Number(e.target.value)
                        setTokenPercent(newValue)
                        if (sliderRef.current) {
                          sliderRef.current.style.setProperty('--value', `${newValue}%`)
                        }
                      }}
                      className="flex-1 range-slider"
                      style={{ '--value': `${tokenPercent}%` } as React.CSSProperties}
                    />
                    <span className="text-xl font-bold text-[#FF6B00] w-16">{tokenPercent}%</span>
                  </div>
                </div>

                {/* Token Supply */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Tokens</label>
                  <input
                    type="number"
                    id="tokenSupply"
                    value={tokenSupply}
                    onChange={(e) => setTokenSupply(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="10,000"
                  />
                </div>

                {/* Auto-calculation notice */}
                <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-orange-600 flex items-center">
                    <Info className="mr-2" size={16} />
                    Calculations update automatically as you adjust the values
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Results */}
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Tokenization Results</h3>

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="text-sm text-gray-600 mb-1">Token Value</div>
                  <div className="text-3xl font-bold text-[#FF6B00]">
                    ${tokenValue.toFixed(2)}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="text-sm text-gray-600 mb-1">Total Tokenized Value</div>
                  <div className="text-3xl font-bold text-gray-900">
                    ${tokenizedValue.toLocaleString()}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="text-sm text-gray-600 mb-1">Retained Ownership</div>
                  <div className="text-3xl font-bold text-gray-900">
                    {retainedOwnership}%
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <p className="text-sm text-gray-600">
                    <Info className="inline text-[#FF6B00] mr-2" size={16} />
                    These calculations are estimates. Actual values may vary based on market conditions and asset evaluation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
