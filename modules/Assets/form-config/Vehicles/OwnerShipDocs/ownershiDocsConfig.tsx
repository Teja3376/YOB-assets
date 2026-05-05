import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import { VEHICLE_BODY_STYLE } from "@/modules/Assets/utils/global";
import { useFormContext } from "react-hook-form";

import { useParams } from "next/navigation";

export const ownerShipDocsConfig = (): FormFieldConfig[] => {
  const { assetId } = useParams();
  //   const disable = !!param.id;

  const { control } = useFormContext();

  return [
    {
      type: "file",
      name: "registrationDocuments",
      control,
      label: "Registration Document",
      rules: {
        required: "Registration document is required",
        value: true,
      },
      meta: {
        refId: (assetId as string) || "",
        belongsTo: "vehicle",
        isPublic: true,
      },
      maxSize: 5 * 1024 * 1024,
      accept: ["pdf", "docx", "doc"],
    },
    {
      type: "file",
      name: "omologationDocuments",
      control,
      label: "Omologation Document",
      rules: {
        required: "Omologation document is required",
        value: true,
      },
      meta: {
        refId: (assetId as string) || "",
        belongsTo: "vehicle",
        isPublic: true,
      },
      maxSize: 5 * 1024 * 1024,
      accept: ["pdf", "docx", "doc"],
    },

    {
      type: "file",
      name: "proofOfOriginDocuments",
      control,
      label: "Proof of Origin Document",
      rules: {
        required: "Proof of origin document is required",
        value: true,
      },
      meta: {
        refId: (assetId as string) || "",
        belongsTo: "vehicle",
        isPublic: true,
      },
      maxSize: 5 * 1024 * 1024,
      accept: ["pdf", "docx", "doc"],
    },
    {
      type: "file",
      name: "Notarised",
      control,
      label: "Notarised Document",
      rules: {
        required: "Notarised document is required",
        value: true,
      },
      meta: {
        refId: (assetId as string) || "",
        belongsTo: "vehicle",
        isPublic: true,
      },
      maxSize: 5 * 1024 * 1024,
      accept: ["pdf", "docx", "doc"],
    },
    {
      type: "file",
      name: "EvaluationCertificates",
      control,
      label: "Evaluation Certificate",
      rules: {
        required: "Evaluation certificate is required",
        value: true,
      },
      meta: {
        refId: (assetId as string) || "",
        belongsTo: "vehicle",
        isPublic: true,
      },
      maxSize: 5 * 1024 * 1024,
      accept: ["pdf", "docx", "doc"],
    },
    {
      type: "file",
      name: "InsuranceCertificates",
      control,
      label: "Insurance Certificate",
      rules: {
        required: "Insurance certificate is required",
        value: true,
      },
      meta: {
        refId: (assetId as string) || "",
        belongsTo: "vehicle",
        isPublic: true,
      },
      maxSize: 5 * 1024 * 1024,
      accept: ["pdf", "docx", "doc"],
    },
  ];
};
