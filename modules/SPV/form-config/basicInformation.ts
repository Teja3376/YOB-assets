import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import { COUNTRIES, CURRENCY_OPTIONS } from "@/constants/global";
import { SPV_TYPES } from "@/modules/SPV/utils/global";
import { useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useParams } from "next/navigation";

export const basicInformationFormConfig = ({
  spv,
}: {
  spv: any;
}): FormFieldConfig[] => {
  const { control, setValue } = useFormContext<any>();
  const params = useParams<{ id?: string; spvId?: string }>();
  const id = params?.spvId ?? params?.id;
  const jurisdiction = useWatch({ control, name: "jurisdiction" });
  const currency = useWatch({ control, name: "currency" });

  const autoSetCurrencyRef = useRef<string | null>(null);
  // console.log("spv in form config", spv);

  const countryCurrencyMap: Record<string, string> = {
    AT: "EUR",
    BE: "EUR",
    HR: "EUR",
    CY: "EUR",
    EE: "EUR",
    FI: "EUR",
    FR: "EUR",
    DE: "EUR",
    GR: "EUR",
    IE: "EUR",
    IT: "EUR",
    LV: "EUR",
    LT: "EUR",
    LU: "EUR",
    MT: "EUR",
    NL: "EUR",
    PT: "EUR",
    SK: "EUR",
    SI: "EUR",
    ES: "EUR",

    // EU - Non-Euro 💸
    BG: "BGN", // Bulgaria
    CZ: "CZK", // Czechia
    DK: "DKK", // Denmark
    HU: "HUF", // Hungary
    PL: "PLN", // Poland
    RO: "RON", // Romania
    SE: "SEK", // Sweden

    // Tanzania 🌍
    TZ: "TZS",
  };
  useEffect(() => {
    const mapped = jurisdiction ? countryCurrencyMap[jurisdiction] : undefined;

    if (mapped) {
      if (!currency || currency === autoSetCurrencyRef.current) {
        setValue("currency", mapped, {
          shouldValidate: true,
          shouldDirty: true,
        });
        autoSetCurrencyRef.current = mapped;
      }
    } else {
      autoSetCurrencyRef.current = null;
    }
  }, [jurisdiction, currency, setValue]);

  useEffect(() => {
    if (spv) {
      const timer = setTimeout(() => {
        if (spv.type) {
          setValue("type", spv.type, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
        if (spv.jurisdiction) {
          setValue("jurisdiction", spv.jurisdiction, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [spv, setValue]);
  return [
    {
      label: "SPV/LLC Name",
      name: `name`,
      type: "text",
      control,
      rules: {
        required: "SPV/LLC Name is required",
        minLength: {
          value: 3,
          message: "SPV/LLC Name must be at least 3 characters",
        },
        maxLength: {
          value: 50,
          message: "SPV/LLC Name must be at most 50 characters",
        },
        pattern: {
          value: /^[A-Za-z\s]+$/,
          message: "SPV name must contain only alphabets and spaces",
        },
      },
    },
    {
      label: "SPV Type",
      name: `type`,
      type: "select",
      control,
      rules: { required: "SPV Type is required" },
      options: SPV_TYPES,
      defaultValue: spv?.type,
    },

    {
      label: "Jurisdiction",
      name: `jurisdiction`,
      type: "select",
      control,
      options: COUNTRIES,
      rules: { required: "Jurisdiction is required" },
      defaultValue: spv?.jurisdiction,
    },

    {
      label: "Currency",
      name: `currency`,
      type: "select",
      control,
      options: CURRENCY_OPTIONS,
      rules: { required: "Currency is required" },
      disabled: true,
      defaultValue: spv?.currency,
    },

    {
      label: "Formation Date",
      name: "formationDate",
      type: "date",
      control,
      rules: { required: "Formation Date is required" },
      allowFutureDates: false,
    },

    {
      label: "Business Purpose",
      name: "businessPurpose",
      type: "textarea",
      control,
      rules: {
        required: "Business Purpose is required",
        validate: (value: string) =>
          value.trim().split(/\s+/).length < 5
            ? "Please write a more detailed business purpose"
            : true,
      },
      fullWidth: true,
    },
  ];
};
