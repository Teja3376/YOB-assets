import FormGenerator from "@/components/use-form/FormGenerator";
import { engineSpec } from "../../../../form-config/Vehicles/EngineSpecs/engineSpec";

function Index({ asset }: { asset: any }) {
  return (
    <div>
      <div className="space-y-4">
        <EngineInfo />
      </div>
    </div>
  );
}

const EngineInfo = () => {
  return <>{FormGenerator(engineSpec())}</>;
};

export default Index;
