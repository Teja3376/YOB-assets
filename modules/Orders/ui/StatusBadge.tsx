import { Badge } from "@/components/ui/badge";
import clsx from "clsx";

/**
 * 1. Define groups
 */
const STATUS_GROUPS = {
  info: ["initiated"],
  warning: ["payment_pending", "token_transfer_pending","pending"],
  success: ["payment_success", "token_transferred", "completed","paid"],
  error: ["payment_failed", "token_transfer_failed", "order_failed","failed"],
  secondary: ["signature_pending"],
};

/**
 * 2. Define styles per group
 */
const GROUP_STYLES: { [key: string]: string } = {
  info: "bg-blue-100 text-blue-700 border-blue-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  success: "bg-green-100 text-green-700 border-green-200",
  error: "bg-red-100 text-red-700 border-red-200",
  secondary: "bg-purple-100 text-purple-700 border-purple-200",
  default: "bg-gray-100 text-gray-700 border-gray-200",
};


function formatLabel(status: string) {
  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}


export function getOrderStatusBadge(status: string) {
  const group =
    Object.entries(STATUS_GROUPS).find(([_, statuses]) =>
      statuses.includes(status)
    )?.[0] || "default";

  return {
    label: formatLabel(status),
    className: clsx(GROUP_STYLES[group], `hover:${GROUP_STYLES[group]}`),
  };
}

export default function StatusBadge({ status }: { status: string }) {
  const { label, className } = getOrderStatusBadge(status);

  return (
    <Badge className={clsx("cursor-pointer rounded-xl", className)}>
      {label}
    </Badge>
  );
}