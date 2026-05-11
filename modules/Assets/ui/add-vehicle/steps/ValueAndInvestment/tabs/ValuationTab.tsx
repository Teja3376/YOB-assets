import InfoTag from "@/components/ui/info-tag";
import FormGenerator from "@/components/use-form/FormGenerator";
import { formatCurrencyFlexible } from "@/lib/format.utils";
import { valueAndInvestmentConfig } from "@/modules/Assets/form-config/Vehicles/ValueInvestment/valueAndInvestment";
import { useFormContext } from "react-hook-form";
import Feee from "../Feee";
import { useEffect, useMemo } from "react";
const VALUATION_FIELDS = [
  "investmentStats.startingValue",
  "investmentStats.targetFinalValue",
  "investmentStats.appreciationExpectedYearly",
];

export default function ValuationTab() {
  const { watch, setValue } = useFormContext();
  const startingValue = watch("investmentStats.startingValue");
  const currency = watch("company.currency");


  const allFields = valueAndInvestmentConfig(currency);
  const config = allFields.filter((field) =>
    VALUATION_FIELDS.includes(field.name || ""),
  );

  const fees = watch("fees");

  const totalFees = useMemo(() => {
    if (!fees?.length) return 0;

    return fees.reduce((acc: number, fee: any) => {
      if (!fee.status) return acc;

      if (fee.isPercentage) {
        return acc + (Number(startingValue || 0) * fee.value) / 100;
      }

      return acc + fee.value;
    }, 0);
  }, [fees, startingValue]);

  const targetFinalValue = useMemo(() => {
    return Number(startingValue || 0) + totalFees;
  }, [startingValue, totalFees]);
  
  useEffect(() => {
    setValue("investmentStats.targetFinalValue", targetFinalValue);
  }, [targetFinalValue, setValue]);

  // console.log("Fees Value:", feesValue);
  // console.log("Total Property Value:", targetFinalValue);

  return (
    <div>
      <div className="grid grid-cols-2 gap-5">{FormGenerator(config)}</div>
      <InfoTag
        info="Starting Value"
        amount={`${formatCurrencyFlexible(startingValue, currency)}`}
        icon={<div />}
      />
      <Feee />
      <InfoTag
        info="Target Final Value"
        amount={`${formatCurrencyFlexible(targetFinalValue, currency)}`}
        icon={<div />}
      />
    </div>
  );
}
