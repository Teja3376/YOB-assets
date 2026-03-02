"use client";

import PropertyDetails from "../../ui/overview/PropertyDetails";
import PropertyValue from "../../ui/overview/PropertyValue";
import Investment from "../../ui/overview/Investment";
import QuickStats from "../../ui/overview/QuickStats";
import KeyPerformance from "../../ui/overview/KeyPerformance";
import RentalIncome from "../../ui/overview/RentalIncome";
import InvestorActivity from "../../ui/overview/InvestorActivity";

const SpvOverviewPage = () => {
  return (
    <div className="mt-5">
      <div className="grid grid-cols-6 gap-3 items-stretch">
        {/* Row 1 */}
        <div className="col-span-4 ">
          <PropertyDetails />
        </div>

        <div className="col-span-2 space-y-5  flex flex-col">
          <PropertyValue />
          <Investment />
          <KeyPerformance />
        </div>

        <div className="col-span-3">
          <RentalIncome />
        </div>
        <div className="col-span-3">
          <InvestorActivity />
        </div>
      </div>
    </div>
  );
};

export default SpvOverviewPage;
