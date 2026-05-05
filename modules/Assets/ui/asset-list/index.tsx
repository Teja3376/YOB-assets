import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import TableComponent from "@/common/TableComponent";
import Pagination from "@/common/Pagination";
import queryString from "query-string";
// import { useAssetApi } from "@/hooks/asset/useAssetApi";
import AddAssetDialog from "./AddAssetDialog";
import UpdateAssetStatusDialog from "./UpdateAssetStatusDIalog";
import getColumns from "./columns";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { AssetTable } from "./assetTable";
import CustomTabs from "@/components/ui/custom-tab";
import { set } from "lodash";
// import { useAssetList } from "@/modules/Assets/hooks/useAssetList";
import { mockAssets } from "@/modules/Assets/mock/assetList"; // Hidden - using API data instead
import { useAssetList } from "../../hooks/useAssetList";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import useSendApproval from "../../hooks/asset-list/useSendApproval";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import SendAssetDialog from "./SendAssetApprovalDialog";
import SendAssetApprovalDialog from "./SendAssetApprovalDialog";
import useActivateAsset from "../../hooks/asset-list/useActivateAsset";
import { ListingFeeDialog } from "../ListingFeeAlert";
import { PaymentDialog } from "@/modules/PaymentRequest/ui/PaymentTypeDialog";
import { getLocalItem, setLocalItem } from "@/lib/localStorage";
import { ASSET_CLASS_TABS } from "../../utils/global";
import clsx from "clsx";

