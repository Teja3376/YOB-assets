import FormGenerator from "@/components/use-form/FormGenerator";
import { vehicleGalleryConfig } from "@/modules/Assets/form-config/Vehicles/VehicleGallery/vehicleGalleryConfig";

function Index({ asset }: { asset: any }) {
  return (
    <div>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold mb-4">Gallery</h1>
        <div className="grid grid-cols-1 gap-5">
          <VehicleGallery asset={asset} />
        </div>
      </div>
    </div>
  );
}

const VehicleGallery = ({ asset }: { asset: any }) => {
  return <>{FormGenerator(vehicleGalleryConfig())}</>;
};

export default Index;
