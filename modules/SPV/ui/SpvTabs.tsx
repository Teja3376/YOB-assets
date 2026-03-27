"use client";
import { Button } from "@/components/ui/button";
import { useParams, usePathname, useRouter } from "next/navigation";
import useGetSpvWithId from "@/modules/SPV/hooks/ReactQuery/useGetSpvWithId";
import normalizedSpv from "@/modules/SPV/utils/normalizedspv";

const tabs = [
  
  {
    title: "Review",
    href: "review",
  },
];

const SpvTabs = () => {
  const pathname = usePathname();
  const { spvId } = useParams();
  const router = useRouter();

  const { data } = useGetSpvWithId(spvId as string);
  const normalized = normalizedSpv(data);
  const displayName =
    typeof normalized.name === "string" && normalized.name.trim()
      ? normalized.name
      : "SPV";

  const segments = pathname.split("/").filter(Boolean);
  const currentSegment = segments[segments.length - 1] ?? "";

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">{displayName}</h1>

      <div className="flex flex-wrap gap-2 items-center my-2">
        Review SPV
      </div>
    </div>
  );
};

export default SpvTabs;
