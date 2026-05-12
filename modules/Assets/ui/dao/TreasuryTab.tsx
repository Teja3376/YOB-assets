"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Wallet, ArrowUpRight, ArrowDownLeft } from "lucide-react";

export default function TreasuryTab() {
  const transactions = [
    {
      id: 1,
      type: "Received",
      amount: "+$5,000",
      date: "Today",
    },
    {
      id: 2,
      type: "Sent",
      amount: "-$1,200",
      date: "Yesterday",
    },
    {
      id: 3,
      type: "Received",
      amount: "+$2,500",
      date: "2 days ago",
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Wallet className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-bold">Treasury</h1>
      </div>

      {/* Balance Card */}
      <Card className="rounded-2xl shadow-sm border mb-6">
        <CardContent className="p-6">
          <p className="text-sm text-gray-500">Total Balance</p>
          <h2 className="text-3xl font-bold mt-2">$24,500</h2>
          <p className="text-sm text-green-600 mt-1">+12.5% this month</p>
        </CardContent>
      </Card>

      {/* Transactions */}
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>

      <div className="space-y-4">
        {transactions.map((tx) => (
          <Card key={tx.id} className="rounded-2xl shadow-sm border">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === "Received"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {tx.type === "Received" ? (
                    <ArrowDownLeft className="w-5 h-5" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5" />
                  )}
                </div>

                <div>
                  <p className="font-medium">{tx.type}</p>
                  <p className="text-sm text-gray-500">{tx.date}</p>
                </div>
              </div>

              <p
                className={`font-semibold ${
                  tx.type === "Received"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {tx.amount}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
