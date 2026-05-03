import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import useGetSpvById from "@/modules/SPV/hooks/useGetSpvById";
import useGetSpvNames from "@/modules/SPV/hooks/useGetSpvNames";
import { useEffect, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export const useDaoConfig = (
  { asset }: { asset: any },
  {
    names,
    fetchSpvNames,
    isNamesLoading,
  }: { names: any; fetchSpvNames: () => void; isNamesLoading: boolean },
): FormFieldConfig[] => {
  const { control, setValue } = useFormContext();

  const watchedSpvId = useWatch({ control, name: "spvId" }) as unknown;
  const assetSpvId =
    typeof asset?.spvId === "string" ? asset.spvId.trim() : "";
  const formSpvId =
    typeof watchedSpvId === "string" ? watchedSpvId.trim() : "";
  const effectiveSpvId = formSpvId || assetSpvId;

  const { data: selectedSpv } = useGetSpvById(effectiveSpvId);

  const hasSPVs = useMemo(() => {
    return !!names?.data?.length;
  }, [names]);

  const options = useMemo(() => {
    if (!hasSPVs) return [];

    return names.data.map((spv: any) => ({
      label: spv.name,
      value: spv._id,
    }));
  }, [names, hasSPVs]);

  useEffect(() => {
    if (!effectiveSpvId) {
      setValue("company", undefined);
      return;
    }
    if (!selectedSpv) return;

    setValue("company", selectedSpv);
    setValue("currency", selectedSpv.currency ?? "INR");
    setValue("country", selectedSpv.jurisdiction ?? "");
  }, [effectiveSpvId, selectedSpv, setValue]);

  const { spvId, company } = asset || {};

  if (spvId) {
    return [
      {
        name: "spvId",
        control,
        type: "select",
        label: "Company",
        options: [
          {
            label: company?.name || selectedSpv?.name,
            value: spvId,
          },
        ],
        rules: { required: "Company is required" },
        disabled: true,
      },
    ];
  }

  return [
    {
      name: "spvId",
      control,
      type: "select",
      label: "Company",
      options,
      disabled: !hasSPVs || isNamesLoading,
      placeHolder: isNamesLoading        ? "Loading companies..."
        : hasSPVs
        ? "Select a company"
        : "No companies available",
      rules: {
        validate: (value: string) => {
          if (!hasSPVs) {
            return "No SPVs are available. Please create or activate one.";
          }
          if (!value) return "Company is required";
          return true;
        },
      },

      onChange: (value: string) => {
        setValue("spvId", value, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
      },

      onBlur: () => {
        fetchSpvNames();
      },
    },
  ];
};
