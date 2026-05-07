import InfoTag from "@/components/ui/info-tag";
import FormGenerator from "@/components/use-form/FormGenerator";
import { formatCurrencyFlexible } from "@/lib/format.utils";
import { valueAndInvestmentConfig } from "@/modules/Assets/form-config/Vehicles/ValueInvestment/valueAndInvestment";
import { useFormContext } from "react-hook-form";
import Feee from "../Feee";
import { useEffect } from "react";
const VALUATION_FIELDS = [
  "investmentStats.startingValue",
  "investmentStats.targetFinalValue",
  "investmentStats.appreciationExpectedYearly",
];

export default function ValuationTab() {
  const { watch, setValue } = useFormContext();
  const startingValue = watch("investmentStats.startingValue");
  const currency = watch("company.currency");
  console.log("Starting Value:", startingValue);
  console.log("Currency:", currency);

  const allFields = valueAndInvestmentConfig(currency);
  const config = allFields.filter((field) =>
    VALUATION_FIELDS.includes(field.name || ""),
  );

  const fees = watch("fees");
  console.log("Fees:", fees);

  const feesValue = fees?.reduce((acc: number, fee: any) => {
    if (fee.status) {
      if (fee.isPercentage) {
        return acc + (startingValue * fee.value) / 100;
      }
      return acc + fee.value;
    }
    return acc;
  }, 0);

  const totalFees = feesValue;
  const targetFinalValue = Number(startingValue || 0) + feesValue;

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
