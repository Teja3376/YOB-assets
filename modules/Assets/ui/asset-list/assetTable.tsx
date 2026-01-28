import TableComponent from "@/common/TableComponent";
import React from "react";

interface AssetTableProps {
  columns: any;
  assetList: any[];
  hideDraftFields?: boolean;
}

export const AssetTable: React.FC<AssetTableProps> = ({
  columns,
  assetList,
  hideDraftFields = false,
}) => {
  const visibleColumns = hideDraftFields
    ? columns.filter(
        (col: any) =>
          ![
            "totalInvestors",
            "aum",
            "OnchainAddress",
            "status",
            "uniqueInvestorCount",
            "percentageOfTokensSold",
            "blockchainProjectAddress",
            "orderCount",
          ].includes((col as any).accessorKey),
      )
    : columns;
  return (
    <div>
      {" "}
      <TableComponent columns={visibleColumns} data={assetList} model="asset" />
    </div>
  );
};
