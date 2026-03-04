import React from "react";

interface QuickStatsProps {
  type: string;
  size: number;
  occupancy: number;
  grossRentalYield: number;
  irr: number;
}

const QuickStats = ({
  size,
  type,
  occupancy,
  grossRentalYield,
  irr,
}: QuickStatsProps) => {
  return (
    <div className="flex items-stretch gap-3  w-full mt-5">
      <div className=" rounded-md flex-[1.5] p-3 border flex flex-col shadow-xs">
        <h1 className="font-medium text-sm mb-3">Quick Stats</h1>
        <div className="bg-gray-100/80 flex items-center justify-between rounded-md py-2 px-3 border">
          <div className="flex flex-col justify-between items-start">
            <p className="text-sm">Type</p>
            <p className="font-medium capitalize">{type}</p>
          </div>
          <div className="flex flex-col justify-between items-start">
            <p className="text-sm">Size</p>
            <p className="font-medium">{size} sft</p>
          </div>
          <div className="flex flex-col justify-between items-start">
            <p className="text-sm">Occupancy</p>
            <p className="font-medium">{occupancy}%</p>
          </div>
        </div>
      </div>

      <div className=" rounded-md flex-1 border flex flex-col">
        <h1 className="font-medium text-sm  px-3 py-2">Financial</h1>
        <hr />
        <div className="px-3 py-2 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="text-xs">Gross Rental Yield</p>
            <p className="text-sm font-medium">{grossRentalYield}%</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs">IRR</p>
            <p className="text-sm font-medium">{irr?.toFixed(2) || 0}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
