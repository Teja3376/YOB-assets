import { Progress } from "@/components/ui/progress";

const Investment = () => {
  return (
    <div className="rounded-md shadow-xs border">
      <div className="bg-primary/10 px-4 py-3 rounded-t-md font-medium">
        <h1>Investments & Valuation</h1>
      </div>
      <hr />
      <div className="px-4 py-3">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Funding Target</p>
          <h1 className="text-xl font-semibold">$10,000,000</h1>
        </div>
        <div className="mt-3">
          <Progress value={75} className="w-full mt-2" />
          <p>0.00% funded</p>
        </div>
      </div>
    </div>
  );
};

export default Investment;
