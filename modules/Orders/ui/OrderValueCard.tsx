import { formatCurrencyWithLocale } from "@/lib/format.utils";
import React from "react";

const OrderValueCard = ({
  assetCurrency,
  tokenPurchased,
  orderValue,
  tokenPrice,
}: {
  assetCurrency?: string;
  tokenPurchased?: string;
  orderValue?: number;
  tokenPrice?: number;
}) => {
  return (
    <div className="border rounded-md">
      <div className="px-4 py-2 bg-primary/10 rounded-t-md ">
        <h1 className="text-md font-medium">Order Value</h1>
      </div>
      <hr />
      <div className="px-4 py-2 space-y-2">
        <div className="text-sm  flex justify-between">
          <p className="">Asset Currency:</p>
          <p className="font-semibold">{assetCurrency}</p>
        </div>
        <div className="text-sm  flex justify-between">
          <p className="">Order Value:</p>
          <p className="font-semibold">
            {formatCurrencyWithLocale(orderValue, assetCurrency)}
          </p>
        </div>{" "}
      </div>
      <hr />
      <div className="px-4 py-2 space-y-2">
        <div className="text-sm  flex justify-between">
          <p className="">Token Price:</p>
          <p className="font-semibold">
            {formatCurrencyWithLocale(tokenPrice, assetCurrency)}
          </p>
        </div>
        <div className="text-sm  flex justify-between">
          <p className="">Token Purchased:</p>
          <p className="font-semibold">
            {formatCurrencyWithLocale(tokenPurchased, assetCurrency)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderValueCard;
