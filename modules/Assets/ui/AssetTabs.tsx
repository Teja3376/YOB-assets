"use client";
import { Button } from "@/components/ui/button";
import { useParams, usePathname, useRouter } from "next/navigation";

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
  const { spvId } = useParams();
  const router = useRouter();

  console.log(pathname);
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">Spv Name</h1>
      <p className="text-sm text-muted-foreground">Created on </p>

      <div className="flex gap-2 items-center my-2">
        {tabs.map((tab) => {
          return (
            <Button
              key={tab.href}
              variant={pathname.includes(tab.href) ? "default" : "ghost"}
              onClick={() => router.push(`/spv/${spvId}/${tab.href}`)}
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
