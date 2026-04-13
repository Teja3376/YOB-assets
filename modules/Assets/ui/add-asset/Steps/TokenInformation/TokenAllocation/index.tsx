import { Suspense, useEffect, useState } from "react";
import FormGenerator from "@/components/use-form/FormGenerator";
import formConfig from "@/modules/Assets/form-config/TokenInformation/tokenAllocationconfig";
import Investor from "../Investor";
import { useFormContext } from "react-hook-form";
import TokenSymbolRegistration from "../TokenSymbolRegistration";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface Category {
  category: string;
  tokens: number;
  vestingType: string;
  vestingStartDate: string;
  vestingEndDate: string;
  cliffPeriod: number;
  description: string;
}

const Index = ({ asset }: { asset: any }) => {
  const { watch, setValue } = useFormContext();
  const categories = watch("allocationStats.categories") || [];
  const tokenSymbol = watch("tokenInformation.tokenSymbol") || "";
  const totalPropertyValueAfterFees = watch("totalPropertyValueAfterFees");
  const softcap = watch("tokenInformation.softcap");

  useEffect(() => {
    const base = Number(totalPropertyValueAfterFees) || 0;
    const raw = softcap;
    const pct =
      raw === "" || raw === undefined || raw === null ? NaN : Number(raw);
    if (!Number.isNaN(pct)) {
      setValue("tokenInformation.softcapAmount", (base * pct) / 100, {
        shouldValidate: false,
        shouldDirty: false,
      });
    } else {
      setValue("tokenInformation.softcapAmount", "", {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
  }, [totalPropertyValueAfterFees, softcap, setValue]);

 
  return (
    <div className="">
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Token Information
      </h2>
      <div className="flex flex-col md:flex-row gap-6 justify-between w-full bg-white">
        {tokenSymbol ? (
          <div className="flex-1 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FormGenerator(formConfig(asset))}
            </div>
            <div>
              <Investor  />
            </div>
            </div>
          ) : (
            <TokenSymbolRegistration />
        )
        }
      </div>
    </div>
  );
};

export default Index;
