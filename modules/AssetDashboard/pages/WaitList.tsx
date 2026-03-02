import TableComponent from "@/components/TableComponent";
import { Button } from "@/components/ui/button";
import { Copy, Download, Search, Send } from "lucide-react";
import React, { useState } from "react";
import { handleCopy } from "@/helpers/global";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import { Assetdata} from "../types/assetdata";
// import Pagination from "@/layout/Pagination";
// import useWaitList from "@/hooks/asset/useWaitList";


const WaitList = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sendingInvestorId, setSendingInvestorId] = useState<string | number | null>(null);
  // const { waitList, pagination, isLoading, error, sendReminderBulk, isSending, sendReminder, search, setSearch } = useWaitList(id as string, page, limit);
  // console.log("waitList", waitList);
  const handlePageChange = (page: number) => {
    setPage(page);
  };
  const handleLimitChange = (limit: number) => {
    setLimit(limit);
  };
  // const dataa=Assetdata()
//   const handleSearchChange = (e: any) => {
//     setSearch(e.target.value);
//     setPage(1);
//   };
//   const handleSendReminder = async (investorId: string | number) => {
//     setSendingInvestorId(investorId);
//     const response = await sendReminder(id as string, investorId);
//     setSendingInvestorId(null);
//   }
//   const handleSendReminderBulk = async () => {
//     const response = await sendReminderBulk(id as string);
//     console.log("response", response);
//   }
  const columns = [
    {
      header: "Investor",
      accessorKey: "investorName",
      cell: (info: any) => {
        const investorName = info.getValue();
        return (
          <div className="flex gap-2 items-center">
            <span className="truncate font-semibold">
              {investorName}
            </span>
            <Copy
              onClick={() =>
                handleCopy(investorName)
              }
              size={4}
              className="text-gray-500 cursor-pointer min-h-4 min-w-4"
            />
          </div>
        );
      },
      enableSorting: false,
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: (info: any) => {
        const email = info.getValue();
        return <span className="font-semibold truncate">{email}</span>;
      },
      enableSorting: false,
    },
    {
      header: "Mobile Number",
      accessorKey: "mobileNumber",
      cell: (info: any) => {
        const mobileNumber = info.getValue();
        return (
          <span className="text-gray-500 font-semibold truncate">
            {mobileNumber}
          </span>
        );
      },
      enableSorting: false,
    },
    {
      header: "Tokens Interested to buy",
      accessorKey: "tokensInterestedToBuy",
      cell: (info: any) => {
        const tokensInterestedToBuy = info.getValue();
        return (
          <div className="h-10 w-full flex items-center">
            <span className="bg-green-50 text-green-600 text-sm px-2 py-1 rounded-full border border-green-300 font-semibold">
              {tokensInterestedToBuy}
            </span>
          </div>
        );
      },
      enableSorting: false,
    },
    {
      header: "Actions",
      accessorKey: "investorId",
      cell: (info: any) => {
        const investorId = info.getValue();
        return (
          <Button
            variant="outline"
            className="flex gap-2 items-center cursor-pointer font-semibold"
            // onClick={() => handleSendReminder(investorId)}
            disabled={sendingInvestorId === investorId}
          >
            <Send size={16} className=" cursor-pointer" />
            <span className="text-sm truncate font-semibold">
              {sendingInvestorId === investorId ? "Sending..." : "Send reminder"}
            </span>
          </Button>
        );
      },
      enableSorting: false,
    },
  ];
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Waitlist</h1>
      <div className="border border-gray-200 rounded-md p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div className="relative w-88">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search Investors..."
              className="pl-10 shadow-none"
            //   value={search}
            //   onChange={handleSearchChange}
            />
          </div>
          <div className="flex gap-2">
            <Button
              className="flex gap-2 items-center cursor-pointer font-semibold shadow-none"
              variant="outline"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="flex gap-2 items-center cursor-pointer font-semibold shadow-none" 
                // onClick={handleSendReminderBulk} disabled={isSending}
                >
              <Send className="h-4 w-4" />
              {/* {isSending ? "Sending..." : "Send Reminder"} */}
            </Button>
          </div>
        </div>
        {/* <TableComponent columns={columns} data={waitList} /> */}
        <TableComponent columns={columns} data={Assetdata} />
        {/* <Pagination
          {...pagination}
          onPageChange={handlePageChange}
          onPageSizeChange={handleLimitChange}
        /> */}
      </div>
    </div>
  );
};

export default WaitList;
