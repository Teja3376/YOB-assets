import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
import { mockAssets } from "@/modules/Assets/mock/assetList";

const Index: React.FC = () => {
    const [asset, setAsset] = useState<any>(null);
    const [search, setSearch] = useState<string>("");
    const [pagination, setPagination] = useState<{ page: number; limit: number }>({ page: 1, limit: 10 });
    const [activeTab, setActiveTab] = useState("active");
    const [newStatus, setNewStatus] = useState<"active" | "waitlist" | "">("");
    const [statusUpdate, setStatusUpdate] = useState<"active" | "waitlist" | "">("");
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
    //   } = useAssetApi();
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryParams = queryString.parse(searchParams.toString());
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const assetStatus = Array.isArray(queryParams?.tab)
        ? queryParams.tab[0]
        : queryParams?.tab || "active";
    const columns = getColumns(setAsset, setNewStatus);

    const [isToggleSwitchClicked, setIsToggleSwitchClicked] = useState(false);
    // const { connect, isConnected, account } = useMetaMask();

    const onPageChange = (page: number) => {
        router.push(`?page=${page}&limit=${limit}`);
    };

    const onPageSizeChange = (pageSize: number) => {
        router.push(`?page=${1}&limit=${pageSize}`);
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
    const assetList = mockAssets;
    //   if (status === "loading") {
    //     return (
    //       <div className="flex items-center justify-center min-h-[400px]">
    //         <LoadingSpinner size="h-12 w-12" color="text-blue-600" />
    //       </div>
    //     );
    //   }

    const handleTabChange = (tabId: string) => {
        router.push(`/assets-list?tab=${tabId}&page=1&limit=${limit}`);
    };
    const filteredData = useMemo(() => {
        return assetList
            .filter((item: any) => item.status === activeTab)
            .filter((item: any) =>
                selectedFilters.length > 0
                    ? selectedFilters.includes(item.type)
                    : true
            )
            .filter((item: any) =>
                searchTerm
                    ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
                    : true
            );
    }, [activeTab, selectedFilters, searchTerm]);

    const totalPages = Math.ceil(filteredData.length / limit);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * limit,
        currentPage * limit
    );

    const tabs = [
        {
            id: "active",
            title: "Active",
            component: <AssetTable columns={columns} assetList={paginatedData} />,
        },
        {
            id: "draft",
            title: "Drafts",
            component: <AssetTable columns={columns} assetList={paginatedData} />,
        },
        {
            id: "waitlist",
            title: "Waitlist",
            component: <AssetTable columns={columns} assetList={paginatedData} />,
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
                        className="w-[200px] h-10"
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
                {/* <TableComponent columns={columns} data={assetList} model="asset" /> */}

                <CustomTabs
                    tabs={tabs}
                    defaultTab={activeTab ?? undefined}
                    aria-label="Asset information tabs"
                    // handleTabChange={handleTabChange}
                    handleTabChange={(tabId: string) => {
                        setActiveTab(tabId);
                        setCurrentPage(1);
                      }}
                />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    hasPreviousPage={currentPage > 1}
                    hasNextPage={currentPage < totalPages}
                    limit={limit}
                    pageSizeOptions={PAGE_SIZE_OPTIONS}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={(size: number) => {
                        setLimit(size);
                        setCurrentPage(1);
                    }}
                />
            </div>
        </div>
    );
};

export default Index;
