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


const Index = () => {
  const router = useRouter();
  const { id = null } = useParams();
//   const { assetOverview, getAssetOverview, isPending } = useAssetApi();
  const queryParams = queryString.parse(location.search);

//   useEffect(() => {
//     const fetchAsset = async () => {
//       if (id) {
//         await getAssetOverview(id);
//       }
//     };
//     fetchAsset();
//   }, [id]);

  const tab: string = Array.isArray(queryParams["tab"])
    ? queryParams["tab"][0] || "overview"
    : queryParams["tab"] || "overview";

  const tabs = [
    {
      id: "overview",
      title: "Overview",
      component: <Overview assetOverview={"hfghdf"} />,
    },
    {
      id: "investers",
      title: "Investors",
      component: <Investors assetOverview={"hbdshsg"} />,
    },
    {
      id: "orders",
      title: "Orders",
      component: <Orders assetOverview={"gfhsfgfsc"} />,
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
