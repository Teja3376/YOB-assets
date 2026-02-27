"use client";
import { useParams, useRouter } from "next/navigation";
import useGetOrderById from "../hooks/useGetOrderById";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import StatusBadge from "../ui/StatusBadge";
import { format } from "date-fns";
import InvestorCard from "../ui/InvestorCard";
import OrderValueCard from "../ui/OrderValueCard";
import InvestorOrderBreakdown from "../ui/InvestorOrderBreakdown";
import AssetOrderBreakdown from "../ui/AssetIOrderBreakdown";
import Conversion from "../ui/Conversion";
import { Asset } from "next/font/google";
import AssetDetails from "../ui/AssetDetails";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const router = useRouter();
  const { data: orderDetails, isFetching: orderLoading } = useGetOrderById(
    orderId as string,
  );
  console.log(orderDetails?.data);
  return (
    <div className="p-2 ">
      <Button
        variant="outline"
        className="border-0 shadow-none hover:underline rounded-full hover:bg-transparent text-muted-foreground p-0!"
        onClick={() => router.back()}
      >
        <ArrowLeft className="" /> Back
      </Button>
      {orderLoading && (
        <div className="p-4 flex items-center justify-center h-full">
          <LoadingSpinner />
        </div>
      )}
      {!orderLoading && orderDetails?.data && (
        <main className="space-y-2 flex gap-3">
          <div className="flex-2">
            <h1 className="text-2xl font-semibold">Order Details</h1>
            <p className="text-sm mt-2 text-muted-foreground">
              Order Id :{orderId}
            </p>
            <div className="mt-2 flex items-center">
              <h1 className="text-sm mr-2">Status :</h1>
              <StatusBadge status={orderDetails?.data?.status || "unknown"} />
            </div>
            <p className="text-xs mt-2 text-muted-foreground">
              Created At:{" "}
              {format(orderDetails?.data?.createdAt, "dd/MM/yyyy hh:mm a")}
            </p>
            <p className="text-xs mt-2 text-muted-foreground">
              Updated At:{" "}
              {format(orderDetails?.data?.updatedAt, "dd/MM/yyyy hh:mm a")}
            </p>

            <div className="grid grid-cols-2 mt-9 gap-3">
              <InvestorCard
                name={orderDetails?.data?.investor?.name}
                email={orderDetails?.data?.investor?.email}
                currency={orderDetails?.data?.conversion?.userCurrency}
                id={orderDetails?.data?.investor?.id}
              />
              <OrderValueCard
                assetCurrency={orderDetails?.data?.assetValue?.assetCurrency}
                tokenPurchased={orderDetails?.data?.assetValue?.tokens}
                orderValue={orderDetails?.data?.assetValue?.tokenValue}
                tokenPrice={orderDetails?.data?.assetValue?.tokenPrice}
              />
              <InvestorOrderBreakdown
                tokenValue={orderDetails?.data?.orderValue?.tokenValue}
                fees={orderDetails?.data?.fees}
                userCurrency={orderDetails?.data?.orderValue?.userCurrency}
                totalPaid={orderDetails?.data?.conversion?.userPaid}
              />
              <AssetOrderBreakdown
                tokenValue={orderDetails?.data?.assetValue?.tokenValue}
                fees={orderDetails?.data?.fees}
                assetCurrency={orderDetails?.data?.assetValue?.assetCurrency}
                totalOrderValue={orderDetails?.data?.conversion?.actualAmount}
              />
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <AssetDetails
              assetName={orderDetails?.data?.asset?.name}
              assetId={orderDetails?.data?.asset?.id}
              assetImage={orderDetails?.data?.asset?.image}
              assetCurrency={orderDetails?.data?.asset?.currency}
              spvName={orderDetails?.data?.spv?.name}
              spvCurrency={orderDetails?.data?.spv?.currency}
              spvId={orderDetails?.data?.spv?.id}
            />
            <Conversion
              totalPaidbyInvestor={orderDetails?.data?.conversion?.userPaid}
              assetCurrency={orderDetails?.data?.assetValue?.assetCurrency}
              userCurrency={orderDetails?.data?.orderValue?.userCurrency}
              actualAmount={orderDetails?.data?.conversion?.actualAmount}
            />
          </div>
        </main>
      )}
    </div>
  );
};

export default OrderDetailsPage;
