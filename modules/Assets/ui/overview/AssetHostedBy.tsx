import { Info, MapPinIcon, PhoneCall } from "lucide-react";
import Image from "next/image";
import React from "react";

const AssetHostedBy = ({
  name,
  description,
  url,
  logo,
  address,
  email,
  phone,
}: {
  name: string;
  description: string;
  url: string;
  logo: string;
  address: string;
  email: string;
  phone: string;
}) => {
  return (
    <div className=" rounded-md shadow-xs  border">
      <div className="bg-primary/10 px-4 py-3 rounded-t-md font-medium">
        <h1>Asset Hosted</h1>
        <p className="text-xs font-normal text-muted-foreground">Property ownership and management company</p>
      </div>
      <hr />
      <div className="flex flex-col  gap-3 p-5">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 rounded-2xl">
            <Image
              src={logo}
              alt={name}
              fill
              className="absolute object-contain"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold">{name}</h2>
            <p className="underline text-blue-500">{url}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 items-stretch auto-cols-fr">
          <div className="rounded-md shadow-xs p-5 border space-y-2">
            <p className="text-xs flex items-center gap-2 ">
              <span>
                <MapPinIcon size={15} className="text-primary" />
              </span>
              Headquarters
            </p>
            <h1 className="font-semibold text-xs">{address}</h1>
          </div>
          <div className="rounded-md shadow-xs p-5 border space-y-2">
            <p className="text-xs flex items-center gap-2 ">
              <span>
                <PhoneCall size={15} className="text-primary" />
              </span>
              Contact
            </p>
            <h1 className="font-semibold text-xs">{email}</h1>
            <h1 className="font-semibold text-xs">{phone}</h1>
          </div>
          <div className="rounded-md shadow-xs p-5 border space-y-2 col-span-2">
            <p className="text-xs flex items-center gap-2 ">
              <span>
                <Info size={15} className="text-primary" />
              </span>
              About
            </p>
            <div className="p-4 bg-gray-100 rounded-md">
            <h1 className="font-medium text-sm line-clamp-6  text-muted-foreground rounded-md">
              {description ||
                "Porta Nuova Signature Residences is a premium residential development located in Milan’s Porta Nuova district, the city’s most prestigious and modern urban regeneration zone. The asset comprises high-end 1-, 2-, and 3-bedroom apartments designed to international luxury standards, featuring Italian designer kitchens, parquet flooring, marble bathrooms, smart home systems, and floor-to-ceiling glazing. Residents benefit from a rooftop sky lounge, indoor fitness centre, concierge services, private parking, energy-efficient systems (Class A), and 24/7 security. The property is within walking distance of Milan’s central business district, luxury retail"}
            </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetHostedBy;
