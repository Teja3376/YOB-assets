import { formatCompactNumber } from "@/helpers/global";
import { ReactNode } from "react";

interface OrderStatusCardProps {
  icon: ReactNode;
  count: number;
  label: string;
  description: string;
}

const OrderStatusCard = ({
  icon,
  count = 0,
  label,
  description,
}: OrderStatusCardProps) => {
  return (
    <div className="bg-white rounded-lg border p-4 w-full">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full">{icon}</div>
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold">
            {formatCompactNumber(count || 0)}
          </h2>
          <p className="text-gray-600">{label}</p>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-2">{description}</p>
    </div>
  );
};

export default OrderStatusCard;