const Index: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [assetId, setAssetId] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const queryParams = queryString.parse(searchParams.toString());
  const activeClass = getLocalItem("activeClassTab") || "real-estate";
  const activeTab = getLocalItem("activeAssetTab") || "active";
  const assetClass =
    activeClass || (queryParams?.class as string) || "real-estate";
  const assetStatus =
    activeTab || (queryParams?.status as string) || "approved";
  const currentPage = Number(queryParams?.page) || 1;
  const limit = Number(queryParams?.limit) || 10;

  const [isActiveDialog, setIsActiveDialog] = useState<boolean>(false);
  const [selectedDraft, setSelectedDraft] = useState<any | null>(null);
  const [isListingFeeOpen, setIsListingFeeOpen] = useState<boolean>(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);

  const { mutate: sendApproval, isPending: isSending } = useSendApproval();
  const {
    mutate: activateAsset,
    isPending: isActivating,
    isError,
    error,
  } = useActivateAsset();

  const searchTerm = useDebounce(search, 500);
  const PAGE_SIZE_OPTIONS = [5, 10, 25];

  const { data: assetList, isFetching: isLoading } = useAssetList({
    status: assetStatus,
    page: currentPage,
    limit: limit,
    search: searchTerm,
    assetClass: assetClass,
  });
  const columns = getColumns(
    setAssetId,
    setIsListingFeeOpen,
    setSelectedDraft,
    assetStatus,
    assetClass,
  );

  const onPageChange = (page: number) => {
    router.push(
      `${pathname}?class=${assetClass}&status=${assetStatus}&page=${page}&limit=${limit}`,
    );
  };

  const onPageSizeChange = (pageSize: number) => {
    router.push(
      `${pathname}?class=${assetClass}&status=${assetStatus}&page=1&limit=${pageSize}`,
    );
  };

  const updateStatus = async (updateAssetId: string, newStatus: string) => {
    activateAsset(
      { assetId: updateAssetId, status: newStatus },
      {
        onSuccess: () => {
          toast.success("Asset status updated successfully");
          setAssetId(null);
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

  const handleSendStatus = (assetId: string, message?: string) => {
    sendApproval(
      {
        assetId,
        sendApprovalData: { status: "pending", issuerComments: message || "" },
      },
      {
        onSuccess: () => {
          setSelectedDraft(null);
          toast.success("Asset sent for approval successfully");
        },
        onError: (error: any) => {
          console.error("Error sending asset for approval:", error);
          toast.error(
            error?.response?.data?.message ||
              "Failed to send asset for approval",
          );
        },
      },
    );
  };

  const handleTabChange = (tabId: string) => {
    setLocalItem("activeAssetTab", tabId);
    router.push(
      `${pathname}?class=${assetClass}&status=${tabId}&page=1&limit=${limit}`,
    );
  };

  const handleClassChange = (classId: string) => {
    setLocalItem("activeClassTab", classId);
    router.push(
      `${pathname}?class=${classId}&status=${assetStatus}&page=1&limit=${limit}`,
    );
  };

  const tabs = [
    {
      id: "active",
      title: "Active",
      component: (
        <AssetTable
          columns={columns}
          assetList={assetList?.data || []}
          isLoading={isLoading}
        />
      ),
    },
    {
      id: "approved",
      title: "Approved",
      component: (
        <AssetTable
          columns={columns}
          assetList={assetList?.data || []}
          isLoading={isLoading}
        />
      ),
    },
    {
      id: "pending",
      title: "Pending",
      component: (
        <AssetTable
          columns={columns}
          assetList={assetList?.data || []}
          hideDraftFields
          isLoading={isLoading}
        />
      ),
    },
    {
      id: "draft",
      title: "Drafts",
      component: (
        <AssetTable
          columns={columns}
          assetList={assetList?.data || []}
          hideDraftFields
          isLoading={isLoading}
        />
      ),
    },
    {
      id: "rejected",
      title: "Rejected",
      component: (
        <AssetTable
          columns={columns}
          assetList={assetList?.data || []}
          hideDraftFields
          isLoading={isLoading}
        />
      ),
    },
    {
      id: "fully-funded",
      title: "Fully Funded",
      component: (
        <AssetTable
          columns={columns}
          assetList={assetList?.data || []}
          hideDraftFields
          isLoading={isLoading}
        />
      ),
    },
    {
      id: "waitlist",
      title: "Waitlist",
      component: (
        <AssetTable
          columns={columns}
          assetList={assetList?.data || []}
          hideDraftFields
          isLoading={isLoading}
        />
      ),
    },
    {
      id: "listing-ended",
      title: "Listing Ended",
      component: (
        <AssetTable
          columns={columns}
          assetList={assetList?.data || []}
          hideDraftFields
          isLoading={isLoading}
        />
      ),
    },
  ];

  return (
    <div className="p-2 space-y-3">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-black">Assets List </h1>
        <div className="flex items-center gap-2">
          <Input
            type="search"
            placeholder="Search assets..."
            value={search || ""}
            onChange={(e) => setSearch(e.target.value)}
            className="w-50 h-10"
          />

          <Button type="button" onClick={() => setOpen(true)}>
            + Add Asset
          </Button>
        </div>
      </div>
      <AddAssetDialog open={open} setOpen={setOpen} />
      <UpdateAssetStatusDialog
        assetId={assetId}
        open={isActiveDialog}
        setOpen={setIsActiveDialog}
        isLoading={isActivating}
        updateStatus={updateStatus}
        isError={isError}
        error={error?.message as any}
      />
      <div className="flex items-center gap-2">
        {ASSET_CLASS_TABS.map((tab) => (
          <button
            key={tab.id}
            // variant={assetClass === tab.id ? "default" : "outline"}
            className={clsx(
              tab.id === assetClass
                ? "bg-primary/10 text-primary border-primary"
                : "bg-gray-300/10 text-gray-600 hover:bg-gray-200 border-gray-300",
              "flex items-center gap-3 border rounded-md px-6  py-5 font-medium cursor-pointer transition-all duration-200 text-sm",
              " w-50 h-17",
            )}
            onClick={() => handleClassChange(tab.id)}
          >
            <div
              className={clsx(
                "flex items-center justify-center rounded-full p-2",
                tab.id === assetClass ? "bg-primary/20" : "bg-gray-300/20",
              )}
            >
              {tab.icon && <tab.icon size={22} />}
            </div>{" "}
            {tab.title}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        <CustomTabs
          tabs={tabs}
          defaultTab={assetStatus}
          aria-label="Asset information tabs"
          handleTabChange={handleTabChange}
        />
        {assetList?.pagination && (
          <Pagination
            {...assetList?.pagination}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        )}
      </div>
      <SendAssetApprovalDialog
        open={!!selectedDraft}
        onClose={() => setSelectedDraft(null)}
        assetId={selectedDraft?._id}
        assetName={selectedDraft?.name}
        isSending={isSending}
        onSend={(id, message) => handleSendStatus(id as string, message)}
      />
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
          setIsActiveDialog(true);
        }}
        id={`listing-fee-${assetId}`}
        onCancel={() => setIsPaymentOpen(false)}
      />
    </div>
  );
};

export default Index;
