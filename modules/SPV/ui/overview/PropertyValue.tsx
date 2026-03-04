import { formatCurrencyWithLocale } from "@/lib/format.utils";
import { Building2 } from "lucide-react";
import React from "react";

const PropertyValue = ({
  currentValue,
  appreciation,
  currency = "USD",
}: {
  currentValue: number;
  appreciation: number;
  currency?: string;
}) => {
  return (
    <div className="rounded-md shadow-xs p-5 border space-y-2">
      <p className="text-sm flex items-center gap-2 ">
        <span>
          <Building2 size={15} />
        </span>
        Property Value
      </p>
      <h1 className="font-semibold text-lg">
        {formatCurrencyWithLocale(currentValue, currency)}
      </h1>
      <p
        className={`text-sm font-medium ${
          appreciation > 0
            ? "text-green-500"
            : appreciation < 0
              ? "text-red-500"
              : "text-gray-400"
        }`}
      >
        {appreciation > 0 ? "+" : ""}
        {appreciation.toFixed(2)}% appraisal
      </p>{" "}
    </div>
  );
};

export default PropertyValue;
