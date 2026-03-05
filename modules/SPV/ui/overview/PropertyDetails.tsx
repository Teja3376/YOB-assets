import Carasoul from "@/components/Carasoul";
import { Building2 } from "lucide-react";
import React from "react";
import QuickStats from "./QuickStats";

interface PropertyDetailsProps {
  gallery: string[];
  name: string;
  about: string;
  location: string;
  category: string;
  size: number;
  occupancy: number;
  grossRentalYield: number;
  irr: number;
}

const PropertyDetails = ({
  gallery,
  name,
  about,
  location,
  category,
  size,
  occupancy,
  grossRentalYield,
  irr,
}: PropertyDetailsProps) => {
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
            {location || "123 Main Street, Anytown, USA"}
          </p>
        </div>
      </div>
      <div className="px-3 py-2 rounded-md bg-gray-100 mt-5 ">
        <p className="text-sm text-muted-foreground line-clamp-10 wrap-break-word">
          {about}
        </p>
      </div>
      <QuickStats
        size={size}
        occupancy={occupancy}
        type={category}
        grossRentalYield={grossRentalYield}
        irr={irr}
      />
    </div>
  );
};

export default PropertyDetails;
