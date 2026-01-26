// Extracted columns definition for the AssetList table
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Copy, Edit, Eye, Maximize } from "lucide-react";
import {  handleCopy, maskId } from "@/helpers/global";
import { formatCompactNumber } from "@/lib/format.utils";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

const getColumns = (setAsset: (asset: any) => void, setNewStatus: any) => [
    
  {
    header: "Asset Id",
    accessorKey: "_id",
    cell: (info: any) => {
      const id = info.getValue();
      // console.log("@@@@, info colnsole ;art ",info.getValue());

      // console.log(id,"id ishere in columns ")
      return (
        <div className="flex gap-2">
          <Copy
            onClick={() => handleCopy(id)}
            size={4}
            className="text-gray-500 cursor-pointer min-h-4 min-w-4"
          />
          <span className="text-sm truncate uppercase">
            {maskId(id, "PROP")}
          </span>
        </div>
      );
    },
    enableResizing: true,
    size: 100,
    maxSize: 200,
  },
  {
    header: "Asset Name",
    accessorKey: "logo",
    cell: (info: any) => {
      const fallbackLogo =
        "https://andreaslloyd.dk/wp-content/themes/koji/assets/images/default-fallback-image.png";
      const logo = info.getValue() || fallbackLogo;
      const fullName = String(info.row.original?.name ?? "SPV Name");

      return (
        <div className="flex items-center gap-2" title={fullName}>
          {/* <img
            src={logo}
            alt="logo"
            className="w-8 h-8 rounded-full object-cover shrink-0"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackLogo;
            }}
          /> */}
          <div className="flex flex-col truncate">
            <span className="truncate text-sm">{fullName}</span>
            <span className="text-xs text-gray-500 truncate">
              {info.row.original?.city}
            </span>
          </div>
        </div>
      );
    },
    enableResizing: true,
    size: 100,
    maxSize: 200,
  },
  {
    header: "Blockchain Address",
    accessorKey: "tokenInformation.blockchainProjectAddress",
    cell: (info: any) => {
      const row = info.row.original;
      console.log("row ai here:", row);
      // Access the nested blockchain address from tokenInformation
      const assetAddress =
        row.tokenInformation?.blockchainProjectAddress ||
        row.assetAddress ||
        "";
      console.log("assetAddress:", assetAddress);
      if (!assetAddress) {
        return <span className="text-gray-500">Not deployed</span>;
      }

      // Convert Ethereum address format to XDC format for explorer
      const xdcAddress = assetAddress.replace(/^0x/, "xdc");
      const explorerUrl = `https://testnet.xdcscan.com/address/${xdcAddress}`;

      return (
        <div className="flex gap-2">
          <Copy
            onClick={() => handleCopy(assetAddress)}
            size={4}
            className="text-gray-500 cursor-pointer min-h-4 min-w-4"
          />
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm truncate text-blue-500 hover:text-blue-700 underline"
            title={assetAddress}
          >
            {assetAddress.substring(0, 10)}...
            {assetAddress.substring(assetAddress.length - 8)}
          </a>
        </div>
      );
    },
    enableResizing: true,
    size: 140,
    minSize: 140,
    maxSize: 140,
  },
  {
    header: "Funding Status",
    accessorKey: "status",
    cell: (info: any) => {
      const row = info.row.original;
      const availableTokensToBuy = row.availableTokensToBuy || 0;
      const percentageOfTokensSold = row.percentageOfTokensSold || 0;
      return (
        <Badge className="bg-gray-200 rounded-full text-black hover:bg-gray-200 font-normal">
          <span className="text-sm">
            {percentageOfTokensSold.toFixed(2)}% sold{" "}
          </span>
          <span className="text-sm">
            ({formatCompactNumber(availableTokensToBuy || 0)} left)
          </span>
        </Badge>
      );
    },
    size: 100,
    minSize: 100,
    maxSize: 100,
  },
  {
    header: "Max Supply",
    accessorKey: "totalTokens",
    cell: (info: any) => {
      const totalTokens = info.getValue();
      const value = formatCompactNumber(totalTokens || 0);
      console.log("info.row.origina", info.row.original);
      return <span>{value}</span>;
    },
    size: 50,
    minSize: 50,
    maxSize: 50,
  },
  {
    header: "Investors",
    accessorKey: "uniqueInvestorCount",
    cell: (info: any) => {
      const uniqueInvestorCount = info.getValue();
      const value = formatCompactNumber(uniqueInvestorCount || 0);
      return <span>{value}</span>;
    },
    maxSize: 50,
    size: 50,
    minSize: 50,
  },
  {
    header: "Orders",
    accessorKey: "orderCount",
    cell: (info: any) => {
      const orderCount = info.getValue();
      const value = formatCompactNumber(orderCount || 0);
      return <span>{value}</span>;
    },
    maxSize: 50,
    size: 50,
    minSize: 50,
  },
  {
    header: "Active",
    accessorKey: "status",
    cell: (info: any) => {
      const status = info.getValue();
      const isActive = status === "active";
      const handleUpdateStatus = (asset: any) => {
        setAsset(asset);
        setNewStatus(!isActive ? "active" : "inactive");
      };
      return (
        <Switch
          checked={isActive}
          onCheckedChange={() => handleUpdateStatus(info.row.original)}
        />
      );
    },
    size: 50,
    minSize: 50,
    maxSize: 50,
  },
  // {
  //   header: "Join Waitlist",
  //   accessorKey: "status",
  //   cell: (info: any) => {
  //     const status = info.getValue();
  //     const isWaitlisted = status === "waitlist";
  //     const handleUpdateStatus = (asset: any) => {
  //       setAsset(asset);
  //       setNewStatus(!isWaitlisted ? "waitlist" : "inactive");
  //     };
  //     return (
  //       <Switch
  //         checked={isWaitlisted}
  //         onCheckedChange={() => handleUpdateStatus(info.row.original)}
  //         disabled={status === "active"}
  //       />
  //     );
  //   },
  //   size: 60,
  //   minSize: 60,
  //   maxSize: 60,
  // },
  {
    header: "Actions",
    accessorKey: "actions",
    cell: (info: any) => {
        const router = useRouter();
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer"
            type="button"
            onClick={() => {
              router.push(`/assets/edit-asset/${info.row.original._id}`);
            }}
          >
            <Edit className="h-5 w-5 text-gray-600" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer"
            type="button"
            onClick={() => {
              router.push(`/assets/dashborad-asset/${info.row.original._id}`);
            }}
          >
            <Eye className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      );
    },
    enableResizing: false,
    size: 60,
    maxSize: 80,
  },
];

export default getColumns;
