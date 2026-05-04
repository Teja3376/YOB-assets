import FormGenerator from "@/components/use-form/FormGenerator";
import { useFormContext } from "react-hook-form";
import {  useDaoConfig } from "@/modules/Assets/form-config/AssetInformation/DaoConfig";
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
  const { daoConfiguration: daoConfig, currency } = asset?.company || {};
  const {
    data: names = [],
    refetch: fetchSpvNames,
    isFetching: isNamesLoading,
  } = useGetSpvNames();

  console.log("names", names);
  const hasSPVs = useMemo(() => {
    return !!names?.data?.length;
  }, [names]);
  const config=useDaoConfig({ asset }, { names, fetchSpvNames, isNamesLoading })
  return (
    <div>
      <SelectCompany />
      {FormGenerator(
        config,
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
