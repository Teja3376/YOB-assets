import React from "react";

const QuickStats = () => {
  return (
    <div className="flex items-stretch gap-3  w-full mt-5">
      <div className=" rounded-md flex-[1.5] p-3 border flex flex-col shadow-xs">
        <h1 className="font-medium text-sm mb-3">Quick Stats</h1>
        <div className="bg-gray-100/80 flex items-center justify-between rounded-md py-2 px-3 border">
          <div className="flex flex-col justify-between items-start">
            <p className="text-sm">Type</p>
            <p className="font-medium">Commercial</p>
          </div>
          <div className="flex flex-col justify-between items-start">
            <p className="text-sm">Size</p>
            <p className="font-medium">Active</p>
          </div>
          <div className="flex flex-col justify-between items-start">
            <p className="text-sm">Occupancy</p>
            <p className="font-medium">Commercial</p>
          </div>
        </div>
      </div>

      <div className=" rounded-md flex-1 border flex flex-col">
        <h1 className="font-medium text-sm  px-3 py-2">Financial</h1>
        <hr />
        <div className="px-3 py-2 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="text-xs">Gross Rental Yield</p>
            <p className="text-sm font-medium">Commercial</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs">IRR</p>
            <p className="text-sm font-medium">0.00%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
