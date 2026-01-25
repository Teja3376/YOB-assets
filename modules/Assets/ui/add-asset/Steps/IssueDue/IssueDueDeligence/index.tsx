import { memo } from "react";
import CustomTabs from "@/components/ui/custom-tab";
import Legal from "./Legal";
import Strucutre from "./Structure";
import Valuation from "./Valuation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const IssueDueDiligence = memo(() => {
  const dueDiligenceTabs = [
    {
      id: "legal",
      title: "Legal",
      component: <Legal />,
    },
    {
      id: "valuation",
      title: "Valuation",
      component: <Valuation />,
    },
    {
      id: "structure",
      title: "Structure",
      component: <Strucutre />,
    },
  ];

  return (
    <div className="w-full">
      {/* <CustomTabs tabs={dueDiligenceTabs} defaultTab="legal" /> */}
      <Tabs defaultValue={dueDiligenceTabs[0].id}>
        <TabsList className="bg-inherit border-b w-full flex justify-start rounded-none gap-2">
          {dueDiligenceTabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none  rounded-none data-[state=active]:border-b-2 border-black data-[state=active]:shadow-none "
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {dueDiligenceTabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            {tab.component}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
});

export default IssueDueDiligence;
