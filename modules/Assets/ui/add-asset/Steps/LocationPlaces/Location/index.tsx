import React, { useEffect, useState } from "react";
import {
  AdvancedMarker,
  APIProvider,
  ControlPosition,
  Map,
  MapControl,
  useAdvancedMarkerRef,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFormContext } from "react-hook-form";
import { LocationCard } from "./LocationCard";
// import { NearbyPlaces, useGetPlaces } from "@/hooks/asset/useGetPlaces";
import { useParams } from "next/navigation";

interface MapHandlerProps {
  place: google.maps.places.PlaceResult | null;
  marker: google.maps.marker.AdvancedMarkerElement | null;
}

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}
export type NearbyPlaces = {
  school: any[];
  gym: any[];
  hospital: any[];
  cinema: any[];
  cafe: any[];
  "police-station": any[];
};

const Index: React.FC = () => {
  const { setValue, watch } = useFormContext();
  const latitude = watch("latitude") || 16.5449;
  const longitude = watch("longitude") || 81.5212;
  const { assetId = null } = useParams<{ assetId?: string }>();

  const [markerRef, marker] = useAdvancedMarkerRef();
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  const [activeTab, setActiveTab] = useState<"all" | keyof NearbyPlaces>("all");

  // ✅ custom hook
  // const { places, loading, error, getPlaces } = useGetPlaces();
  const [places, setPlaces] = useState<NearbyPlaces>({
    school: [],
    gym: [],
    hospital: [],
    cinema: [],
    cafe: [],
    "police-station": [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [getPlaces, setGetPlaces] = useState<any>(null);

  /** Fetch places whenever lat/lng changes */
  // useEffect(() => {
  //   if (!latitude || !longitude || !assetId) return;
  //   getPlaces({
  //     assetId: assetId,
  //     lat: latitude.toString(),
  //     lng: longitude.toString(),
  //   });
  // }, [latitude, longitude, assetId]);

  /** Map handler: update marker + move map */
  const MapHandler = ({ place, marker }: MapHandlerProps) => {
    const map = useMap();

    useEffect(() => {
      if (!map || !place || !marker) return;
      if (place.geometry?.viewport) {
        map.fitBounds(place.geometry.viewport);
      }
      marker.position = place.geometry?.location || null;
    }, [map, place, marker]);

    return null;
  };

  /** Autocomplete input */
  const PlaceAutocomplete = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
    const [placeAutocomplete, setPlaceAutocomplete] =
      useState<google.maps.places.Autocomplete | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const placesLib = useMapsLibrary("places");

    useEffect(() => {
      if (!placesLib || !inputRef.current) return;
      const options = { fields: ["geometry", "name", "formatted_address"] };
      setPlaceAutocomplete(
        new placesLib.Autocomplete(inputRef.current, options)
      );
    }, [placesLib]);

    useEffect(() => {
      if (!placeAutocomplete) return;
      placeAutocomplete.addListener("place_changed", () => {
        onPlaceSelect(placeAutocomplete.getPlace());
      });
    }, [onPlaceSelect, placeAutocomplete]);

    return (
      <div className="w-full h-full">
        <input
          ref={inputRef}
          className="h-10 w-64 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for a place..."
        />
      </div>
    );
  };

  /** Tabs filtering */
  const rawLocations: NearbyPlaces = places || {
    school: [],
    gym: [],
    hospital: [],
    cinema: [],
    cafe: [],
    "police-station": [],
  };

  const allowedTypes: (
    | "school"
    | "gym"
    | "hospital"
    | "cinema"
    | "cafe"
    | "police-station"
  )[] = ["school", "gym", "hospital", "cinema", "cafe", "police-station"];

  const locationTypes: ("all" | keyof NearbyPlaces)[] = [
    "all",
    ...allowedTypes,
  ];

  const getPlacesByType = (type: keyof NearbyPlaces | "all") => {
    if (type === "all") {
      return Object.values(rawLocations).flat();
    }
    return rawLocations[type];
  };

  const locationPlaces = getPlacesByType(activeTab);

  return (
    <div className="container mx-auto">
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Location of the Asset</CardTitle>
        </CardHeader>
        <CardContent>
          <APIProvider
            apiKey="AIzaSyDkthg2XSdFfiF-att92-ZeVpSi18rT1v8" 
            solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
          >
            <div className="w-full h-96 rounded-lg overflow-hidden">
              <Map
                style={{ width: "100%", height: "100%" }}
                defaultCenter={{ lat: latitude, lng: longitude }}
                defaultZoom={12}
                gestureHandling="greedy"
                disableDefaultUI={false}
                mapId="fe235e0bea87fda6"
              >
                <AdvancedMarker
                  ref={markerRef}
                  draggable={true}
                  position={{ lat: latitude, lng: longitude }}
                  onDragEnd={(e: any) => {
                    const lat = e.latLng?.lat() || 0;
                    const lng = e.latLng?.lng() || 0;
                    setValue("latitude", lat);
                    setValue("longitude", lng);
                  }}
                />
                <MapControl position={ControlPosition.TOP}>
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-md">
                    <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
                  </div>
                </MapControl>
                <MapHandler place={selectedPlace} marker={marker} />
              </Map>
            </div>
          </APIProvider>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Nearby Places</h1>
      </div>

      {loading && <p>Loading nearby places...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <Tabs
        value={activeTab}
        onValueChange={(val) => setActiveTab(val as "all" | keyof NearbyPlaces)}
        className="mb-6 w-full h-full"
      >
        <TabsList className="mb-4 flex flex-wrap justify-start h-full">
          {locationTypes.map((type) => (
            <TabsTrigger
              key={type}
              value={type as string}
              className="flex gap-1"
            >
              <span className="capitalize">{type.replace(/-/g, " ")}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid gap-4">
        {locationPlaces.map(
          (location: {
            _id: string;
            assetId: string;
            locationType: string;
            latitude: string;
            longitude: string;
            name: string;
            address: string;
            distanceInKm: number;
            isActive: boolean;
          }) => (
            <LocationCard key={location._id} location={location} />
          )
        )}
      </div>
    </div>
  );
};

export default Index;