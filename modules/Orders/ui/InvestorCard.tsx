import React from "react";

const InvestorCard = ({
  name,
  email,
  currency,
  id,
}: {
  name?: string;
  email?: string;
  currency?: string;
  id?: string;
}) => {
  return (
    <div className="border rounded-md">
      <div className="px-4 py-2 bg-primary/10 rounded-t-md ">
        <h1 className="text-md font-medium">Investor Details</h1>
      </div>
      <hr />
      <div className="px-4 py-2 space-y-2">
        <h1 className="text-sm font-semibold">{name}</h1>
        <p className="text-xs text-muted-foreground">{email}</p>
      </div>
      <hr />
      <div className=" my-2 px-4 py-2 space-y-2">
        <p className="text-sm ">
          Investor Currency:{" "}
          <span className="font-medium text-black ml-2">{currency}</span>
        </p>
        <p className="text-sm  truncate">
          Investor Id:{" "}
          <span className="font-medium text-black truncate">{id}</span>
        </p>
      </div>
    </div>
  );
};

export default InvestorCard;
