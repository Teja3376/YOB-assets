"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import CustomTabs from "@/components/ui/custom-tab";
import Pagination from "@/common/Pagination";
import Filters from "@/modules/SPV/ui/spv-list/filters";
import SPVTable from "@/modules/SPV/ui/spv-list/spvtable";
import SPVStatusDialog from "@/modules/SPV/ui/spv-list/spvstatusdialog";
import { mockSpvData } from "@/modules/SPV/mock-data/mock-data-spv";
import { useRouter } from "next/navigation";
import useGetAllSpv from "../../hooks/useGetAllSpv";

const PAGE_SIZE_OPTIONS = [5, 10, 25];

const SpvPage = () => {
  const [spv, setSpv] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("active");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const router = useRouter();

  const { getAllSpv,  responseData: getAllSpvResponseData } = useGetAllSpv();
  
  useEffect(() => {
    getAllSpv({
      page: currentPage,
      limit: limit,
      status: activeTab,
      type: selectedFilters,
      search: searchTerm,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, limit, activeTab, selectedFilters, searchTerm]);

  console.log(getAllSpvResponseData);
  // -------------------------
  // Filters
  // -------------------------
  const handleFilterToggle = (value: string) => {
    const normalized = value.toLowerCase().replace(/\s+/g, "").trim();
    setSelectedFilters((prev) =>
      prev.includes(normalized)
        ? prev.filter((v) => v !== normalized)
        : [...prev, normalized]
    );
  };

  const removeFilter = (value: string) => {
    setSelectedFilters((prev) => prev.filter((v) => v !== value));
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
    setSearchTerm("");
  };

  // -------------------------
  // Data Processing
  // -------------------------
  const filteredData = useMemo(() => {
    return mockSpvData
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
 
  // -------------------------
  // Tabs
  // -------------------------
  // Extract data array from response (handle both nested and flat structures)
  const spvData = Array.isArray(getAllSpvResponseData) 
    ? getAllSpvResponseData 
    : getAllSpvResponseData?.data || [];

  const tabs = [
    {
      id: "active",
      title: "Active",
      component: <SPVTable data={spvData}  />,
    },
    {
      id: "draft",
      title: "Drafts",
      component: <SPVTable data={spvData} hideDraftFields />,
    },
    {
      id: "pending",
      title: "Pending",
      component: <SPVTable data={spvData} hideDraftFields />,
    },
  ];

  return (
    <div className="p-4 border border-gray-200 rounded-lg m-2 space-y-4 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Special Purpose Vehicles (SPV) List
        </h1>
        <Button onClick={() => router.push("/spv/add-spv")}>Add SPV</Button>
      </div>

      {/* Filters */}
      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedFilters={selectedFilters}
        handleFilterToggle={handleFilterToggle}
        removeFilter={removeFilter}
        clearAllFilters={clearAllFilters}
      />

      {/* Status Dialog */}
      <SPVStatusDialog
        isOpen={Boolean(spv)}
        spv={spv}
        onClose={() => setSpv(null)}
        onConfirm={() => setSpv(null)}
        status="idle"
      />

      {/* Tabs */}
      <CustomTabs
        tabs={tabs}
        defaultTab={activeTab}
        handleTabChange={(tabId: string) => {
          setActiveTab(tabId);
          setCurrentPage(1);
        }}
      />

      {/* Pagination */}
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
  );
};

export default SpvPage;
