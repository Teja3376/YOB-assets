import { useMemo } from "react";
import { SPV_TYPES } from "./global";
import { COUNTRIES } from "@/constants/global";

const normalizedSpv = (spv: any) => {
    if (!spv) return {};
    const type = spv.type?.trim();
    const jurisdiction = spv.jurisdiction?.trim();

    return {
      ...spv,
      type: type
        ? SPV_TYPES.find(
            (t) =>
              t.value === type ||
              t.label === type ||
              t.value.toLowerCase() === type.toLowerCase() ||
              t.label.toLowerCase() === type.toLowerCase()
          )?.value || type
        : "",
      jurisdiction: jurisdiction
        ? COUNTRIES.find(
            (c: any) =>
              c.value === jurisdiction ||
              c.label === jurisdiction ||
              c.value.toLowerCase() === jurisdiction.toLowerCase() ||
              c.label.toLowerCase() === jurisdiction.toLowerCase()
          )?.value || jurisdiction
        : "",
    };
  };

export default normalizedSpv;