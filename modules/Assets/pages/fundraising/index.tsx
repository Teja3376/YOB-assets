"use client";

import { useParams } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useGetOverview } from "@/modules/Assets/hooks/assetDashBoard/useGetOverview";
import useGetAssetById from "@/modules/Assets/hooks/useGetAssetById";
import FundraisingPanel from "@/modules/Assets/ui/fundraising/FundraisingPanel";

const FundraisingPage = () => {
  const { assetid } = useParams();
  const id = assetid as string;

  const {
    data: overviewRes,
    isFetching: isOverviewFetching,
    refetch: refetchOverview,
  } = useGetOverview(id);

  const {
    data: asset,
    isPending: isAssetPending,
    refetch: refetchAsset,
  } = useGetAssetById(id);

  const loading = (isOverviewFetching && !overviewRes) || (isAssetPending && !asset);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mt-5">
      <FundraisingPanel
        assetId={id}
        currency={overviewRes?.data?.currency}
        softcapNotification={overviewRes?.data?.softcapNotification}
        asset={asset}
        onAfterUpdate={() => {
          void refetchOverview();
          void refetchAsset();
        }}
      />
    </div>
  );
};

export default FundraisingPage;
