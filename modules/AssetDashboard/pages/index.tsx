"use client";
// import { useAssetApi } from "@/hooks/asset/useAssetApi";
import CustomTabs from "@/components/ui/custom-tab";
import queryString from "query-string";
import { useParams, useRouter } from 'next/navigation';
// import { useEffect } from "react";
import Loading from "@/components/ui/Loading";
import Overview from "./overview";
import Investors from "./Investor";
import Orders from "./Orders";
import { useGetOverview } from "../hooks/useGetOverview";
import { useGetInvestors } from "../hooks/useGetInvestors";
import { useGetOrders } from "../hooks/useGetOrders";


const Index = () => {
  const router = useRouter();
  const queryParams = queryString.parse(location.search);

  const params=useParams()

  console.log("params",params)
  const assetId=params.assetid;
  console.log("assetId",assetId)
  const {data, isFetching}=useGetOverview(assetId as string);
  console.log("Overview",data)

  const {data:invetsors }=useGetInvestors(assetId as string)

  console.log("Invetorslist", invetsors)

   const {data:orders }=useGetOrders(assetId as string)


  const tab: string = Array.isArray(queryParams["tab"])
    ? queryParams["tab"][0] || "overview"
    : queryParams["tab"] || "overview";

  const tabs = [
    {
      id: "overview",
      title: "Overview",
      component: <Overview assetOverview={data?.data} />,
    },
    {
      id: "investers",
      title: "Investors",
      component: <Investors assetOverview={invetsors} />,
    },
    {
      id: "orders",
      title: "Orders",
      component: <Orders assetorders={orders} />,
    },
    // {
    //   id: "documents",
    //   title: "Documents",
    //   component: <Documents assetOverview={assetOverview} />,
    // },
  ];

  const handleTabChange = (tabId: string) => {
    router.push(`?tab=${tabId}`);
  };

//   if (isPending) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Loading />
//       </div>
//     );
//   }

  return (
    <div>
      <CustomTabs
        defaultTab={tab}
        tabs={tabs}
        handleTabChange={handleTabChange}
        aria-label="Additional Details"
      />
    </div>
  );
};
export default Index;
