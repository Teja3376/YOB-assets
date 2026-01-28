import { toast } from "sonner";

export const handleCopy = async (text: string = "") => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  } catch (error) {
    toast.error("Failed to copy");
    console.error("Clipboard copy failed:", error);
  }
};

export const maskId = (id: string, tag: string) => {
  const lastFour = id.slice(-4);
  return `${tag}-${lastFour}`;
};
export function removeKeyFromObject<T extends Record<string, any>>(
  obj: T | null | undefined,
  keys: string | string[],
): T {
  // Handle null or undefined input
  if (!obj || typeof obj !== "object") {
    return {} as T; // Return empty object as fallback
  }

  if (Array.isArray(keys)) {
    // Handle empty keys array
    if (keys.length === 0) {
      return { ...obj } as T; // Return a shallow copy of the object
    }

    return keys.reduce<T>((acc, key) => {
      // Ensure acc is a valid object before destructuring
      if (!acc || typeof acc !== "object") {
        return {} as T; // Fallback to empty object
      }
      const { [key]: _, ...rest } = acc;
      return rest as T;
    }, obj);
  }

  // Handle single key case
  const { [keys]: _, ...rest } = obj;
  return rest as T;
}
export const COUNTRY_OPTIONS = [
  { label: "India", value: "IN" },
  { label: "United Arab Emirates", value: "AE" },
  // { label: "UK", value: "GB" },
  { label: "Qatar", value: "QA" },
  { label: "United States", value: "US" },
  {label: "Italy", value: "IT"}
];
export const CURRENCY_OPTIONS = [
  { label: "INR", value: "INR" },
  { label: "AED", value: "AED" },
  { label: "QAR", value: "QAR" },
  { label: "GBP", value: "GBP" },
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" }
  ,
];

export const EXCLUDED_FIELDS = [
  "_id",
  "userId",
  "issuerId",
  "createdAt",
  "updatedAt",
  "__v",
  "lastModified",
  "webkitRelativePath",
  "size",
  "type",
  "lastModifiedDate",
];

export const cleanUpdateData = (data: any): any => {
  if (data === null || data === undefined) return data;

  // ✅ KEEP DATES
  if (data instanceof Date) {
    return data.toISOString(); // or return data if backend supports Date
  }

  if (Array.isArray(data)) {
    return data.map((item) => cleanUpdateData(item));
  }

  if (typeof data === "object") {
    const cleaned: any = {};
    for (const key in data) {
      if (!EXCLUDED_FIELDS.includes(key)) {
        cleaned[key] = cleanUpdateData(data[key]);
      }
    }
    return cleaned;
  }

  return data;
};
