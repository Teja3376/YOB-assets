import { Coins } from "lucide-react";

const investorColumn = () => {
  return [
    {
      header: "Investor Id",
      accessorKey: "_id",
      cell: (info: any) => {
        const id = info.getValue();
        return (
          <div className="flex flex-col py-1">
            <div className="flex items-center gap-2 px-2">
              <span className="uppercase font-semibold">{`INV-${id.slice(-3)}`}</span>
            </div>
          </div>
        );
      },
    },
    {
      header: "Investor",
      accessorKey: "name",
      cell: (info: any) => {
        const name = info.getValue();
        const email = info.row.original.email;
        return (
          <div className="flex flex-col py-1">
            <div className="flex items-center gap-2 px-2">
              {/* <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="uppercase">{name.charAt(0)}</span>
              </div> */}
              <div className="flex flex-col">
                <span className="">{name}</span>
                <span className="text-xs text-gray-500">{email}</span>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      header: "Total Tokens",
      accessorKey: "totalTokens",
      cell: (info: any) => {
        const totalTokens = info.getValue();
        return (
          <div className="flex items-center gap-2 px-2">
            <Coins size={14} />
            <span className="text-sm uppercase">{totalTokens}</span>
          </div>
        );
      },
    },
    {
      header: "Total Invested",
      accessorKey: "totalInvested",
      cell: (info: any) => {
        const totalInvested = info.getValue();
        return (
          <div className="flex flex-col">
            <span className="text-sm uppercase">
              {totalInvested.toFixed(2)}
            </span>
          </div>
        );
      },
    },
    {
      header: "Invested Assets Count",
      accessorKey: "assetsCount",
      cell: (info: any) => {
        const assetsCount = info.getValue();
        return (
          <div className="flex flex-col">
            <span className="text-sm uppercase">{assetsCount}</span>
          </div>
        );
      },
    },
    {
      header: "Assets",
      accessorKey: "assetsInvested",
      cell: ({ getValue }: any) => {
        const assets = getValue() as string[];

        if (!assets || assets.length === 0) {
          return <span className="text-xs text-gray-400">No Assets</span>;
        }

        const visibleAssets = assets.slice(0, 2);
        const remainingCount = assets.length - 2;

        return (
          <div className="flex flex-col text-sm">
                {visibleAssets.map((asset, index) => (
                  <span key={index} className="truncate">
                    {asset}
                    {index !== visibleAssets.length - 1 && ", "}
                  </span>
                ))}

            {remainingCount > 0 && (
              <span className="text-xs text-blue-600">
                +{remainingCount} more
              </span>
            )}
          </div>
        );
      },
    },
  ];
};
export default investorColumn;
