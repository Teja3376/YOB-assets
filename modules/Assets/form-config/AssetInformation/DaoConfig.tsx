import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import { useFormContext } from "react-hook-form";
import { useState, useEffect, useMemo } from "react";
import useGetSpvNames from "@/modules/SPV/hooks/useGetSpvNames";
import useGetSpvById from "@/modules/SPV/hooks/useGetSpvById";

export const DaoConfig = ({ asset }: { asset: any }): FormFieldConfig[] => {
  const { control, setValue } = useFormContext();

  const [selectedSpvId, setSelectedSpvId] = useState<string | undefined>(
    asset?.spvId
  );

  // Fetch SPV dropdown names
  const {
    data: names = [],
    refetch: fetchSpvNames,
    isFetching: isNamesLoading,
  } = useGetSpvNames();

  // Fetch selected SPV details
  const { data: selectedSpv } = useGetSpvById(selectedSpvId!);

  // Check availability
  const hasSPVs = useMemo(() => names && names.length > 0, [names]);

  // Sync selected SPV into form
  useEffect(() => {
    if (!selectedSpv) return;

    setValue("company", selectedSpv);
    setValue("currency", selectedSpv.currency ?? "INR");
  }, [selectedSpv, setValue]);

  const { spvId, company } = asset || {};

  // Edit mode
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

  // Create mode
  return [
    {
      name: "spvId",
      control,
      type: "select",
      label: "Company",

      // Dynamic options
      options: hasSPVs
        ? names.map((spv: any) => ({
            label: spv.name,
            value: spv._id,
          }))
        : [],

      // Disable if no SPVs
      disabled: !hasSPVs || isNamesLoading,

      // Smart validation
      rules: {
        validate: (value: string) => {
          if (!hasSPVs) {
            return "No SPVs are available to link with the asset. Please create or activate an SPV.";
          }

          if (!value) {
            return "Company is required";
          }

          return true;
        },
      },

      // Handle selection
      onChange: (value) => {
        setSelectedSpvId(value);

        setValue("spvId", value, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
      },

      // Refresh on focus loss
      onBlur: () => {
        fetchSpvNames();
      },
    },
  ];
};