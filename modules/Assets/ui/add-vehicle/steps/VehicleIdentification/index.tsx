import { useEffect } from "react";
import FormGenerator from "@/components/use-form/FormGenerator";
import { assetCategory } from "@/modules/Assets/form-config/AssetInformation/assetCategory";
import { assetStageConfig } from "@/modules/Assets/form-config/AssetInformation/assetStageConfig";
import DAO from "../../../add-asset/Steps/AssetInformation/AssetType/DAO";
import { useFormContext } from "react-hook-form";
import { vehicleIdentification } from "@/modules/Assets/form-config/Vehicles/VehicleIdentification/vehicleIdentification";

function Index({ asset }: { asset: any }) {
  const { watch, setValue } = useFormContext();
  const selectedCompany = watch("company");
  const hasCompany = Boolean(selectedCompany || asset?.company);

  useEffect(() => {
    if (asset?.company?.currency) {
      console.log("Auto-setting currency to", asset.company);
      setValue("currency", asset.company.currency);
      setValue("country", asset.company.jurisdiction ?? "");
    }
  }, [asset?.company?.currency, setValue]);

  return (
    <div>
      <div className="space-y-4">
        <DAO asset={asset} />

        {hasCompany && (
          <>
            <h1 className="text-xl font-semibold">Vehicle Identification</h1>
            {/* <div className="grid grid-cols-4 gap-4">
              {FormGenerator(vehicleIdentification({ asset }))}
            </div> */}

            {/* <h1 className="text-xl font-semibold">Asset Stage</h1> */}
            {/* <div className="grid grid-cols-4 gap-4">
              {FormGenerator(assetStageConfig())}
            </div> */}

            <div className="grid  grid-cols-2  gap-5">
              <VehicleInfo asset={asset} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const VehicleInfo = ({ asset }: { asset: any }) => {
  return <>{FormGenerator(vehicleIdentification({ asset }))}</>;
};

export default Index;
