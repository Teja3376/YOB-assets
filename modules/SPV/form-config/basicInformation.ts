import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import { COUNTRIES, CURRENCY_OPTIONS } from "@/constants/global";
import { SPV_TYPES } from "@/modules/SPV/utils/global";
import { useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useParams } from "next/navigation";

export const basicInformationFormConfig = ({ spv }: { spv: any }): FormFieldConfig[] => {
  const { control, setValue } = useFormContext<any>();
  const params = useParams<{ id?: string; spvId?: string }>();
  const id = params?.spvId ?? params?.id;
  const jurisdiction = useWatch({ control, name: "jurisdiction" });
  const currency = useWatch({ control, name: "currency" });

  const autoSetCurrencyRef = useRef<string | null>(null);
  // console.log("spv in form config", spv);


  const countryCurrencyMap: Record<string, string> = {
    IN: "INR",
    AE: "AED",
    QA: "QAR",
    US: "USD",
    GB: "GBP",
    IT: "EUR",
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
          value: /^[a-zA-Z0-9\s\-&,.'()]+$/,
          message: "SPV/LLC Name contains invalid characters",
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
