import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import { useFormContext, useWatch } from "react-hook-form";
import { useParams } from "next/navigation";
import {
  getCountryCallingCode,
  parsePhoneNumberFromString,
  getCountries,
  CountryCode,
} from "libphonenumber-js";

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
    name: "jurisdiction",
  }) as string | undefined;
  console.log("Watched asset country:", assetCountry);

  const watchedCountryCode = useWatch({
    control,
    name: `boardMembers.${index}.countryCode`,
  }) as string | undefined;

  // ✅ Dynamic calling code
  const getCallingCode = (country?: string) => {
    try {
      if (!country) return "+91";
      const code = getCountryCallingCode(country.toUpperCase() as CountryCode);
      return `+${code}`;
    } catch {
      return "+91";
    }
  };

  const defaultCallingCode = getCallingCode(assetCountry);

  const getAllCountryOptions = () => {
    return getCountries()
      .map((country) => {
        try {
          const code = getCountryCallingCode(country);
          return {
            label: `${country} (+${code})`,
            value: `+${code}`,
          };
        } catch {
          return null;
        }
      })
      .filter(Boolean) as { label: string; value: string }[];
  };

  const validatePhone = (value: string, countryCode?: string) => {
    if (!value) return true;

    try {
      const fullNumber = `${countryCode || ""}${value}`;

      const phoneNumber = parsePhoneNumberFromString(fullNumber);

      if (!phoneNumber || !phoneNumber.isValid()) {
        console.log("Invalid phone number:", fullNumber);
        return "Invalid phone number";
      }

      return true;
    } catch {
      return "Invalid phone number";
    }
  };

  return [
    {
      label: "Full Name",
      name: `boardMembers.${index}.fullName`,
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
      name: `boardMembers.${index}.email`,
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
      name: `boardMembers.${index}.phoneNumber`,
      selectName: `boardMembers.${index}.countryCode`,
      type: "inputGroup",
      fullWidth: false,
      rules: {
        required: "Phone Number is required",
        validate: (value: any) => {
          return validatePhone(value, watchedCountryCode);
        },
      },
      selectRules: {
        required: "Country Code is required",
      },

      options: getAllCountryOptions(),

      position: "left",
      defaultValue: watchedCountryCode ?? defaultCallingCode,
    },
    {
      control,
      label: "Select Role",
      name: `boardMembers.${index}.role`,
      type: "select",
      options: [
        { label: "Asset Manager", value: "Asset Manager" },
        { label: "Investor Manager", value: "Investor Manager" },
      ],
      rules: {
        required: "Role is required",
      },
    },
    {
      label: "Id Number",
      name: `boardMembers.${index}.idNumber`,
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
      name: `boardMembers.${index}.idProof`,
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
