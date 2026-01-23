import { FormFieldConfig } from "@/components/use-form/ControllerMap";
// import { Asset } from "@/hooks/useFetchApprovalList";
import { useFormContext } from "react-hook-form";
import { useParams } from "next/navigation";
import { Asset } from "@/modules/Assets/utils/interfaces";

const formConfig = (asset: Asset): FormFieldConfig[] => {
  const { control, setValue, watch } = useFormContext();
  const [tokenSupply, minimumTokenToBuy,totalNumberOfSfts,pricePerSft,basePropertyValue] = watch([
    "tokenInformation.tokenSupply",
    "tokenInformation.minimumTokenToBuy",
    'totalNumberOfSfts',
    'pricePerSft',
    'basePropertyValue'
  ]);

  const param = useParams();

  let disable = false;

  if (param.id) {
    disable = true;
  }


  return [
    {
      label:"Token Symbol",
      name: "tokenInformation.tokenSymbol",
      type: "text",
      control: control,
      rules: {
        required: "Token Symbol is required",
        pattern: {
          value: /^[a-zA-Z0-9]+$/, // Only alphanumeric characters are allowed
          message: "Only alphanumeric characters are allowed",    
        },
        minLength: {
          value: 3,
          message: "Token Symbol must be at least 3 characters long", 
        },
        maxLength: {
          value: 10,
          message: "Token Symbol must be at most 10 characters long",
        },
      },
      disabled: true,
    },
    {
      name: "tokenInformation.tokenSupply",
      label: "Total Token Supply",
      type: "number",
      control: control,
      rules: {
        required: "Total Token Supply is required",
        pattern: {
          value: /^[0-9]+$/, // Only numbers are allowed
          message: "Only numbers are allowed",
        },
        min: {
          value: 1,
          message: "Total Token Supply must be greater than 0",
        },
        max: {
          value: 1000000000,
          message: "Total Token Supply must be less than 1 billion",
        },
        validate: (value: number) => {
          if (value < minimumTokenToBuy) {
            return "Total Token Supply must be greater than Minimum Token To Buy";
          }
          return true;
        },
      },
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
     
        setValue("tokenInformation.tokenPrice", basePropertyValue / Number(value));
      },
    },
    {
      name: "tokenInformation.minimumTokensToBuy",
      label: "Minimum Token To Buy",
      type: "number",
      control: control,
      rules: {
        required: "Minimum Token To Buy is required",
        pattern: {
          value: /^[0-9]+$/,
          message: "Only numbers are allowed",
        },
        min: {
          value: 1,
          message: "Minimum Token To Buy must be greater than 0",
        },
        max: {
          value: 1000000000,
          message: "Minimum Token To Buy must be less than 1 billion",
        },
        validate: (value: number) => {
          if (value > tokenSupply) {
            return "Minimum Token To Buy must be less than Total Token Supply";
          }
          return true;
        },
      },
      // disabled: disable,
    },
    {
      name: "tokenInformation.maximumTokensToBuy",
      label: "Maximum Token To Buy",
      type: "number",
      control: control,
      rules: {
        required: "Maximum Token To Buy is required",
        pattern: {
          value: /^[0-9]+$/,
          message: "Only numbers are allowed",
        },
        min: {
          value: 1,
          message: "Maximum Token To Buy must be greater than 0",
        },
        max: {
          value: 1000000000,
          message: "Maximum Token To Buy must be less than 1 billion",
        },
        validate: (value: number) => {
          if (value < minimumTokenToBuy) {
            return "Maximum Token To Buy must be greater than Minimum Token To Buy";
          }
          return true;
        },
      },
    },
    {
      name: "tokenInformation.tokenPrice",
      label: `Token Price (${asset?.currency})`,
      type: "number",
      control: control,
      disabled: disable,
    },
    {
      name: "basePropertyValue",
      label: `Base Property Value (${asset?.currency })`,
      type: "number",
      control: control,
      disabled: disable,
    },
  ];
};

export default formConfig;
