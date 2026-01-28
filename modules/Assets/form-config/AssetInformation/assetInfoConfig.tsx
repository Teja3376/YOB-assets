import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import {
  ASSET_STYLE,
  INSTRUMENT_TYPE,
} from "@/modules/Assets/utils/global";
import { useFormContext } from "react-hook-form";
import { COUNTRY_OPTIONS, CURRENCY_OPTIONS } from "@/helpers/global";

import { useParams } from "next/navigation";
import useLocations from "@/hooks/useLocations";

interface Asset {
  country?: string;
  state?: string;
  city?: string;
  metadata?: {
    places?: Record<string, string>;
  };
  company?: {
    currency?: string;
  };
  currency?: string;
}

export const assetInfoConfig = ({ asset }: { asset: Asset }): FormFieldConfig[] => {
  const param = useParams();
  const disable = !!param.id;

  const { control, setValue, watch } = useFormContext();

  const selectedCountry = watch("country");
  const selectedState = watch("state");

  const { countries, useStates, useCities } = useLocations();

  const { data: states = [] } = useStates(selectedCountry);
  const { data: cities = [] } = useCities(selectedCountry, selectedState);

  const country = asset?.country ?? "";
  const state = asset?.state ?? "";
  const city = asset?.city ?? "";
  const places = asset?.metadata?.places ?? {};

  const defaultState = {
    value: state,
    label: places?.[state] ?? state,
  };

  const defaultCountry = {
    value: country,
    label: places?.[country] ?? country,
  };

  return [
    {
      type: "text",
      name: "name",
      control,
      label: "Asset Name",
      rules: { required: "Asset name is required" },
      disabled: disable,
    },

    {
      type: "select",
      name: "style",
      control,
      label: "Asset Style",
      options: ASSET_STYLE,
      rules: { required: "Asset style is required" },
      disabled: disable,
    },

    {
      type: "select",
      name: "currency",
      control,
      label: "Currency",
      options: CURRENCY_OPTIONS,
      defaultValue: asset?.company?.currency ?? "",
      rules: { required: "Currency is required" },
      disabled: true,
    },

    {
      type: "select",
      name: "instrumentType",
      control,
      label: "Instrument Type",
      options: INSTRUMENT_TYPE,
      rules: { required: "Instrument type is required" },
      disabled: disable,
    },
    

    {
      type: "select",
      name: "country",
      control,
      label: "Country",
options:
        COUNTRY_OPTIONS.length > 0
          ? COUNTRY_OPTIONS
          : country
          ? [defaultCountry]
          : [],      rules: { required: "Country is required" },

      onChange: async (value) => {
        setValue("country", value);
        setValue("state", "");
        setValue("city", "");
      },

      disabled: disable,
    },

    {
      type: "select",
      name: "state",
      control,
      label: "State",
      options: states.length ? states : state ? [defaultState] : [],
      disabled: !selectedCountry || disable,
      rules: { required: "State is required" },

      onChange: async (value) => {
        setValue("state", value);
        setValue("city", "");
      },
    },

    {
      type: "select",
      name: "city",
      control,
      label: "City",
      disabled: !selectedState || disable,
      options: cities.length ? cities : city ? [{ label: city, value: city }] : [],
      rules: { required: "City is required" },
    },

    {
      type: "text",
      name: "landmark",
      control,
      label: "Landmark",
      rules: { required: "Landmark is required" },
      disabled: disable,
    },

    {
      type: "textarea",
      name: "about",
      control,
      label: "Asset Description",
      fullWidth: true,
      rules: { required: "Asset description is required" },
      disabled: disable,
    },
  ];
};

