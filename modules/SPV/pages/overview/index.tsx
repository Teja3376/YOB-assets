"use client";
import { useParams } from "next/navigation";

import PropertyDetails from "../../ui/overview/PropertyDetails";
import PropertyValue from "../../ui/overview/PropertyValue";
import Investment from "../../ui/overview/Investment";
import KeyPerformance from "../../ui/overview/KeyPerformance";
import RentalIncome from "../../ui/overview/RentalIncome";
import InvestorActivity from "../../ui/overview/InvestorActivity";
import useGetSpvOverview from "../../hooks/ReactQuery/useGetSpvOverview";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const SpvOverviewPage = () => {
  const { spvId } = useParams<{ spvId: string }>();
  const { data: spvOverview, isFetching } = useGetSpvOverview(spvId);
  console.log("SPV Overview Data:", spvOverview);
  if (isFetching && !spvOverview) {
    return <LoadingSpinner />;
  }
  return (
    <div className="mt-5">
      <div className="grid grid-cols-6 gap-3 items-stretch">
        {/* Row 1 */}
        <div className="col-span-4 ">
          <PropertyDetails
            name={spvOverview?.asset?.name}
            about={spvOverview?.asset?.about}
            location={spvOverview?.asset?.location}
            gallery={spvOverview?.asset?.gallery}
            category={spvOverview?.asset?.category}
            size={spvOverview?.asset?.totalNumberOfSfts}
            occupancy={spvOverview?.asset?.vacancyRate}
            grossRentalYield={spvOverview?.asset?.grossRentalYield}
            irr={spvOverview?.asset?.irr}
          />
        </div>

        <div className="col-span-2 space-y-5  flex flex-col">
          <PropertyValue
            currentValue={spvOverview?.asset?.propertyValue.latestPropertyValue}
            appreciation={spvOverview?.asset?.propertyValue?.appreciation}
            currency={spvOverview?.asset?.currency}
          />
          <Investment
            fundingTarget={spvOverview?.funding?.fundingTarget}
            fundingProgress={spvOverview?.funding?.fundingProgress}
            totalRaised={spvOverview?.funding?.totalRaised}
            currency={spvOverview?.asset?.currency}
          />
          <KeyPerformance
            expenses={spvOverview?.asset?.expenses}
            occupancy={spvOverview?.asset?.vacancyRate}
            irr={spvOverview?.asset?.irr}
            grossMonthlyRentalIncome={spvOverview?.asset?.grossMonthlyRent}
            netMonthlyRentalIncome={spvOverview?.asset?.netMonthlyRent}
            currency={spvOverview?.asset?.currency}
          />
        </div>

        <div className="col-span-3">
          <RentalIncome
            expenses={spvOverview?.asset?.expenses}
            grossMonthlyRentalIncome={spvOverview?.asset?.grossMonthlyRent}
            netMonthlyRentalIncome={spvOverview?.asset?.netMonthlyRent}
            assetName={spvOverview?.asset?.name}
            currency={spvOverview?.asset?.currency}
          />
        </div>
        <div className="col-span-3">
          <InvestorActivity
            investors={spvOverview?.investors}
            currency={spvOverview?.asset?.currency}
          />
        </div>
      </div>
    </div>
  );
};

export default SpvOverviewPage;
