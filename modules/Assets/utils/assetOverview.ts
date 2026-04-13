/** Overview API `softcapNotification` payload (issuer dashboard). */
export type SoftcapNotificationOverview = {
  softcapAmountRaised?: boolean;
  midcapAmountRaised?: boolean;
  basePropertyValue?: number;
  softcapAmount?: number;
  totalRaised?: number;
  fundingTargetAmount?: number;
  message?: string | null;
  requiresIssuerDecision?: boolean;
  investmentClosedAtSoftcap?: boolean;
  continuingToBasePropertyValue?: boolean;
  acceptingNewInvestments?: boolean;
};

/** Avoid rendering API error JSON saved into hosted-by "about" by mistake. */
export function sanitizeHostedByAbout(text: unknown): string {
  if (typeof text !== "string" || !text.trim()) return "";
  const t = text.trim();
  if (
    t.startsWith("{") &&
    (t.includes('"Bad Request"') || t.includes('"statusCode":400'))
  ) {
    return "";
  }
  return text;
}
