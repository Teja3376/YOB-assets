import { Progress } from "@/components/ui/progress";
import { formatCurrencyWithLocale } from "@/lib/format.utils";

const Investment = ({
  fundingTarget,
  fundingProgress,
  totalRaised,
  currency = "USD",
}: {
  fundingTarget: number;
  fundingProgress: number;
  totalRaised: number;
  currency?: string;
}) => {
  return (
    <div className="rounded-md shadow-xs border">
      <div className="bg-primary/10 px-4 py-3 rounded-t-md font-medium">
        <h1>Property Investments</h1>
      </div>
      <hr />
      <div className="px-4 py-3 space-y-2">
        <div>
          <p className="text-sm text-muted-foreground">Total Raised</p>
          <h1 className="text-xl font-semibold">
            {formatCurrencyWithLocale(totalRaised, currency)}
          </h1>
        </div>
        <div className="flex gap-1">
          <p className="text-sm text-muted-foreground">Funding Target: </p>
          <h1 className="text-sm font-semibold">
            {formatCurrencyWithLocale(fundingTarget, currency)}
          </h1>
        </div>
        <div className="mt-3 space-y-2">
          <Progress value={fundingProgress} className="w-full" />
          <p className="text-sm text-muted-foreground">{fundingProgress?.toFixed(2)}% funded</p>
        </div>
      </div>
    </div>
  );
};

export default Investment;
