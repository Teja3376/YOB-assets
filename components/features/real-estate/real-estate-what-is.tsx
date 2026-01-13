"use client"

import { CheckCircle2, X, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function RealEstateWhatIs() {
    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            What is Real Estate Tokenization?
                        </h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Real estate tokenization is the process of converting property ownership rights into digital tokens on a blockchain. Each token represents a fractional share of the underlying real estate asset.
                        </p>
                        <p className="text-lg text-gray-600 mb-8">
                            This revolutionary approach democratizes property investment, allowing investors to purchase portions of high-value real estate that would otherwise be inaccessible. Property owners can unlock liquidity without selling their entire asset.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <CheckCircle2 className="text-[#FF6B00] mt-1 flex-shrink-0" size={20} />
                                <div>
                                    <h4 className="font-semibold text-gray-900">Fractional Ownership</h4>
                                    <p className="text-gray-600">Buy and sell portions of properties starting from $100</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <CheckCircle2 className="text-[#FF6B00] mt-1 flex-shrink-0" size={20} />
                                <div>
                                    <h4 className="font-semibold text-gray-900">Instant Liquidity</h4>
                                    <p className="text-gray-600">Trade property tokens 24/7 on secondary markets</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <CheckCircle2 className="text-[#FF6B00] mt-1 flex-shrink-0" size={20} />
                                <div>
                                    <h4 className="font-semibold text-gray-900">Passive Income</h4>
                                    <p className="text-gray-600">Receive rental income proportional to your token holdings</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Card className="bg-white rounded-3xl shadow-2xl p-8 border-0">
                            <CardContent className="p-0">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Traditional vs Tokenized</h3>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-semibold text-gray-700 mb-3">Traditional Real Estate</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center text-gray-600">
                                                <X className="text-red-500 mr-3" size={16} />
                                                <span>High entry barriers ($100K+)</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <X className="text-red-500 mr-3" size={16} />
                                                <span>Illiquid (months to sell)</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <X className="text-red-500 mr-3" size={16} />
                                                <span>Geographic limitations</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <X className="text-red-500 mr-3" size={16} />
                                                <span>Complex paperwork</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t pt-6">
                                        <h4 className="font-semibold text-gray-700 mb-3">Tokenized Real Estate</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center text-gray-600">
                                                <Check className="text-green-500 mr-3" size={16} />
                                                <span>Low entry ($100 minimum)</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Check className="text-green-500 mr-3" size={16} />
                                                <span>Instant liquidity</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Check className="text-green-500 mr-3" size={16} />
                                                <span>Global accessibility</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Check className="text-green-500 mr-3" size={16} />
                                                <span>Automated smart contracts</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
