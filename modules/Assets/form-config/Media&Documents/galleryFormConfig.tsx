import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import { useFormContext } from "react-hook-form";
import { useParams } from "next/navigation";

const galleryFormConfig = (): FormFieldConfig[] => {
  const { control } = useFormContext();
  const { assetId } = useParams<{ assetId?: string }>();
  return [
    {
      name: "media.imageURL",
      label: "Image",
      type: "image",
      accept: ["png", "jpg", "jpeg"],
      control: control,
      rules: {
        required: "Image is required",
      },
      meta: {
        refId: assetId ?? "",
        belongsTo: "asset",
        isPublic: true,
      },
    },

    {
      name: "media.videoURL",
      type: "url",
      label: "Asset Video Link",
      control: control,
      rules: {
        required: "Video URL is required",
        pattern: {
          value: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/,
          message: "Invalid YouTube URL",
        },
      },
    },
    {
      name: "media.pitchDeckURL",
      type: "url",
      label: "Pitch Deck Link",
      control: control,
      // rules: {
      //   required: "Video URL is required",
      // },
    },

    {
      name: "media.gallery",
      label: "Gallery",
      type: "multiImage",
      accept: ["png", "jpg", "jpeg"],
      control: control,
      rules: {
        required: "multi gallery is required",
      },
      meta: {
        refId: assetId || "",
        belongsTo: "asset",
        isPublic: true,
      },
    },
  ];
};

export default galleryFormConfig;
