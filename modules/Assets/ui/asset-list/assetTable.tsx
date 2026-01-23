import TableComponent from "@/common/TableComponent";
import React from "react";

interface AssetTableProps {
  columns: any;
  assetList: any[];
}

export const AssetTable: React.FC<AssetTableProps> = ({
  columns,
  assetList,
}) => {
  return (
    <div>
      {" "}
      <TableComponent columns={columns} data={assetList} model="asset" />
    </div>
  );
};
