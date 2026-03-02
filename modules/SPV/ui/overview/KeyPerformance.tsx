import React from "react";

const KeyPerformance = () => {
  return (
    <div className=" rounded-md shadow-xs  border">
      <div className="bg-primary/10 px-4 py-3 rounded-t-md font-medium">
        <h1>Key Performance</h1>
      </div>
      <hr />
      <div className="">
        <div className="flex justify-between items-center p-5">
          <p>Montly Revenue</p>
          <p className="font-medium">Commercial</p>
        </div>
        <hr />
        <div className="flex justify-between items-center p-5 bg-gray-100">
          <p>Monthly Property Maintenance</p>
          <p className="font-medium">Commercial</p>
        </div>
        <hr />

        <div className="flex justify-between items-center p-5">
          <p>Net Operating Income</p>
          <p className="font-medium">Commercial</p>
        </div>
        <hr />
        <div className="flex justify-between items-center p-5 bg-gray-100">
          <p>Occupacy Rate</p>
          <p className="font-medium">Commercial</p>
        </div>

        <hr />
        <div className="flex justify-between items-center p-5">
          <p>IRR</p>
          <p className="font-medium">Commercial</p>
        </div>
      </div>
    </div>
  );
};

export default KeyPerformance;
