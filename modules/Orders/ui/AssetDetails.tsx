import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const AssetDetails = ({
  assetName,
  assetImage,
  assetCurrency,
  assetId,
  spvName,
  spvCurrency,
  spvId,
}: {
  spvName: string;
  spvCurrency: string;
  spvId: string;
  assetName: string;
  assetImage: string;
  assetCurrency: string;
  assetId: string;
}) => {
  const router = useRouter();
  return (
    <div className="border rounded-md px-4 py-3">
      <h1 className="text-md font-medium">Asset Details </h1>
      <div className="flex items-center my-3 gap-2 ">
        {assetImage && (
          <div className="relative w-15 h-15">
            <Image
              src={assetImage}
              alt={assetName || "asset image"}
              className="absolute rounded-full mr-2"
              fill
            />
          </div>
        )}
        <div className="space-y-1">
          <div className="flex items-center group hover:cursor-pointer">
            <p className="text-md font-medium group-hover:underline">
              {assetName}{" "}
            </p>
            <div className="ml-2">
              <ArrowUpRight size={12} />
            </div>
          </div>
          <p className="text-xs ">
            Asset Id : <span className="font-medium">{assetId}</span>{" "}
          </p>
          <p className="text-xs text-muted-foreground">
            {" "}
            Asset Currency :{" "}
            <span className="font-medium">{assetCurrency}</span>
          </p>
        </div>
      </div>
      <hr />
      <h1 className="text-md font-medium mt-3">SPV Details </h1>
      <div className="flex items-center my-3 gap-2 ">
        <div className="w-15 h-15 rounded-full bg-primary/10 border-primary border text-primary flex items-center justify-center text-xl">
          {spvName?.[0]}
        </div>
        <div className="space-y-1">
          <div className="flex items-center group hover:cursor-pointer">
            <p className="text-md font-medium group-hover:underline">
              {spvName}{" "}
            </p>
            <div className="ml-2">
              <ArrowUpRight size={12} />
            </div>
          </div>{" "}
          <p className="text-xs ">
            SPV Id : <span className="font-medium">{spvId}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssetDetails;
