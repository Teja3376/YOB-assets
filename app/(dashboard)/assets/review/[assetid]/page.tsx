"use client";
import React from "react";
import { AssetReview } from "@/modules/Assets/ui/review/review";
import { useParams } from "next/navigation";
import useGetAssetById from "@/modules/Assets/hooks/useGetAssetById";

const Page = () => {
  const { assetid } = useParams();
  const { data, isLoading, isError, error } = useGetAssetById(assetid as string);

  const handleSubmitToAdmin = (id: string) => {
    console.log("Submitted to Super Admin:", id);
    alert("Asset data has been submitted to the Super Admin for final approval.");
  };

  const handleEdit = (id: string) => {
    console.log("Editing asset:", id);
    alert("Opening asset editor for ID: " + id);
  };

  const handleReject = (id: string, reason: string) => {
    console.log("Rejected asset:", id, "Reason:", reason);
    alert("Asset feedback sent to issuer. Reason: " + reason);
  };

  return (
    <AssetReview
      data={data}
      isLoading={isLoading}
      isError={isError}
      errorMessage={error instanceof Error ? error.message : undefined}
      onSubmitToAdmin={handleSubmitToAdmin}
      onEdit={handleEdit}
      onReject={handleReject}
    />
  );
};

export default Page;
