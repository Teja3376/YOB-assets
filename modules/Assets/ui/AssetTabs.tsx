"use client";
import { Button } from "@/components/ui/button";
import { useParams, usePathname, useRouter } from "next/navigation";
import useGetAssetBasic from "../hooks/assetDashBoard/useGetAssetBasic";
import { format } from "date-fns";
import Loading from "@/components/ui/Loading";
import SendAssetApprovalDialog from "./asset-list/SendAssetApprovalDialog";
import { ListingFeeDialog } from "./ListingFeeAlert";
import { useState } from "react";
import useActivateAsset from "../hooks/asset-list/useActivateAsset";
import { toast } from "sonner";
import { PaymentDialog } from "@/modules/PaymentRequest/ui/PaymentTypeDialog";
import UpdateAssetStatusDialog from "./asset-list/UpdateAssetStatusDIalog";
import { PaymentSuccessDialog } from "@/modules/PaymentRequest/ui/SuccessDialog";
import { PaymentFailedDialog } from "@/modules/PaymentRequest/ui/FailedDialog";

const tabs = [
  {
    title: "Overview",
    href: "overview",
  },
  {
    title: "Investors",
    href: "investors",
  },
  {
    title: "Orders",
    href: "orders",
  },
];

const AssetTabs = () => {
  const pathname = usePathname();
  const { assetid } = useParams();
  const router = useRouter();
  const [isActiveDialog, setIsActiveDialog] = useState<boolean>(false);
  const [selectedDraft, setSelectedDraft] = useState<any | null>(null);
  const [isListingFeeOpen, setIsListingFeeOpen] = useState<boolean>(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false);
  const [isFailureOpen, setIsFailureOpen] = useState<boolean>(false);
  const { data: assetName, isFetching } = useGetAssetBasic(assetid as string);
  const {
    mutate: activateAsset,
    isPending: isActivating,
    isError,
    error,
  } = useActivateAsset();

  

  const updateStatus = async (assetId: string, newStatus: string) => {
    activateAsset(
      { assetId, status: newStatus },
      {
        onSuccess: () => {
          toast.success("Asset status updated successfully");
          setIsActiveDialog(false);
        },
        onError: (error: any) => {
          console.error("Error updating asset status:", error);
          toast.error(
            error?.response?.data?.message || "Failed to update asset status",
          );
        },
      },
    );
  };

  if (isFetching) {
    return <Loading />;
  }
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">{assetName?.data?.name}</h1>
          <p className="text-sm text-muted-foreground">
            Created At : {format(assetName?.data?.createdAt, "dd/MM/yyyy")}
          </p>
        </div>
        {assetName?.data?.status === "approved" && (
          <Button onClick={() => setIsListingFeeOpen(true)}>
            Activate this asset
          </Button>
        )}
      </div>

      <div className="flex gap-2 items-center my-2">
        {tabs.map((tab) => {
          return (
            <Button
              key={tab.href}
              variant={pathname.includes(tab.href) ? "default" : "ghost"}
              onClick={() => router.push(`/assets/${assetid}/${tab.href}`)}
            >
              {tab.title}
            </Button>
          );
        })}
      </div>

      <ListingFeeDialog
        open={isListingFeeOpen}
        onOpenChange={setIsListingFeeOpen}
        fee={5000}
        onProceed={() => {
          setIsListingFeeOpen(false);
          setIsPaymentOpen(true);
        }}
      />
      <PaymentDialog
        open={isPaymentOpen}
        onOpenChange={setIsPaymentOpen}
        price={5000}
        onPay={() => {
          setIsPaymentOpen(false);
          setIsSuccessOpen(true);
        }}
        id={`listing-fee-${assetid}`}
        onCancel={() => {
          setIsPaymentOpen(false);
          setIsFailureOpen(true);
        }}
      />
      <UpdateAssetStatusDialog
        assetId={assetid as string}
        open={isActiveDialog}
        setOpen={setIsActiveDialog}
        isLoading={isActivating}
        updateStatus={updateStatus}
        isError={isError}
        error={error?.response?.data?.message as any}
      />
      <PaymentSuccessDialog
        open={isSuccessOpen}
        onOpenChange={setIsSuccessOpen}
        amount={5000}
        onDone={() => {
          setIsActiveDialog(true);
          setIsSuccessOpen(false);
        }}
      />
      <PaymentFailedDialog
        open={isFailureOpen}
        onOpenChange={setIsFailureOpen}
      />
    </div>
  );
};

export default AssetTabs;
