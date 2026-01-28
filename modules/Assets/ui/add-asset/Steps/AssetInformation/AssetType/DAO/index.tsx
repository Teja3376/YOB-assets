import FormGenerator from "@/components/use-form/FormGenerator";
import { useFormContext } from "react-hook-form";
import { DaoConfig } from "@/modules/Assets/form-config/AssetInformation/DaoConfig";
import SelectCompany from "./SelectCompany";
import NoCompanySelected from "./NoCompanySelected";
import DAOConfigurationDetails from "./DAOConfigurationDetails";

const Index = ({ asset }: { asset: any }) => {
  const { watch } = useFormContext();
  const company = watch("company");
  console.log("company in dao", company);
  const { daoConfiguration: daoConfig, currency } = company || {};

  return (
    <div>
      <SelectCompany />
      {FormGenerator(DaoConfig({ asset }))}
      {!company ? (
        <NoCompanySelected />
      ) : (
        <DAOConfigurationDetails daoConfig={daoConfig} currency={currency} />
      )}
    </div>
  );
};

export default Index;
