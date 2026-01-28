import AssetPrice from "./AssetPrice";
import Investment from "./Investment";

interface AssetProps {
  asset: any; // Replace 'any' with the actual type of 'asset' if known
}

function Index({ asset }: AssetProps) {
  return (
    <div className='flex flex-col gap-4'>
      <AssetPrice currency={asset?.company?.currency} />
      <Investment />
    </div>
  );
}
export default Index;