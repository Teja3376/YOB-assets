import { formatCurrencyWithLocale } from "@/lib/format.utils";
import { Users } from "lucide-react";
import React from "react";

const TokenInfo = ({
  totalTokens,
  tokenPrice,
  tokenSymbol,
  availableTokens,
  currency="USD"
}: {
  totalTokens: number;
  tokenPrice: number;
  tokenSymbol: string;
  availableTokens: number;
    currency: string;
}) => {
  return (
    <div className=" rounded-md shadow-xs  border">
      <div className="bg-primary/10 px-4 py-3 rounded-t-md font-medium">
        <h1>Token Information</h1>
      </div>
      <div className="">
        <div className="grid grid-cols-4 gap-4 p-4">
          
          <div className="rounded-md shadow-xs p-5 border space-y-2">
            <p className="text-xs flex items-center gap-2 ">
              
              Total Tokens
            </p>
            <h1 className="font-semibold text-lg">{totalTokens}</h1>
          </div>
          <div className="rounded-md shadow-xs p-5 border space-y-2 bg-gray-100">
            <p className="text-xs flex items-center gap-2 ">
              
               Token Symbol
            </p>
            <h1 className="font-semibold text-lg">{tokenSymbol}</h1>
          </div>
          <div className="rounded-md shadow-xs p-5 border space-y-2">
            <p className="text-xs flex items-center gap-2 ">
              
              Token Price
            </p>
            <h1 className="font-semibold text-lg">{formatCurrencyWithLocale(tokenPrice, currency)}</h1>
          </div>
          <div className="rounded-md shadow-xs p-5 border space-y-2 bg-gray-100">
            <p className="text-xs flex items-center gap-2 ">
             
              Available tokens
            </p>
            <h1 className="font-semibold text-lg">{availableTokens}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenInfo;
