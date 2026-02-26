import { Badge } from "@/components/ui/badge";
import clsx from "clsx";

export function getOrderStatusBadge(status: string): {
  label: string;
  className: string;
} {
  switch (status) {
    case "initiated":
      return {
        label: "Initiated",
        className:
          "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100 ",
      };

    case "payment_pending":
      return {
        label: "Payment Pending",
        className:
          "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100",
      };

    case "payment_success":
      return {
        label: "Payment Success",
        className:
          "bg-green-100 text-green-700 border-green-200 hover:bg-green-100",
      };

    case "payment_failed":
      return {
        label: "Payment Failed",
        className: "bg-red-100 text-red-700 border-red-200 hover:bg-red-100",
      };

    case "token_transfer_pending":
      return {
        label: "Token Transfer Pending",
        className:
          "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100",
      };

    case "token_transferred":
      return {
        label: "Token Transferred",
        className:
          "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
      };

    case "token_transfer_failed":
      return {
        label: "Token Transfer Failed",
        className: "bg-red-100 text-red-700 border-red-200 hover:bg-red-100",
      };

    case "signature_pending":
      return {
        label: "Signature Pending",
        className:
          "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100",
      };

    case "completed":
      return {
        label: "Completed",
        className:
          "bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-100",
      };

    case "order_failed":
      return {
        label: "Order Failed",
        className: "bg-red-200 text-red-800 border-red-300 hover:bg-red-200",
      };

    default:
      return {
        label: "Unknown",
        className:
          "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-100",
      };
  }
}

export default function StatusBadge({ status }: { status: string }) {
  const { label, className } = getOrderStatusBadge(status);
  return <Badge className={clsx("cursor-pointer rounded-xl",className)}>{label}</Badge>;
}
