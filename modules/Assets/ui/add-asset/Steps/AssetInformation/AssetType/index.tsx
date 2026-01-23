import { useEffect } from "react";
import FormGenerator from "@/components/use-form/FormGenerator";
import { assetCategory } from "@/modules/Assets/form-config/AssetInformation/assetCategory";
import { assetStageConfig } from "@/modules/Assets/form-config/AssetInformation/assetStageConfig";
import { assetInfoConfig } from "@/modules/Assets/form-config/AssetInformation/assetInfoConfig";
import DAO from "./DAO";
import { useFormContext } from "react-hook-form";

function Index({ asset }: { asset: any }) {
  const { watch, setValue } = useFormContext();
  const selectedCompany = watch("company");
  const hasCompany = Boolean(selectedCompany || asset?.company);

  useEffect(() => {
    if (asset?.company?.currency) {
      setValue("currency", asset.company.currency);
    }
  }, [asset?.company?.currency, setValue]);

  return (
    <div>
      <div className="space-y-4">
        <DAO asset={asset} />

        {/* {hasCompany && ( */}
        <>
          <h1 className="text-xl font-semibold">Asset Category</h1>
          <div className="grid grid-cols-4 gap-4">
            {FormGenerator(assetCategory())}
          </div>

          <h1 className="text-xl font-semibold">Asset Stage</h1>
          <div className="grid grid-cols-4 gap-4">
            {FormGenerator(assetStageConfig())}
          </div>

          <div className="grid  grid-cols-2  gap-2">
            <AssetInfoSection asset={asset} />
          </div>
        </>
        {/* )} */}
      </div>
    </div>
  );
}

const AssetInfoSection = ({ asset }: { asset: any }) => {
  return <>{FormGenerator(assetInfoConfig({ asset }))}</>;
};

export default Index;
