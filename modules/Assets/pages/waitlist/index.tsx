"use client";

import useWaitlistRegistrations from "@/modules/Assets/hooks/assetDashBoard/useWaitlistRegistrations";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type WaitlistUser = {
  firstName?: string;
  lastName?: string;
  email?: string;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  isKycVerified?: boolean;
  avatar?: string | null;
  kycStatus?: string;
};

type WaitlistAsset = {
  name?: string;
  currency?: string;
  city?: string;
  state?: string;
  country?: string;
};

type WaitlistRegistrationRow = {
  _id: string;
  createdAt: string;
  user?: WaitlistUser;
  asset?: WaitlistAsset;
};

type WaitlistApiPayload = {
  data?: WaitlistRegistrationRow[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
  };
};

function parsePayload(payload: unknown): {
  rows: WaitlistRegistrationRow[];
  total: number;
} {
  if (!payload || typeof payload !== "object") {
    return { rows: [], total: 0 };
  }
  const body = payload as WaitlistApiPayload;
  const rows = Array.isArray(body.data) ? body.data : [];
  const total =
    typeof body.pagination?.total === "number"
      ? body.pagination.total
      : rows.length;
  return { rows, total };
}

function investorName(user?: WaitlistUser): string {
  const parts = [user?.firstName, user?.lastName].filter(Boolean);
  if (parts.length === 0) return "—";
  return parts.join(" ");
}

function initials(user?: WaitlistUser): string {
  const a = user?.firstName?.charAt(0) ?? "";
  const b = user?.lastName?.charAt(0) ?? "";
  const s = `${a}${b}`.toUpperCase();
  return s || "?";
}

function location(asset?: WaitlistAsset): string {
  if (!asset) return "—";
  const parts = [asset.city, asset.state, asset.country].filter(Boolean);
  return parts.length ? parts.join(", ") : "—";
}

function kycLabel(user?: WaitlistUser): string {
  if (!user) return "—";
  if (user.kycStatus) {
    return user.kycStatus.replace(/-/g, " ");
  }
  if (user.isKycVerified) return "verified";
  return "—";
}

const AssetWaitlistPage = () => {
  const { assetid } = useParams();
  const id = assetid as string;

  const { data, isFetching, isError, error, refetch } =
    useWaitlistRegistrations(id, true);

  const { rows, total } = parsePayload(data);

  if (isFetching && !data) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="mt-5 space-y-3">
        <p className="text-sm text-destructive">
          {(error as Error)?.message || "Failed to load waitlist registrations."}
        </p>
        <Button type="button" variant="outline" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="mt-5 text-sm text-muted-foreground">
        No waitlist registrations for this asset.
      </div>
    );
  }

  return (
    <div className="mt-5 space-y-3">
      <p className="text-sm text-muted-foreground">
        {total} registration{total === 1 ? "" : "s"}
      </p>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Investor</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>KYC</TableHead>
              <TableHead className="whitespace-nowrap">Email OK</TableHead>
              <TableHead className="whitespace-nowrap">Phone OK</TableHead>
              <TableHead className="whitespace-nowrap">Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => {
              const user = row.user;
              const asset = row.asset;
              return (
                <TableRow key={row._id}>
                  <TableCell>
                    <div className="flex items-center gap-2 min-w-[140px]">
                      <Avatar className="size-9">
                        {user?.avatar ? (
                          <AvatarImage src={user.avatar} alt="" />
                        ) : null}
                        <AvatarFallback className="text-xs">
                          {initials(user)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">
                        {investorName(user)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[220px] truncate">
                    {user?.email ?? "—"}
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    <div className="flex flex-col gap-0.5">
                      <span>{asset?.name ?? "—"}</span>
                      {asset?.currency ? (
                        <span className="text-xs text-muted-foreground">
                          {asset.currency}
                        </span>
                      ) : null}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm max-w-[160px]">
                    {location(asset)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "capitalize font-normal",
                        user?.isKycVerified && "bg-emerald-600/15 text-emerald-800",
                      )}
                    >
                      {kycLabel(user)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <YesNo value={user?.isEmailVerified} />
                  </TableCell>
                  <TableCell>
                    <YesNo value={user?.isPhoneVerified} />
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                    {formatJoined(row.createdAt)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

function formatJoined(iso: string): string {
  try {
    return format(new Date(iso), "dd/MM/yyyy HH:mm");
  } catch {
    return iso;
  }
}

function YesNo({ value }: { value?: boolean }) {
  if (value === true) {
    return <span className="text-emerald-700 text-sm">Yes</span>;
  }
  if (value === false) {
    return <span className="text-muted-foreground text-sm">No</span>;
  }
  return <span className="text-muted-foreground text-sm">—</span>;
}

export default AssetWaitlistPage;
