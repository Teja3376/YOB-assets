import FormGenerator from "@/components/use-form/FormGenerator";
import { valueAndInvestmentConfig } from "@/modules/Assets/form-config/Vehicles/ValueInvestment/valueAndInvestment";

const VALUATION_FIELDS = [
  "investmentStats.startingValue",
  "investmentStats.targetFinalValue",
  "investmentStats.appreciationExpectedYearly",
];

export default function InvestmentTab() {
  const allFields = valueAndInvestmentConfig();

  return <div className="grid grid-cols-2 gap-5"> Geenerating</div>;
}
