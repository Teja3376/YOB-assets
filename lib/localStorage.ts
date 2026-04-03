// utils/localStorage.ts

export const setLocalItem = (key: string, value: any) => {
  if (typeof window === "undefined") return;

  try {
    const serialized =
      typeof value === "string" ? value : JSON.stringify(value);

    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error("LocalStorage set error:", error);
  }
};

export const getLocalItem = <T = any,>(key: string): T | null => {
  if (typeof window === "undefined") return null;

  try {
    const item = localStorage.getItem(key);
    if (!item) return null;

    try {
      return JSON.parse(item);
    } catch {
      return item as T;
    }
  } catch (e) {
    console.error("LocalStorage get error:", e);
    return null;
  }
};

export const removeLocalItem = (key: string) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("LocalStorage remove error:", error);
  }
};

export const clearLocal = () => {
  if (typeof window === "undefined") return;

  try {
    localStorage.clear();
  } catch (error) {
    console.error("LocalStorage clear error:", error);
  }
};