"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import VotingTab from "@/modules/Assets/ui/dao/VotingTab";
import FeedTab from "@/modules/Assets/ui/dao/FeedTab";
import TreasuryTab from "@/modules/Assets/ui/dao/TreasuryTab";
import MemberTab from "@/modules/Assets/ui/dao/MemberTab";

const daoTabs = [
  { title: "Members", value: "members" },
  { title: "Feed", value: "feed" },
  { title: "Treasury", value: "treasury" },
  { title: "Voting", value: "voting" },
];

export default function DAOPage() {
  const [activeTab, setActiveTab] = useState("members");

  const renderTabContent = () => {
    switch (activeTab) {
      case "members":
        return <MemberTab />;
      case "feed":
        return <FeedTab />;
      case "treasury":
        return <TreasuryTab />;
      case "voting":
        return <VotingTab />;
      default:
        return <MemberTab />;
    }
  };

  return (
    <div className="w-full space-y-6 p-4 rounded-lg bg-white shadow-md">
      {/* Tabs */}
      <div className="flex items-center gap-4 px-4 border-b border-gray-200 pb-4">
        {daoTabs.map((tab) => (
          <Button
            key={tab.value}
            variant="ghost"
            onClick={() => setActiveTab(tab.value)}
            className={`px-8 h-11 rounded-xl text-sm font-semibold transition-all border shadow-sm ${
              activeTab === tab.value
                ? "bg-white text-black border-gray-300"
                : "bg-gray-100 text-gray-600 border-transparent hover:bg-white hover:border-gray-200"
            }`}
          >
            {tab.title}
          </Button>
        ))}
      </div>

      {/* Content */}
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 min-h-[600px]">
        {renderTabContent()}
      </div>
    </div>
  );
}
