import { useMemo, useState } from "react";
import {
  Check,
  Info,
  DollarSign,
  BarChart,
  Link,
  ArrowRightIcon,
  ChevronRight,
  Sidebar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ASSET_STEPS_TABS } from "@/modules/Assets/utils/global";
import { maskId } from "@/helpers/global";
import { Badge } from "@/components/ui/badge";
import {
  formatCurrencyFlexible,
} from "@/lib/format.utils";

interface AssetStagesProps {
  currentStep?: string;
  asset?: any;
  formData?: any;
}

// Utility functions
const isFilled = (val: any): boolean => {
  if (val === null || val === undefined) return false;
  if (typeof val === "string") return val.trim().length > 0;
  if (typeof val === "number") return val > 0;
  if (Array.isArray(val)) return val.length > 0;
  if (typeof val === "object") return Object.keys(val).length > 0;
  return true;
};

const isValidValue = (val: any) => val !== undefined && val !== null;

const hasFields = (fields: string[], data: Record<string, any>) =>
  fields.every((field) => isFilled(data[field]));

export default function AssetStages({
  currentStep = "asset-information",
  asset = {},
  formData = {},
}: AssetStagesProps) {
  const [collapsed, setCollapsed] = useState(false);

  const hasStepData = (stepId: string) => {
    const data = { ...asset, ...formData };
    // console.log(data);

    switch (stepId) {
      case "asset-information":
        return (
          isFilled(data.name) &&
          isFilled(data.class) &&
          isFilled(data.category) &&
          isFilled(data.stage) &&
          isFilled(data.currency) &&
          isFilled(data.landmark) &&
          isFilled(data.about) &&
          isFilled(data.style) &&
          isFilled(data.totalNumberOfSfts) &&
          isFilled(data.pricePerSft) &&
          isFilled(data.investmentPerformance.interestRateonReserves) &&
          isFilled(data.tenants) &&
          isFilled(data.expenses) &&
          isFilled(data.legalAdivisory) &&
          isFilled(data.assetManagementCompany) &&
          isFilled(data.brokerage) &&
          isFilled(data.fees.brokerage) &&
          isFilled(data.fees.insurance) &&
          isFilled(data.fees.legal) &&
          isFilled(data.fees.platform)
        );

      case "token-information":
        return (
          isFilled(data.tokenInformation?.tokenSupply) &&
          isFilled(data.tokenInformation?.tokenPrice) &&
          isFilled(data.tokenInformation?.tokenSymbol) &&
          isFilled(data.tokenInformation?.maximumTokensToBuy) &&
          isFilled(data.tokenInformation?.minimumTokensToBuy)
          // isFilled(data.totalNumberOfSfts) &&
          // isFilled(data.pricePerSft)
        );

      case "media-documents":
        return (
          isFilled(data.media) &&
          isFilled(data.documents) &&
          isFilled(data.media.imageURL) &&
          isFilled(data.media.videoURL)
          // isFilled(data.media?.assetDocuments)
        );

      case "issues-due-diligence":
        return (
          // isFilled(data.issuer) &&
          isFilled(data.dueDiligence) &&
          isFilled(data.hostedBy.name) &&
          isFilled(data.dueDiligence) &&
          isFilled(data.hostedBy.email) &&
          isFilled(data.dueDiligence) &&
          isFilled(data.hostedBy.phone)
        );

      case "features-amenities":
        return isFilled(data.features) && isFilled(data.amenities);

      case "location-places":
        return isFilled(data.nearByLocations);

      case "additional-details":
        return (
          isFilled(data.riskFactors) ||
          isFilled(data.exitOpportunities) ||
          isFilled(data.riskDisclosure) ||
          isFilled(data.additionalTax)
        );

      case "tandc-faq":
        return (
          isFilled(data.termsAndConditions) ||
          isFilled(data.faqs) ||
          isFilled(data.assetTerms) ||
          isFilled(data.assetFaqs)
        );

      case "signature-verification":
        return isFilled(data.signatureDocuments);

      default:
        return false;
    }
  };

  const { stepIndex, progress, totalSteps, completedSteps } = useMemo(() => {
    const index = ASSET_STEPS_TABS.findIndex((step:any) => step.id === currentStep);
    const totalSteps = ASSET_STEPS_TABS.length;

    const completedSteps = ASSET_STEPS_TABS.filter((step:any) =>
      hasStepData(step.id)
    ).length;

    const progress = Math.round((completedSteps / totalSteps) * 100);

    return {
      stepIndex: index >= 0 ? index : 0,
      progress,
      totalSteps,
      completedSteps,
    };
  }, [currentStep, asset, formData]);

  const assetData = useMemo(() => {
    const data = { ...asset, ...formData };
    // console.log(data?.rentalYield, 'asasa')

    return {
      assetId: data._id || data.id || "******",
      pricePerToken:
        data.tokenInformation?.tokenPrice || data.pricePerSft || "******",
      totalSupply:
        data.tokenInformation?.tokenSupply ||
        data.totalNumberOfSfts ||
        "******",
      investmentValue:
        data.totalPropertyValueAfterFees || data.totalInvestment || "******",
      expectedIncome:
        data.rentalInformation?.rentPerSft || data.monthlyRent || "******",
      expectedIRR: data?.investmentPerformance?.irr || "******",
      offeringChain: data?.company?.daoConfiguration?.blockchain || "******",
      assetName: data.name || "Property",
      assetType: data.class || "real-estate",
      category: data.category || "commercial",
      stage: data.stage || "fully-rented",
      currency: data.currency || "inr",
    };
  }, [asset, formData]);

  // console.log(assetData, "assetData");

  return (
    <aside
      className={cn(
        "sticky top-4 z-20 flex max-h-[calc(100vh-2rem)] shrink-0 flex-col overflow-hidden rounded-xl border border-gray-200/90 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.06)] ring-1 ring-black/4 transition-[width] duration-200 ease-out",
        collapsed ? "w-11" : "w-72",
      )}
    >
        {!collapsed && (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="border-b border-gray-100 bg-linear-to-b from-gray-50/80 to-white px-5 pb-4 pt-5">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Asset summary
              </p>
              <div className="mb-2 flex items-center justify-between gap-2">
                <Badge
                  variant="secondary"
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                >
                  Step {completedSteps} of {totalSteps}
                </Badge>
                <span className="shrink-0 text-xs font-semibold tabular-nums text-gray-900">
                  {progress}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200/90">
                <div
                  className="h-full rounded-full bg-linear-to-r from-gray-900 to-gray-700 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden px-5 pb-2 pt-4">
            <div className="mt-2">
              <div className="mb-2 flex items-center justify-between px-2">
                <img
                  src={"/svg/assets/building.svg"}
                  alt="property"
                  className="w-18 h-18 object-contain"
                />
                <ArrowRightIcon className="h-4 w-4" />
                <img
                  src={"/svg/assets/token.svg"}
                  alt="tokens"
                  className="h-16 w-16 object-contain"
                />
              </div>
              <div className="flex items-center justify-between px-2">
                <span className="line-clamp w-20 text-center text-xs text-gray-600 wrap-break-word">
                  {assetData.assetName}
                </span>
                <span className="w-20 px-2 text-end text-xs text-gray-600">
                  Tokens
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-0">
              <FormField
                label="Asset ID"
                value={maskId(assetData.assetId, "PROP")}
                icon={<Info className="w-4 h-4" />}
                classNameValue="uppercase"
              />
              <FormField
                label="Price Per Token"
                value={
                  typeof assetData.pricePerToken === "number"
                    ? `${formatCurrencyFlexible(
                        assetData?.pricePerToken || 0,
                        assetData?.currency,
                      )}`
                    : assetData.pricePerToken
                }
                icon={<Info className="w-4 h-4" />}
              />
              <FormField
                label="Total Supply"
                value={
                  typeof assetData.totalSupply === "number"
                    ? assetData.totalSupply.toLocaleString()
                    : assetData.totalSupply
                }
                icon={<Info className="w-4 h-4" />}
              />
              <FormField
                label="Investment Value"
                value={
                  typeof assetData.investmentValue === "number"
                    ? `${formatCurrencyFlexible(
                        assetData?.investmentValue || 0,
                        assetData?.currency,
                      )}`
                    : assetData.investmentValue
                }
                icon={<DollarSign className="w-4 h-4" />}
              />
              <FormField
                label="Expected IRR"
                value={
                  typeof assetData?.expectedIRR === "number"
                    ? `${assetData?.expectedIRR?.toFixed(2)}%`
                    : assetData?.expectedIRR || assetData?.expectedIRR
                }
                icon={<BarChart className="w-4 h-4" />}
              />
              <FormField
                label="Offering Chain"
                value={assetData.offeringChain}
                icon={<Link className="w-4 h-4" />}
                classNameValue="uppercase"
              />
            </div>
          </div>
          </div>
        )}

        {collapsed && <div className="min-h-0 flex-1" aria-hidden />}

        <div className="mt-auto rounded-b-xl border-t border-gray-200/90 bg-gray-50/90 backdrop-blur-[2px]">
          <div className={collapsed ? "p-2" : "px-3 pb-3 pt-2"}>
            {!collapsed && (
              <button
                type="button"
                onClick={() => setCollapsed(true)}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200/90 bg-white px-3 py-2.5 text-sm font-medium text-gray-800 shadow-sm transition hover:border-gray-300 hover:bg-gray-50"
                aria-label="Collapse asset summary"
                title="Collapse panel"
              >
                <Sidebar size={18} strokeWidth={2} className="text-gray-600" />
                Collapse
              </button>
            )}
            {collapsed && (
              <button
                type="button"
                onClick={() => setCollapsed(false)}
                className="flex w-full cursor-pointer items-center justify-center rounded-lg border border-transparent py-2.5 text-gray-600 transition hover:border-gray-200 hover:bg-white hover:text-gray-900"
                aria-label="Expand asset summary"
                title="Expand panel"
              >
                <ChevronRight size={20} strokeWidth={2} />
              </button>
            )}
          </div>
        </div>
    </aside>
  );
}

function StepIndicator({ number, label, active, completed }: any) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center border-2",
          completed
            ? "bg-black border-black text-white"
            : active
            ? "border-black text-black"
            : "border-gray-300 text-gray-400"
        )}
      >
        {completed ? <Check className="w-5 h-5" /> : number}
      </div>
      <span className="text-xs mt-1 text-center">{label}</span>
    </div>
  );
}

function FormField({
  label,
  value,
  icon,
  className = "",
  classNameValue = "",
}: any) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-3 border-b border-gray-100 pb-3 last:border-b-0 last:pb-0",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-2 text-gray-600">
        <span className="text-muted-foreground [&_svg]:shrink-0">{icon}</span>
        <span className="text-xs leading-snug">{label}</span>
      </div>
      <div
        className={cn(
          "max-w-[55%] text-right text-xs font-medium leading-snug text-gray-900",
          classNameValue,
        )}
      >
        {value}
      </div>
    </div>
  );
}
