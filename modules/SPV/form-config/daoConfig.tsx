import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

// export const daoFormConfig = ({ spv }: { spv: any }) => {
export const daoFormConfig = () => {
  const { control, watch, setValue } = useFormContext<any>();

  const daoName = watch("daoConfiguration.daoName");

  return [
    {
      label: "DAO Name",
      name: `daoConfiguration.daoName`,
      type: "text",
      fullWidth: false,
      control,
      rules: {
        required: "DAO Name is required",
        maxLength: {
          value: 50,
          message: "DAO Name cannot exceed 50 characters",
        },
      },
    //   disabled: spv?.daoConfiguration?.daoName ? true : false,
    },
  ];
};
