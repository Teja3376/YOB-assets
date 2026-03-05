import { formatCurrencyWithLocale } from "@/lib/format.utils";
import React from "react";

const KeyPerformance = ({
  occupancy,
  irr,
  grossMonthlyRentalIncome,
  netMonthlyRentalIncome,
  currency = "USD",
}: {
  occupancy: number;
  irr: number;
  grossMonthlyRentalIncome: number;
  netMonthlyRentalIncome: number;
  currency?: string;
}) => {
  return (
    <div className=" rounded-md shadow-xs  border">
      <div className="bg-primary/10 px-4 py-3 rounded-t-md font-medium">
        <h1>Key Performance</h1>
      </div>
      <hr />
      <div className="">
        <div className="flex justify-between items-center p-5">
          <p>Montly Revenue</p>
          <p className="font-medium">
            {formatCurrencyWithLocale(grossMonthlyRentalIncome, currency)}
          </p>
        </div>
        <hr />

        <div className="flex justify-between items-center p-5 bg-gray-100">
          <p>Net Operating Income</p>
          <p className="font-medium">
            {formatCurrencyWithLocale(netMonthlyRentalIncome, currency)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between items-center p-5 ">
          <p>Occupancy Rate</p>
          <p className="font-medium">{occupancy?.toFixed(2)}%</p>
        </div>

        <hr />
        <div className="flex justify-between items-center p-5 bg-gray-100">
          <p>IRR</p>
          <p className="font-medium">{irr?.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
};

export default KeyPerformance;
