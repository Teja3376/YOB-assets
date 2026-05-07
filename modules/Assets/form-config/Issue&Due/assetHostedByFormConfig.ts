import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import { useFormContext } from "react-hook-form";
import { useParams } from "next/navigation";
import parsePhoneNumberFromString, {
  getCountryCallingCode,
} from "libphonenumber-js";

// const getPhoneValidation = (countryCode: string) => {
//   switch (countryCode) {
//     case '+91': // India
//       return {
//         value: /^\d{10}$/,
//         message: 'Phone number must be 10 digits',
//       };
//     case '+1': // US
//       return {
//         value: /^\d{10}$/,
//         message: 'Phone number must be 10 digits',
//       };
//     case '+44': // UK
//       return {
//         value: /^\d{10,11}$/,
//         message: 'Phone number must be 10 or 11 digits',
//       };
//     case '+971': // UAE
//       return {
//         value: /^\d{9}$/,
//         message: 'Phone number must be 9 digits',
//       };
//     case '+974': // Qatar
//       return {
//         value: /^\d{8}$/,
//         message: 'Phone number must be 8 digits',
//       };
//     default:
//       return {
//         value: /^\d{8,15}$/,
//         message: 'Phone number must be between 8 and 15 digits',
//       };
//   }
// };

const formConfig = (countryCode: string, control: any): FormFieldConfig[] => {
  const { assetId } = useParams<{ assetId?: string }>();

  // const phoneValidation = getPhoneValidation(countryCode);

  return [
    {
      name: "hostedBy.name",
      label: "Name",
      type: "text",
      control,
      rules: {
        required: "Name is required",
        pattern: {
          value: /^[A-Za-z\s]+$/i,
          message: "Only letters are allowed",
        },
        maxLength: {
          value: 50,
          message: "Name must be less than 50 characters",
        },
        minLength: {
          value: 3,
          message: "Name must be at least 3 characters",
        },
      },
    },
    {
      name: "hostedBy.email",
      label: "Email",
      type: "email",
      control,
      rules: {
        required: "Email is required",
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "Invalid email address",
        },
      },
    },
    {
      name: "hostedBy.address",
      label: "Address",
      type: "text",
      control,
    },
    {
      name: "hostedBy.totalProjects",
      label: "Total Projects",
      type: "number",
      control,
    },
    {
      name: "hostedBy.onGoingProjects",
      label: "On Going Projects",
      type: "number",
      control,
    },
    {
      name: "hostedBy.phone",
      label: "Phone Number",
      type: "phoneNumber",
      control,
      rules: {
        required: "Phone Number is required",
        validate: (value: string) => {
          if (!value) return "Phone number is required";

          try {
            const fullNumber = `+${getCountryCallingCode(countryCode as any)}${value}`;

            const parsed = parsePhoneNumberFromString(fullNumber);

            if (!parsed || !parsed.isValid()) {
              return "Invalid phone number for selected country";
            }

            return true;
          } catch {
            return "Invalid phone number";
          }
        },
      },
      country: countryCode,
    },
    {
  name: "hostedBy.whatsappNumber",
  label: "Whatsapp Number",
  type: "phoneNumber",
  control,
  country: countryCode,
  rules: {
    required: "Phone Number is required",
    validate: (value: string) => {
      if (!value) return "Phone number is required";

      try {
        const fullNumber = `+${getCountryCallingCode(countryCode as any)}${value}`;

        const parsed = parsePhoneNumberFromString(fullNumber);

        if (!parsed || !parsed.isValid()) {
          return "Invalid phone number for selected country";
        }

        return true;
      } catch {
        return "Invalid phone number";
      }
    },
  },
},
    {
      name: "hostedBy.primeLocation",
      label: "Prime Location",
      type: "text",
      control,
    },
    {
      name: "hostedBy.logoURL",
      label: "Company Logo",
      type: "image",
      accept: ["png", "jpg", "jpeg"],
      control,
      fullWidth: true,
      meta: {
        refId: assetId ?? "",
        belongsTo: "asset",
        isPublic: true,
      },
    },
    {
      name: "hostedBy.website",
      label: "Website",
      type: "url",
      control,
      fullWidth: true,
    },
    {
      name: "hostedBy.about",
      label: "Issuer Profile Description",
      type: "textarea",
      control,
      fullWidth: true,
    },
  ];
};

export default formConfig;
