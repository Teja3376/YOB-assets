import { formatCurrencyWithLocale } from "@/lib/format.utils";
import React, { useMemo } from "react";

const Conversion = ({
  totalPaidbyInvestor,
  actualAmount,
  assetCurrency,
  userCurrency,
}: {
  totalPaidbyInvestor: number;
  actualAmount: number;
  assetCurrency: string;
  userCurrency: string;
}) => {
  const effectiveFxRate = useMemo(() => {
    if (actualAmount === 0) return 0;
    return totalPaidbyInvestor / actualAmount;
  }, [totalPaidbyInvestor, actualAmount]);
  return (
    <div className="border rounded-md px-4 py-3">
      <h1 className="text-md font-medium">Conversion Summary </h1>
      <div className="text-sm  flex justify-between py-3 ">
        <p className="">User Paid</p>
        <p className="font-semibold">
          {formatCurrencyWithLocale(totalPaidbyInvestor, userCurrency)}
        </p>
      </div>
      <hr />
      <div className="text-sm  flex justify-between py-3">
        <p className="">Origin Value</p>
        <p className="font-semibold">
          {formatCurrencyWithLocale(actualAmount, assetCurrency)}
        </p>
      </div>
      <hr />
      <div className="text-sm  flex justify-between py-3">
        <p className="">Effective FX Rate</p>
        <p className="font-semibold">
          {formatCurrencyWithLocale(effectiveFxRate.toFixed(2), userCurrency)} /{" "}
          {assetCurrency}
        </p>
      </div>
    </div>
  );
};

export default Conversion;
