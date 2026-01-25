import { FormFieldConfig } from "@/components/use-form/ControllerMap";
// import useSpvNames from "@/hooks/spv/useSpvNames";
import { useFormContext } from "react-hook-form";
import { useParams } from "next/navigation";

export const DaoConfig = ({ asset }: { asset: any }): FormFieldConfig[] => {
  const { spvId } = useParams<{ spvId?: string }>();
  const { control, setValue } = useFormContext();
//   const { spvNames, fetchSpv, fetchSpvNames } = useSpvNames();

//   const fetchedSpv = async (id: string) => {
//     if (id) {
//       setValue("companyId", id);
//       await fetchSpv(id).then((res) => {
//         console.log(res);
//         setValue("currency", res?.currency ?? "INR");
//         setValue("company", res);
//       });
//     }
//   };
  const { companyId, company } = asset || {};

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

  return [
    {
      name: "companyId",
      control,
      type: "select",
      label: "Company",
    //   options: spvNames,
      options: [],
      rules: { required: "Company is required" },
      onChange: (value) => {
        // fetchedSpv(value);
      },
      onBlur: () => {
        // fetchSpvNames();
      }
    },
  ];
};
