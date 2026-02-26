import { getLocales } from "locale-currency";

export const getCurrencySymbol = (currency: string): string => {
    const symbols: Record<string, string> = {
        INR: "₹",
        USD: "$",
        EUR: "€",
        GBP: "£",
        AED: "د.إ",
        CAD: "C$",
        AUD: "A$",
        JPY: "¥",
        CNY: "¥",
        USDT: "USDT",
        USDC: "USDC",
    };
    return symbols[currency.toUpperCase()] || currency + " ";
};
const formatWithNotation = (value: number, currency: string): string => {
    // For INR, use Indian notation (Lakh, Crore)
    if (currency === "INR") {
        if (value >= 1e7)
            return (value / 1e7).toFixed(2).replace(/\.00$/, "") + " Cr";
        if (value >= 1e5)
            return (value / 1e5).toFixed(2).replace(/\.00$/, "") + " Lakh";
        if (value >= 1e3)
            return (value / 1e3).toFixed(2).replace(/\.00$/, "") + " K";
        return value.toString();
    }

    // For other currencies, use international notation
    if (value >= 1e12)
        return (value / 1e12).toFixed(2).replace(/\.00$/, "") + "T";
    if (value >= 1e9) return (value / 1e9).toFixed(2).replace(/\.00$/, "") + "B";
    if (value >= 1e6) return (value / 1e6).toFixed(2).replace(/\.00$/, "") + "M";
    if (value >= 1e3) return (value / 1e3).toFixed(2).replace(/\.00$/, "") + "K";
    return value.toString();
};
export const formatCurrencyFlexible = (
    value: number,
    currency: string = "INR",
    options?: {
        removeTrailingZeros?: boolean;
        useNotation?: boolean;
        locale?: string;
    }
): string => {
    const {
        removeTrailingZeros = true,
        useNotation = false,
        locale,
    } = options || {};

    // Handle invalid values
    if (isNaN(value) || value === null || value === undefined) {
        return getCurrencySymbol(currency) + "0";
    }

    // Get currency symbol
    const symbol = getCurrencySymbol(currency);

    // If notation is requested, use compact notation
    if (useNotation) {
        return (
            symbol + " " + formatWithNotation(Number(value?.toFixed(2)), currency)
        );
    }

    // Determine if the value is an integer
    const isInteger = value % 1 === 0;

    // Set locale based on currency if not provided
    const formatLocale = locale || (currency === "INR" ? "en-IN" : "en-US");

    // Check if currency is a cryptocurrency (not a valid ISO currency code)
    const cryptoCurrencies = ["USDT", "USDC"];
    const isCrypto = cryptoCurrencies.includes(currency.toUpperCase());

    if (isCrypto) {
        // For cryptocurrencies, format manually without using Intl.NumberFormat
        const formattedNumber = value.toLocaleString(formatLocale, {
            minimumFractionDigits: removeTrailingZeros && isInteger ? 0 : 2,
            maximumFractionDigits: removeTrailingZeros && isInteger ? 0 : 2,
        });
        return symbol + "  " + formattedNumber;
    }

    // Format options for standard currencies
    const formatOptions: Intl.NumberFormatOptions = {
        style: "currency",
        currency: currency,
        minimumFractionDigits: removeTrailingZeros && isInteger ? 0 : 2,
        maximumFractionDigits: removeTrailingZeros && isInteger ? 0 : 2,
    };

    return value.toLocaleString(formatLocale, formatOptions);
};
export function formatCompactNumber(value: number | string): string {
    const num = typeof value === "string" ? parseFloat(value) : value;

    if (isNaN(num)) return "-";

    const abs = Math.abs(num);

    const format = (n: number, suffix: string) => {
        const rounded = Math.round(n * 100) / 100;
        const formatted = rounded.toFixed(2).replace(/\.?0+$/, ""); // trim .00 or .0
        return `${formatted} ${suffix}`;
    };

    if (abs >= 1_000_000_000_000) return format(num / 1_000_000_000_000, "T");
    if (abs >= 1_000_000_000) return format(num / 1_000_000_000, "B");
    if (abs >= 1_000_000) return format(num / 1_000_000, "M");
    if (abs >= 1_000) return format(num / 1_000, "K");

    return num.toFixed(2).replace(/\.?0+$/, "");
}

function normalizeLocale(locale: string): string {
  if (locale.includes("-")) return locale;
  return `en-${locale}`;
}

export function formatCurrencyWithLocale(
  value: string | number | null | undefined,
  currency: string = "USD",
  compact: boolean = false,
  minimumFractionDigits: number = 0,
  maximumFractionDigits: number = 2,
): string {
  const amount = typeof value === "string" ? Number.parseFloat(value) : value;

  if (amount === null || amount === undefined || Number.isNaN(amount)) {
    return formatCurrencyWithLocale(
      0,
      currency,
      compact,
      minimumFractionDigits,
      maximumFractionDigits,
    );
  }

  let locale = getLocales(currency)[0] || "en-US";
  locale = normalizeLocale(locale);

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    notation: compact ? "compact" : "standard",
    compactDisplay: "short",
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
}