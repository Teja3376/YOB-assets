import { formatCurrencyWithLocale } from "@/lib/format.utils";
import React from "react";

const KeyPerformance = ({
  expenses,
  occupancy,
  irr,
  grossMonthlyRentalIncome,
  netMonthlyRentalIncome,
  currency = "USD",
}: {
  expenses: {
    label: string;
    amount: number;
  }[];
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
        {expenses &&
          expenses.length > 0 &&
          expenses.map((expense,index) => (
            <div
              key={`expense-${expense.label}-${index}`}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <div className="flex justify-between items-center p-5">
                <p>{expense?.label}</p>
                <p className="font-medium">
                  {formatCurrencyWithLocale(expense.amount, currency)}
                </p>
              </div>
              <hr />
            </div>
          ))}

        <div className="flex justify-between items-center p-5">
          <p>Net Operating Income</p>
          <p className="font-medium">
            {formatCurrencyWithLocale(netMonthlyRentalIncome, currency)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between items-center p-5 bg-gray-100">
          <p>Occupancy Rate</p>
          <p className="font-medium">{occupancy?.toFixed(2)}%</p>
        </div>

        <hr />
        <div className="flex justify-between items-center p-5">
          <p>IRR</p>
          <p className="font-medium">{irr?.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
};

export default KeyPerformance;
