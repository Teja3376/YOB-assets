import TableComponent from "@/common/TableComponent";
import React from "react";

const OrdersTable = ({ cols, data }: { cols: any[]; data: any[] }) => {
  return (
    <div>
      <TableComponent columns={cols} data={data} />
    </div>
  );
};

export default OrdersTable;
