import Carasoul from "@/components/Carasoul";
import { Building2 } from "lucide-react";

interface PropertyDetailsProps {
  gallery: string[];
  name: string;
  about: string;
  location: {
    landmark?: string;
    city?: string;
    state?: string;
    country?: string;
  };
}

const PropertyDetails = ({
  gallery,
  name,
  about,
  location,
}: PropertyDetailsProps) => {
  const combinedLocation = [
    location?.landmark,
    location?.city,
    location?.state,
    location?.country,
  ]
    .filter(Boolean)
    .join(", ");
  return (
    <div className="rounded-md shadow-xs px-5 pt-3  pb-3 border">
      {gallery && gallery.length > 0 ? (
        <Carasoul gallery={gallery} />
      ) : (
        <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center border">
          <div className="flex flex-col items-center text-muted-foreground">
            <Building2 size={32} />
            <p className="text-sm mt-2">No image available</p>
          </div>
        </div>
      )}{" "}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-full bg-primary/10">
          <Building2 className="text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-medium">{name}</h1>
          <p className="text-sm text-muted-foreground">
            {combinedLocation || "123 Main Street, Anytown, USA"}
          </p>
        </div>
      </div>
      <div className="px-3 py-2 rounded-md bg-gray-100 mt-5 ">
        <p className="text-sm text-muted-foreground line-clamp-7 wrap-break-word">
          {about}
        </p>
      </div>
    </div>
  );
};

export default PropertyDetails;
