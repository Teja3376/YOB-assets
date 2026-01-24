import FormGenerator from "@/components/use-form/FormGenerator";
import { feeFormConfig, formConfig } from "@/modules/Assets/form-config/AssetInformation/feeconfig";
import { useFormContext } from "react-hook-form";
import InfoTag from "@/components/ui/info-tag";
import Registration from "./Registration";
import Legal from "./Legal";
import Platform from "./Platform";
import Brokerage from "./Brokerage";
import Reserve from "./Reserve";
import Insurance from "./insurance";
import { formatCurrencyFlexible } from "@/lib/format.utils";

const index = ({ currency }: { currency: string }) => {
  const { watch } = useFormContext();

  const numberOfSfts = watch("totalNumberOfSfts");
  const perSQFT = watch("pricePerSft");
  const registrationFees = watch("fees.registration");
  const legalFees = watch("fees.legal");
  const platformFees = watch("fees.platform");
  const brokerageFees = watch("fees.brokerage");
  const reserve = watch("fees.reserve");
  const insurance = watch("fees.insurance");
  const basePropertyValue = Number(numberOfSfts) * Number(perSQFT);
  const registrationFeesValue = registrationFees?.reduce(
    (acc: number, fee: any) => {
      if (fee.status) {
        if (fee.isPercentage) {
          return acc + (basePropertyValue * fee.value) / 100;
        }
        return acc + fee.value;
      }
      return acc;
    },
    0
  );

  const legalFeesValue = legalFees?.reduce((acc: number, fee: any) => {
    if (fee.status) {
      if (fee.isPercentage) {
        return acc + (basePropertyValue * fee.value) / 100;
      }
      return acc + fee.value;
    }
    return acc;
  }, 0);

  const platformFeesValue = platformFees?.reduce((acc: number, fee: any) => {
    if (fee.status) {
      if (fee.isPercentage) {
        return acc + (basePropertyValue * fee.value) / 100;
      }
      return acc + fee.value;
    }
    return acc;
  }, 0);

  const reserveFeeValue = reserve?.reduce((acc: number, fee: any) => {
    if (fee.status) {
      if (fee.isPercentage) {
        return acc + (basePropertyValue * fee.value) / 100;
      }
      return acc + fee.value;
    }
    return acc;
  }, 0);

  const insuranceFeeValue = insurance?.reduce((acc: number, fee: any) => {
    if (fee.status) {
      if (fee.isPercentage) {
        return acc + (basePropertyValue * fee.value) / 100;
      }
      return acc + fee.value;
    }
    return acc;
  }, 0);

  const brokerageFeeValue = brokerageFees?.reduce((acc: number, fee: any) => {
    if (fee.status) {
      if (fee.isPercentage) {
        return acc + (basePropertyValue * fee.value) / 100;
      }
      return acc + fee.value;
    }
    return acc;
  }, 0);
  console.log("rserve fee", reserveFeeValue);

  const totalFees =
    registrationFeesValue +
    legalFeesValue +
    platformFeesValue +
    brokerageFeeValue +
    reserveFeeValue +
    insuranceFeeValue;
  const totalPropertyValue = basePropertyValue + totalFees;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Asset Price</h1>
        {/* <Button type='button' variant='outline'>
          <RefreshCw /> Sync Fee
        </Button> */}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {FormGenerator(feeFormConfig(currency))}
      </div>
      <InfoTag
        info="Base Property Value"
        amount={`${formatCurrencyFlexible(basePropertyValue, currency)}`}
        icon={<div />}
      />
      <div className="my-4">
        <Reserve />
        <Insurance />
        <Registration />
        <Legal />
        <Platform />
        <Brokerage />
      </div>
      <InfoTag
        info="Total Property Value"
        amount={`${formatCurrencyFlexible(totalPropertyValue, currency)}`}
        icon={<div />}
      />
    </div>
  );
};

export default index;
