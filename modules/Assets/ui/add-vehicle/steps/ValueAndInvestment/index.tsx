import FormGenerator from "@/components/use-form/FormGenerator";
import { engineSpec } from "../../../../form-config/Vehicles/EngineSpecs/engineSpec";
import { valueAndInvestmentConfig } from "@/modules/Assets/form-config/Vehicles/ValueInvestment/valueAndInvestment";

function Index({ asset }: { asset: any }) {
  return (
    <div>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold mb-4">
          Valuation And Investment
        </h1>
        <div className="grid grid-cols-2 gap-5">
          <ValueAndInvestment />
        </div>
      </div>
    </div>
  );
}

const ValueAndInvestment = () => {
  return <>{FormGenerator(valueAndInvestmentConfig())}</>;
};

export default Index;
