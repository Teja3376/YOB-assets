"use client";
import { Button } from "@/components/ui/button";
import { useParams, usePathname, useRouter } from "next/navigation";
import useGetAssetBasic from "../hooks/assetDashBoard/useGetAssetBasic";
import { format } from "date-fns";

const tabs = [
  {
    title: "Overview",
    href: "overview",
  },
  {
    title: "Investors",
    href: "investors",
  },
  {
    title: "Orders",
    href: "orders",
  },
];

const AssetTabs = () => {
  const pathname = usePathname();
  const { assetid } = useParams();
  const router = useRouter();
  const { data: assetName, isFetching } = useGetAssetBasic(assetid as string);

  if (isFetching) {
    return <div>Loading...</div>;
  }
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">{assetName?.data?.name}</h1>
      <p className="text-sm text-muted-foreground">Created At : {format(assetName?.data?.createdAt,"dd/MM/yyyy")}</p>

      <div className="flex gap-2 items-center my-2">
        {tabs.map((tab) => {
          return (
            <Button
              key={tab.href}
              variant={pathname.includes(tab.href) ? "default" : "ghost"}
              onClick={() => router.push(`/assets/${assetid}/${tab.href}`)}
            >
              {tab.title}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default AssetTabs;
