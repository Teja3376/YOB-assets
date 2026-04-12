"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { SoftcapNotificationOverview } from "@/modules/Assets/utils/assetOverview";
import ExtendListingDatesDialog from "./ExtendListingDatesDialog";
import { CalendarClock, Info } from "lucide-react";

type AssetShape = Record<string, unknown> & {
  status?: string;
  investorRequirementsAndTimeline?: {
    distributionStartDate?: string | Date;
    distributionEndDate?: string | Date;
    [key: string]: unknown;
  };
};

function parseApiDate(value: unknown): Date | undefined {
  if (value == null) return undefined;
  if (value instanceof Date && !isNaN(value.getTime())) return value;
  if (typeof value === "string" || typeof value === "number") {
    const d = new Date(value);
    return isNaN(d.getTime()) ? undefined : d;
  }
  return undefined;
}

function formatDisplayDate(d: Date | undefined) {
  if (!d) return "—";
  return format(d, "dd MMM yyyy");
}

function formatMoney(n: number | undefined, currency: string) {
  if (n == null || Number.isNaN(n)) return "—";
  if (currency) {
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
      }).format(n);
    } catch {
      /* invalid currency */
    }
  }
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function humanizeStatus(status: string | undefined) {
  if (!status) return "—";
  return status
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

type Props = {
  assetId: string;
  currency?: string;
  softcapNotification?: SoftcapNotificationOverview;
  asset: AssetShape | undefined;
  onAfterUpdate?: () => void;
};

export default function FundraisingPanel({
  assetId,
  currency = "",
  softcapNotification,
  asset,
  onAfterUpdate,
}: Props) {
  const [extendOpen, setExtendOpen] = useState(false);

  const timeline = asset?.investorRequirementsAndTimeline;
  const start = useMemo(
    () => parseApiDate(timeline?.distributionStartDate),
    [timeline?.distributionStartDate],
  );
  const end = useMemo(
    () => parseApiDate(timeline?.distributionEndDate),
    [timeline?.distributionEndDate],
  );

  const status = asset?.status;
  const normalizedStatus = String(status ?? "")
    .toLowerCase()
    .replace(/_/g, "-");
  const isListingEnded = normalizedStatus === "listing-ended";

  const n = softcapNotification;

  return (
    <div className="space-y-4">
      {isListingEnded && (
        <Alert className="border-amber-200/80 bg-amber-50/90 text-amber-950">
          <Info className="size-4 text-amber-800" />
          <AlertTitle className="text-amber-950">Listing period ended</AlertTitle>
          <AlertDescription className="flex flex-col gap-3 text-amber-950/90 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm">
              Investors no longer see this asset as open. Extend the listing window
              by setting new listing dates; this updates the asset via your existing
              save API.
            </span>
            <Button
              type="button"
              size="sm"
              variant="default"
              className="shrink-0"
              onClick={() => setExtendOpen(true)}
            >
              Extend listing dates
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        <section className="rounded-md border shadow-xs">
          <div className="rounded-t-md bg-primary/10 px-4 py-3 font-medium">
            <h2 className="text-base">Listing & distribution window</h2>
            <p className="text-xs font-normal text-muted-foreground">
              Dates stored on the asset (same fields as the token / investor step).
            </p>
          </div>
          <hr />
          <dl className="grid gap-4 px-4 py-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Listing start
              </dt>
              <dd className="mt-1 flex items-center gap-2 text-lg font-semibold tabular-nums">
                <CalendarClock className="size-4 text-muted-foreground" aria-hidden />
                {formatDisplayDate(start)}
              </dd>
              <p className="mt-1 text-xs text-muted-foreground">
                When the listing / distribution period begins.
              </p>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Listing end
              </dt>
              <dd className="mt-1 flex items-center gap-2 text-lg font-semibold tabular-nums">
                <CalendarClock className="size-4 text-muted-foreground" aria-hidden />
                {formatDisplayDate(end)}
              </dd>
              <p className="mt-1 text-xs text-muted-foreground">
                When the listing period closes for new activity.
              </p>
            </div>
          </dl>
          <div className="border-t px-4 py-3 text-sm text-muted-foreground">
            Asset status:{" "}
            <span className="font-medium text-foreground">{humanizeStatus(status)}</span>
          </div>
        </section>

        <section className="rounded-md border shadow-xs">
          <div className="rounded-t-md bg-primary/10 px-4 py-3 font-medium">
            <h2 className="text-base">Soft cap & funding</h2>
            <p className="text-xs font-normal text-muted-foreground">
              Snapshot from the overview dashboard (read-only here).
            </p>
          </div>
          <hr />
          {!n ? (
            <p className="px-4 py-6 text-sm text-muted-foreground">
              No soft cap summary is available for this asset yet.
            </p>
          ) : (
            <div className="space-y-3 px-4 py-4">
              <div className="flex flex-wrap gap-2 text-xs">
                <Pill label="Soft cap reached" on={Boolean(n.softcapAmountRaised)} />
                <Pill label="Midcap reached" on={Boolean(n.midcapAmountRaised)} />
                {typeof n.acceptingNewInvestments === "boolean" && (
                  <span className="rounded-full border px-2 py-0.5">
                    Accepting investors:{" "}
                    <strong>{n.acceptingNewInvestments ? "Yes" : "No"}</strong>
                  </span>
                )}
              </div>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
                {n.basePropertyValue != null && (
                  <div>
                    <dt className="text-muted-foreground">Base property value</dt>
                    <dd className="font-medium tabular-nums">
                      {formatMoney(n.basePropertyValue, currency)}
                    </dd>
                  </div>
                )}
                {n.softcapAmount != null && (
                  <div>
                    <dt className="text-muted-foreground">Soft cap amount</dt>
                    <dd className="font-medium tabular-nums">
                      {formatMoney(n.softcapAmount, currency)}
                    </dd>
                  </div>
                )}
                {n.totalRaised != null && (
                  <div>
                    <dt className="text-muted-foreground">Total raised</dt>
                    <dd className="font-medium tabular-nums">
                      {formatMoney(n.totalRaised, currency)}
                    </dd>
                  </div>
                )}
                {n.fundingTargetAmount != null && (
                  <div>
                    <dt className="text-muted-foreground">Funding target</dt>
                    <dd className="font-medium tabular-nums">
                      {formatMoney(n.fundingTargetAmount, currency)}
                    </dd>
                  </div>
                )}
              </dl>
              {n.message ? (
                <p className="rounded-md border bg-muted/40 px-3 py-2 text-sm">{n.message}</p>
              ) : null}
            </div>
          )}
        </section>
      </div>

      <ExtendListingDatesDialog
        open={extendOpen}
        onOpenChange={setExtendOpen}
        assetId={assetId}
        asset={asset}
        initialStart={start}
        initialEnd={end}
        onSuccess={() => {
          setExtendOpen(false);
          onAfterUpdate?.();
        }}
      />
    </div>
  );
}

function Pill({ label, on }: { label: string; on: boolean }) {
  return (
    <span
      className={`rounded-full border px-2 py-0.5 ${on ? "border-green-700/40 bg-green-50" : "border-muted-foreground/25"}`}
    >
      {label}: <strong>{on ? "Yes" : "No"}</strong>
    </span>
  );
}
