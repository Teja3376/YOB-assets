import Carasoul from "@/components/Carasoul";
import { Building2 } from "lucide-react";
import React from "react";
import QuickStats from "./QuickStats";

const PropertyDetails = () => {
  return (
    <div className="rounded-md shadow-xs px-5 pt-2  pb-3 border">
      <Carasoul
        gallery={[
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvcGVydHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
          "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvcGVydHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
          "https://images.unsplash.com/photo-1501183638714-841dd81dca4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvcGVydHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        ]}
      />
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-full bg-primary/10">
          <Building2 className="text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-medium">Property Name</h1>
          <p className="text-sm text-muted-foreground">
            123 Main Street, Anytown, USA
          </p>
        </div>
      </div>
      <div className="px-3 py-2 rounded-md bg-gray-100 mt-5 ">
        <p className="text-sm text-muted-foreground line-clamp-7 wrap-break-word">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <QuickStats />
    </div>
  );
};

export default PropertyDetails;
