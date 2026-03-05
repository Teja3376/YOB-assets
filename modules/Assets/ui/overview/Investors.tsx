import { formatCurrencyWithLocale } from "@/lib/format.utils";
import { Building2, TrendingUp, Users, Wallet } from "lucide-react";

const Investors = ({
  totalInvestors,
  avgInvestment,
  annualRentalYield,
  currency = "USD",
}: {
  totalInvestors: number;
  avgInvestment: number;
  annualRentalYield: number;
  currency?: string;
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-md shadow-xs p-5 border space-y-2">
        <p className="text-xs flex items-center gap-2 ">
          <span>
            <Users size={15} className="text-primary" />
          </span>
          Total Investors
        </p>
        <h1 className="font-semibold text-lg">{totalInvestors}</h1>
      </div>
      <div className="rounded-md shadow-xs p-5 border space-y-2">
        <p className="text-xs flex items-center gap-2 ">
          <span>
            <Wallet size={15} className="text-primary" />
          </span>
          Avg Investment
        </p>
        <h1 className="font-semibold text-lg">
          {formatCurrencyWithLocale(avgInvestment, currency)}
        </h1>
      </div>
      <div className="rounded-md shadow-xs p-5 border space-y-2">
        <p className="text-xs flex items-center gap-2 ">
          <span>
            <TrendingUp size={15} className="text-primary" />
          </span>
          Annual Rental Yield
        </p>
        <h1 className="font-semibold text-lg">
          {annualRentalYield?.toFixed(2)}%
        </h1>
      </div>
    </div>
  );
};

export default Investors;
