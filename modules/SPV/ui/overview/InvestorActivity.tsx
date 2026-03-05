import { formatCurrencyWithLocale } from "@/lib/format.utils";
import clsx from "clsx";
import React from "react";

const InvestorActivity = ({
  investors,
  currency = "USD",
}: {
  investors:
    | {
        investorId: string;
        name: string;
        tokensOwned: number;
        totalInvested: string;
      }[]
    | [];

  currency?: string;
}) => {
  return (
    <div className=" rounded-md shadow-xs  border overflow-hidden">
      <div className="bg-primary/10 px-4 py-3 rounded-t-md font-medium">
        <h1>Investors & Activity</h1>
      </div>
      <hr />
      <div className="flex flex-col rounded-b-lg">
        {investors &&
          investors.length > 0 &&
          investors?.map((investor, index) => (
            <div key={investor.investorId}>
              <div
                className={clsx(
                  index % 2 === 0 ? "bg-white" : "bg-gray-50",
                  "flex justify-between items-center p-5",
                )}
              >
                <div>
                  <p className="font-medium">{investor.name}</p>
                  <p className="text-sm ">
                    Tokens owned: {investor.tokensOwned}
                  </p>
                </div>
                <p className="font-medium">
                  {formatCurrencyWithLocale(investor.totalInvested, currency)}
                </p>
              </div>
              <hr className={clsx(investors.length <= 1 ? "hidden" : "")} />
            </div>
          ))}
        {investors.length === 0 && (
          <div className="p-5 text-center">
            <p className="text-muted-foreground">No investor Activity found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestorActivity;
