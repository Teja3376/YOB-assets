"use client";
import TableComponent from "@/common/TableComponent";
import InvestorCard from "../components/InvestorCard";
import { useParams } from "next/navigation";
import { Users, DollarSign, X, Coins, Building2, ArrowLeftIcon } from "lucide-react";
import useInvestorById from "../hooks/useInvestorById";
import investordetailColumn from "../components/investordetailColumn";
import Loading from "@/components/ui/Loading";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { formatCurrencyWithLocale } from "@/lib/format.utils";

const InvestorDetailPage = () => {
    const router = useRouter();
    const { investorId } = useParams();
    const { data: investorData, isLoading } = useInvestorById(investorId as string);
    if (isLoading) return (
        <LoadingSpinner />
    );
    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.back()}>
                    <ArrowLeftIcon size={24} />
                <h1 className="text-2xl font-bold">Investor Details</h1>
            </div>
            {/* Cards */}
            <div className="flex gap-4">
                <InvestorCard
                    title="Total Tokens Bought"
                    value={investorData?.totalNumberOfTokens || 0}
                    icon={<Coins className="w-6 h-6 text-orange-500" />}
                    color={"orange"}
                />
                <InvestorCard
                    title="Total Invested Amount"
                    value={formatCurrencyWithLocale(investorData?.totalInvestorAmount)}
                    icon={<DollarSign className="w-6 h-6 text-green-500" />}
                    color={"green"}
                />
                <InvestorCard
                    title="Total Assets Invested"
                    value={investorData?.totalAssetCount || 0}
                    icon={<Building2 className="w-6 h-6 text-blue-500" />}
                    color={"blue"}
                />
            </div>
            <h1 className="text-xl font-semibold">Investment History</h1>

            {/* Table */}
            <TableComponent columns={investordetailColumn()} data={investorData?.orders || []} model="order" />
        </div>
    );
};

export default InvestorDetailPage;
