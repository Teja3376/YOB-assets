import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import { useFormContext, useWatch } from "react-hook-form";
import { useParams } from "next/navigation";

export const boardMembersFormConfig = ({
  index,
}: {
  index: number;
}): FormFieldConfig[] => {
  const params = useParams() as { id?: string; spvId?: string };
  const companyId = params?.spvId ?? params?.id;
  const { control } = useFormContext();

  const assetCountry = useWatch({
    control,
    name: "assetBasicDetails.country",
  }) as string | undefined;
  const watchedCountryCode = useWatch({
    control,
    name: `boardOfDirectors.additionalBoardMembers.${index}.countryCode`,
  }) as string | undefined;

  const getCallingCode = (country?: string) => {
    if (!country) return "+91";
    const key = country.toUpperCase();
    if (key === "IN" || key === "INDIA") return "+91";
    if (key === "QA" || key === "QATAR") return "+974";
    if (key === "AE" || key === "UAE" || key === "UNITED ARAB EMIRATES")
      return "+971";
    return "+91";
  };

  const defaultCallingCode = getCallingCode(assetCountry);

  const validatePhoneForCallingCode = (
    callingCode: string | undefined,
    rawNumber: string
  ) => {
    const num = (rawNumber || "").replace(/\s|-/g, "");
    if (!num) return true; // Let `required` rule handle empty — keeps required message consistent
    switch (callingCode) {
      case "+91": {
        const re = /^[6-9]\d{9}$/;
        return (
          re.test(num) ||
          "Indian phone number must be 10 digits and start with 6,7,8 or 9"
        );
      }
      case "+974": {
        const re = /^\d{8}$/;
        return re.test(num) || "Qatari phone number must be 8 digits";
      }
      case "+971": {
        const reLocal = /^5\d{8}$/;
        const reE164 = /^\+9715\d{8}$/;
        return (
          reLocal.test(num) ||
          reE164.test(rawNumber) ||
          "UAE phone number should be like 5XXXXXXXX (9 digits after +971)"
        );
      }
      default: {
        const re = /^\d{6,15}$/;
        return re.test(num) || "Phone number must be between 6 and 15 digits";
      }
    }
  };

  return [
    {
      label: "Full Name",
      name: `boardOfDirectors.additionalBoardMembers.${index}.fullName`,
      type: "text",
      fullWidth: false,
      control,
      rules: {
        required: "Full Name is required",
        minLength: {
          value: 3,
          message: "Full Name must be at least 3 characters",
        },
        maxLength: {
          value: 50,
          message: "Full Name must be at most 50 characters",
        },
        pattern: {
          value: /^[a-zA-Z0-9\s\-&,.'()]+$/,
          message: "Full Name contains invalid characters",
        },
      },
    },
    {
      control,
      label: "Email",
      name: `boardOfDirectors.additionalBoardMembers.${index}.email`,
      type: "email",
      fullWidth: false,
      rules: {
        required: "Email is required",
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "Email is not valid",
        },
      },
    },
    {
      control,
      label: "Phone Number",
      name: `boardOfDirectors.additionalBoardMembers.${index}.phoneNumber`,
      selectName: `boardOfDirectors.additionalBoardMembers.${index}.countryCode`,
      type: "inputGroup",
      fullWidth: false,
      rules: {
        required: "Phone Number is required",
        validate: (value: any) => {
          const effectiveCallingCode = watchedCountryCode ?? defaultCallingCode;
          const res = validatePhoneForCallingCode(effectiveCallingCode, value);
          return res === true ? true : res;
        },
      },
      selectRules: {
        required: "Country Code is required",
      },
      options: [
        { label: "+91", value: "+91" },
        { label: "+971", value: "+971" },
        { label: "+974", value: "+974" },
      ],
      position: "left",
      defaultValue: watchedCountryCode ?? defaultCallingCode,
    },
    {
      control,
      label: "Select Role",
      name: `boardOfDirectors.additionalBoardMembers.${index}.role`,
      type: "select",
      options: [
        { label: "Treasury Manger", value: "treasury-manager" },
        { label: "Asset Manager", value: "asset-manager" },
      ],
      rules: {
        required: "Role is required",
      },
    },
    {
      label: "Id Number",
      name: `boardOfDirectors.additionalBoardMembers.${index}.idNumber`,
      type: "text",
      fullWidth: false,
      control,
      rules: {
        required: "Id Number is required",
        minLength: {
          value: 3,
          message: "Id Number must be at least 3 characters",
        },
        maxLength: {
          value: 50,
          message: "Id Number must be at most 50 characters",
        },
        pattern: {
          value: /^[a-zA-Z0-9\s\-&,.'()]+$/,
          message: "Id Number contains invalid characters",
        },
      },
    },
    {
      control,
      label: "Id Proof",
      name: `boardOfDirectors.additionalBoardMembers.${index}.idProof`,
      type: "file",
      fullWidth: true,
      accept: ["png", "jpg", "jpeg", "pdf"],
      maxSize: 5 * 1024 * 1024,
      meta: {
        refId: companyId ?? "",
        belongsTo: "company",
        isPublic: true,
      },
      rules: {
        required: "Id Proof is required",
      },
    },
  ];
};
