"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { SoftcapNotificationOverview } from "@/modules/Assets/utils/assetOverview";
import { useIssuerSoftcapDecision } from "@/modules/Assets/hooks/assetDashBoard/useIssuerSoftcapDecision";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

type Props = {
  assetId: string;
  notification: SoftcapNotificationOverview | undefined;
  currency?: string;
  onAfterDecision?: () => void;
};

export default function SoftcapIssuerNotification({
  assetId,
  notification,
  currency = "",
  onAfterDecision,
}: Props) {
  const { mutateAsync, isPending } = useIssuerSoftcapDecision(assetId);

  if (!notification || typeof notification !== "object") {
    return null;
  }

  const {
    softcapAmountRaised,
    midcapAmountRaised,
    message,
    requiresIssuerDecision,
    investmentClosedAtSoftcap,
    continuingToBasePropertyValue,
    acceptingNewInvestments,
    softcapAmount,
    basePropertyValue,
    fundingTargetAmount,
    totalRaised,
  } = notification;

  const showDecision =
    Boolean(requiresIssuerDecision) && !investmentClosedAtSoftcap;

  const handleDecision = async (closeInvestment: boolean) => {
    try {
      await mutateAsync(closeInvestment);
      toast.success(
        closeInvestment
          ? "Investment closed at soft cap. No new investors will be accepted."
          : "Fundraising continues toward the base property value.",
      );
      onAfterDecision?.();
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: unknown } } };
      const msg = err?.response?.data?.message;
      toast.error(
        typeof msg === "string"
          ? msg
          : Array.isArray(msg)
            ? msg.join(", ")
            : "Could not save your decision. Check that the API route exists.",
      );
    }
  };

  return (
    <Alert
      className="border-amber-200/80 bg-amber-50/90 text-amber-950 col-span-full"
      variant="default"
    >
      <AlertTriangle className="text-amber-700" />
      <AlertTitle className="text-amber-950">
        Soft cap & funding status
      </AlertTitle>
      <AlertDescription className="space-y-3 text-amber-950/90">
        <div className="flex flex-wrap gap-2 text-xs">
          <StatusPill
            label="Soft cap reached"
            active={Boolean(softcapAmountRaised)}
          />
          <StatusPill
            label="Midcap reached"
            active={Boolean(midcapAmountRaised)}
          />
          {typeof acceptingNewInvestments === "boolean" && (
            <span className="rounded-full border border-amber-800/30 px-2 py-0.5">
              Accepting new investors:{" "}
              <strong>{acceptingNewInvestments ? "Yes" : "No"}</strong>
            </span>
          )}
        </div>

        {(basePropertyValue != null ||
          softcapAmount != null ||
          totalRaised != null ||
          fundingTargetAmount != null) && (
          <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-4">
            {basePropertyValue != null && (
              <div>
                <dt className="text-muted-foreground">Base property value</dt>
                <dd className="font-medium tabular-nums">
                  {formatMoney(basePropertyValue, currency)}
                </dd>
              </div>
            )}
            {softcapAmount != null && (
              <div>
                <dt className="text-muted-foreground">Soft cap amount</dt>
                <dd className="font-medium tabular-nums">
                  {formatMoney(softcapAmount, currency)}
                </dd>
              </div>
            )}
            {totalRaised != null && (
              <div>
                <dt className="text-muted-foreground">Total raised</dt>
                <dd className="font-medium tabular-nums">
                  {formatMoney(totalRaised, currency)}
                </dd>
              </div>
            )}
            {fundingTargetAmount != null && (
              <div>
                <dt className="text-muted-foreground">Funding target</dt>
                <dd className="font-medium tabular-nums">
                  {formatMoney(fundingTargetAmount, currency)}
                </dd>
              </div>
            )}
          </dl>
        )}

        {message ? (
          <p className="rounded-md border border-amber-900/15 bg-white/60 px-3 py-2 text-sm text-amber-950">
            {message}
          </p>
        ) : null}

        {investmentClosedAtSoftcap && (
          <p className="text-sm font-medium">
            Investment is closed at soft cap — no further investors.
          </p>
        )}
        {continuingToBasePropertyValue && !investmentClosedAtSoftcap && (
          <p className="text-sm font-medium">
            You chose to continue fundraising toward the base property value.
          </p>
        )}

        {showDecision && (
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <span className="text-sm font-medium">
              Close investment at soft cap, or keep raising toward base value?
            </span>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                size="sm"
                variant="default"
                disabled={isPending}
                onClick={() => handleDecision(true)}
              >
                Yes — close for new investors
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={isPending}
                onClick={() => handleDecision(false)}
              >
                No — continue toward base value
              </Button>
            </div>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
}

function StatusPill({ label, active }: { label: string; active: boolean }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-amber-800/25 px-2 py-0.5">
      {active ? (
        <CheckCircle2 className="size-3.5 text-green-700" aria-hidden />
      ) : (
        <XCircle className="size-3.5 text-amber-800/50" aria-hidden />
      )}
      <span>{label}</span>
    </span>
  );
}

function formatMoney(n: number, currency: string) {
  if (currency) {
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
      }).format(n);
    } catch {
      /* invalid currency code */
    }
  }
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}
