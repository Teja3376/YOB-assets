import React from "react";

type CardColor = "blue" | "green" | "red" | "yellow" | "orange";

interface InvestorCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color?: CardColor;
}

const colors: Record<CardColor, string> = {
  blue: "from-blue-100 to-white",
  green: "from-green-100 to-white",
  red: "from-red-100 to-white",
  yellow: "from-yellow-100 to-white",
  orange: "from-orange-100 to-white",
};

const InvestorCard = ({
  title,
  value,
  icon,
  color = "blue",
}: InvestorCardProps) => {
  return (
    <div
      className={`border border-gray-300 rounded-md p-6 flex items-center gap-3 bg-gradient-to-r ${colors[color]} w-full`}
    >
      <div className="bg-white p-2 rounded-full border">
        {icon}
      </div>

      <div className="flex flex-col">
        <p className="text-xl font-semibold">{value}</p>
        <h1 className="text-sm text-gray-600">{title}</h1>
      </div>
    </div>
  );
};

export default InvestorCard;