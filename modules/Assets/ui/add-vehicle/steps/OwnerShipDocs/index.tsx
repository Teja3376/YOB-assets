import FormGenerator from "@/components/use-form/FormGenerator";
import { engineSpec } from "../../../../form-config/Vehicles/EngineSpecs/engineSpec";
import { ownerShipDocsConfig } from "@/modules/Assets/form-config/Vehicles/OwnerShipDocs/ownershiDocsConfig";

function Index({ asset }: { asset: any }) {
  return (
    <div>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold mb-4">
          Ownership and  Documents
        </h1>
        <div className="grid grid-cols-2 gap-5">
          <OwnerShipDocsInfo />
        </div>
      </div>
    </div>
  );
}

const OwnerShipDocsInfo = () => {
  return <>{FormGenerator(ownerShipDocsConfig())}</>;
};

export default Index;
    