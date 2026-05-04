"use client";

import FormGenerator from "@/components/use-form/FormGenerator";
import { useVehicleDaoConfig } from "@/modules/Assets/form-config/Vehicles/vehicleDaoConfig";
import useGetSpvNames from "@/modules/SPV/hooks/useGetSpvNames";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

import DAOConfigurationDetails from "@/modules/Assets/ui/add-asset/Steps/AssetInformation/AssetType/DAO/DAOConfigurationDetails";
import NoCompanyFound from "@/modules/Assets/ui/add-asset/Steps/AssetInformation/AssetType/DAO/NoCompanyFound";
import NoCompanySelected from "@/modules/Assets/ui/add-asset/Steps/AssetInformation/AssetType/DAO/NoCompanySelected";
import SelectCompany from "@/modules/Assets/ui/add-asset/Steps/AssetInformation/AssetType/DAO/SelectCompany";

type VehicleDaoProps = {
  asset?: Record<string, unknown> | null;
};

/**
 * SPV / company picker and read-only DAO summary for the vehicle asset wizard.
 * Kept separate from real-estate DAO so vehicle-specific behaviour can diverge safely.
 */
export default function VehicleDao({ asset }: VehicleDaoProps) {
  const { watch } = useFormContext();
  const company = watch("company") as Record<string, unknown> | undefined;
  const resolvedCompany =
    company ?? (asset?.company as Record<string, unknown> | undefined);
  const daoConfig = resolvedCompany?.daoConfiguration as
    | Record<string, unknown>
    | undefined;
  const currency = (resolvedCompany?.currency as string | undefined) ?? "";

  const {
    data: names = [],
    refetch: fetchSpvNames,
    isFetching: isNamesLoading,
  } = useGetSpvNames();

  const hasSPVs = useMemo(() => !!names?.data?.length, [names]);

  const config = useVehicleDaoConfig(
    { asset },
    { names, fetchSpvNames, isNamesLoading },
  );

  return (
    <div className="space-y-2">
      <SelectCompany />
      {FormGenerator(config)}
      {hasSPVs &&
        (!resolvedCompany ? (
          <NoCompanySelected />
        ) : (
          <DAOConfigurationDetails
            daoConfig={daoConfig ?? null}
            currency={currency}
          />
        ))}
      {!hasSPVs && <NoCompanyFound />}
    </div>
  );
}
