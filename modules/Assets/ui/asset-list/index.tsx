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

const Index: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [asset, setAsset] = useState<any>(null);
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const queryParams = queryString.parse(searchParams.toString());
  const assetStatus = (queryParams?.status as string) || "active";
  const currentPage = Number(queryParams?.page) || 1;
  const limit = Number(queryParams?.limit) || 10;
  const [newStatus, setNewStatus] = useState<
    "active" | "draft" | "pending" | ""
  >("");
  const [statusUpdate, setStatusUpdate] = useState<
    "active" | "draft" | "pending" | ""
  >("");
  const [selectedDraft, setSelectedDraft] = useState<any | null>(null);

  const { mutate: sendApproval, isPending: isSending } = useSendApproval();

  const searchTerm = useDebounce(search, 500);
  const PAGE_SIZE_OPTIONS = [5, 10, 25];
  //   const {
  //     assetList,
  //     pagination,
  //     getAssetList,
  //     updateAssetStatus,
  //     statusUpdate,
  //     setStatusUpdate,
  //     status,
  // //   } = useAssetApi();
  // const assetList = mockAssets;
  const { data: assetList, isLoading } = useAssetList({
    status: assetStatus,
    page: currentPage,
    limit: limit,
  });
  const columns = getColumns(setAsset, setNewStatus, setSelectedDraft);

  const onPageChange = (page: number) => {
    router.push(
      `${pathname}?status=${assetStatus}&page=${page}&limit=${limit}`,
    );
  };

  const onPageSizeChange = (pageSize: number) => {
    router.push(`${pathname}?status=${assetStatus}&page=1&limit=${pageSize}`);
  };

  //   useEffect(() => {
  //     getAssetList({
  //       page,
  //       limit,
  //       search: searchTerm,
  //       status: assetStatus === "draft" ? "inactive" : assetStatus ?? undefined,
  //     });
  //   }, [page, limit, searchTerm, assetStatus]);

  const updateStatus = async (newStatus: string) => {
    // if (asset) {
    //   await updateAssetStatus(asset._id, newStatus);
    // }
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
    router.push(`${pathname}?status=${tabId}&page=1&limit=${limit}`);
  };

  const tabs = [
    {
      id: "active",
      title: "Active",
      component: (
        <AssetTable columns={columns} assetList={assetList?.data || []} />
      ),
    },
    {
      id: "approved",
      title: "Approved",
      component: (
        <AssetTable columns={columns} assetList={assetList?.data || []} />
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
        />
      ),
    },
  ];

  return (
    <div className="p-4 space-y-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Assets List </h1>
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
        asset={asset}
        setAsset={setAsset}
        updateStatus={updateStatus}
        status={statusUpdate}
        setStatusUpdate={setStatusUpdate}
        newStatus={newStatus}
      />

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
    </div>
  );
};

export default Index;
