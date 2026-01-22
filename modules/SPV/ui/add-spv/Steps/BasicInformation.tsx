"use client";

import React from "react";
import { Building2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

import FormGenerator from "@/components/use-form/FormGenerator";
import { useFormConfig } from "@/modules/SPV/form-config/basicInformation";

interface BasicInformationProps {
  spv?: any;
}

const BasicInformation: React.FC<BasicInformationProps> = ({ spv }) => {
  const { control } = useFormContext<any>();

  console.log(
    "SPV data in Basic Information page",
    spv ? spv : "N/A"
  );

  return (
    <div className="p-4 rounded-lg">
      <div className="flex items-center gap-2">
        <Building2 />
        <h1 className="text-2xl font-bold">Basic Information</h1>
      </div>

      <span className="text-sm text-gray-500">
        Enter the basic information for the SPV or LLC
      </span>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <BasicInfo spv={spv} />
      </div>
    </div>
  );
};

const BasicInfo = ({ spv }: { spv: any }) => {
  const config = useFormConfig({ spv });
  return <>{FormGenerator(config)}</>;
};

export default BasicInformation;
