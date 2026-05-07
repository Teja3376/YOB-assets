import FormGenerator from "@/components/use-form/FormGenerator";
import { valueAndInvestmentConfig } from "@/modules/Assets/form-config/Vehicles/ValueInvestment/valueAndInvestment";

const VALUATION_FIELDS = [
  "investmentStats.startingValue",
  "investmentStats.targetFinalValue",
  "investmentStats.appreciationExpectedYearly",
];

export default function ValuationTab() {
  const allFields = valueAndInvestmentConfig();
  const config = allFields.filter((field) =>
    VALUATION_FIELDS.includes(field.name || ""),
  );

  return <div className="grid grid-cols-2 gap-5">{FormGenerator(config)}</div>;
}
