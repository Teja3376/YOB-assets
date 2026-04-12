"use client";
import { useGetOverview } from "@/modules/Assets/hooks/assetDashBoard/useGetOverview";
import { useParams } from "next/navigation";
import PropertyDetails from "../../ui/overview/PropertyDetails";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import PropertyValue from "../../ui/overview/PropertyValue";
import Investment from "../../ui/overview/Investment";
import Investors from "../../ui/overview/Investors";
import KeyPerformance from "../../ui/overview/KeyPerformance";
import TokenInfo from "../../ui/overview/TokenInfo";
import AssetHostedBy from "../../ui/overview/AssetHostedBy";
import SoftcapIssuerNotification from "../../ui/overview/SoftcapIssuerNotification";
import { sanitizeHostedByAbout } from "@/modules/Assets/utils/assetOverview";

const AssetOverviewPage = () => {
  const { assetid } = useParams();
  const {
    data: assetOverview,
    isFetching,
    refetch,
  } = useGetOverview(assetid as string);

  if (isFetching && !assetOverview) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mt-5">
      <div className="grid grid-cols-5 gap-3 items-stretch">
        <SoftcapIssuerNotification
          assetId={assetid as string}
          notification={assetOverview?.data?.softcapNotification}
          currency={assetOverview?.data?.currency}
          onAfterDecision={() => refetch()}
        />
        <div className="col-span-3 space-y-3">
          <PropertyDetails
            name={assetOverview?.data?.assetName}
            about={assetOverview?.data?.about}
            location={assetOverview?.data?.location}
            gallery={assetOverview?.data?.gallery}
          />
          <TokenInfo
            tokenPrice={assetOverview?.data?.tokenInfo?.tokenPrice}
            tokenSymbol={assetOverview?.data?.tokenInfo?.tokenSymbol}
            availableTokens={assetOverview?.data?.tokenInfo?.availableTokens}
            totalTokens={assetOverview?.data?.tokenInfo?.tokenSupply}
            currency={assetOverview?.data?.currency}
          />
        </div>
        <div className="col-span-2 space-y-2">
          <Investment
            totalRaised={assetOverview?.data?.investmentStats?.totalRaised}
            fundingTarget={
              assetOverview?.data?.property?.totalPropertyValueAfterFees
            }
            currency={assetOverview?.data?.currency}
            fundingProgress={
              assetOverview?.data?.investmentStats?.fundingProgress
            }
          />
          <PropertyValue
            currentValue={assetOverview?.data?.property?.valuation}
            appreciation={assetOverview?.data?.performance?.appreciation}
            currency={assetOverview?.data?.currency}
          />
          <Investors
            totalInvestors={assetOverview?.data?.investmentStats?.investors}
            avgInvestment={assetOverview?.data?.investmentStats?.avgInvestment}
            annualRentalYield={
              assetOverview?.data?.performance?.grossRentalYield
            }
            currency={assetOverview?.data?.currency}
          />
          <KeyPerformance
            irr={assetOverview?.data?.performance?.irr}
            occupancy={assetOverview?.data?.rental?.vacancy}
            grossMonthlyRentalIncome={assetOverview?.data?.rental?.grossMonthly}
            netMonthlyRentalIncome={assetOverview?.data?.rental?.netMonthly}
            currency={assetOverview?.data?.currency}
          />{" "}
        </div>
        <div className="col-span-full">
          <AssetHostedBy
            name={assetOverview?.data?.assetHostedBy?.name}
            description={sanitizeHostedByAbout(
              assetOverview?.data?.assetHostedBy?.about,
            )}
            logo={assetOverview?.data?.assetHostedBy?.logo}
            url={assetOverview?.data?.assetHostedBy?.website}
            address={assetOverview?.data?.assetHostedBy?.address}
            email={assetOverview?.data?.assetHostedBy?.email}
            phone={assetOverview?.data?.assetHostedBy?.phone}
          />
        </div>
        {/* <div className="col-span-3">
          <Dao dao={assetOverview?.data?.spv?.dao} />
        </div> */}
      </div>
    </div>
  );
};

export default AssetOverviewPage;
