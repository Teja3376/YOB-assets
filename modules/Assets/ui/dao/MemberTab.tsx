"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Search,
  Wallet,
  ExternalLink,
  TrendingUp,
  Shield,
} from "lucide-react";
import { useParams } from "next/navigation";

import { useGetAssetMembers } from "../../hooks/DoaHooks/useGetAssetMembers";

export default function MemberTab() {
  const params = useParams();
    const assetId = params.assetid as string;

    const { data } = useGetAssetMembers(assetId);
    const members = data?.data || [];
    const stats = data?.stats || {};

    const formatAddress = (address: string) => {
      if (!address) return "";

      return `${address.slice(0, 3)}...${address.slice(-4)}`;
    };



  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Member Management</h1>
        <p className="text-gray-500 mt-1 text-base">
          Manage governance participants and roles
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="rounded-2xl border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-700 text-base">Total Members</p>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold mt-6">{stats.totalMembers}</h2>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-700 text-base">Active Voters</p>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold mt-6">{stats.activeVoters}</h2>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-700 text-base">New Members</p>
              <Shield className="w-5 h-5 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold mt-6">{stats.newMembers}</h2>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search members..."
          className="w-full h-12 pl-12 pr-4 rounded-xl border bg-white outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Members List */}
      <div className="space-y-5">
        {members.map((member) => (
          <Card
            key={member.id}
            className="rounded-2xl border shadow-sm hover:shadow-md transition"
          >
            <CardContent className="p-6 flex items-center justify-between">
              {/* Left */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-lg font-semibold">
                  {member.investorId.firstName.charAt(0)}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {member.investorId.firstName} {member.investorId.lastName}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-500 mt-1">
                    <a
                    href={`https://amoy.polygonscan.com/address/${member.investorId.walletId.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-500 mt-1 hover:text-tokera-primary transition"
                  >
                    <Wallet size={15} />
                    {formatAddress(member.investorId.walletId.address)}
                    <ExternalLink size={14} />
                  </a>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-10 text-center">
                <div>
                  <p className="text-sm text-gray-500">Tokens</p>
                  <p className="text-xl font-bold">{member.numberOfTokens}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Ownership</p>
                  <p className="text-xl font-bold">{member.ownershipPercentage}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Invested</p>
                  <p className="text-xl font-bold">{member.usdAmount.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
