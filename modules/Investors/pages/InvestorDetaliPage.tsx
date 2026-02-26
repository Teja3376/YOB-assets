"use client";
import TableComponent from "@/common/TableComponent";
import InvestorCard from "../components/InvestorCard";
import { useParams } from "next/navigation";
import { Users, DollarSign, X, Coins, Building2 } from "lucide-react";
import useInvestorById from "../hooks/useInvestorById";
import investordetailColumn from "../components/investordetailColumn";
import Loading from "@/components/ui/Loading";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const InvestorDetailPage = () => {
    const { investorId } = useParams();
    const { data:investorData, isLoading } = useInvestorById(investorId as string);
    if (isLoading) return (
        <LoadingSpinner/>
    );
    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between ">
                <h1 className="text-2xl font-bold">Investor Details</h1>
            </div>
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <InvestorCard
                    title="Total Invested Amount"
                    value={investorData?.totalInvestorAmount || 0}
                    icon={<DollarSign className="w-6 h-6 text-blue-500" />}
                    color={"blue"}
                />
                <InvestorCard
                    title="Total Tokens Bought"
                    value={investorData?.totalNumberOfTokens || 0}
                    icon={<Coins className="w-6 h-6 text-orange-500" />}
                    color={"orange"}
                />
                <InvestorCard
                    title="Total Assets Invested"
                    value={investorData?.totalAssetCount || 0}
                    icon={<Building2 className="w-6 h-6 text-green-500" />}
                    color={"green"}
                />
            </div>
            <h1 className="text-xl font-semibold">Investment History</h1>

            {/* Table */}
            <TableComponent columns={investordetailColumn()} data={investorData?.orders || []} model="order" />
        </div>
    );
};

export default InvestorDetailPage;
