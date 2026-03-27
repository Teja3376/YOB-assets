"use client"
import TableComponent from "@/common/TableComponent";
import { columns } from "../schema/paymentCols";
import { paymentsMock } from "../mock/tableData";
import { useRouter } from "next/navigation";

const PaymentRequestsPage = () => {
  const router = useRouter();
  const cols = columns(router);
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Investors List</h1>

      <TableComponent columns={cols} data={paymentsMock} model="payment" />
    </div>
  );
};

export default PaymentRequestsPage;
