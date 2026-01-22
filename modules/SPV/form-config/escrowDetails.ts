import { BANK_ACCOUNT_TYPE } from "@/modules/SPV/utils/global";
import { useFormContext } from "react-hook-form";

export const formConfig = (jurisdiction?: string) => {
  const { control } = useFormContext();

  const isIndia =
    jurisdiction?.toLowerCase() === "in" ||
    jurisdiction?.toLowerCase() === "india";

  return [
    {
      label: "Bank Name",
      name: `escrowBankDetails.bankName`,
      type: "text",
      control,
      rules: {
        required: "Bank name is required",
        minLength: { value: 2, message: "Minimum 2 characters" },
        maxLength: { value: 50, message: "Maximum 50 characters" },
        pattern: {
          value: /^[A-Za-z\s.,&\-']{2,50}$/,
          message: "Invalid bank name format",
        },
      },
    },
    {
      label: "Account Type",
      name: `escrowBankDetails.accountType`,
      type: "select",
      control,
      options: BANK_ACCOUNT_TYPE,
      rules: { required: "Account type is required" },
    },
    {
      label: "Account Number",
      name: `escrowBankDetails.accountNumber`,
      type: "text",
      control,
      rules: {
        required: "Account number is required",
        minLength: { value: 8, message: "At least 8 digits" },
        maxLength: { value: 17, message: "Max 17 digits" },
        pattern: { value: /^[0-9]{8,17}$/, message: "Invalid account number" },
      },
    },
    isIndia
      ? {
          label: "IFSC Code",
          name: `escrowBankDetails.ifscCode`,
          type: "text",
          control,
          rules: {
            required: "IFSC code is required",
            pattern: {
              value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
              message: "Invalid IFSC format (e.g., HDFC0001234)",
            },
          },
        }
      : {
          label: "Routing Number",
          name: `escrowBankDetails.routingNumber`,
          type: "text",
          control,
          rules: {
            required: "Routing number is required",
            pattern: { value: /^[0-9]{9}$/, message: "Must be 9 digits" },
            // validate: {
            //   checksum: (value: string) => {
            //     if (!/^\d{9}$/.test(value)) return "Invalid routing number format";
            //     const digits = value.split("").map(Number);
            //     const weights = [3, 7, 1, 3, 7, 1, 3, 7, 1];
            //     const sum = digits.reduce((a, d, i) => a + d * weights[i], 0);
            //     return sum % 10 === 0 || "Invalid routing number checksum";
            //   },
            // },
          },
        },
  ].filter(Boolean);
};
