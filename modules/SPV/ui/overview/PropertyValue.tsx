import { Building2 } from "lucide-react";
import React from "react";

const PropertyValue = () => {
  return (
    <div className="rounded-md shadow-xs p-5 border space-y-2">
      <p className="text-sm flex items-center gap-2 ">
        <span>
          <Building2 size={15} />
        </span>
        Property Value
      </p>
      <h1 className="font-semibold text-lg">Value</h1>
      <p className="text-green-400 text-sm">+0.00% appraisal</p>
    </div>
  );
};

export default PropertyValue;
