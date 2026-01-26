import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import { useFormContext } from "react-hook-form";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import useGetSpvNames from "@/modules/SPV/hooks/useGetSpvNames";
import useGetSpvById from "@/modules/SPV/hooks/useGetSpvById";

export const DaoConfig = ({ asset }: { asset: any }): FormFieldConfig[] => {
  const { spvId } = useParams<{ spvId?: string }>();
  const { control, setValue } = useFormContext();

  const [selectedSpvId, setSelectedSpvId] = useState<string | undefined>(
    asset?.companyId,
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

    setValue("company", selectedSpv);
    setValue("currency", selectedSpv.currency ?? "INR");
  }, [selectedSpv, setValue]);

  const { companyId, company } = asset || {};

  // Edit Mode (locked company)
  if (spvId && companyId) {
    return [
      {
        name: "companyId",
        control,
        type: "select",
        label: "Company",
        options: [
          {
            label: company?.name,
            value: companyId,
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
      name: "companyId",
      control,
      type: "select",
      label: "Company",

      options: names.map((spv: any) => ({
        label: spv.name,
        value: spv.id,
      })),

      rules: { required: "Company is required" },

      // loading: isNamesLoading,

      onChange: (value) => {
        setSelectedSpvId(value);
        setValue("companyId", value);
      },

      onBlur: () => {
        fetchSpvNames();
      },
    },
  ];
};
