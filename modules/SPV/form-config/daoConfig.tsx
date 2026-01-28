import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

// export const daoFormConfig = ({ spv }: { spv: any }) => {
export const daoFormConfig = () => {
  const { control, watch, setValue } = useFormContext<any>();

  const daoName = watch("daoConfiguration.daoName");
  const tokenSymbol = watch("daoConfiguration.tokenSymbol");

  useEffect(() => {
    if (!daoName) {
      setValue("daoConfiguration.tokenSymbol", "", {
        shouldDirty: false,
      });
      return;
    }

    const cleaned = daoName.slice(0, 3).trim().replace(/\s+/g, "_").toUpperCase();
    const autoSymbol = `${cleaned}_DAO`;

    setValue("daoConfiguration.tokenSymbol", autoSymbol, {
      shouldDirty: true,
    });
  }, [daoName, setValue]);

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
    {
      label: "Token Symbol",
      name: `daoConfiguration.tokenSymbol`,
      type: "text",
      fullWidth: false,
      control,
      rules: {
        required: "Token Symbol is required",
      },
      // defaultValue: spVName,
      disabled: true,
    },
  ];
};
