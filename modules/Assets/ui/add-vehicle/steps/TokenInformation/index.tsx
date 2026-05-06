import FormGenerator from "@/components/use-form/FormGenerator";
import tokenInformation from "@/modules/Assets/form-config/Vehicles/TokenInformation/tokenInformatio";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

function Index({ asset }: { asset: any }) {
  const { watch, setValue } = useFormContext();
  const softcap = watch("tokenInformation.softcap");
  const startingValue = watch("investmentStats.startingValue");
  const targetFinalValue = watch("investmentStats.targetFinalValue");

  useEffect(() => {
    const base =
    Number(targetFinalValue) || Number(startingValue) || 0;
    const raw = softcap;
    const pct =
      raw === "" || raw === undefined || raw === null ? NaN : Number(raw);

    if (!Number.isNaN(pct)) {
      setValue("tokenInformation.softcapAmount", (base * pct) / 100, {
        shouldValidate: false,
        shouldDirty: false,
      });
      return;
    }

    setValue("tokenInformation.softcapAmount", "", {
      shouldValidate: false,
      shouldDirty: false,
    });
  }, [softcap, startingValue, targetFinalValue, setValue]);

  return (
    <div>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold mb-4">
          Token Information
        </h1>
        <div className="grid grid-cols-2 gap-5">
          <TokenInformationInfo asset={asset} />
        </div>
      </div>
    </div>
  );
}

const TokenInformationInfo = ({ asset }: { asset: any }) => {
  return <>{FormGenerator(tokenInformation(asset))}</>;
};

export default Index;
    