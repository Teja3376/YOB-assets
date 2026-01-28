import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import { useFormContext } from "react-hook-form";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import useGetSpvNames from "@/modules/SPV/hooks/useGetSpvNames";
import useGetSpvById from "@/modules/SPV/hooks/useGetSpvById";

export const DaoConfig = ({ asset }: { asset: any }): FormFieldConfig[] => {
    // const { spvId } = useParams<{ spvId?: string }>();
  const { control, setValue } = useFormContext();

  const [selectedSpvId, setSelectedSpvId] = useState<string | undefined>(
    asset?.spvId,
  );

  // Fetch SPV dropdown names
  const {
    data: names = [],
    refetch: fetchSpvNames,
    isFetching: isNamesLoading,
  } = useGetSpvNames();

  // Fetch selected SPV details
  const { data: selectedSpv } = useGetSpvById(selectedSpvId!);

  // Sync SPV data into form when fetched
  useEffect(() => {
    if (!selectedSpv) return;
    console.log("selectedSpv", selectedSpv);
    setValue("company", selectedSpv);
    setValue("currency", selectedSpv.currency ?? "INR");
  }, [selectedSpv, setValue]);

  const { spvId, company } = asset || {};

  // Edit Mode (locked company)
  if (spvId && spvId) {
    return [
      {
        name: "spvId",
        control,
        type: "select",
        label: "Company",
        options: [
          {
            label: company ? company?.name : selectedSpv?.name,
            value: spvId,
          },
        ],
        rules: { required: "Company is required" },
        disabled: true,
      },
    ];
  }

  // Create Mode
  return [
    {
      name: "spvId",
      control,
      type: "select",
      label: "Company",

      options: names.map((spv: any) => ({
        label: spv.name,
        value: spv._id,
      })),

      rules: { required: "Company is required" },

      onChange: (value) => {
        console.log("selected spv id 123", value);
        setSelectedSpvId(value);
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
