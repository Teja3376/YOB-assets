import FormGenerator from "@/components/use-form/FormGenerator";
import { useFormContext } from "react-hook-form";
import { DaoConfig } from "@/modules/Assets/form-config/AssetInformation/DaoConfig";
import SelectCompany from "./SelectCompany";
import NoCompanySelected from "./NoCompanySelected";
import DAOConfigurationDetails from "./DAOConfigurationDetails";
import useGetSpvNames from "@/modules/SPV/hooks/useGetSpvNames";
import { useMemo } from "react";
import NoCompanyFound from "./NoCompanyFound";

const Index = ({ asset }: { asset: any }) => {
  const { watch } = useFormContext();
  const company = watch("company");
  console.log("company in dao", company);
  const { daoConfiguration: daoConfig, currency } = company || {};
  const {
    data: names = [],
    refetch: fetchSpvNames,
    isFetching: isNamesLoading,
  } = useGetSpvNames();

  const hasSPVs = useMemo(() => {
    return !!names?.data?.length;
  }, [names]);
  return (
    <div>
      <SelectCompany />
      {FormGenerator(
        DaoConfig({ asset }, { names, fetchSpvNames, isNamesLoading }),
      )}
      {hasSPVs &&
        (!company ? (
          <NoCompanySelected />
        ) : (
          <DAOConfigurationDetails daoConfig={daoConfig} currency={currency} />
        ))}
      {!hasSPVs && <NoCompanyFound />}
    </div>
  );
};

export default Index;
