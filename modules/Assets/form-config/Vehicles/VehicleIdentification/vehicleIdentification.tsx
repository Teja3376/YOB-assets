import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import {
  ASSET_STYLE,
  INSTRUMENT_TYPE,
  VEHICLE_BODY_STYLE,
} from "@/modules/Assets/utils/global";
import { useFormContext } from "react-hook-form";
import { COUNTRY_OPTIONS, CURRENCY_OPTIONS } from "@/helpers/global";

import { useParams } from "next/navigation";
import useLocations from "@/hooks/useLocations";
import { max } from "lodash";

interface Asset {
  country?: string;
  state?: string;
  city?: string;
  metadata?: {
    places?: Record<string, string>;
  };
  company?: {
    currency?: string;
    jurisdiction?: string;
  };
  currency?: string;
}

export const vehicleIdentification = ({
  asset,
}: {
  asset: Asset;
}): FormFieldConfig[] => {
  const param = useParams();
  const disable = !!param.id;

  const { control, setValue, watch } = useFormContext();

  //   const selectedCountry = watch("country");
  //   const selectedState = watch("state");

  //   const { countries, useStates, useCities } = useLocations();

  //   const { data: states = [] } = useStates(selectedCountry);
  //   const { data: cities = [] } = useCities(selectedCountry, selectedState);

  //   const country = asset?.country ?? "";
  //   const state = asset?.state ?? "";
  //   const city = asset?.city ?? "";
  //   const places = asset?.metadata?.places ?? {};

  //   const defaultState = {
  //     value: state,
  //     label: places?.[state] ?? state,
  //   };

  //   const defaultCountry = {
  //     value: country,
  //     label: places?.[country] ?? country,
  //   };

  return [
    {
      type: "text",
      name: "brand",
      control,
      label: "Brand",
      rules: { required: "Brand is required" },
      disabled: disable,
    },
    {
      type: "text",
      name: "model",
      control,
      label: "Model",
      rules: { required: "Model is required" },
      disabled: disable,
    },
    {
      type: "text",
      name: "trim",
      control,
      label: "Trim/Version",
      rules: { required: "Trim/Version is required" },
      disabled: disable,
    },

    {
      type: "select",
      name: "bodyType",
      control,
      label: "Body Type",
      options: VEHICLE_BODY_STYLE,
      rules: { required: "Body type is required" },
      disabled: disable,
    },
    {
      type: "text",
      name: "year",
      control,
      label: "Year",
      rules: { required: "Year is required" },
      disabled: disable,
    },
    {
      type: "text",
      name: "vin",
      control,
      label: "VIN Number",
      placeholder: "17 Character VIN",
      rules: {
        required: "VIN is required",
        maxLength: { value: 17, message: "VIN must be 17 characters" },
        minLength: { value: 17, message: "VIN must be 17 characters" },
      },
      disabled: disable,
    },
    {
      type: "text",
      name: "odometer",
      control,
      label: "Odometer(KM)",
      rules: { required: "Odometer is required" },
      disabled: disable,
    },
    {
      type: "text",
      name: "exteriorColor",
      control,
      label: "Exterior Color",
      rules: { required: "Exterior color is required" },
      disabled: disable,
    },
    {
      type: "text",
      name: "interiorColor",
      control,
      label: "Interior Color",
      rules: { required: "Interior color is required" },
      disabled: disable,
    },

    {
      type: "textarea",
      name: "about",
      control,
      label: "Car  Description",
      fullWidth: true,
      rules: { required: "Asset description is required" },
      disabled: disable,
    },
  ];
};
