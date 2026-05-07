import CustomTabs from "@/components/ui/custom-tab";
import { useMemo, useState } from "react";
import InvestmentTab from "./tabs/InvestmentTab";
import ValuationTab from "./tabs/ValuationTab";

function Index({ asset }: { asset: any }) {
  const [activeTab, setActiveTab] = useState("valuation");

  const tabs = useMemo(
    () => [
      {
        id: "valuation",
        title: "Valuation",
        component: <ValuationTab />,
      },
      {
        id: "investment",
        title: "Investment",
        component: <InvestmentTab />,
      },
    ],
    [],
  );

  return (
    <div>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold mb-4">
          Valuation And Investment
        </h1>
        <CustomTabs
          defaultTab={activeTab}
          tabs={tabs}
          handleTabChange={setActiveTab}
        />
      </div>
    </div>
  );
}

export default Index;
